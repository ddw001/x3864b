import bcrypt
import hashlib

class app_user:
    db = None
    def __init__(self, parent):
        self.db = parent.db
        pass

    def login(self, uname, pword):
        #return self.db.user.find({"apiKey": api_key, "secretKey": secret}, {"_id": 1, "name": 1, "owner": 1, "groupAdmin": 1})
        usr = self.db.user.find_one({"emails.address": uname}, {"services.password.bcrypt":1})
        if usr and usr["services"]:
            db_pword = usr["services"]["password"]["bcrypt"]
            hashed_pword = hashlib.sha256(pword).hexdigest()
            if bcrypt.hashpw(hashed_pword, db_pword) == db_pword:
                return True
        return False

