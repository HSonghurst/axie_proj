

from pymongo import MongoClient
import torch
import numpy as np
import math
import time
from AbilityList import*
from modelClass import Net


def getListedAxies():
     #class
    #birthDate
    #part0 name
    #part1 name
    #part2 name
    #part 3 name
    #part 4 name
    #part 5 name
    #hp
    #speed
    #skill
    #morale
    #breedCount
    #price

    client = MongoClient('localhost', 27017)
    db = client['mydb'] 
    prices = []
    
    results = list(db.axies_latest.find({"birthDate": {"$exists": True}}))
    if (len(results) <5 ):
        print("Nothing in collection")
        getListedAxies()

    axieDataOrganised = {}
    for x in results:
        if(len(x['parts']) < 4) or x['class'] is None:
            continue
        if (len(str(type(x['class']))) >15 ):
            print('true')
            continue
        axieDataOrganised[x['id']] = {
                        'class': findClassIndex(x['class']),
                        'birthDate': int((time.time() - x['birthDate'])/(60*24)),
                        'breedCount': x['breedCount'],
                        'hp': x['stats']['hp'],
                        'speed': x['stats']['speed'],
                        'skill': x['stats']['skill'],
                        'morale': x['stats']['morale'],
                        'spellOne': findAbilityIndex(x['parts'][2]['name']),
                        'spellTwo': findAbilityIndex(x['parts'][3]['name']),
                        'spellThree': findAbilityIndex(x['parts'][4]['name']), 
                        'spellFour': findAbilityIndex(x['parts'][5]['name']), 
                        }
        prices.append(int(x['auction']['currentPriceUSD'].split('.')[0]))   

    return axieDataOrganised, prices

def getRecentPriceStats():
    N=300
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 

    recentEntries = db.axies_19_07.find().skip(db.axies_19_07.count() - N)
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
    
    return int(avg50/50),int(avg150/150),int(avg300/300)

def getEncodedListedAxies(data, Y):
    avg50, avg150, avg300 = getRecentPriceStats()

    
    ids = list(data.keys())
    X = []

    for key in data.keys():
        values = list(data[key].values())
        values = values + [avg50, avg150, avg300]
        classOHE = []
        abilityOHE = []
        for i in range(len(classList)):
            if values[0] == i:
                classOHE.append(1)
            else:
                classOHE.append(0)

        for i in range(len(abilityList)):
            if values[7] == i:
                abilityOHE.append(1)
            elif values[8] == i:
                abilityOHE.append(1)
            elif values[9] == i:
                abilityOHE.append(1)
            elif values[10] == i:
                abilityOHE.append(1)
            else:
                abilityOHE.append(0)
        del values[10]
        del values[9]
        del values[8]
        del values[7]
        del values[0]
            
        values = values + classOHE + abilityOHE
        X.append(values)
    
    return X, Y, ids

def checkAxiePrice(spId):
    client = MongoClient('localhost', 27017)
    db = client['mydb'] 
    prices = []
    results = list(db.axies_19_07.find({"id": spId}))
    axieDataOrganised = {}
    for x in results:
        axieDataOrganised[x['id']] = {
                        'class': findClassIndex(x['class']),
                        'birthDate': int((time.time() - x['birthDate'])/(60*24)),
                        'breedCount': x['breedCount'],
                        'hp': x['stats']['hp'],
                        'speed': x['stats']['speed'],
                        'skill': x['stats']['skill'],
                        'morale': x['stats']['morale'],
                        'spellOne': findAbilityIndex(x['parts'][2]['name']),
                        'spellTwo': findAbilityIndex(x['parts'][3]['name']),
                        'spellThree': findAbilityIndex(x['parts'][4]['name']), 
                        'spellFour': findAbilityIndex(x['parts'][5]['name']), 
                        }

    pleasePredict, Y, ids = getEncodedListedAxies(axieDataOrganised, prices)
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = torch.load("model.pt", map_location=device)
    model.eval()
    pleasePredict = torch.FloatTensor(pleasePredict)
    pleasePredict = pleasePredict.to(device)
    y_pred = model(pleasePredict)
    y_pred= [int(i.item()) for i in y_pred]
    print(y_pred)

def runModel():
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    
    model = torch.load("model.pt", map_location=device)
    model.eval()
    

    while(True):
        data, Y = getListedAxies()
        pleasePredict, Y, ids = getEncodedListedAxies(data, Y)
        pleasePredict = torch.FloatTensor(pleasePredict)
        pleasePredict = pleasePredict.to(device)
        y_pred = model(pleasePredict)
        y_pred= [int(i.item()) for i in y_pred]
        discountList = [Y[i]/y_pred[i] for i in range(len(y_pred))]
        diffList = [y_pred[i] - Y[i] for i in range(len(y_pred))]

        for i in range(len(discountList)):
            if discountList[i] <0.6:
                print("https://marketplace.axieinfinity.com/axie/" + ids[i], discountList[i], "price", Y[i])


        time.sleep(1)


    


runModel()
checkAxiePrice("1835162")
checkAxiePrice("2096588")
checkAxiePrice("1315037")

