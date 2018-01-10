#!/usr/bin/env python3


#TODO:
#everything...

import sys
import web
import simplejson
import weblib
import processpal_client as processpal

debug_on = True
upload_path = "/tmp/"
urls = (
    '/', 'index',
    '/device', 'device',
    '/login', 'login',
    '/change_password', 'changePassword',
    '/otp', 'otp',
    '/files', 'files',
    '/workspaces', 'workspaces',
    '/roles', 'roles',
    '/workflow/roles', 'workflow_roles',
    '/role', 'role',
    '/role/members', 'role_members',
    '/role/delete', 'delete_role',
    '/role/invite', 'role_invite',
    '/data_set', 'data_set',
    '/data_set_column', 'data_set_column',
    '/data_upload', 'data_upload',
    '/create_data_set', 'create_data_set',
    '/data_sets', 'data_sets',
    '/workspace', 'workspace',
    '/delete/workspace', 'delete_workspace',
    '/workflow', 'workflow',
    '/update/workflow', 'update_workflow',
    '/delete/workflow', 'delete_workflow',
    '/activity/feedback', 'activity_feedback',
    '/feedback', 'feedback',
    '/userLinkLogins', 'userLinkLogins',
)


#  need to proxy mobile login to API



#-- server and session setup
class logStream(object):

    def write(self, data):
        fh = open("/tmp/ppws.txt", "a")
        fh.write(data)
        fh.close()

    def flush(self):
        pass

if debug_on:
    sys.stdout = logStream()

web.config.debug = True
render = web.template.render('templates/', base='layout', cache=False)
render_body = web.template.render('templates/', cache=False)
app = web.application(urls, globals(), autoreload=False)
session_timeout = 6000



if web.config.get('_session') is None:
    sess_init = {'last_active':0,'is_logged_in':False}
    session = web.session.Session(app,web.session.DiskStore('/tmp/sessions'),initializer=sess_init)
    web.config._session = session
else:
    session = web.config._session
#-- end server and session setup


class base:
    token = None
    uname = None
    def __init__(self):
        web.header('Content-Type', 'application/json')
        web.header('Access-Control-Allow-Origin',      '*')
        web.header('Access-Control-Allow-Credentials', 'true')
        web.header("Access-Control-Allow-Headers", "Content-Type, X-ProcessPal-User, X-ProcessPal-Token, X-ProcessPal-Analytics, x-requested-with");
        self.token = web.ctx.env.get('HTTP_X_PROCESSPAL_TOKEN')
        self.uname = web.ctx.env.get('HTTP_X_PROCESSPAL_USER')


