from ._shared import shared
import simplejson
#from pprint import pprint
import re
import uuid
import requests
from requests.auth import HTTPBasicAuth

class feedback(shared):
    db = None
    operators = {
        "empty": "is empty",
        "not_empty": "isn't empty",
        "is": "is",
        "is_not": "isn't",
        "contains": "contains",
        "clicked": "clicked",
        "no": "No",
        "yes": "Yes"
    }

    def __init__(self, parent):
        shared.__init__(self, parent.db)
        self.db = parent.db

    def save(self, activity_obj):
        activity_id = activity_obj.get("activity_id")
        run_id = activity_obj.get("run_id")
        owner = activity_obj.get("owner")

        if not run_id:
            run_id = self.genUUID()

        if not activity_id:
            return {"error": "Activity not specified"}

        workflow = self.getWorkflowByActivityId(activity_id)

        if not workflow:
            return {"error": "Unable to find workflow"}

        if workflow.get("error"):
            return workflow

        workflow_id = workflow.get("workflow_id")
        #parent = workflow.get("parent_workflow_id")
        #workspace_id = workflow.get("workspace_id")
        data = activity_obj.get("data")
        str_data = simplejson.dumps(data)

        q = """
            insert into tbl_feedback (
                workflow_id,
                activity_id,
                created_by_uid,
                run_id,
                feedback_data
            ) values (
                $workflow_id,
                $activity_id,
                $created_by_uid,
                $run_id,
                $str_data
            )
        """
        self.db.query(q, {
            "workflow_id": workflow_id,
            "activity_id": activity_id,
            "created_by_uid": owner,
            "run_id": run_id,
            "str_data": str_data,
        });


        act = self.getActivityById(activity_id)
        act_type = act.get("activity_type_id")
        print("ACTIVITY TYPE")
        print(act_type)
        if act_type == 2:
            print ("Calling Notify")
            self.doNotify(act)
        if act_type == 3: # ROLE
            print ("Calling role")
            self.doRole(run_id, act)
            return self.doActivityEnd(owner, workflow_id)
        elif act_type == 7: # API
            print ("Calling API")
            self.doAPI(run_id, act)


        max_loop = 100
        loop_count = 0
        while 1:
            loop_count+= 1
            if loop_count >= max_loop:
                break
            next_activity_id = self.getNextActivityId(run_id, activity_id)
            if next_activity_id == "end":
                return self.doActivityEnd(owner, workflow_id)

            act = self.getActivityById(next_activity_id)
            act_type = act.get("activity_type_id")
            if act_type == 1 or act_type == 8: # form and payment
                return { "activity_id": next_activity_id }
            elif act_type == 2:
                self.doNotify(act)
                activity_id = next_activity_id
                continue
            elif act_type == 3:
                print ("Calling role")
                self.doRole(run_id, act)
                return self.doActivityEnd(owner, workflow_id)

            elif act_type == 7: # API
                print ("Calling API")
                self.doAPI(run_id, act)
                activity_id = next_activity_id
                continue


            return self.doActivityEnd(owner, workflow_id)

    def doAPI(self, run_id, act):
        print ("DOING API")
        q = "select workflow_id from tbl_activities where activity_id = $activity_id"
        wf_row = self.db.find_one(q, { "activity_id": act.activity_id})
        workflow_id = ""
        if wf_row:
            workflow_id = wf_row.get("workflow_id")

        q = "select * from tbl_activity_api where activity_id = $activity_id"
        row = self.db.find_one(q, { "activity_id": act.activity_id})

        data = self.getRunDataConsolidated(run_id)
        requestor = ""
        if data and data.get("created_by_uid"):
            q = "select email from tbl_users where uid = $uid"
            urow = self.db.find_one(q, {"uid": data.get("created_by_uid")})
            requestor = urow.get("email")

        params = {}
        if row.api_params:
            parts = row.api_params.split("\n")
            print ("Parts")
            print(parts)
            for part in parts:
                key = part.replace("@", "")
                value = ""
                if key == "requestor":
                    value = requestor
                elif key == "workflow_id":
                    value = workflow_id
                else:
                    value = data.get(key)
                params[key] = value
        print(params)
        print(row)
        if row.api_method == "POST":
            print("DOING POST")
            response = requests.post(row.api_url, auth=HTTPBasicAuth(row.api_user, row.api_password), data=simplejson.dumps(params))
        else:
            print("DOING GET")
            response = requests.get(row.api_url, auth=HTTPBasicAuth(row.api_user, row.api_password), data=simplejson.dumps(params))
        resp_obj = {}
        try:
            resp_obj = response.json()
        except:
            try:
                resp_obj = simplejson.loads(response.content)
            except:
                print (response.content)
        print (resp_obj)



    def doRole(self, run_id, act):
        q = "select * from tbl_activity_roles where activity_id = $activity_id"
        row = self.db.find_one(q, { "activity_id": act.activity_id})
        next_activity_id = self.getNextActivityId(run_id, act.activity_id)
        if next_activity_id == "end": # there is nothing for target role to do
            return
        #next_act = self.getActivityById(next_activity_id)
        if not row.uid:
            row.uid = "00000000-0000-0000-0000-000000000000"
        if not row.role_id:
            row.role_id = "00000000-0000-0000-0000-000000000000"

        if row.role_type == "email":
            q = "select uid from tbl_users where email = $email"
            user = self.db.find_one(q, {"email": row.role_email})
            if not user:
                row.uid = str(uuid.uuid4())
                q = "insert into tbl_users (uid, email) values ($uid, $email)"
                self.db.query(q, {"uid": row.uid, "email": row.role_email})
            else:
                row.uid = user.uid
        elif row.role_type == "anyone" or row.role_type == "round_robin":
            q = "select uid from tbl_user_roles where role_id = $role_id order by random() limit 1"
            user = self.db.find_one(q, {"role_id": row.role_id})
            if not user:
                return # no users in role?
            row.uid = user.uid

        q = """
            insert into tbl_workflow_roles (
                workflow_id,
                role_id,
                start_at_activity_id,
                is_activity_role,
                uid
            ) values (
                $workflow_id,
                $role_id,
                $next_activity_id,
                1,
                $uid

            )
        """

        self.db.query(q, {
            "workflow_id": act.workflow_id,
            "role_id": row.role_id,
            "next_activity_id": next_activity_id,
            "uid": row.uid
        })

        q = "select email from tbl_users where uid = $uid"
        user = self.db.find_one(q, {"uid": row.uid})
        if user:
            self.sendMail("noreply@processpal.io", user.email, "Workflow Invite", "You have been invited to complete a workflow: <a href=\"https://axsure.processpal.io\">https://axsure.processpal.io</a>")


    def doActivityEnd(self, owner_uid, workflow_id):
        q = "update tbl_workflow_roles set disabled = 1 where wf_role_id = (select wf_role_id from tbl_workflow_roles where is_activity_role = 1 and disabled = 0 and workflow_id = $workflow_id and uid = $uid limit 1)"
        self.db.query(q, {
            "workflow_id": workflow_id,
            "uid": owner_uid
        });

        return { "activity_id": "end" }


    def getNextActivityId(self, run_id, current_activity_id):
        data = self.getRunDataConsolidated(run_id)
        #activity = self.getActivityById(current_activity_id)
        print("Run data")
        print(data)
        connections = self.getConnectionsFromActivity(current_activity_id)
        print("Connections")
        print(connections)
        if not connections or len(connections) == 0:
            print ("NOT????")
            return "end"

        print ("len...")
        print (len(connections))
        if len(connections) == 1:
            return connections[0].get("target_activity_id")
        print ("\n****************")
        default_next_activity = None
        for conn in connections:
            print(conn)
            print ("that was conn")
            if conn.check_condition and conn.check_condition != None:

                condition = conn.get("check_condition")
                check_value = conn.get("check_value")
                ref = conn.get("question_ref")
                actual_value = data.get(ref)
                if self.validateConnectionRule(condition, check_value, actual_value):
                    print("GOT  A GOOD RULE>>>>")
                    return conn.get("target_activity_id")
            else:
                print("RETURNING DEFAULT")
                default_next_activity = conn.get("target_activity_id")

        return default_next_activity




    def doNotify(self, act):
        q = "select * from tbl_activity_notifications where activity_id = $activity_id"
        row = self.db.find_one(q, { "activity_id": act.activity_id})
        if row.to_email and row.body:
            self.sendMail("noreply@processpal.io", row.to_email, row.subject, row.body)


        """
        if len(connections) == 1:
            return connections[0].get("target_activity_id")
        default_next_activity = None
        for conn in connections:
            print ("CONDITION")
            print (conn.check_condition)
            if conn.check_condition and conn.check_condition != None:
                print ("IN IF")
                condition = conn.get("check_condition")
                check_value = conn.get("check_value")
                ref = conn.get("question_ref")
                actual_value = data.get(ref)
                if self.validateConnectionRule(condition, check_value, actual_value):
                    return conn.get("target_activity_id")
            else:
                print ("IN ELSE")
                default_next_activity = conn.get("target_activity_id")

        return default_next_activity
        """



    def validateConnectionRule(self, operator, required_value_in, actual_value_in):
        print("required: %s, actual: %s, operator: %s" % (required_value_in, actual_value_in, operator))
        required_value = required_value_in.strip().lower()
        actual_value = actual_value_in
        if not actual_value:
            actual_value = ""
        actual_value = actual_value.strip().lower()
        if self.operators.get("empty") == operator:
            if actual_value == "":
                return True
            return False
        if self.operators.get("not_empty") == operator:
            if actual_value != "":
                return True
            return False
        if self.operators.get("is") == operator:
            if actual_value == required_value:
                return True
            return False
        if self.operators.get("is_not") == operator:
            if actual_value != required_value:
                return True
            return False
        if self.operators.get("contains") == operator:
            if actual_value == "":
                return False
            if len(re.findall(required_value, actual_value)) > 0:
                return True
            return False
        if self.operators.get("clicked") == operator:
            if actual_value == required_value:
                return True
            return False
        if self.operators.get("yes") == operator:
            if actual_value == required_value:
                return True
            return False
        if self.operators.get("no") == operator:
            if actual_value == required_value:
                return True
            return False

    def getFeedback(self, uid, workflow_id):
        q = """
            select
                f.*,
                u.email as requestor
            from
                tbl_feedback f
            join
                tbl_users u
            on
                u.uid = f.created_by_uid
            where
                f.workflow_id = $workflow_id
            order by
                f.ts_created
        """
        return self.db.find(q, {"workflow_id": workflow_id})




    def getActivityRun(self, uid, activity_id):
        q = "select run_id from tbl_feedback where created_by_uid = $uid and activity_id = $activity_id"
        row = self.db.find_one(q, { "uid": uid, "activity_id": activity_id})
        if not row:
            return {}
        else:
            return self.getRunDataConsolidated(row.run_id)



    def getRun(self, uid, run_id):
        return self.getRunDataConsolidated(run_id)


