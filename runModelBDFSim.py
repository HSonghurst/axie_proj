

from pymongo import MongoClient
import torch
import numpy as np
import math
import time
from model2BDFClass import Net
import webbrowser

def getSimAxies():
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 
    
    results = list(db.axies_breed_sim.find({"data": {"$exists": True}}))
    X = []
    Y = []
    for i in results:
        X.append(i["data"])
        Y.append(0)
    
    return X, Y

def getRecentPriceStats():
    N=300
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 

    recentEntries = db.axies_25_08.find().skip(db.axies_25_08.count() - N)
    p= []
    for x in recentEntries:
        p.append(int(x['transferHistory']['results'][0]['withPriceUsd'].split('.')[0]))

    avg50 = 0
    avg150 = 0
    avg300 = 0
    c=0
    for i in reversed(p):
        if c < 50:
            avg50 +=i
            avg150 +=i
            avg300 +=i
            
        elif c <150:
            avg150 +=i
            avg300 +=i
        elif c < 300:
            avg300 +=i
        c+=1
    
    return int(avg300/300)

def addPriceStats(X):
    avg300 = getRecentPriceStats()

    for o in range(len(X)):
        X[o].append(avg300)
    
    return  X



def runModel():
    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser("C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"))
    
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = torch.load("model2_BDF.pt", map_location=device)
    model.eval()
    print(model)
    doneList = []


    X, Y = getSimAxies()
    X = addPriceStats(X)
    pleasePredict = torch.FloatTensor(X)
    pleasePredict = pleasePredict.to(device)
    y_pred = model(pleasePredict)
    y_pred= [int(i.item()) for i in y_pred]
    averagePrice = sum(y_pred)/len(y_pred)

    print("Price = ", averagePrice)




    


runModel()


