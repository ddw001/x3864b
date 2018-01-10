#!/usr/bin/env python3

import sys
import web
import simplejson
import processpal
import base64
import re

debug_on = True
urls = (
    '/', 'index',
    '/workspace', 'workspace',
    '/workflows', 'workflows',
    '/workflow/user/role', 'addWorkflowUserRole',
    '/feedback', 'feedback',
    '/feedback/(.*)', 'feedback',
    #'/activities/(.*)', 'activities',
    '/activity', 'activity',
    '/role', 'role',
    '/question', 'question',
    '/workflow/(.*)', 'workflow',
    '/workflow', 'workflow',
    '/data/(.*)', 'data',
    #'/questions/(.*)', 'questions',


    '/user/activity/feedback', 'userActivityFeedback',
    '/user/feedback', 'userFeedback',
    '/user/feedback_run', 'userFeedbackRun',
    '/user/data_sets', 'userDataSets',
    '/user/data_set', 'userDataSet',
    '/user/data_set_column', 'userDataSetColumn',
    '/user/data', 'userDataSet',
    '/user/roles', 'userRoles',
    '/user/role', 'userRole',
    '/user/role/members', 'userRoleMembers',
    '/user/role/delete', 'userRoleDelete',
    '/user/role/invite', 'userRoleInvite',
    '/user/data/create', 'createDataSet',
    '/user/workspaces', 'userWorkspaces',
    '/user/workspace', 'userWorkspace',
    '/user/workspace/delete', 'userWorkspaceDelete',
    '/user/workflow', 'userWorkflow',
    '/user/workflow/roles', 'userWorkflowRoles',
    '/user/workflow/delete', 'userWorkflowDelete',
    '/user/update/workflow', 'userUpdateWorkflow',
    '/user/login', 'login',
    '/user/change_password', 'changePassword',
    '/user/otp', 'otp',
    '/user/userLinkLogins', 'userLinkLogins',
)


#web.config.smtp_starttls = True
#-- server and session setup
class logStream(object):
    def write(self, data):
        fh = open("/tmp/pp-api.txt", "a")
        fh.write(data)
        fh.close()

if debug_on:
    sys.stdout = logStream()

web.config.debug = debug_on

app = web.application(urls, globals(), autoreload=True)


class base:
    def __init__(self):
        web.header('Content-Type', 'application/json')
        web.header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
        web.header('Access-Control-Allow-Credentials', 'true')
        web.header('Access-Control-Allow-Headers',      'Origin, X-Requested-With, Content-Type, Accept, x-processpal-analytics,x-processpal-token,x-processpal-user,*')      

# Renders homepage:
class index:
    def GET(self):
        web.header('Content-Type', 'application/json')
        return simplejson.dumps({"success":1, "message":"v2 :)"})

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
        print(web.data())
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.validateOTP(inp.get("uid"), inp.get("otp"))
        return simplejson.dumps(result, default=str)

class userLinkLogins(base):

    def POST(self):
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        otp_result = usr.validateOTP(inp.get("link_uid"), inp.get("otp"))
        if 'success' in otp_result:
            result = usr.linkLogins(inp.get("uid"), inp.get("link_uid"))
            return simplejson.dumps(result, default=str)
        else:
            return simplejson.dumps(otp_result, default=str)


class login(base):

    def POST(self):
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.login(inp["uname"], inp["pword"])
        return simplejson.dumps(result, default=str)
        
class changePassword():

    def POST(self):
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.changePassword(inp["uname"], inp["new_pword"], inp["old_pword"])
        return simplejson.dumps(result, default=str)



class feedback(base):
    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()
        if not inp:
            inp = simplejson.loads(web.data())

        pp = processpal.init()
        fb = pp.feedback()
        result = fb.save(inp)
        return simplejson.dumps(result, default=str)

    def GET(self, workflow_id):
        web.header('Content-Type', 'application/json')
        print("Workflow id ",workflow_id)
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        #    inp = simplejson.loads(web.data())
        
        pp = processpal.init()
        fb = pp.feedback()
        results = fb.getFeedback(uid, workflow_id)
        return simplejson.dumps(results, default=str)




class data(base):
    def GET(self, workflow_id):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        wf_cur = wf.getWorkflowData(workspace.get("owner_uid"), workflow_id)
        results = []
        for row in wf_cur:
            results.append(row.get("data"))
        return simplejson.dumps(results, default=str)

class activities(base):
    def GET(self, workflow_id):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        act = pp.activities()
        wf_cur = act.getActivities(workspace.get("owner_uid"), workflow_id)
        results = []
        for row in wf_cur:
            results.append(row)
        return simplejson.dumps(results, default=str)

