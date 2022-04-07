AxieInfo = require('./binarytraitsjson.js')
AxieUtils = require('./makeBDF.js')
partList = require('./partList')
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';


function cumulativeSumObj(obj) {
    list = []
    for (ii in obj){
        list.push(obj[ii])
    }
    cumulativeSum = (sum => value => sum += value)(0);

    return list.map(cumulativeSum)
}

function OHEAbilityClasses(axieParts) {
    axieParts[0] = axieParts[0].slice(1)
    axieParts[1] = axieParts[1].slice(1)
    axieParts[2] = axieParts[2].slice(1)

    var dClassesNames = []
    var r1ClassesNames = []
    var r2ClassesNames = []

    var dClassesOHE = [0,0,0,0,0,0]
    var r1ClassesOHE = [0,0,0,0,0,0]
    var r2ClassesOHE = [0,0,0,0,0,0]
    classList =[ "PLANT", "BEAST", "AQUATIC", "BIRD", "BUG", "REPTILE"]

    for (partsi in axieParts[0]) {
        for (i in binarytraits) {
            for(k in binarytraits[i]) {
                for (j in binarytraits[i][k]) {
                    if (binarytraits[i][k][j]['global'].toUpperCase() == axieParts[0][partsi].toUpperCase()) {
                        dClassesOHE[classList.indexOf(i.toUpperCase())]+=1
                        dClassesNames.push(i)

                    }
                    if (binarytraits[i][k][j]['global'].toUpperCase() == axieParts[1][partsi].toUpperCase()) {
                        r1ClassesOHE[classList.indexOf(i.toUpperCase())]+=1
                        r1ClassesNames.push(i)
                    }
                    if (binarytraits[i][k][j]['global'].toUpperCase() == axieParts[2][partsi].toUpperCase()) {
                        r2ClassesOHE[classList.indexOf(i.toUpperCase())]+=1
                        r2ClassesNames.push(i)
                    }
                }
            }
        }
    }
    
    return [[].concat(dClassesOHE, r1ClassesOHE, r2ClassesOHE), [].concat(dClassesNames,r1ClassesNames,r2ClassesNames)]
}

function OHEAbilityNames(axieParts) {
    axieParts[0] = axieParts[0].slice(1)
    axieParts[1] = axieParts[1].slice(1)
    axieParts[2] = axieParts[2].slice(1)

    parts = partList.partList
    emptyList = []

    for (i in parts) {
        emptyList.push(0)
        parts[i] = parts[i].toUpperCase()
    }

    for (i in axieParts[0]) {
        emptyList[parts.indexOf(axieParts[0][i].toUpperCase())] +=1
        emptyList[parts.indexOf(axieParts[1][i].toUpperCase())] +=1
        emptyList[parts.indexOf(axieParts[2][i].toUpperCase())] +=1
    }
    
    return emptyList
}



function sim(traits, n) {
    simResultsOHE = []
    for(simLength=0; simLength<n; simLength++) {
        childTraits = []
        for(index=0; index<3; index++) {
            d1r1r2 = []
            for (i in traits) {
                willOfGod = Math.random() * 100
                probsList = cumulativeSumObj(traits[i])

                for (k in probsList) {
                    if (willOfGod < probsList[k]) {
                        d1r1r2.push(Object.keys(traits[i])[k])
                        break
                    }
                }
            }
            childTraits.push(d1r1r2)
        }
        axieClass = childTraits[0][0]
        an  = OHEAbilityClasses(childTraits)
        OHEAbilityClassesList =an[0]
        abilityClassesNames = an[1]
        axieStats = AxieUtils.getStats2(axieClass, abilityClassesNames.slice(0,6))
        axieStats = [axieStats[0] -31, axieStats[1] -31, axieStats[2] -27, axieStats[3] -27]

        allOHE = [].concat(0,axieStats, AxieUtils.OHEAxieClass(axieClass), OHEAbilityClassesList, OHEAbilityNames(childTraits))
        simResultsOHE.push({"data": allOHE})
    }
  
    return simResultsOHE
}
async function uploadSim(axieArray) {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");

    dbo.collection('axies_breed_sim').remove({})
    dbo.collection('axies_breed_sim').insertMany(axieArray, {})
    
  
    return done = true
}

module.exports = {
    sim,
    uploadSim,
}