import uuid

class workflows:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def getWorkflow(self, owner, workflow_id):
        #q = "select * from tbl_workflows where workflow_id = $workflow_id and owner_uid = $owner_uid"
        q = "select * from tbl_workflows where workflow_id = $workflow_id" # add role checks etc
        workflow = self.db.find_one(q, {"workflow_id": workflow_id, "owner_uid": owner })
        if not workflow:
            return None
        q = "select * from tbl_activities where workflow_id = $workflow_id"
        activities = self.db.find(q, {"workflow_id": workflow_id})
        out_activities = []
        for activity_row in activities:
            q = "select * from tbl_questions where activity_id = $activity_id"
            questions = self.db.find(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["questions"] = questions

            q = "select * from tbl_activity_notifications where activity_id = $activity_id"
            notify = self.db.find_one(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["notify"] = notify

            q = "select * from tbl_activity_timers where activity_id = $activity_id"
            timer = self.db.find_one(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["timer"] = timer

            q = "select * from tbl_activity_roles where activity_id = $activity_id"
            role = self.db.find_one(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["role"] = role


            q = "select * from tbl_activity_api where activity_id = $activity_id"
            api = self.db.find_one(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["api"] = api

            q = "select * from tbl_activity_payment where activity_id = $activity_id"
            payment = self.db.find_one(q, {"activity_id": activity_row.get("activity_id") } )
            activity_row["payment"] = payment

            out_activities.append(activity_row)

        workflow["activities"] = out_activities
        q = """
            select
                activity_connection_id as connection_id,
                target_activity_id as to_id,
                question_id,
                check_condition,
                check_value,
                ts_created,
                source_activity_id as from_id,
                workflow_id,
                question_ref
            from
                tbl_activity_connections
            where
                workflow_id = $workflow_id
        """
        connections = self.db.find(q, {"workflow_id": workflow_id})
        workflow["connections"] = connections

        return workflow

    def _setInitialActivity(self, workflow_id, activity_id):
        q = "update tbl_workflows set initial_activity = $activity_id where workflow_id = $workflow_id"
        self.db.query(q, {
            "workflow_id": workflow_id,
            "activity_id": activity_id
        })

    def saveQuestion(self, owner_uid, args):
        """
        if not question.get("data_link"):
            question["data_link"] = "00000000-0000-0000-0000-000000000000"
        self.db.query(q, {
            "question_text": question.get("question_text"),
            "question_ref": question.get("question_ref"),
            "question_type_id": question.get("question_type_id"),
            "question_index": question.get("question_index"),
            "position_top": question.get("position_top"),
            "position_left": question.get("position_left"),
            "data_link": question.get("data_link"),
            "data_link_key": question.get("data_link_key"),
            "question_options": question.get("question_options"),
            "label_position_top": question.get("label_position_top"),
            "label_position_left": question.get("label_position_left"),
            "question_id": question_id,
            "activity_id": activity_id
        """
        if args.get("disable_previous") == 1:
            q = "update tbl_questions set read_only = 1 where activity_id = $activity_id and question_type_id > 0"
            self.db.query(q, {
                "activity_id": args.get("activity_id")
            })

        question = {
            "question_text": args.get("question_text"),
            "question_ref": args.get("question_ref"),
            "question_type_id": args.get("question_type_id"),
            "question_index": args.get("question_index"),
            "position_top": args.get("position_top"),
            "position_left": args.get("position_left"),
            "data_link": args.get("data_link"),
            "data_link_key": args.get("data_link_key"),
            "question_options": args.get("question_options"),
            "label_position_top": args.get("label_position_top"),
            "label_position_left": args.get("label_position_left"),
            "question_id": args.get("question_id"),
            "activity_id": args.get("activity_id")
        }
        if not args.get("question_id"):
            #def _insertActivity(self, workflow_id, activity_id):
            question_id = str(uuid.uuid4())
            question["question_id"] = question_id
            #def _updateQuestion(self, activity_id, question_id, question):
            self._updateQuestion(question.get("activity_id"), question.get("question_id"), question ) # TODO add checks for valid workspace
            return { "success": 1, "question_id": question.get("question_id") }
        else:
            #def _updateQuestion(self, workflow_id, question_id, question):
            self._updateQuestion(question.get("activity_id"), question.get("question_id"), question ) # TODO add checks for valid workspace
            return { "success": 1, "question_id": question.get("question_id") }

    def addWorkflowUserRole(self, owner_uid, workflow_id, email, role_name, role_id):
        role = { "role_name": role_name, "role_id": role_id }
        resp = self.saveRole(owner_uid, role)
        role_id = resp.get("role_id")
        q = "select uid from tbl_users where email = $email"
        row = self.db.find_one(q, {"email": email})
        uid = ""
        if not row:
            uid = str(uuid.uuid4())
            q = "insert into tbl_users (uid, email) values ($uid, $email)"
            self.db.query(q, {
                "uid": uid,
                "email": email
            })
        else:
            uid = row.get("uid")
        q = "delete from tbl_workflow_roles where workflow_id = $workflow_id and uid = $uid"
        self.db.query(q, {"workflow_id": workflow_id, "uid": uid})

        q = "insert into tbl_workflow_roles (workflow_id, role_id, uid) values ($workflow_id, $role_id, $uid)"
        self.db.query(q, {"workflow_id": workflow_id, "role_id": role_id, "uid": uid})
        q = "insert into tbl_user_roles (role_id, uid) values ($role_id, $uid)"
        self.db.query(q, {"role_id": role_id, "uid": uid})
        return { "success": 1 }


    def saveRole(self, owner_uid, args):
        role_id = ""
        if args.get("role_id"):
            role_id = self._updateRole(owner_uid, args)
        else:
            role_id = self._createRole(owner_uid, args)
        return { "success": 1, "role_id": role_id }

    def _createRole(self, owner_uid, role):
        role_id = str(uuid.uuid4())
        q = "insert into tbl_roles (role_id, role_name, owner_uid) values ($role_id, $role_name, $owner_uid)"
        self.db.query(q, {
            "role_name": role.get("role_name"),
            "role_id": role_id,
            "owner_uid": owner_uid
        })
        return role_id


    def _updateRole(self, owner_uid, role):
        q = "update tbl_roles set role_name = $role_name where role_id = $role_id and owner_uid = $owner_uid"
        self.db.query(q, {
            "role_name": role.get("role_name"),
            "role_id": role.get("role_id"),
            "owner_uid": owner_uid
        })
        return role.get("role_id")


    def saveActivity(self, owner_uid, args):
        activity = {
            "name": args.get("name"),
            "type": args.get("type"),
            "position_top": args.get("position_top"),
            "position_left": args.get("position_left"),
            "button_text": args.get("button_text"),
            "activity_id": args.get("activity_id"),
            "workflow_id": args.get("workflow_id")
        }
        if not args.get("activity_id"):
            #def _insertActivity(self, workflow_id, activity_id):
            activity_id = str(uuid.uuid4())
            activity["activity_id"] = activity_id
            self._insertActivity(args.get("workflow_id"), activity_id)
            self._updateActivity(activity.get("workflow_id"), activity.get("activity_id"), activity ) # TODO add checks for valid workspace
            if args.get("is_initial_activity") == "1":
                self._setInitialActivity(activity.get("workflow_id"), activity.get("activity_id"))


                button = {
                    "question_text": args.get("button_text"),
                    "question_ref": "submit",
                    "question_type_id": "0",
                    "question_id": str(uuid.uuid4()),
                    "activity_id": activity.get("activity_id")
                }

                self.saveQuestion(owner_uid, button)
            return { "success": 1, "activity_id": activity.get("activity_id") }
        else:
            #def _updateActivity(self, workflow_id, activity_id, activity):
            self._updateActivity(activity.get("workflow_id"), activity.get("activity_id"), activity ) # TODO add checks for valid workspace
            if args.get("is_initial_activity") == "1":
                self._setInitialActivity(activity.get("workflow_id"), activity.get("activity_id"))
            return { "success": 1, "activity_id": activity.get("activity_id") }


    def saveWorkflow(self, owner_uid, workspace_id, args):
        if not args.get("workflow_id"):
            return self.createWorkflow(owner_uid, workspace_id, args.get("name"))
        else:
            self._updateWorkflowInfo(args) # TODO add checks for valid workspace
            return { "success": 1, "workflow_id": args.get("workflow_id") }


    def createWorkflow(self, uid, workspace_id, name):
        workflow_id = str(uuid.uuid4())
        q = """
            insert into tbl_workflows (
                workflow_id,
                workspace_id,
                name,
                owner_uid,
                version,
                deployed
            ) values (
                $workflow_id,
                $workspace_id,
                $name,
                $owner_uid,
                1,
                0
            )
        """
        self.db.query(q, {
            "workflow_id": workflow_id,
            "workspace_id": workspace_id,
            "name": name,
            "owner_uid": uid
        })
        return { "success": 1, "workflow_id": workflow_id }

    def getWorkflows(self, owner, workspace_id = None):
        if workspace_id:
            workspace_id = workspace_id.replace("'", "") # Fix..
            _and = " and workspace_id = '%s' " % workspace_id
        q = """
            select
                wf.*
            from
                tbl_workflows wf
            left join
                tbl_workflow_roles wr
            on
                wr.workflow_id = wf.workflow_id
            left join
                tbl_user_roles ur
            on
                wr.role_id = ur.role_id
            where
                (
                    wf.owner_uid = $uid or
                    ur.uid = $uid
                )
        """ + _and
        print (q)
        #q = "select * from tbl_workflows where owner_uid = $owner_uid and deployed = 1"
        return self.db.find(q, {"uid": owner})


    def updateWorkflow(self, owner, workflow):
        workflow_id = workflow.get("workflow_id")
        if not self.isWorkflowOwner(workflow_id, owner):
            return { "error": "You are not the owner of this workflow" }

        if not self.workflowExists(workflow_id):
            return { "error": "Workflow does not exist" }

        activities = workflow.get("activities")
        connections = workflow.get("connections")

        if not workflow.get("name"):
            return { "error": "Workflow name is blank" }

        if not activities:
            return { "error": "No activities" }

        if not connections:
            return { "error": "No connections" }

        valid_activity_ids = self._updateActivities(workflow_id, activities)
        valid_connections = self._updateConnections(workflow_id, connections, valid_activity_ids)

        first_activity = self._getFirstActivityId(valid_connections)
        workflow["initial_activity"] = first_activity
        self._updateWorkflowInfo(workflow)
        return self.getWorkflow(owner, workflow_id)

    def _updateConnections(self, workflow_id, connections, valid_activity_ids = None):
        valid_connections = []
        valid_return_connections = []
        for conn in connections:
            if valid_activity_ids:
                is_valid_source = False
                is_valid_target = False
                if conn.get("from_id") in ("1", "connector_1", "00000000-0000-0000-0000-000000000000"):
                    is_valid_source = True
                for activity_id in valid_activity_ids:
                    if activity_id == conn.get("from_id"):
                        is_valid_source = True
                    if activity_id == conn.get("to_id"):
                        is_valid_target = True
                if not (is_valid_source and is_valid_target):
                    continue
            valid_connections.append("'%s'" % conn.get("connection_id").replace("'", ""))
            valid_return_connections.append(conn)
            q = "select count(*) as cnt from tbl_activity_connections where activity_connection_id = $connection_id and workflow_id = $workflow_id"
            if conn.get("from_id") == "1" or conn.get("from_id") == "connector_1":
                conn["from_id"] = "00000000-0000-0000-0000-000000000000"
            exists = self.db.find_one(q, {
                "connection_id": conn.get("connection_id"),
                "workflow_id": workflow_id
            })
            if exists.get("cnt") == 0:
                self._insertConnection(workflow_id, conn.get("connection_id"))
            self._updateConnection(workflow_id, conn.get("connection_id"), conn)

        if len(valid_connections) > 0:
            valid_connections_str = ",".join(valid_connections)
            q = "delete from tbl_activity_connections where workflow_id = $workflow_id and activity_connection_id not in (%s)" % valid_connections_str
            self.db.query(q, {
                "workflow_id": workflow_id
            })
        return valid_return_connections


        # do a query to find all activities for a workflow and delete all connections which have end points not in the list

    def _updateConnection(self, workflow_id, connection_id, connection):
        q = """
            update
                tbl_activity_connections
            set
                target_activity_id = $to_id,
                question_id = $question_id,
                check_condition = $check_condition,
                question_ref = $question_ref,
                check_value = $check_value,
                source_activity_id = $from_id
            where
                activity_connection_id = $connection_id and
                workflow_id = $workflow_id
        """
        try:
            self.db.query(q, {
                "to_id": connection.get("to_id"),
                "question_id": connection.get("question_id"),
                "check_condition": connection.get("check_condition"),
                "check_value": connection.get("check_value"),
                "question_ref": connection.get("question_ref"),
                "from_id": connection.get("from_id"),
                "connection_id": connection_id,
                "workflow_id": workflow_id
            })

        except Exception as e:
            print ("******** _updateConnection()")
            print (e)

    def _insertConnection(self, workflow_id, connection_id):
        q = "insert into tbl_activity_connections (workflow_id, activity_connection_id) values ($workflow_id, $connection_id)"
        self.db.query(q, {
            "connection_id": connection_id,
            "workflow_id": workflow_id
        })


    def _updateActivities(self, workflow_id, activities):
        valid_activities = []
        valid_return_activities = []
        for activity_id, activity in activities.items():
            valid_activities.append("'%s'" % activity_id.replace("'", ""))
            valid_return_activities.append(activity_id.replace("'", ""))
            q = "select count(*) as cnt from tbl_activities where workflow_id = $workflow_id and activity_id = $activity_id"
            exists = self.db.find_one(q, {
                "workflow_id": workflow_id,
                "activity_id": activity_id
            })
            if exists.get("cnt") == 0:
                self._insertActivity(workflow_id, activity_id)
            self._updateActivity(workflow_id, activity_id, activity)
            questions = activity.get("questions")
            if questions:
                valid_questions = []
                try:
                    for question_id, question in questions.items():
                        valid_questions.append("'%s'" % question_id.replace("'", ""))
                        self._updateQuestion(activity_id, question_id, question)
                except Exception as e:
                    print ("******** update questions")
                    print (e)
                valid_questions_str = ",".join(valid_questions)
                print(valid_questions_str)
                q = "delete from tbl_questions where activity_id = $activity_id and question_id not in (%s)" % valid_questions_str
                self.db.query(q, {
                    "activity_id": activity_id
                })
            notify = activity.get("notify")
            if notify:
                self._updateNotify(activity_id, notify)
            timer = activity.get("timer")
            if timer:
                self._updateTimer(activity_id, timer)
            role = activity.get("role")
            if role:
                self._updateActivityRole(activity_id, role)
            api = activity.get("api")
            if api:
                self._updateAPI(activity_id, api)
            payment = activity.get("payment")
            if payment:
                self._updatePayment(activity_id, payment)

        valid_activities_str = ",".join(valid_activities)
        q = "delete from tbl_activities where workflow_id = $workflow_id and activity_id not in (%s)" % valid_activities_str
        self.db.query(q, {
            "workflow_id": workflow_id
        })
        return valid_return_activities




    def _updatePayment(self, activity_id, payment):
        q = "delete from tbl_activity_payment where activity_id = $activity_id";
        self.db.query(q, { "activity_id": activity_id})
        q = """
            insert into tbl_activity_payment (
                activity_id,
                payment_description,
                payment_total
            ) values (
                $activity_id,
                $payment_description,
                $payment_total
            )
        """
        self.db.query(q, {
            "activity_id": activity_id,
            "payment_description": payment.get("payment_description"),
            "payment_total": payment.get("payment_total")
        })




    def _updateAPI(self, activity_id, api):
        q = "delete from tbl_activity_api where activity_id = $activity_id";
        self.db.query(q, { "activity_id": activity_id})
        q = """
            insert into tbl_activity_api (
                activity_id,
                api_user,
                api_password,
                api_url,
                api_method,
                api_params
            ) values (
                $activity_id,
                $api_user,
                $api_password,
                $api_url,
                $api_method,
                $api_params
            )
        """
        self.db.query(q, {
            "activity_id": activity_id,
            "api_user": api.get("api_user"),
            "api_password": api.get("api_password"),
            "api_url": api.get("api_url"),
            "api_method": api.get("api_method"),
            "api_params": api.get("api_params")
        })





    def _updateActivityRole(self, activity_id, role):
        q = "delete from tbl_activity_roles where activity_id = $activity_id";
        self.db.query(q, { "activity_id": activity_id})
        q = """
            insert into tbl_activity_roles (
                activity_id,
                role_email,
                role_id,
                role_type,
                uid,
                role_body
            ) values (
                $activity_id,
                $role_email,
                $role_id,
                $role_type,
                $uid,
                $role_body
            )
        """
        self.db.query(q, {
            "activity_id": activity_id,
            "role_email": role.get("role_email"),
            "role_id": role.get("role_id"),
            "role_type": role.get("role_type"),
            "uid": role.get("uid"),
            "role_body": role.get("role_body")
        })




    def _updateTimer(self, activity_id, timer):
        q = "delete from tbl_activity_timers where activity_id = $activity_id";
        self.db.query(q, { "activity_id": activity_id})
        q = """
            insert into tbl_activity_timers (
                activity_id,
                timer_rule,
                wait_for_duration,
                wait_for_unit,
                wait_for_duration_before_after,
                wait_for_unit_before_after
            ) values (
                $activity_id,
                $timer_rule,
                $wait_for_duration,
                $wait_for_unit,
                $wait_for_duration_before_after,
                $wait_for_unit_before_after
            )
        """
        self.db.query(q, {
            "activity_id": activity_id,
            "timer_rule": timer.get("timer_rule"),
            "wait_for_duration": timer.get("wait_for_duration"),
            "wait_for_unit": timer.get("wait_for_unit"),
            "wait_for_duration_before_after": timer.get("wait_for_duration_before_after"),
            "wait_for_unit_before_after": timer.get("wait_for_unit_before_after"),
        })


    def _updateNotify(self, activity_id, notify):
        q = "delete from tbl_activity_notifications where activity_id = $activity_id";
        self.db.query(q, { "activity_id": activity_id})
        q = """
            insert into tbl_activity_notifications (
                activity_id,
                to_email,
                bcc_email,
                subject,
                body
            ) values (
                $activity_id,
                $to_email,
                $bcc_email,
                $subject,
                $body
            )
        """
        self.db.query(q, {
            "activity_id": activity_id,
            "to_email": notify.get("to_email"),
            "bcc_email": notify.get("bcc_email"),
            "subject": notify.get("subject"),
            "body": notify.get("body")
        })

    def _updateQuestion(self, activity_id, question_id, question):
        q = "select count(*) as cnt from tbl_questions where activity_id = $activity_id and question_id = $question_id"
        exists = self.db.find_one(q, {
            "question_id": question_id,
            "activity_id": activity_id
        })
        if exists.get("cnt") == 0:
            q = "insert into tbl_questions (question_id, activity_id) values ($question_id, $activity_id)"
            self.db.query(q, {
                "question_id": question_id,
                "activity_id": activity_id
            })

        q = """
            update
                tbl_questions
            set
                question_text = $question_text,
                question_ref = $question_ref,
                question_type_id = $question_type_id,
                question_index = $question_index,
                position_top = $position_top,
                position_left = $position_left,
                data_link = $data_link,
                data_link_key = $data_link_key,
                question_options = $question_options,
                label_position_top = $label_position_top,
                label_position_left = $label_position_left
            where
                question_id = $question_id and
                activity_id = $activity_id
        """
        if not question.get("data_link"):
            question["data_link"] = "00000000-0000-0000-0000-000000000000"
        self.db.query(q, {
            "question_text": question.get("question_text"),
            "question_ref": question.get("question_ref"),
            "question_type_id": question.get("question_type_id"),
            "question_index": question.get("question_index"),
            "position_top": question.get("position_top"),
            "position_left": question.get("position_left"),
            "data_link": question.get("data_link"),
            "data_link_key": question.get("data_link_key"),
            "question_options": question.get("question_options"),
            "label_position_top": question.get("label_position_top"),
            "label_position_left": question.get("label_position_left"),
            "question_id": question_id,
            "activity_id": activity_id
        })


    def _updateActivity(self, workflow_id, activity_id, activity):
        if activity.get("type"):
            if activity.get("type") == "form":
                activity["activity_type_id"] = 1
            elif activity.get("type") == "notify":
                activity["activity_type_id"] = 2
            elif activity.get("type") == "role":
                activity["activity_type_id"] = 3
            elif activity.get("type") == "timer":
                activity["activity_type_id"] = 4
            elif activity.get("type") == "calc":
                activity["activity_type_id"] = 5
            elif activity.get("type") == "connect":
                activity["activity_type_id"] = 6
            elif activity.get("type") == "api":
                activity["activity_type_id"] = 7
            elif activity.get("type") == "payment":
                activity["activity_type_id"] = 8

        if not activity.get("single_run_id"):
            activity["single_run_id"] = 0

        q = """
            update
                tbl_activities
            set
                name = $name,
                activity_type_id = $activity_type_id,
                position_top = $position_top,
                position_left = $position_left,
                single_run_id = $single_run_id,
                button_text = $button_text
            where
                activity_id = $activity_id and
                workflow_id = $workflow_id
        """
        self.db.query(q, {
            "name": activity.get("name"),
            "activity_type_id": activity.get("activity_type_id"),
            "position_top": activity.get("position_top"),
            "position_left": activity.get("position_left"),
            "single_run_id": activity.get("single_run_id"),
            "button_text": activity.get("button_text"),
            "activity_id": activity_id,
            "workflow_id": workflow_id
        })



    def _insertActivity(self, workflow_id, activity_id):
        q = "insert into tbl_activities (activity_id, workflow_id) values ($activity_id, $workflow_id)"
        self.db.query(q, {
            "activity_id": activity_id,
            "workflow_id": workflow_id
        })



    def _updateWorkflowInfo(self, workflow):
        q = """
            update
                tbl_workflows
            set
                name = $name,
                description = $description,
                ts_modified = now(),
                initial_activity = $initial_activity
            where
                workflow_id = $workflow_id
        """
        self.db.query(q, {
            "name": workflow.get("name"),
            "description": workflow.get("description"),
            "initial_activity": workflow.get("initial_activity"),
            "workflow_id": workflow.get("workflow_id")
        })


    def _getFirstActivityId(self, connections):
        print("IN CONNS")

        print (connections)
        for conn in connections:
            print("CONNS")
            print (conn.get("from_id"))
            if conn.get("from_id") == "1" or conn.get("from_id") == "00000000-0000-0000-0000-000000000000" or conn.get("from_id") == "connector_1":
                return conn.get("to_id")
        return None

    def workflowExists(self, workflow_id):
        q = "select count(*) as cnt from tbl_workflows where workflow_id = $workflow_id"
        result = self.db.find_one(q, {"workflow_id": workflow_id})
        if result.get("cnt") > 0:
            return True
        else:
            return False


    def isWorkflowOwner(self, workflow_id, uid):
        q = "select owner_uid from tbl_workflows where workflow_id = $workflow_id"
        result = self.db.find_one(q, {"workflow_id": workflow_id})
        if not result:
            return False
        if result.get("owner_uid") == uid and uid != "":
            return True
        else:
            return False

    def setWorkflowRoles(self, uid, workflow_id, roles):
        q = "delete from tbl_workflow_roles where workflow_id = $workflow_id" # check permissions / ownership
        self.db.query(q, {"workflow_id": workflow_id})
        for role in roles:
            q = "insert into tbl_workflow_roles (workflow_id, role_id) values ($workflow_id, $role_id)"
            self.db.query(q, {"workflow_id": workflow_id, "role_id": role})
        return { "success": 1 }

    def _deleteUserActivity(self, uid, activity_id):
        tables = ['tbl_activity_api','tbl_activities','tbl_activity_api','tbl_activity_notifications','tbl_activity_payment','tbl_activity_roles','tbl_activity_timers','tbl_questions']
        for table in tables:
            q = "delete from "+table+" where activity_id = $activity_id" # check permissions / ownership
            self.db.query(q, {"activity_id": activity_id})
        q = "delete from tbl_activity_connections where target_activity_id = $activity_id" # check permissions / ownership
        self.db.query(q, {"activity_id": activity_id})
        return { "success": 1 }
        
    def deleteUserWorkflow(self, uid, workflow_id):
        q = "select activity_id from tbl_activities where workflow_id = $workflow_id"
        activities = self.db.find(q, {"workflow_id": workflow_id})
        for activity in activities:
            print("act ",activity['activity_id'])
            self._deleteUserActivity(uid,activity['activity_id'])
        q = "delete from tbl_workflows where workflow_id = $workflow_id" # check permissions / ownership
        self.db.query(q, {"workflow_id": workflow_id})
        return { "success": 1 }


    """
    def getWorkflowData(self, owner, workflow_id):
        wf = self.db.workflows.find_one({"_id": workflow_id})
        if wf.get("parent"):
            children = self.db.workflows.find({"parent": wf.get("parent")}, {"_id": 1})
            child_list = [wf.get("parent")]
            for row in children:
                child_list.append(row.get("_id"))
            return self.db.workflow_data.find({"workflowId": {"$in": child_list}}).sort("updateDate", 1)
        else:
            return self.db.workflow_data.find({"workflowId": workflow_id}).sort("updateDate", 1)
    """