class role(base):

    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        inp = simplejson.loads(web.data())
        row = wf.saveRole(workspace.get("owner_uid"), inp)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)



class activity(base):
    def GET(self, workflow_id):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        act = pp.activities()
        wf_cur = act.getActivities(workspace.get("owner_uid"), workflow_id)
        results = []
        for row in wf_cur:
            results.append(row)
        return simplejson.dumps(results, default=str)

    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        inp = simplejson.loads(web.data())
        row = wf.saveActivity(workspace.get("owner_uid"), inp)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)


class question(base):

    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        inp = simplejson.loads(web.data())
        row = wf.saveQuestion(workspace.get("owner_uid"), inp)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)




class questions(base):
    def GET(self, activity_id):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        ques = pp.questions()
        wf_cur = ques.getQuestions(workspace.get("owner_uid"), activity_id)
        results = []
        for row in wf_cur:
            results.append(row)
        return simplejson.dumps(results, default=str)


class userRoleInvite(base):

    def OPTIONS(self):
        return ""

    def POST(self):

        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.inviteRoleMember(uid, inp.get("role_id"), inp.get("member"))
        return simplejson.dumps(result, default=str)

class userDataSetColumn(base):
    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()

        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSetColumn(uid, inp.get("set_id"), inp.get("data_link_key"), inp.get("rows"))
        return simplejson.dumps(result, default=str)

class userDataSet(base):
    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()

        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSet(uid, inp.get("set_id"), inp.get("offset"), inp.get("limit"))
        return simplejson.dumps(result, default=str)

    def POST(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.updateData(uid, inp.get("set_id"), inp.get("rows"))
        return simplejson.dumps(result, default=str)




class userDataSets(base):
    def OPTIONS(self):
            return ""
            
    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})


        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSets(uid)
        return simplejson.dumps(result, default=str)
        
    def POST(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})


        pp = processpal.init()
        usr = pp.user()
        result = usr.getDataSets(uid)
        return simplejson.dumps(result, default=str)




class createDataSet(base):

    def OPTIONS(self):
        return ""

    def POST(self):

        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.createDataSet(uid, inp.get("data_set_name"))
        return simplejson.dumps(result, default=str)


class userRoleDelete(base):

    def OPTIONS(self):
        return ""

    def POST(self):

        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.deleteRole(uid, inp.get("role_id"))
        return simplejson.dumps(result, default=str)

class userRole(base):

    def OPTIONS(self):
        return ""

    def POST(self):

        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        usr = pp.user()
        result = usr.createRole(uid, inp.get("role_name"))
        return simplejson.dumps(result, default=str)


class userRoleMembers(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()
        pp = processpal.init()
        usr = pp.user()
        res = usr.getRoleMembers(uid, inp.get("role_id"))
        #row = wf_cur.next()
        return simplejson.dumps(res, default=str)



class userRoles(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        usr = pp.user()
        res = usr.getRoles(uid)
        #row = wf_cur.next()
        return simplejson.dumps(res, default=str)


class userWorkspaces(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        ws = pp.workspaces()
        row = ws.getWorkspaces(uid)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)


class userWorkspace(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})
        inp = web.input()
        pp = processpal.init()
        ws = pp.workspaces()

        # check if uid has access to workspace

        row = ws.getUserWorkspace(uid, inp.get("id"))
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)

    def POST(self):

        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        ws = pp.workspaces()
        result = ws.createWorkspace(uid, inp.get("name"))
        return simplejson.dumps(result, default=str)
        
class userWorkspaceDelete(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})
        inp = web.input()
        pp = processpal.init()
        ws = pp.workspaces()

        # check if uid has access to workspace

        row = ws.deleteUserWorkspace(uid, inp.get("id"))
        
        return simplejson.dumps(row, default=str)


class userWorkflowRoles(base):

    def OPTIONS(self):
        return ""


    def POST(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        wf = pp.workflows()
        try:
            roles = simplejson.loads(inp.get("roles"))
        except:
            print("Could not load roles")
            roles = []
        result = wf.setWorkflowRoles(uid, inp.get("workflow_id"), roles)
        return simplejson.dumps(result, default=str)




class userWorkflow(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})
        inp = web.input()
        pp = processpal.init()
        ws = pp.workflows()

        # check if uid has access to workspace

        row = ws.getWorkflow(uid, inp.get("id"))
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)


    def POST(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        wf = pp.workflows()
        result = wf.createWorkflow(uid, inp.get("workspace_id"), inp.get("name"))
        return simplejson.dumps(result, default=str)

class userWorkflowDelete(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})
        inp = web.input()
        pp = processpal.init()
        wf = pp.workflows()

        # check if uid has access to workspace

        row = wf.deleteUserWorkflow(uid, inp.get("id"))
        
        return simplejson.dumps(row, default=str)
        
