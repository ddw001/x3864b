import uuid
import processpal

class workspaces:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def createWorkspace(self, uid, name):
        workspace_id = str(uuid.uuid4())
        api_key = str(uuid.uuid4())
        secret_key = str(uuid.uuid4())

        q = """
            insert into tbl_workspaces (
                workspace_id,
                name,
                api_key,
                secret_key,
                owner_uid
            ) values (
                $workspace_id,
                $name,
                $api_key,
                $secret_key,
                $uid
            )
        """
        self.db.query(q, {
            "workspace_id": workspace_id,
            "name": name,
            "api_key": api_key,
            "secret_key": secret_key,
            "uid": uid
        })
        return { "success": 1 }

    def getWorkspaces(self, uid):
        q = """
            select distinct
                ws.workspace_id,
                ws.name,
                ws.thumbnail_url,
                ws.api_key,
                ws.secret_key
            from
                tbl_workspaces ws
            left join
                tbl_workflows wf
            on
                wf.workspace_id = ws.workspace_id
            left join
                tbl_workflow_roles wr
            on
                wr.workflow_id = wf.workflow_id
            left join
                tbl_user_roles ur
            on
                wr.role_id = ur.role_id
            where
                ws.owner_uid = $uid or
                ur.uid = $uid
        """

        #q = "select workspace_id, name, thumbnail_url from tbl_workspaces where owner_uid = $uid or uid in (select uid from tbl_)"
        return self.db.find(q, { "uid": uid })

    def deleteUserWorkspace(self, uid, workspace_id): # need to add api key / uid ?
        pp = processpal.init()
        wf = pp.workflows()
        q = "select workflow_id from tbl_workflows where workspace_id = $workspace_id"
        workflows = self.db.find(q, {"workspace_id": workspace_id})
        for workflow in workflows:
            print("wf ",workflow['workflow_id'])
            wf.deleteUserWorkflow(uid,workflow['workflow_id'])
        q = "delete from tbl_workspaces where workspace_id = $workspace_id" # check permissions / ownership
        self.db.query(q, {"workspace_id": workspace_id})
        return { "success": 1 }
        
    def getUserWorkspace(self, uid, workspace_id): # need to add api key / uid ?
        q = "select workspace_id, name, thumbnail_url from tbl_workspaces where workspace_id = $workspace_id"

        workspace = self.db.find_one(q, { "workspace_id": workspace_id, "uid": uid })

        print(workspace)
        if workspace:
            q = "select * from tbl_workflows where workspace_id = $workspace_id"
            workflows = self.db.find(q, {"workspace_id": workspace_id})
            workspace["workflows"] = workflows
            return workspace
        else:
            return {}



