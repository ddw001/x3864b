from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client['designer-meteor']

from_group = "a845ozqy5Xe33Yfu6"
to_user = "XiRNPsJ2kyKus3Wwu"

print db.groups.find_one({"_id": from_group})







