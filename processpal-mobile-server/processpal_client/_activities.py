
class activities:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def getActivities(self, owner, workflow_id):
        print ({"workflow": workflow_id, "owner": owner})
        return self.db.activities.find({"workflow": workflow_id, "owner": owner}, {'_id': 1, 'name': 1, 'activityType': 1, 'buttonText': 1, 'connections': 1})


