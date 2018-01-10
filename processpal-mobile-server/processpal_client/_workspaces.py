from ._rest import rest

class workspaces:
    config = None
    def __init__(self, parent):
        self.config = parent.config
        pass

    def getWorkspaces(self, uname, token):
        print ("In getWorkspaces")
        return rest(uname, token).get("user/workspaces")

    def getWorkspace(self, uname, token, id):
        print ("In getWorkspace")
        return rest(uname, token).get("user/workspace", {"id": id})

    def createWorkspace(self, uname, token, name):
        print ("In createWorkspace")
        return rest(uname, token).post("user/workspace", {"name": name})
        
    def deleteWorkspace(self, uname, token, id):
        print ("In deleteWorkspace")
        return rest(uname, token).get("user/workspace/delete", {"id": id})