class otp(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.sendOTP(inp.get("uname"))
        return simplejson.dumps(result, default=str)


    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.validateOTP(inp.get("uid"), inp.get("otp"))
        return simplejson.dumps(result, default=str)

class userLinkLogins(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.userLinkLogins(inp.get("uid"), inp.get("link_uid"), inp.get("otp"))
        return simplejson.dumps(result, default=str)

class login(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        #web.ctx.env.get('HTTP_X_REQUESTED_WITH')
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.login(inp.get("uname"), inp.get("pword"))
        return simplejson.dumps(result, default=str)
        
class changePassword(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        #web.ctx.env.get('HTTP_X_REQUESTED_WITH')
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.changePassword(inp.get("uname"), inp.get("new_pword"), inp.get("old_pword"))
        return simplejson.dumps(result, default=str)


class activity_feedback(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        fb = pp.feedback()
        result = fb.getActivityRun(self.uname, self.token, inp.get("activity_id"))
        return simplejson.dumps(result, default=str)



class feedback(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        fb = pp.feedback()
        result = fb.save(self.uname, self.token, simplejson.loads(inp.get("payload")))
        return simplejson.dumps(result, default=str)

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        fb = pp.feedback()
        if inp.get("workflow_id"):
            result = fb.getWorkflowFeedback(self.uname, self.token, inp.get("workflow_id"))
        elif inp.get("run_id"):
            result = fb.getRun(self.uname, self.token, inp.get("run_id"))
        else:
            result = {"error":"incorrect parms"}
        return simplejson.dumps(result, default=str)


class data_sets(base):
    def OPTIONS(self):
        return ""

    def GET(self):

        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSets(self.uname, self.token)
        return simplejson.dumps(result, default=str)

class data_upload(base):
    def OPTIONS(self):
        return ""

    def POST(self):


        inp = web.input(data_file={})
        """
        web.debug(x['myfile'].filename) # This is the filename
        web.debug(x['myfile'].value) # This is the file contents
        web.debug(x['myfile'].file.read()) # Or use a file(-like) object
        raise web.seeother('/upload')
        """

        pp = processpal.init()
        usr = pp.user()
        result = usr.dataUpload(self.uname, self.token, inp.get("set_id"), inp["data_file"])
        return simplejson.dumps(result, default=str)




class create_data_set(base):
    def OPTIONS(self):
        return ""

    def POST(self):

        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.createDataSet(self.uname, self.token, inp.get("data_set_name"))
        return simplejson.dumps(result, default=str)



class role_invite(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.inviteRoleMember(self.uname, self.token, inp.get("role_id"), inp.get("member"))
        return simplejson.dumps(result, default=str)


class delete_role(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.deleteRole(self.uname, self.token, inp.get("role_id"))
        return simplejson.dumps(result, default=str)



class role(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.addRole(self.uname, self.token, inp.get("role_name"))
        return simplejson.dumps(result, default=str)


class data_set_column(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSetColumn(self.uname, self.token, inp.get("set_id"), inp.get("data_link_key"), inp.get("rows"))
        return simplejson.dumps(result, default=str)



class data_set(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSet(self.uname, self.token, inp.get("set_id"), inp.get("offset"), inp.get("limit"))
        return simplejson.dumps(result, default=str)


class role_members(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        usr = pp.user()
        result = usr.getRoleMembers(self.uname, self.token, inp.get("role_id"))
        return simplejson.dumps(result, default=str)


class roles(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        pp = processpal.init()
        usr = pp.user()
        result = usr.getRoles(self.uname, self.token)
        return simplejson.dumps(result, default=str)

class workspaces(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        pp = processpal.init()
        ws = pp.workspaces()
        result = ws.getWorkspaces(self.uname, self.token)
        return simplejson.dumps(result, default=str)

class workspace(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        pp = processpal.init()
        ws = pp.workspaces()
        result = ws.getWorkspace(self.uname, self.token, inp.get("id"))
        return simplejson.dumps(result, default=str)


    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        ws = pp.workspaces()
        result = ws.createWorkspace(self.uname, self.token, inp.get("name"))
        return simplejson.dumps(result, default=str)


class workflow_roles(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        ws = pp.workflows()
        result = ws.setWorkflowRoles(self.uname, self.token, inp.get("workflow_id"), inp.get("roles"))
        return simplejson.dumps(result, default=str)




class update_workflow(base):
    def OPTIONS(self):
        return ""

    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        ws = pp.workflows()
        result = ws.updateWorkflow(self.uname, self.token, inp.get("workflow"))
        return simplejson.dumps(result, default=str)
        
class delete_workspace(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        ws = pp.workspaces()
        result = ws.deleteWorkspace(self.uname, self.token, inp.get("workspace"))
        return simplejson.dumps(result, default=str)



class workflow(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        pp = processpal.init()
        ws = pp.workflows()
        result = ws.getWorkflow(self.uname, self.token, inp.get("id"))
        return simplejson.dumps(result, default=str)


    def POST(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        ws = pp.workflows()
        result = ws.createWorkflow(self.uname, self.token, inp.get("workspace_id"), inp.get("name"))
        return simplejson.dumps(result, default=str)

class delete_workflow(base):
    def OPTIONS(self):
        return ""

    def GET(self):
        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        wf = pp.workflows()
        result = wf.deleteWorkflow(self.uname, self.token, inp.get("workflow"))
        return simplejson.dumps(result, default=str)

class index(base):
    def GET(self):
        return "hello :)"
        #return session.get("last_active", "bah")

"""
class files:
    def GET(self):
        inp = web.input()
        ac = inp.get("ac")
        if not ac:
            return ""
        lib = vanslib_mobile.files()
        if ac == "get":
            return lib.getFile(inp)

        web.header('Content-Type', 'application/json')
        if ac == "get_file_list":
            return simplejson.dumps(lib.getFileList(inp))
        else:
            return ""
"""

def notfound():
    return web.notfound("Sorry, the page you were looking for was not found.")

def isValidToken(inp):
    uname = inp.get("uname")
    token = inp.get("token")
    if not uname or not token:
        return False
    params = {"uname":uname, "token":token}
    results = weblib.db().query("select muid from tbl_mobile_user where uname = $uname and session_token = $token", params)
    if len(results):
        return True
    else:
        return False



if __name__ == "__main__":
    app.notfound = notfound
    app.run()

