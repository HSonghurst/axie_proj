# General aims
# Figure out a way to price Axies based on stats
# Figure out a way to price eggs based on probability of becoming an axie with good price
# Figure out a way to analyse how good accounts are at trading?

# What are important stats for the game

# Stats: hp, speed, skill, morale
# Breedcount. This determines how many children an Axie has had. Each child increases the expense of the next one in SLP
# Class: Plant, Beast, Aquatic, Bird, Bug, Mech, Reptile, Dawn, Dusk
# Parts: Eyes, Ears, Back, Mouth, Horn, Tail. Determines what abilities axies have.


#Start with stats to see if you can find when one stat is undervalued. Use only one class e.g. plant
#dict plantAxieStatsPrice = { id: {
#                   hp: int
#                   speed: int
#                   skill: int
#                   morale: int
#                   breedCount: int 
#                   price: int
#                   }
#              }
#Then just perform linear regression?

from pymongo import MongoClient
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator
import numpy as np
from sklearn.linear_model import LinearRegression
import math
import time

client = MongoClient('localhost', 27017)

db = client['mydb']



def getClassStats(className, spell, flag):
    
    results = list(db.axies_19_07.find({"class": className}))

    axieStatsPrice = {}
    for x in results:
        if spell==True:
            axieStatsPrice[x['id']] = {'hp': x['stats']['hp'],
                            'speed': x['stats']['speed'],
                            'skill': x['stats']['skill'],
                            'morale': x['stats']['morale'],
                            'breedCount': x['breedCount'],
                            'spellOne': [x['parts'][2]['abilities'][0]['attack'], x['parts'][2]['abilities'][0]['defense']],
                            'spellTwo': [x['parts'][3]['abilities'][0]['attack'], x['parts'][3]['abilities'][0]['defense']],
                            'spellThree': [x['parts'][4]['abilities'][0]['attack'], x['parts'][4]['abilities'][0]['defense']],
                            'spellFour': [x['parts'][5]['abilities'][0]['attack'], x['parts'][5]['abilities'][0]['defense']],
                            'timeStamp': x['transferHistory']['results'][0]['timestamp'],
                            'price': x['transferHistory']['results'][0]['withPriceUsd'],
                            }
        else:
            axieStatsPrice[x['id']] = {'hp': x['stats']['hp'],
                            'speed': x['stats']['speed'],
                            'skill': x['stats']['skill'],
                            'morale': x['stats']['morale'],
                            'breedCount': x['breedCount'],
                            'timeStamp': x['transferHistory']['results'][0]['timestamp'],
                            'price': x['transferHistory']['results'][0]['withPriceUsd'],
                            }

    return axieStatsPrice

def getClassStatsLatest(className, spell, flag):
    
    results = list(db.axies_latest.find({"class": className}))

    axieStatsPrice = {}
    for x in results:
        
        if spell==True:
            axieStatsPrice[x['id']] = {'hp': x['stats']['hp'],
                            'speed': x['stats']['speed'],
                            'skill': x['stats']['skill'],
                            'morale': x['stats']['morale'],
                            'breedCount': x['breedCount'],
                            'spellOne': [x['parts'][2]['abilities'][0]['attack'], x['parts'][2]['abilities'][0]['defense']],
                            'spellTwo': [x['parts'][3]['abilities'][0]['attack'], x['parts'][3]['abilities'][0]['defense']],
                            'spellThree': [x['parts'][4]['abilities'][0]['attack'], x['parts'][4]['abilities'][0]['defense']],
                            'spellFour': [x['parts'][5]['abilities'][0]['attack'], x['parts'][5]['abilities'][0]['defense']],
                            'price': x['auction']['currentPriceUSD']
                            }
        else:
            axieStatsPrice[x['id']] = {'hp': x['stats']['hp'],
                            'speed': x['stats']['speed'],
                            'skill': x['stats']['skill'],
                            'morale': x['stats']['morale'],
                            'breedCount': x['breedCount'],
                            'price': x['auction']['currentPriceUSD']
                            }

    return axieStatsPrice

def showGraph(data, stat):
    #print(plantAxieStatsPrice)
    stat_list = []
    breedCount_list = []
    price_list = []

    for x in data:
        print(data[x])
        stat_list.append(data[x][stat])
        breedCount_list.append(data[x]['breedCount'])
        price_list.append(float(data[x]['price']))

    fig, ax = plt.subplots(subplot_kw={"projection": "3d"})

    hp_list = np.array(stat_list)
    breedCount_list = np.array(breedCount_list)
    price_list = np.array(price_list)



    surf = ax.plot_trisurf(hp_list, breedCount_list, price_list,
                        linewidth=0, antialiased=False)

    # Customize the z axis.
    #ax.set_zlim(-1.01, 1.01)
    #ax.zaxis.set_major_locator(LinearLocator(10))
    # A StrMethodFormatter is used automatically
    #ax.zaxis.set_major_formatter('{x:.02f}')

    # Add a color bar which maps values to colors.
    fig.colorbar(surf, shrink=0.5, aspect=5)

    plt.show()


