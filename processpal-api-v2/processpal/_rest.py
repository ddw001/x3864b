import simplejson
#import human_curl as requests
import requests
#from requests.auth import HTTPDigestAuth
import os.path as path
from _config import config
import time

class rest:
    token_file = ".token"
    def __init__(self, username, password, is_live = False):
        self.config = config(username, password, is_live)

    def getToken(self):
        try:
            token_ts = path.getmtime(self.token_file)
        except:
            token_ts = False
        if not token_ts:
            return self.reloadToken()
        age = time.time() - token_ts
        if age > 60 * 25:
            return self.reloadToken()
        fh = open(self.token_file, "r")
        token = fh.read()
        fh.close()
        self.touch(self.token_file)
        return token

    def reloadToken(self):
        resp = self.getTokenFromAPI(self.config.getUsername(), self.config.getPassword())
        token = False
        if resp.get("data", False) != False:
            token = resp.get("data")
            fh = open(".token", "wb")
            fh.write(token)
            fh.close()
        return token

    def getTokenFromAPI(self, username, password):
        fullpath = "%s%s" % (self.config.getAPIUrl(), "auth/session")
        params = {
            "username": username,
            "password": password,
            "merchantId": "BLUE"
        }
        response = requests.post(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(""), verify=self.config.verify_ssl)
        return self.parseResponse(response)


    def get(self, path):
        token = self.getToken()
        fullpath = "%s%s" % (self.config.getAPIUrl(), path)
        response = requests.get(fullpath, headers=self.config.getAPIHeaders(token), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def delete(self, path, params={}):
        token = self.getToken()
        fullpath = "%s%s" % (self.config.getAPIUrl(), path)
        response = requests.delete(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(token), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def post(self, path, params={}):
        token = self.getToken()
        fullpath = "%s%s" % (self.config.getAPIUrl(), path)
        response = requests.post(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(token), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def put(self, path, params={}):
        token = self.getToken()
        fullpath = "%s%s" % (self.config.getAPIUrl(), path)
        response = requests.put(fullpath, data=simplejson.dumps(params), headers=self.config.getAPIHeaders(token), verify=self.config.verify_ssl)
        return self.parseResponse(response)

    def parseResponse(self, response):
        try:
            return response.json()
        except:
            try:
                return simplejson.loads(response.content)
            except:
                print response.content
                return {}
    def touch(self, fname):
        try:
            os.utime(fname, None)
        except:
            open(fname, 'a').close()
