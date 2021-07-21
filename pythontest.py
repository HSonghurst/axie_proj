from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client['mydb']


print(db.axies.find_one({"id": "1645926"}))
