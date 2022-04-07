/*
Get transaction data
Get Axie data

log the data to the database


Run analytics on the databse



*/

axieEndpoint = "https://axieinfinity.com/graphql-server-v2/graphql"
const BigNumber = require('bignumber.js');
const ETHPrice = require('./ETHPrice');
const args = process.argv;
const {
  request,
  gql
} = require('graphql-request')
var datetimenow = new Date();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const GeneUtils = require('./makeBDF.js')

async function getAxieDetails(id) {
  const query = gql `
  query GetAxieDetail($axieId: ID!) {
  axie(axieId: $axieId) {
    id
    genes
    breedCount
    transferHistory {
      total
      results {
        from
        to
        txHash
        timestamp
        withPrice
        withPriceUsd
        fromProfile {
          name
        }
        toProfile {
          name
        }
      }
    }
  }
}
  `
  const variables = {
  "axieId": id
  }


  let returnData = await request(axieEndpoint, query, variables).then(data => {
  return data
  }).catch(err => console.log)
return returnData.axie
}

async function uploadAxieData(axieArray) {
  const db = await MongoClient.connect(url);
  const dbo = db.db("mydb");

  for (i = 0; i < axieArray.length; i++) {
    dbo.collection('axies_tester_2').updateOne({"id": axieArray[i].id, "data.1": axieArray[i].data[1]}, {$set: axieArray[i]}, {upsert: true})}

  return done = true
}



const delay = ms => new Promise(res => setTimeout(res, ms));

async function uploadSpAxie(id) {
  ares = await downloadAxieData(id)
  done = await uploadAxieData(ares)
}

classBaseStats = {"aquatic":[39,39,35,27],
    "beast": [31,35,31,43],
    "bird":	[27,43,35,35],
    "bug": [35,31,35,39],
    "plant": [43,31,31,35],
    "reptile": [39,35,31,35],
    "dawn":	[35,35,39,31],
    "dusk":	[43,39,27,31],
    "mech":	[31,39,43,27],
}

partBaseStats = {"aquatic":[1,3,0,0],
"beast": [0,1,0,3],
"bird":	[0,3,0,1],
"bug": [1,0,0,3],
"plant": [3,0,0,1],
"reptile": [3,1,0,0],
}


function addLists(list1, list2) {
  newList = []
  for (f = 0; f< list1.length; f++) {        
      newList = newList.concat(list1[f] + list2[f])
  }
  return newList
}


function getStats(axieClass, partClasses) {
    
    baseStats = classBaseStats[axieClass]
    partStats = [0,0,0,0]
    for (i=0;i <partClasses.length; i++) {
        partStats = addLists(partStats, partBaseStats[partClasses[i]])
    }
    return addLists(baseStats, partStats)
}

function OHEAxie(axie) {
    axieGenes = GeneUtils.genesToBin(new BigNumber(axie.genes))

    axieBreedCount = axie.breedCount

    axiePrunedTraits = GeneUtils.getPrunedTraits(axieGenes)

    if (axiePrunedTraits.cls == "???") { return 0}

    axieTraits = GeneUtils.getTraits(axieGenes)

    axieAbilityNamesOHE = GeneUtils.OHEAbilityNames(axieTraits)

    axieStats = getStats(axiePrunedTraits.cls, [axiePrunedTraits.ears.d, axiePrunedTraits.back.d, axiePrunedTraits.eyes.d, axiePrunedTraits.horn.d, axiePrunedTraits.mouth.d, axiePrunedTraits.tail.d,])

    axieStats = [axieStats[0] -31, axieStats[1] -31, axieStats[2] -27, axieStats[3] -27]

    axieClassOHE = GeneUtils.OHEAxieClass(axiePrunedTraits.cls)

    abilityClasses = GeneUtils.OHEAbilityClasses(axiePrunedTraits)

    allOHE = [].concat(axieBreedCount, axieStats, axieClassOHE, abilityClasses[0], abilityClasses[1], abilityClasses[2], axieAbilityNamesOHE)

    return allOHE
}

async function checkRecentTimestamp() {
  const db = await MongoClient.connect(url);
  const dbo = db.db("mydb");

  var cursor = await dbo.collection('axies_tester_2').find({}).sort({"timestamp": 1}).toArray();

  cursor = cursor[cursor.length -1]
  
  
  return cursor.timestamp 
}


async function getRoninAPIData(se1, se2) {
  const db = await MongoClient.connect(url);
  const dbo = db.db("mydb");

  var cursor = await dbo.collection('axies_txr_06_08').find({}).sort({"timestamp": 1}).toArray();

  return cursor.slice(se1, se2)
}

function convertETHUSD(data) {
  eq = 0
  priceList = []
  for(i in data) {
    for (k in ETHPrice.ETHPrice) {
      if (data[i]['timestamp'] < k) {
          priceList.push(data[i]['priceETH'] * ETHPrice.ETHPrice[k])
          data[i]['priceUSD'] = parseInt(data[i]['priceETH'] * ETHPrice.ETHPrice[k])
          break
      }
    }
  }
  return [data, priceList]
}

function calculatePriceStats(priceList) {

  avgList = []

  for (var k in priceList) {
      if (k==0) {avgList.push(priceList[k]); continue}
      cut = priceList.slice(Math.max(k-300, 0), k)
      sum = 0
      for( j in cut) {
          sum+=cut[j]
      }
      average = parseInt(sum/cut.length)
      avgList.push(average)
  }
  return avgList
}

async function main(se1se2) {

    //startEndList = await findGapsInTs()

    //ts = await checkRecentTimestamp()
    for (index=0; index <se1se2.length; index+=2) {
      se1 = se1se2[index]
      se2 = se1se2[index+1]

      rdata = await getRoninAPIData(se1, se2)

      for (a in rdata){
        obj = {}

        res = await getAxieDetails(rdata[a]['id'])
        if (res == undefined) { continue}
        priceUSD = 0
        for (i in res['transferHistory']['results']) {
          if (res['transferHistory']['results'][i].timestamp == rdata[a]["timestamp"]) {
            priceUSD = parseInt(res['transferHistory']['results'][i]['withPriceUsd'].split("."))
          }
        }
        axie = OHEAxie(res)
        if (axie == 0) { continue}
        
        obj['id'] = rdata[a]['id']
        obj["data"] = [axie, priceUSD]
        obj["timestamp"] = rdata[a]["timestamp"]

        uploadAxieData([obj])

        console.log("Done", obj['id'], obj["timestamp"], a, "out of", se2-se1, "abs beginning", se1)
        
      }      
      
  }
  process.exit(0)
}

main(args.slice(2))

