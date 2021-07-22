

from pymongo import MongoClient
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator
import numpy as np
import math
import time
from AbilityList import*

client = MongoClient('localhost', 27017)

db = client['mydb']



def getListedAxies():
    print('here')
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
    
    results = list(db.axies_latest.find({"birthDate": {"$exists": True}}))
    if (len(results) <1 ):
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

    return axieDataOrganised

def getEncodedData():
    data = getListedAxies()
    
    l = list(data.items())
    random.shuffle(l)
    data = dict(l)

    X = []

    for key in data.keys():
        values = list(data[key].values())


        Y.append(values[11])

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
    
    return X, Y

print(getEncodedData())