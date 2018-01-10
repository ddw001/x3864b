from ._rest import rest

class workflows:
    config = None
    def __init__(self, parent):
        self.config = parent.config
        pass

    def getWorkflow(self, uname, token, workflow_id):
        print ("In getWorkflow")
        return rest(uname, token).get("user/workflow", { "id": workflow_id })

    def createWorkflow(self, uname, token, workspace_id, name):
        print ("In createWorkflow")
        return rest(uname, token).post("user/workflow", {"workspace_id": workspace_id, "name": name})

    def updateWorkflow(self, uname, token, wf_payload):
        print ("In updateWorkflow")
        return rest(uname, token).post("user/update/workflow", {"workflow": wf_payload})

    def setWorkflowRoles(self, uname, token, workflow_id, roles):
        print ("In updateWorkflow")
        return rest(uname, token).post("user/workflow/roles", {"workflow_id": workflow_id, "roles": roles})

    def deleteWorkflow(self, uname, token, id):
        print ("In deleteWorkflow")
        return rest(uname, token).get("user/workflow/delete", {"id": id})