import web
from processpal import _config as cfg



class db:
    def __init__(self):
        self.db = web.database(dbn='postgres', host=cfg.dbhost, db=cfg.dbname, user=cfg.dbuser, pw=cfg.dbpassword)

    def query(self, query, params = {}):
        return self.db.query(query, params)

    def to_array(self, query, params = {}):
        qres = self.db.query(query, params)
        result = []
        for row in qres:
            result.append(row)
        return result

    def find(self, query, params = {}):
        return self.to_array(query, params)

    def find_one(self, query, params = {}):
        qres = self.db.query(query, params)
        result = []
        for row in qres:
            return row
        return False

