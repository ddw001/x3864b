
class config:
    dev_api_host = "http://localhost:8081"
    #dev_api_host = "http://api.processpal.io:7100/"
    live_api_host = "http://api.processpal.io:7100/"
    uname = ""
    token = ""
    verify_ssl = False
    is_live = False
    def __init__(self, uname = None, token = None, is_live = False):
        self.uname = uname
        self.token = token
        self.is_live = is_live


    def getAPIUrl(self): # not sure if provider id defines live/dev
        if self.is_live:
            return self.live_api_host
        else:
            return self.dev_api_host
            #return "http://localhost:8181"

    def getAuth(self):
        return (self.uname, self.token)

    def getAPIHeaders(self):
        return {'content-type': 'application/json'}

