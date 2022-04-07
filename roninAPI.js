
const fetch = require('node-fetch');
const martketplaceContract = "0x213073989821f738a7ba3520c3d31a1f9ad31bbd"
const ETHPrice = require('./ETHPrice');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

async function getTxHashes(block) {

    result = await fetch("https://explorer.roninchain.com/_next/data/agwuR1HgqJ1TmwK1-7hel/block/"+block+"/txs.json?blockID=" + block)
    .then(res => res.json()) // expecting a json response
    .then(json => {return json})
    .catch(err => {console.log(err); return 0})

    return result
}
async function getMoreTxData(hash) {
    result = await fetch("https://explorer.roninchain.com/_next/data/agwuR1HgqJ1TmwK1-7hel/tx/" + hash + ".json")
    .then(res => res.json()) // expecting a json response
    .then(json => {return json})
    .catch(err => {console.log(err); return 0})

    return result
}

async function getMarketplaceHashes(data) {
    txs = data['pageProps']['transactions']['results']
    block = parseInt(data['pageProps']['blockID'])
    
    returnList = []

    for (i in txs) {
        if (txs[i]['to'] == martketplaceContract && txs[i]['input'].substring(0,10) == "0x4d51bfc4") {

            moreData = await getMoreTxData(txs[i]['hash'])


            if (moreData == 0) {
                continue
            } else if (moreData['pageProps'] == undefined) {
                continue
            }else if (moreData['pageProps']['transaction']['logs'].length == 0) {
                continue
            }
            

            returnObj = {"id": parseInt(moreData['pageProps']['transaction']['logs'][0]['topics'][3],16),
                         "priceETH": parseInt(txs[i]['input'].substring(187, 202), 16) /Math.pow(10,18),
                         "timestamp": moreData['pageProps']['transaction']['timestamp'],
                         "block": block}

            returnList.push(returnObj)
            
        }
    }
    return returnList
}

function attachUSDPrice(data) {
    eq = 0
    for (k in ETHPrice.ETHPrice) {
        if (data[0].timestamp < k) {
            eq = ETHPrice.ETHPrice[k]
            break
        }
    }

    for (i in data) {
        data[i]['priceUSD'] = data[i]['priceETH'] *eq
    }
    return data
}

async function getRecentBlock() {

    result = await fetch("https://explorer.roninchain.com/api/blocks/latest")
    .then(res => res.json()) // expecting a json response
    .then(json => {return json})

    return result["number"]
    //
}

async function checkRecentMongoBlock() {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
  
    var cursor = await dbo.collection('axies_txr_06_08').find({}).sort({"block": 1}).toArray().catch((err) => {
        console.log(err)
    })
  
    cursor = cursor[cursor.length -1]
    
    return cursor.block 
  }


async function getTxFromBlock(block) {
    res = await getTxHashes(block)

    if(res == 0 ) {
        return 0
    }

    res = await getMarketplaceHashes(res)

    if(res.length == 0 ) {
        return 0
    }
    res = attachUSDPrice(res)

    return res
}

async function uploadAxieData(axieArray) {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
  
    dbo.collection('axies_txr_06_08').insertMany(axieArray, {}).catch( (err) => {
        console.log(err)
    })
    
  
    return done = true
}

/*
5430000
5420000
5410000
5400000
5390000
5380000

5473000 day start

5480000


5540176
5555000
*/
const delay = ms => new Promise(res => setTimeout(res, ms));

async function catchUp() {

    cond = true

    mostRecentBlock = await getRecentBlock()
    block = await checkRecentMongoBlock() + 1

    while(cond) {

        

        blockDiff = mostRecentBlock - block

        if (blockDiff < 200) {
            console.log("network catching up...")
            await delay(60000)
            mostRecentBlock = await getRecentBlock()
            continue
        }

        axies = await getTxFromBlock(block.toString())
        if (axies != 0) {
            done = await uploadAxieData(axies)
        }

        if (block%1000== 0) {
            console.log("Block:", block)
        }


        console.log(block)
        
        block +=1
    }
}

catchUp()