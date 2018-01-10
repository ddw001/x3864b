import simplejson
import requests
import os.path as path
from ._config import config
import time

class rest:
    #token_file = ".token"
    #def __init__(self, username, password, is_live = False):
    #    self.config = config(username, password, is_live)
    token = None
    uname = None

    def __init__(self, uname = None, token = None, is_live = False):
        self.uname = uname
        self.token = token
        self.config = config(uname, token, is_live)


    def get(self, path, args = {}):
        http_auth = None
        if self.uname and self.token:
            http_auth = (self.uname, self.token)
        fullpath = "%s/%s" % (self.config.getAPIUrl(), path)
        print ("GET FULLPATH")
        print(fullpath)
        response = requests.get(fullpath, headers=self.config.getAPIHeaders(), verify=self.config.verify_ssl, auth=http_auth, params=args)
        return self.parseResponse(response)

    def delete(self, path, params={}):
        token = self.getToken()
        fullpath = "%s/%s" % (self.config.getAPIUrl(), path)
        response = requests.delete(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def post(self, path, params={}):
        http_auth = None
        if self.uname and self.token:
            http_auth = (self.uname, self.token)

        fullpath = "%s/%s" % (self.config.getAPIUrl(), path)
        print ("POST FULLPATH")
        print(fullpath)
        response = requests.post(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(), verify=self.config.verify_ssl, auth=http_auth)
        return self.parseResponse(response)

    def put(self, path, params={}):
        token = self.getToken()
        fullpath = "%s/%s" % (self.config.getAPIUrl(), path)
        response = requests.put(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def parseResponse(self, response):
        try:
            return response.json()
        except:
            try:
                return simplejson.loads(response.content)
            except:
                print (response.content)
                return {}

