from ._rest import rest

class feedback():
    def __init__(self, parent):
        pass

    def save(self, uname, token, payload):
        print ("in Save")
        return rest(uname, token).post("user/feedback", payload)

    def getActivityRun(self, uname, token, activity_id):
        print ("in GET")
        return rest(uname, token).get("user/activity/feedback", {"activity_id": activity_id})

    def getRun(self, uname, token, run_id):
        print ("in GET")
        return rest(uname, token).get("user/feedback_run", {"run_id": run_id})
        
    def getWorkflowFeedback(self, uname, token, workflow_id):
        print ("in GET")
        return rest(uname, token).get("feedback/"+str(workflow_id), {"workflow_id": workflow_id})
