from ._rest import rest
from xlrd import open_workbook

class user:
    config = None
    def __init__(self, parent):
        self.config = parent.config
        pass

    def login(self, uname, pword):
        print ("In login")
        return rest().post("user/login", {"uname": uname, "pword": pword})
        
    def changePassword(self, uname, new_pword, old_pword):
        print ("In change password")
        return rest().post("user/change_password", {"uname": uname, "new_pword": new_pword, "old_pword": old_pword})

    def validateOTP(self, uid, otp):
        print ("In otp")
        print(uid,otp)
        return rest().post("user/otp", {"uid": uid, "otp": otp})
    
    def userLinkLogins(self, uid, link_uid, otp):
        print ("In user link")
        print(uid,otp)
        return rest().post("user/userLinkLogins", {"uid": uid, "link_uid": link_uid, "otp": otp})

    def getDataSetColumn(self, uname, token, set_id, data_link_key, rows):
        print ("In data sets")
        return rest(uname, token).get("user/data_set_column", {"set_id": set_id, "data_link_key": data_link_key, "rows": rows})

    def getDataSet(self, uname, token, set_id, offset, limit):
        print ("In data sets")
        return rest(uname, token).get("user/data_set", {"set_id": set_id, "offset": offset, "limit": limit})

    def dataUpload(self, uname, token, set_id, fileobject):
        #filename = fileobject.filename
        rows = []
        
        if fileobject.filename[-4:].lower() == '.csv':
            spamreader = fileobject.value.decode("utf-8").replace("\r","")
            spamreader = spamreader.split("\n")
            for file_row in spamreader:
                row = []
                file_row_split = file_row.split(",")
                for col in file_row_split:
                    row.append(col)
                rows.append(row)
        else:
            book = open_workbook(file_contents=fileobject.value)
            sheet = book.sheets()[0]
            number_of_rows = sheet.nrows
            number_of_columns = sheet.ncols

            for row_idx in range(0, number_of_rows):
                row = []
                for col in range(number_of_columns):
                    value  = (sheet.cell(row_idx,col).value)
                    try:
                        value = str(int(value))
                    except ValueError:
                        pass
                    finally:
                        row.append(value)
                rows.append(row)
                
        return rest(uname, token).post("user/data", {"set_id": set_id, "rows": rows})


    def getDataSets(self, uname, token):
        print ("In data sets")
        return rest(uname, token).get("user/data_sets")

    def getRoles(self, uname, token):
        print ("In roles")
        return rest(uname, token).get("user/roles")

    def getRoleMembers(self, uname, token, role_id):
        print ("In role users")
        return rest(uname, token).get("user/role/members", {"role_id": role_id})

    def createDataSet(self, uname, token, data_set_name):
        print ("In create data set")
        return rest(uname, token).post("user/data/create", {"data_set_name": data_set_name})

    def deleteRole(self, uname, token, role_id):
        print ("In delete role")
        return rest(uname, token).post("user/role/delete", {"role_id": role_id})

    def addRole(self, uname, token, role_name):
        print ("In add role")
        return rest(uname, token).post("user/role", {"role_name": role_name})

    def inviteRoleMember(self, uname, token, role_id, member):
        print ("In add role")
        return rest(uname, token).post("user/role/invite", {"role_id": role_id, "member": member})


    def sendOTP(self, uname):
        print ("In otp")
        return rest().get("user/otp", {"uname": uname})
