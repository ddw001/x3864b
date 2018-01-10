import string
import random

from pymongo import MongoClient

client = MongoClient('mongodb://ppal:lapp@localhost:27017/')

db = client['designer-meteor']


cur = db.users.find({"emails.address": {"$regex": "itsago"}});

N = 5
for row in cur:
	if row.has_key("services"):
		print "SKIPPING: %s" % row["emails"][0]["address"]
		continue	
	pw = ''.join(random.SystemRandom().choice(string.ascii_lowercase + string.digits) for _ in range(N))
	print "%s - %s" % (row["emails"][0], pw)

#print db.groups.find_one({"_id": from_group})







