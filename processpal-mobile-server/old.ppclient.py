import os
import web
import re
import simplejson
import requests
import mimetypes
import uuid
import subprocess
import random
import smtplib
from HtmlMail import HtmlMail

# Add validation etc etc...


class user:
    def login(self, uname, pword):
        pass

class device:
    def getToken(self, args): # for internal staff on iPad app
        uname = args.get("uname")
        pword = args.get("pword")
        if not pword or not uname:
            return {"success":0, "message":"Please supply username and password"}
        q = """
            select
                muid
            from
                tbl_mobile_user
            where
                uname = $uname and
                pword = md5($pword)
        """
        res = db().toArray(q, {"uname":uname, "pword":pword})
        if not len(res):
            return {"success":0, "message":"Invalid username or password"}
        token = str(uuid.uuid4())
        q = "update tbl_mobile_user set session_token = $token where muid = $muid"
        db().query(q, {"token":token, "muid":res[0].muid})
        return {"success":1, "token":token}

    def loginUser(self, args): # for public users
        phone_num = args.get("phone_num")
        password = args.get("password")
        q = """
            select
                uid
            from
                tbl_public_users
            where
                phone_num = $phone_num and
                password = $password
        """
        res = db().toArray(q, {"phone_num":phone_num, "password":password})
        if not len(res):
            return {"success":0, "message":"Invalid username or password"}
        token = str(uuid.uuid4())
        q = "update tbl_public_users set token = $token where uid = $uid"
        db().query(q, {"token":token, "uid":res[0].uid})
        return {"success":1, "token":token}

    def resendPin(self, args):
        phone_num = args.get("phone_num")
        q = "select password from tbl_public_users where phone_num = $phone_num"
        res = db().toArray(q, {"phone_num":phone_num})
        if not len(res):
            return {"success":0, "message":"Invalid username"}

        message = "Your Vans Mobile password is %s" % res[0].password
        subprocess.check_call(["/usr/local/bin/send_sms.py", phone_num, message, "88"])
        return {"success":1}


    def registerUser(self, args):
        phone_num = args.get("phone_num")
        first_name = args.get("first_name")
        last_name = args.get("last_name")
        email = args.get("email")
        q = "select count(uid) as cnt from tbl_public_users where phone_num = $phone_num"
        res = db().toArray(q, {"phone_num":phone_num})
        if res[0].cnt > 0:
            return {"success":0, "message":"You are already registered"}
        password = random.randrange(10000, 99999)
        q = """
            insert into tbl_public_users (
                first_name,
                last_name,
                email,
                phone_num,
                password
            ) values (
                $first_name,
                $last_name,
                $email,
                $phone_num,
                $password
            )
        """
        db().query(q, {"first_name":first_name, "last_name":last_name, "phone_num":phone_num, "email":email, "password":password})
        message = "Your Vans Mobile password is %s" % password
        subprocess.check_call(["/usr/local/bin/send_sms.py", phone_num, message, "88"])

        return {"success":1, "message":"You have been successfully registered"}

    def registerAndroid(self, args):
        android_id = args.get("android_id")
        if not android_id:
            return {"success":0, "message":"No android ID"}
        android_id = android_id.replace(" ", "")
        android_id = android_id.replace("<", "")
        android_id = android_id.replace(">", "")
        q = "select rec_id from tbl_device_ids where android_device_id = $android_id"
        res = db().toArray(q, {"android_id":android_id})
        if not len(res):
            q = "insert into tbl_device_ids (android_device_id) values ($android_id)"
            db().query(q, {"android_id":android_id})
        return {"success":1}



    def registerIOS(self, args):
        ios_id = args.get("ios_id")
        if not ios_id:
            return {"success":0, "message":"No iOS ID"}
        ios_id = ios_id.replace(" ", "")
        ios_id = ios_id.replace("<", "")
        ios_id = ios_id.replace(">", "")
        q = "select rec_id from tbl_device_ids where ios_device_id = $ios_id"
        res = db().toArray(q, {"ios_id":ios_id})
        if not len(res):
            q = "insert into tbl_device_ids (ios_device_id) values ($ios_id)"
            db().query(q, {"ios_id":ios_id})
        return {"success":1}



class files:
    def getFile(self, args):
        # add validation to see if current user has permissions to view this file
        file_id = args.get("f")
        if not file_id:
            return "No file"
        q = "select * from tbl_files where file_id = $file_id"
        res = db().toArray(q, {"file_id":file_id})
        if len(res) == 0:
            return "Invalid file"
        file_row = res[0]
        if not os.path.isfile(file_row.file_location):
            return "File does not exist"
        mimetypes.init()
        try:
            ext = file_row.file_name.split(".")[-1].lower()
            mtype = mimetypes.types_map["."+ext]
        except:
            return "Invalid mime type"
        web.header('Content-Type', mtype)
        web.header('Transfer-Encoding','chunked')
        web.header('Content-Disposition', 'inline; filename="'+file_row.file_name+'"')
        return self.readFile(file_row.file_location)

    def readFile(self, file_location):
        fh = open(file_location, "r")
        while True:
            buff = fh.read(10240)
            if not buff:
                break
            yield buff
        fh.close()



    def getFileList(self, args):
        # add validation to see if current user has permissions to view files
        lot_id = args.get("lot_id")
        if not lot_id:
            return {"success":0, "message":"No lot id"}
        q = """
            select
                f.file_id,
                f.file_name,
                f.file_cat_id,
                fc.file_cat_description
            from
                tbl_files f
            left join
                tbl_file_categories fc
            on
                f.file_cat_id = fc.file_cat_id
            where
                f.lot_id = $lot_id
        """
        rows = db().toArray(q, {"lot_id":lot_id})
        return rows


