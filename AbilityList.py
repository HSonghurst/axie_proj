#breedCount
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
#morale#
#price

import time
import pickle
from pymongo import MongoClient
import random


abilityList = ["ANEMONE",
"ANT",
"ANTENNA",
"ARCO",
"AXIE KISS",
"BABYLONIA",
"BALLOON",
"BAMBOO SHOOT",
"BEECH",
"BIDENS",
"BLUE MOON",
"BONE SAIL",
"RUGGED SAIL",
"BUMPY",
"BUZZ BUZZ",
"CACTUS",
"CARROT",
"CATERPILLARS",
"CATFISH",
"CATTAIL",
"CERASTES",
"CLAMSHELL",
"CLOUD",
"CONFIDENT",
"COTTONTAIL",
"CROC",
"CUCKOO",
"CUPID",
"CUTE BUNNY",
"DOUBLETALK",
"DUAL BLADE",
"EGGSHELL",
"FEATHER FAN",
"FEATHER SPEAR",
"FISH SNACK",
"FURBALL",
"GARISH WORM",
"GERBIL",
"GILA",
"GODA",
"GOLDFISH",
"GRANMA'S FAN",
"GRASS SNAKE",
"GRAVEL ANT",
"GREEN THORNS",
"HARE",
"HATSUNE",
"HERBIVORE",
"HERMIT",
"HERO",
"HOT BUTT",
"HUNGRY BIRD",
"IGUANA",
"IMP",
"INCISOR",
"INDIAN STAR",
"JAGUAR",
"KESTREL",
"KINGFISHER",
"KOI",
"KOTARO",
"LAGGING",
"LAM",
"LEAF BUG",
"LITTLE BRANCH",
"LITTLE OWL",
"MERRY",
"MINT",
"MOSQUITO",
"NAVAGA",
"NIMO",
"NUT CRACKER",
"ORANDA",
"PARASITE",
"PEACE MAKER",
"PERCH",
"PIGEON POST",
"PINCER",
"PIRANHA",
"PLIERS",
"POCKY",
"POST FIGHT",
"POTATO LEAF",
"PUMPKIN",
"PUPAE",
"RANCHU",
"RAVEN",
"RAZOR BITE",
"RED EAR",
"RICE",
"RISKY BEAST",
"RISKY FISH",
"RONIN",
"ROSE BUD",
"SANDAL",
"SCALY SPEAR",
"SCALY SPOON",
"SCARAB",
"SERIOUS",
"SHIBA",
"SHIITAKE",
"SHOAL STAR",
"SHRIMP",
"SILENCE WHISPER",
"SNAIL SHELL",
"SNAKE JAR",
"SPIKY WING",
"SPONGE",
"SQUARE TEETH",
"STRAWBERRY SHORTCAKE",
"SWALLOW",
"TADPOLE",
"TEAL SHELL",
"THE LAST ONE",
"THORNY CATERPILLAR",
"TIMBER",
"TINY DINO",
"TINY TURTLE",
"TOOTHLESS BITE" ,
"VENOM BITE",
"TRI FEATHER",
"TRI SPIKES",
"TRUMP",
"TURNIP",
"TWIN TAIL",
"UNKO",
"PINKU UNKO",
"WALL GECKO",
"ESCAPED GECKO",
"WATERING CAN",
"WATERMELON",
"WING HORN",
"YAM",
"ZIGZAG",
"FIR TRUNK",
"KENDAMA",
"YAKITORI",
"HAMAYA",
"SANTA'S GIFT",
"GEISHA",
"MAKI",
"DANGO",
"FROZEN BUCKET",
"RUDOLPH",
"YORISHIRO",
"ORIGAMI",
"KAWAII",
"KOINOBORI"]

classList =[ "PLANT", "BEAST", "AQUATIC", "BIRD", "BUG", "MECH", "REPTILE", "DAWN", "DUSK"]


def findAbilityIndex(name):
    return abilityList.index(name.upper())

def findClassIndex(name):
    return classList.index(name.upper())

def getAxieDataFromDb():
    
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
    
    results = list(db.axies_19_07.find({"birthDate": {"$exists": True}}))
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
                        'price': int(x['transferHistory']['results'][0]['withPriceUsd'].split('.')[0]),
                        }
    priceList = []

    for key in list(axieDataOrganised.keys()):
        priceList.append(axieDataOrganised[key]['price'])
    
    for i in range(len(priceList)):
        if i > 49:
            axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev50'] = int(sum(priceList[i-50:i])/len(priceList[i-50:i]))
        else:
            if i ==0:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev50'] = priceList[i]
            else:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev50'] = int(sum(priceList[0:i])/len(priceList[0:i]))
        if i > 149:
            axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev150'] = int(sum(priceList[i-150:i])/len(priceList[i-150:i]))
        else:
            if i ==0:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev150'] = priceList[i]
            else:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev150'] = int(sum(priceList[0:i])/len(priceList[0:i]))
        if i > 299:
            axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev300'] = int(sum(priceList[i-300:i])/len(priceList[i-300:i]))
        else:
            if i ==0:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev300'] = priceList[i]
            else:
                axieDataOrganised[list(axieDataOrganised.keys())[i]]['prev300'] = int(sum(priceList[0:i])/len(priceList[0:i]))


    return axieDataOrganised

def getEncodedData():
    data = getAxieDataFromDb()

    
    l = list(data.items())
    random.shuffle(l)
    data = dict(l)

    print(data[list(data.keys())[0]])
    X = []
    Y = []

    for key in data.keys():
        values = list(data[key].values())
        if values[11] ==0:
            print("price = 0")
            continue
        Y.append(values[11])
        del values[11]
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

def writeFile(data, fname):
    f = open(fname, "wb")
    pickle.dump(data, f)
    f.close()

#X, Y = getEncodedData()


#writeFile(X, "X_Data.pkl")
#writeFile(Y, "Y_Data.pkl")