class userUpdateWorkflow(base):

    def OPTIONS(self):
        return ""

    def POST(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        inp = simplejson.loads(web.data())
        pp = processpal.init()
        wf = pp.workflows()
        wf_payload = simplejson.loads(inp.get("workflow"))
        result = wf.updateWorkflow(uid, wf_payload)
        return simplejson.dumps(result, default=str)


class userFeedback(base):
    def POST(self):


        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        #inp = web.input()
        #if not inp:
        inp = simplejson.loads(web.data())
        inp["owner"] = uid
        pp = processpal.init()
        fb = pp.feedback()
        result = fb.save(inp)
        return simplejson.dumps(result, default=str)

class userActivityFeedback(base):

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()
        pp = processpal.init()
        fb = pp.feedback()
        row = fb.getActivityRun(uid, inp.get("activity_id"))
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)


class userFeedbackRun(base):

    def GET(self):
        uid = user_auth()
        if not uid:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        inp = web.input()
        pp = processpal.init()
        fb = pp.feedback()
        row = fb.getRun(uid, inp.get("run_id"))
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)


class workspace(base):

    def OPTIONS(self):
        return ""

    def GET(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        ws = pp.workspaces()
        row = ws.getWorkspace(workspace.get("_id"))
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)




class addWorkflowUserRole(base):
    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        inp = simplejson.loads(web.data())

        email = inp.get("email")
        workflow_id = inp.get("workflow_id")
        role_name = inp.get("role_name")
        role_id = inp.get("role_id")

        row = wf.addWorkflowUserRole(workspace.get("owner_uid"), workflow_id, email, role_name, role_id)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)



class workflow(base):
    def GET(self, workflow_id):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        print ("GOT")
        print (workspace)
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        workflow = wf.getWorkflow(workspace.get("owner_uid"), workflow_id)
        if workflow:
            workflow["id"] = workflow.get("workspace_id")
        print ("workflow...")
        print (workflow)
        return simplejson.dumps(workflow, default=str)

    def POST(self):
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})

        pp = processpal.init()
        wf = pp.workflows()
        inp = web.input()
        print ("1st")
        print (inp)

        inp = simplejson.loads(web.data())
        print ("2nd")
        print (inp)
        row = wf.saveWorkflow(workspace.get("owner_uid"), workspace.get("workspace_id"), inp)
        #row = wf_cur.next()
        return simplejson.dumps(row, default=str)



class workflows(base):
    def GET(self):
        web.header('Content-Type', 'application/json')
        workspace = workspace_auth()
        if not workspace:
            return simplejson.dumps({"code": 1, "error":"Invalid credentials"})
        print ("YOU ARE IN")
        pp = processpal.init()
        wf = pp.workflows()
        rows = wf.getWorkflows(workspace.get("owner_uid"), workspace.get("workspace_id"))
        print(rows)
        return simplejson.dumps(rows, default=str)



def notfound():
    return web.notfound("Sorry, the page you were looking for was not found.")

def user_auth():
    auth = web.ctx.env.get('HTTP_AUTHORIZATION')
    if auth:
        auth = re.sub('^Basic ','',auth).encode('ascii')
        try:
            uid, token = str(base64.decodestring(auth)).split(':')
            pp = processpal.init()
            uid = uid.replace("b'", "")
            token = token.replace("b'", "")
            token = token.replace("'", "")
            return pp.user().authUser(uid, token)
        except Exception as e:
            print (e)
            return None
        #db = bluemarket.db
        #rows = db().toArray("select provider_id, uname, pword from tbl_providers where uname = $username and pword = $password", {
        #    "username":username,
        #    "password":password
        #})
        #if rows and len(rows) > 0:
        #    return rows[0].provider_id
    return None



def workspace_auth():
    #auth = web.ctx.env.get('ProcessPalToken')
    auth = web.ctx.env.get('HTTP_AUTHORIZATION')
    if auth:
        auth = re.sub('^Basic ','',auth).encode('ascii')
        try:
            api_key, secret = str(base64.decodestring(auth)).split(':')
            api_key = api_key.replace("b'", "")
            secret = secret.replace("b'", "")
            secret = secret.replace("'", "")
            pp = processpal.init()
            owner = pp.user().getAPIWorkspaceOwner(api_key, secret)
            return owner
        except Exception as e:
            print(e)
            return None
        #db = bluemarket.db
        #rows = db().toArray("select provider_id, uname, pword from tbl_providers where uname = $username and pword = $password", {
        #    "username":username,
        #    "password":password
        #})
        #if rows and len(rows) > 0:
        #    return rows[0].provider_id
    return None

if __name__ == "__main__":
    app.notfound = notfound
    app.run()

