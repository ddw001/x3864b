from processpal import _workspaces
from processpal import _workflows
from processpal import _feedback
from processpal import _user
from ._db import db

class init:
    def __init__(self):
        self.db = db()
        pass

    def user(self):
        return _user.user(self)

    def workspaces(self):
        return _workspaces.workspaces(self)

    def workflows(self):
        return _workflows.workflows(self)

    def feedback(self):
        return _feedback.feedback(self)