def organiseData(data, price=True, spell=False):

    X = []
    Y = []
    if spell == True:
        for x in data:
            X.append([data[x]['hp'], data[x]['speed'], data[x]['skill'], data[x]['morale'], data[x]['breedCount'], data[x]['spellOne'][0], data[x]['spellOne'][1],data[x]['spellTwo'][0],
            data[x]['spellTwo'][1],data[x]['spellThree'][0],data[x]['spellThree'][1],data[x]['spellFour'][0],data[x]['spellFour'][1],])
            if price ==True:
                Y.append(int(float(data[x]['price'])))
    else:
        for x in data:
                X.append([data[x]['hp'], data[x]['speed'], data[x]['skill'], data[x]['morale'], data[x]['breedCount']])
                if price ==True:
                    Y.append([int(float(data[x]['price']))])

    return X,Y



def makeRegModel(data, test):
    
    X, Y = organiseData(data)
    
    X_t, Y_t = organiseData(test)

    reg = LinearRegression().fit(X, Y)
    print(reg.score(X, Y))

    print(reg.coef_)
    print(reg.intercept_)

    results = []
    results = reg.predict(X_t)
    print(results)
    #for x in X_t:
    #    results.append(reg.predict([x]))
    
    print(sum(abs(results - Y_t))/len(abs(results - Y_t)))


def makeRegModelNoSpell(data, test):
    X = []
    Y = []
    X_t = []
    Y_t = []

    X, Y = organiseData(data)
    
    X_t, Y_t = organiseData(test)

    print(len(X))

    reg = LinearRegression().fit(X, Y)
    #print(reg.score(X, Y))

    #print(reg.coef_)
    #print(reg.intercept_)


    results = reg.predict(X_t)
    #for x in X_t:
    #    results.append(reg.predict([x]))

    #print(results)
    print('prediction for custom:', reg.predict([ [31, 45, 31, 57, 2], ]))
    
    print(sum(abs(results - Y_t))/len(abs(results - Y_t)))

    return reg

def buyOrNot(Y_p, Y, keys):
    diff = (Y_p - Y)/Y

    for i in range(len(diff)):
        if diff[i] > 0.5:
            print("buy ", "https://marketplace.axieinfinity.com/axie/" +list(keys)[i], " pred ", Y_p[i], " price ", Y[i], " diff ", diff[i])
        #else:
            #print("Don't buy ", list(keys)[i], " pred ", X_p[i], " price ", Y[i])


def testCustom(model):
    axieStats ={ "1870124":  {'hp': 36,
                 'speed': 48,
                 'skill': 31,
                 'morale': 59,
                 'breedCount': 2,
                 'price': '650'
                }
    }
    X, Y = organiseData(axieStats)
    print(model.predict(X))


# Class: Plant, Beast, Aquatic, Bird, Bug, Mech, Reptile, Dawn, Dusk
data1 = getClassStats("Beast", False, True)
data2 = getClassStats("Plant", False, True)

#showGraph(data, 'morale')

dataTrain1 = dict(list(data1.items())[:len(data1)-math.floor(len(data1)/10)])
dataTest1 = dict(list(data1.items())[len(data1)-math.floor(len(data1)/10):])
model1 = makeRegModelNoSpell(dataTrain1, dataTest1)

dataTrain2 = dict(list(data2.items())[:len(data2)-math.floor(len(data2)/10)])
dataTest2 = dict(list(data2.items())[len(data2)-math.floor(len(data2)/10):])
model2 = makeRegModelNoSpell(dataTrain2, dataTest2)

def loop(model1, model2):

    while (True):
        data1 = getClassStatsLatest("Beast", False, False)
        X1, Y1 = organiseData(data1)
        Y_p1 = model1.predict(X1)

        buyOrNot(Y_p1, Y1, data1.keys())

        data2 = getClassStatsLatest("Plant", False, False)
        X2, Y2 = organiseData(data2)
        Y_p2 = model2.predict(X2)

        buyOrNot(Y_p2, Y2, data2.keys())



        time.sleep(3)

loop(model1, model2)


