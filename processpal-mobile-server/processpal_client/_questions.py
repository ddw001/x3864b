
class questions:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def getQuestions(self, owner, activity_id):
        return self.db.questions.find({"activityId": activity_id, "owner": owner})


