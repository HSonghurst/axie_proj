

from pymongo import MongoClient
import torch
import numpy as np
import math
import time
from model2BDFClass import Net
import webbrowser

def getListedAxies():
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 
    
    results = list(db.axies_latest.find({"id": {"$exists": True}}))
    X = []
    Y = []
    ids = []
    for i in results:
        if i["data"][0] == 0: continue
        X.append(i["data"][0])
        Y.append(i["data"][1])
        ids.append(i['id'])
    
    return X, Y, ids

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

    while(True):
        X, Y, ids = getListedAxies()
        X = addPriceStats(X)
        pleasePredict = torch.FloatTensor(X)
        pleasePredict = pleasePredict.to(device)
        y_pred = model(pleasePredict)
        y_pred= [int(i.item()) for i in y_pred]
        discountList = [Y[i]/y_pred[i] for i in range(len(y_pred))]
        diffList = [y_pred[i] - Y[i] for i in range(len(y_pred))]
        

        for i in range(len(discountList)):
            if diffList[i] > 400 and Y[i] < 600 and X[i][0] <2:
                if ids[i] not in doneList:
                    doneList.append(ids[i])
                    webbrowser.get('chrome').open_new("https://marketplace.axieinfinity.com/axie/" + ids[i])
                    print("https://marketplace.axieinfinity.com/axie/" + ids[i], "predicted price", y_pred[i], "price", Y[i], "Difference", diffList[i])




    


runModel()
checkAxiePrice("1835162")
checkAxiePrice("2096588")
checkAxiePrice("1315037")

