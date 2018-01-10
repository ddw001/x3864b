from . import _workspaces
from . import _workflows
from . import _feedback
from . import _user
from ._config import config

class init:
    def __init__(self):
        self.config = config()
        pass

    def user(self):
        return _user.user(self)

    def workspaces(self):
        return _workspaces.workspaces(self)

    def workflows(self):
        return _workflows.workflows(self)

    def feedback(self):
        return _feedback.feedback(self)


