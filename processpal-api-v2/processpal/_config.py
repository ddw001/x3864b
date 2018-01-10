
dbhost = "localhost"
dbname = "processpal"
dbuser = "postgres"
dbpassword = "lapp"


"""
class config:

    username = ""
    password = ""
    verify_ssl = False
    is_live = False
    def __init__(self, username = "", password = "", is_live = False):
        if username:
            self.setProviderId(username)
        if password:
            self.setApiKey(password)
        self.is_live = is_live

    def getUsername(self):
        return self.username

    def getPassword(self):
        return self.password

    def setApiKey(self, password):
        self.password = password

    def setProviderId(self, username):
        self.username = username

    def setLive(self, is_live):
        self.is_live = is_live

    def getAPIUrl(self): # not sure if provider id defines live/dev
        if self.is_live:
            return "http://sandbox.ecs24.co.za/api/"
        else:
            return "http://sandbox.ecs24.co.za/api/"
            #return "http://localhost:8181"

    def getAuth(self):
        return (self.username, self.password)

    def getAPIHeaders(self, token):
        print {'content-type': 'application/json', 'Accept': 'application/json;v=1.34', 'Authorization': token}
        return {'content-type': 'application/json', 'Accept': 'application/json;v=1.34', 'Authorization': token}
"""
