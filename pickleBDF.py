import pickle
from pymongo import MongoClient


def writeFile(data, fname):
    f = open(fname, "wb")
    pickle.dump(data, f)
    f.close()


def getBDFdata():
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 
    
    results = list(db.axies_tester.find({"data.1": {"$gt": 0}}))
    X = []
    Y = []
    for i in results:
        X.append(i["data"][0])
        Y.append(i["data"][1])
    
    return X, Y
    
X, Y = getBDFdata()

writeFile(X, "X_Data2_BDF.pkl")
writeFile(Y, "Y_Data2_BDF.pkl")