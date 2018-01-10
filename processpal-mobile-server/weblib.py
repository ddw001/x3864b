import web
import simplejson


"""
TODO:
Move db config to global config file
"""


class db:
    def __init__(self):
        self.db = web.database(dbn='postgres', host='127.0.0.1', db='vans', user='postgres', pw='0rkaan')

    def getDB(self):
        return self.db

    def query(self, query, params = {}):
        return self.db.query(query, params)

    def toArray(self, query, params = {}):
        qres = self.db.query(query, params)
        result = []
        for row in qres:
            result.append(row)
        return result

class common:
    def __init__(self):
        self.db = db().getDB()

    def getRoles(self, uid):
        q = """
            select
                role_id,
                role_description
            from
                tbl_roles
            where
                group_id in (select group_id from tbl_user_groups where uid = $uid)
        """
        params = {"uid":uid}
        return self.db.query(q, params)

    def getUserGroups(self, uid):
        q = """
            select
                group_id,
                group_description
            from
                tbl_groups
            where
                group_id in (select group_id from tbl_user_groups where uid = $uid)
            order by
                group_id
        """
        params = {"uid":uid}
        return self.db.query(q, params)


class admin:
    def __init__(self):
        self.db = db().getDB()

    def getUserList(self):
        #q = "select uid, uname, first_name, last_name, user_status from tbl_user where user_status != 0"
        q = "select uid, uname, first_name, last_name, email, user_status from tbl_user"
        return db().toArray(q)

    def getUser(self, uid):
        q = "select uid, uname, first_name, last_name, email, user_status from tbl_user where uid = $uid"
        rows = db().toArray(q, {"uid":uid})

        if len(rows):
            return rows[0]
        else:
            return {}

    def getGroupList(self):
        q = """
            select
                group_id,
                group_description
            from
                tbl_groups
            order by
                group_description
        """
        return db().toArray(q)


    def getUserGroups(self, uid):
        q = """
            select
                g.group_id,
            from
                tbl_groups g
            join
                tbl_user_groups ug
            on
                ug.group_id = g.group_id and
                ug.uid = $uid
        """
        ugrows = db().toArray(q, {"uid":uid})

    def saveUser(self, args):
        if args.get("uid"):
            return self.updateUser(args)
        else:
            return self.createUser(args)

    def createUser(self, args):
        uname = args.get("uname")
        if uname == "":
            return simplejson.dumps({"success":0,"message":"Need a user name"})
        if self.unameExists(uname):
            return simplejson.dumps({"success":0,"message":"User name already exists"})
        q = """
            insert into tbl_user (
                uname,
                first_name,
                last_name,
                email,
                user_status
            ) values (
                $uname,
                $first_name,
                $last_name,
                $email,
                $user_status
            )
        """
        params = {
            "uname": args.uname,
            "first_name": args.first_name,
            "last_name": args.last_name,
            "email": args.email,
            "user_status": args.user_status
        }
        res = db().query(q, params)
        if res:
            return {"success":1}
        else:
            return {"success":0, "message":"Unable to save"}

    def unameExists(self, uname, uid=False):
        if uid:
            q = "select count(*) as cnt from tbl_user where uname = $uname and uid != $uid"
        else:
            q = "select count(*) as cnt from tbl_user where uname = $uname"
        res = db().toArray(q, {"uname": uname, "uid": uid})
        if len(res) and res[0].cnt > 0:
            return True
        else:
            return False

    def updateUser(self, args):
        uid = args.get("uid")
        uname = args.get("uname")
        if uname == "":
            return simplejson.dumps({"success":0,"message":"Need a user name"})
        if self.unameExists(uname, uid):
            return simplejson.dumps({"success":0,"message":"User name already exists"})
        q = """
            update tbl_user set
                uname = $uname,
                first_name = $first_name,
                last_name = $last_name,
                email = $email,
                user_status = $user_status
            where
                uid = $uid
        """
        params = {
            "uname":uname,
            "first_name":args.get("first_name"),
            "last_name":args.get("last_name"),
            "email":args.get("email"),
            "user_status":args.get("user_status"),
            "uid": uid
        }
        res = db().query(q, params)
        if res:
            return {"success":1}
        else:
            return {"success":0, "message":"Unable to save"}

    # Vans functions
    # ----------------

