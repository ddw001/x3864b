import bcrypt
import hashlib
import uuid
import base64
import pyotp
from validate_email import validate_email
#import phonenumbers
from subprocess import call, run
from email.message import EmailMessage
from email.utils import make_msgid
#from smtplib import SMTP_SSL as SMTP
import smtplib
import simplejson

class user:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def getAPIWorkspaceOwner(self, api_key, secret):
        q = "select workspace_id, name, thumbnail_url, owner_uid from tbl_workspaces where api_key = $api_key and secret_key = $secret_key"
        return self.db.find_one(q, {"api_key": str(api_key), "secret_key": str(secret)})

    def deleteRole(self, uid, role_id):
        q = "delete from tbl_roles where owner_uid = $uid and role_id = $role_id"
        self.db.query(q, {"role_id": role_id, "uid": uid})
        return self.getRoles(uid)


    def inviteRoleMember(self, uid, role_id, member):
        email = ""
        cell = ""
        role_uid = ""
        usr = {}
        if "@" in member:
            email = member.strip().lower()
            q = "select uid from tbl_users where email = $key"
            usr = self.db.find_one(q, {"key": email})
            self._sendEmailInvite(email)
            #self.sendMail("noreply@processpal.io", email, "Processpal Invite", "You have been invited"):
        else:
            cell = member.strip().lower()
            q = "select uid from tbl_users where cellnum = $key"
            usr = self.db.find_one(q, {"key": cell})
            self._sendSMSInvite(cell)

        if not usr:
            role_uid = str(uuid.uuid4())
            q = "insert into tbl_users (uid, email, cellnum) values ($uid, $email, $cell)"
            self.db.query(q, {"uid": role_uid, "email": email, "cell": cell})
        else:
            role_uid = usr.get("uid")

        q = "insert into tbl_user_roles (role_id, uid) values ($role_id, $uid)"
        self.db.query(q, {"role_id": role_id, "uid": role_uid})
        return self.getRoleMembers(uid, role_id)

    def createDataSet(self, uid, data_set_name):
        data_set_id = str(uuid.uuid4())
        q = "insert into tbl_data_sets (data_set_id, data_set_name, created_by_uid) values ($data_set_id, $data_set_name , $uid)"
        self.db.query(q, {"data_set_id": data_set_id, "data_set_name": data_set_name, "uid": uid})
        return {"data_set_id": data_set_id}



    def createRole(self, uid, role_name):
        q = "insert into tbl_roles (role_name, owner_uid) values ($role_name, $uid)"
        self.db.query(q, {"role_name": role_name, "uid": uid})
        return self.getRoles(uid)

    def updateData(self, uid, set_id, rows):
        row_idx = 0
        """
        q = "select col_names from tbl_data_sets where set_id = $set_id"
        result = self.db.find_one(q, {"set_id": set_id})
        headings = result.get("col_names")
        if not headings:
            headings = []
        """
        q = "delete from tbl_data_set_rows where data_set_id = $set_id"
        self.db.query(q, {"set_id": set_id})
        headings = []
        for row in rows:
            row_idx += 1
            if row_idx == 1: # its the heading
                for col in row:
                    col = col.lower()
                    headings.append(col)
            else:
                q = "insert into tbl_data_set_rows (data_set_id, col_data) values ($data_set_id, $col_data)"
                self.db.query(q, {"data_set_id": set_id, "col_data": simplejson.dumps(row)})
        q = "update tbl_data_sets set col_names = $headings where data_set_id = $set_id"
        self.db.query(q, {"headings": simplejson.dumps(headings), "set_id": set_id})
        return {"success": 1}

    def getDataSetColumn(self, uid, set_id, data_link_key, search_term):
        q = "select col_names from tbl_data_sets where data_set_id = $set_id"
        data_set = self.db.find_one(q, {"set_id": set_id})
        index = data_set.col_names.index(data_link_key)
        results = []
        if search_term:
            q = "select col_data::json->%s as value from tbl_data_set_rows where col_data->>%s ilike '%%%s%%' and data_set_id = $set_id" % (index, index, search_term)
        else:
            q = "select col_data::json->%s as value from tbl_data_set_rows where data_set_id = $set_id" % index
        print (q)
        rows = self.db.find(q, {"set_id": set_id})
        for row in rows:
            results.append(row.value)
        data_set["rows"] = results
        return data_set



    def getDataSet(self, uid, set_id, offset = 0, limit = 100):
        if not str(offset).isdigit():
            offset = 0
        if not str(limit).isdigit():
            limit = 100
        if int(limit) > 100:
            limit = 100

        q = "select * from tbl_data_sets where created_by_uid = $uid and data_set_id = $set_id"
        data_set = self.db.find_one(q, {"uid": uid, "set_id": set_id})
        q = "select * from tbl_data_set_rows where data_set_id = $set_id limit $limit offset $offset"
        rows = self.db.find(q, {"set_id": data_set.data_set_id, "limit": limit, "offset": offset})
        data_set["rows"] = rows
        return data_set

    def getDataSets(self, uid):
        q = "select * from tbl_data_sets where created_by_uid = $uid order by data_set_name"
        return self.db.find(q, {"uid": uid})

    def getRoleMembers(self, uid, role_id):
        q = """
            select
                u.uid,
                u.email,
                u.cellnum,
                u.first_name,
                u.last_name
            from
                tbl_users u
            join
                tbl_user_roles r
            on
                r.uid = u.uid
            where
                r.role_id = $role_id
        """

        # need to also check owner of role
        return self.db.find(q, {"role_id": role_id})

    def getRoles(self, uid):
        q = "select role_id, role_name from tbl_roles where owner_uid = $uid"
        return self.db.find(q, {"uid": uid})

    def authUser(self, uid, token):
        q = "select uid from tbl_user_sessions where uid = $uid and token = $token"
        usr = self.db.find_one(q, { "uid": uid, "token": token })
        if usr:
            return usr.get("uid")
        return False

    def login(self, uname, pword):
        q = "select uid, password from tbl_users where lower(email) = lower($uname) or lower(cellnum) = lower($uname)"
        usr = self.db.find_one(q, {"uname": uname})
        if not usr:
            return { "error": "Invalid Login" }
        else:
            if bcrypt.hashpw(pword.encode(), usr.get("password").encode()) == usr.get("password").encode():
                token = self._createSessionToken(usr.get("uid"))
                return { "success": 1, "token": token, "uid": usr.get("uid") }
        return { "error": "Invalid Login" }
        
    def changePassword(self, uname, new_pword, old_pword):
        q = "select uid, password from tbl_users where lower(email) = lower($uname) or lower(cellnum) = lower($uname)"
        usr = self.db.find_one(q, {"uname": uname})
        print(usr.get("password"))
        if not usr:
            return { "error": "Cannot find user, please contact support" }
        elif usr.get("password") is None or usr.get("password") == "":
            pword_bcrypt = bcrypt.hashpw(new_pword.encode('utf8'), bcrypt.gensalt())
            q = "update tbl_users set password = $pword where uid = $uid"
            self.db.query(q, {"uid": usr.get("uid"), "pword": pword_bcrypt.decode()})
            return { "success": 1, "message": "Password set successfully" }
        elif bcrypt.hashpw(old_pword.encode(), usr.get("password").encode()) == usr.get("password").encode():
            pword_bcrypt = bcrypt.hashpw(new_pword.encode('utf8'), bcrypt.gensalt())
            q = "update tbl_users set password = $pword where uid = $uid"
            self.db.query(q, {"uid": usr.get("uid"), "pword": pword_bcrypt.decode()})
            return { "success": 1, "message": "Password changed successfully" }
        return { "error": "Old password invalid" }

    def sendOTP(self, uname):
        login_type = self._getLoginType(uname)
        if not login_type:
            return { "error": "Username is not a valid email address or phone number" }

        q = "select * from tbl_users where lower(email) = lower($uname) or lower(cellnum) = lower($uname)"
        usr = self.db.find_one(q, {"uname": uname})
        if not usr:
            usr = self._createUser(uname)
            if usr.get("error"):
                return usr
        otp = self._genTOTP()
        uid = usr.get("uid")
        self._addOTP(uid, otp)
        if login_type == "email":
            self._sendEmailOTP(uname, otp)
            return { "success": 1, "uid": uid }
        else:
            self._sendSMSOTP(uname, otp)
            return { "success": 1, "uid": uid }

    def _addOTP(self, uid, otp):
        q = "insert into tbl_otp (uid, otp) values ($uid, $otp)"
        self.db.query(q, {"uid": uid, "otp": otp})

    def validateOTP(self, uid, otp):
        q = "select * from tbl_otp where uid = $uid and otp = $otp"
        try:
            row = self.db.find_one(q, {"uid": uid, "otp": otp})
        except:
            return { "error": "Invalid OTP" }  # or invalid uid

        if not row:
            return { "error": "Invalid OTP" }
        if not self._validateOTP(otp):
            return { "error": "OTP has expired" }

        token = self._createSessionToken(uid)

        return { "success": 1, "token": token }

    def _createSessionToken(self, uid):
        token = str(uuid.uuid4())
        q = "insert into tbl_user_sessions (uid, token) values ($uid, $token)"
        self.db.query(q, { "uid": uid, "token": token })
        return token

    def _genTOTP(self):
        t = pyotp.TOTP("ProcessPal", 5, interval=120)
        return t.now()

    def _validateOTP(self, otp):
        t = pyotp.TOTP("ProcessPal", 5, interval=120)
        return t.verify(otp)

    def _sendEmailInvite(self, email):
        print ("SENDING EMAIL OTP")
        msg = EmailMessage()
        msg['Subject'] = "ProcessPal Invite"
        msg['From'] = "no-reply@processpal.io"
        msg['To'] = email
        msg.set_content("""\
            Hello!
            
            You have been added to a ProcessPal Role.
            Click the link below to login and access your Role.
            http://app.processpal.io/
            
            Kind Regards
            ProcessPal
            """)
        logo_cid = make_msgid()
        msg.add_alternative("""
            <html>
                <head>
                    <title>ProcessPal Login</title>
                </head>
                <body style="background-color:#dadada">
                    <p>Hello!</p>
                    <p>You have been added to a ProcessPal Role.</p>
                    <p>Click <a href="http://app.processpal.io/">this link</a> to login and access your Role.
                    <br>
                    <p>Kind Regards</p>
                    <p>ProcessPal</p>
                    <img style="width:375px" src="cid:{logo_cid}">
                </body>
            </html>

        """.format(logo_cid=logo_cid[1:-1]), subtype="html")
        with open("pp-logo.png", 'rb') as img:
            msg.get_payload()[1].add_related(img.read(), 'image', 'png', cid=logo_cid)
        with smtplib.SMTP("smtp.office365.com", 587) as s:
            s.ehlo()
            s.starttls()  # enable TLS
            s.ehlo()


            s.login("no-reply@processpal.io", "0852$Noreply")
            s.send_message(msg)
    
    def _sendSMSInvite(self, cellnum):
        print ("SENDING SMS OTP")
        message = "You have been added to a ProcessPal Role. Please visit http://app.processpal.io/ to login"
        print ("*******")
        print (cellnum)
        print (message)
        call(["python3","/usr/local/bin/send_sms.py", cellnum, message])
    
    def _sendEmailOTP(self, email, otp):
        print ("SENDING EMAIL OTP")
        msg = EmailMessage()
        msg['Subject'] = "ProcessPal Login"
        msg['From'] = "no-reply@processpal.io"
        msg['To'] = email
        msg.set_content("Your ProcessPal OTP is %s" % otp)
        logo_cid = make_msgid()
        msg.add_alternative("""
            <html>
                <head>
                    <title>ProcessPal Login</title>
                </head>
                <body style="background-color:#dadada">
                    <center>
                    <div style="width:100%;max-width:900px;background-color:white;color:black;height:100%">
                        <img src="cid:{logo_cid}">
                        <br>
                        <p>Your ProcessPal OTP is {otp}
                        <br>
                        <br>
                        <br>
                        <br>
                    </div>
                    </center>
                </body>
            </html>

        """.format(logo_cid=logo_cid[1:-1], otp=otp), subtype="html")
        with open("pp-logo.png", 'rb') as img:
            msg.get_payload()[1].add_related(img.read(), 'image', 'png', cid=logo_cid)
        with smtplib.SMTP("smtp.office365.com", 587) as s:
            s.ehlo()
            s.starttls()  # enable TLS
            s.ehlo()


            s.login("no-reply@processpal.io", "0852$Noreply")
            s.send_message(msg)

    def _sendSMSOTP(self, cellnum, otp):
        print ("SENDING SMS OTP")
        message = "Your ProcessPal OTP is %s" % otp
        print ("*******")
        print (cellnum)
        print (message)
        run(["python3","/usr/local/bin/send_sms.py", cellnum, message])

    def _getLoginType(self, uname):
        if validate_email(uname):
            return "email"
        else:
            return "phone"
        """
            try:
                ph = phonenumbers.parse(uname, None)
            except:
                return False
            if phonenumbers.is_valid_number(ph):
                return "phone"
        return False
        """

    def _createUser(self, uname):
        q = "select uid from tbl_users where  lower(email) = lower($uname) or lower(cellnum) = lower($uname)"
        usr = self.db.find_one(q, {"uname": uname})
        if usr:
            return { "error": "User exists" }
        login_type = self._getLoginType(uname)
        if not login_type:
            return { "error": "Username is not a valid email address or phone number" }
        uid = str(uuid.uuid4())

        if login_type == "email":
            q = "insert into tbl_users (uid, email) values ($uid, $uname)"
            self.db.query(q, {"uname": uname, "uid": uid})
            return { "uid": uid, "email": uname }
        else:
            q = "insert into tbl_users (uid, cellnum) values ($uid, $uname)"
            self.db.query(q, {"uname": uname, "uid": uid})
            return { "uid": uid, "cellnum": uname }
            
    def linkLogins(self, uid, link_uid):
        print("link logins", uid, link_uid)
        q = "select email, cellnum from tbl_users where uid = $uid"
        usr = self.db.find_one(q, {"uid": uid})
        if not usr:
            return { "error": "User doesn't exist" }
            
        if usr.get("email") is not None and usr.get("cellnum") is not None:
            return { "error": "Cellnumber and email already exist" }
        elif usr.get("email") is not None:
            login_type = "email"
        elif usr.get("cellnum") is not None:
            login_type = "cellnum"
        else:
            return { "error": "Username is not a valid email address or phone number" }
            
        q = "select email, cellnum from tbl_users where uid = $link_uid"
        link_usr = self.db.find_one(q, {"link_uid": link_uid})
        if link_usr.get("email") is not None and link_usr.get("cellnum") is not None:
            return { "error": "Cellnumber and email already exist on linking account" }
        elif link_usr.get("email") is not None and login_type == "email":
            return { "error": "Cannot link two email addresses" }
        elif link_usr.get("cellnum") is not None and login_type == "cellnum":
            return { "error": "Cannot link two cell numbers" }
        if link_usr:
        
            q = "update tbl_user_roles set uid = $uid where uid = $link_uid"
            self.db.query(q, {"uid": uid, "link_uid": link_uid})
            
            q = "update tbl_workflow_roles set uid = $uid where uid = $link_uid"
            self.db.query(q, {"uid": uid, "link_uid": link_uid})
            
            q = "update tbl_workflows set owner_uid = $uid where owner_uid = $link_uid"
            self.db.query(q, {"uid": uid, "link_uid": link_uid})
            
            q = "update tbl_workspaces set owner_uid = $uid where owner_uid = $link_uid"
            self.db.query(q, {"uid": uid, "link_uid": link_uid})


        if login_type == "email":
            q = "update tbl_users set cellnum = $link_uname where uid = $uid"
            self.db.query(q, {"link_uname": link_usr.get("cellnum"), "uid": uid})
            
            q = "delete from tbl_users where uid = $old_uid"
            self.db.query(q, {"old_uid": link_uid})
            return { "success": 1, "email": usr.get("email") }
        else:
            q = "update tbl_users set email = $link_uname where uid = $uid"
            self.db.query(q, {"link_uname": link_usr.get("email"), "uid": uid})
            
            q = "delete from tbl_users where uid = $old_uid"
            self.db.query(q, {"old_uid": link_uid})
            return { "success": 1, "cellnum": usr.get("cellnum") }





