
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
    
    returnList = []

    for (i in txs) {
        if (txs[i]['to'] == martketplaceContract && txs[i]['input'].substring(0,10) == "0x4d51bfc4") {

            moreData = await getMoreTxData(txs[i]['hash'])


            if (moreData['pageProps']['transaction'] == undefined) {
                continue
            } else if (moreData['pageProps']['transaction']['logs'].length == 0) {
                continue
            }

            returnObj = {id: parseInt(moreData['pageProps']['transaction']['logs'][0]['topics'][3],16),
                         priceETH: parseInt(txs[i]['input'].substring(187, 202), 16) /Math.pow(10,18),
                         timestamp: moreData['pageProps']['transaction']['timestamp']}

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
    .then(json => {return json});

    return result["number"]
    //
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
  
    dbo.collection('axies_tx_ronin').insertMany(axieArray, {})
    
  
    return done = true
}

async function main() {

    block = 5439123

    while(true) {
        
        //mostRecentBlock = await getRecentBlock()

        axies = await getTxFromBlock(block.toString())
        if (axies != 0) {
            done = await uploadAxieData(axies)
        }

        if (block%1000== 0) {
            console.log("Block:", block)
        }
        console.log(block)
        block -= 1
    }
}

main()


/*Function:settleAuction(address,address,uint256,uint256,uint256) 
Arguments:
[0]-[_seller]: 0x39b7820c1e4026df1e14b382f9c0644702bb8bec
[1]-[_token]: 0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5
[2]-[_bidAmount]: 153564351851851851
[3]-[_listingIndex]: 1609995
[4]-[_listingState]: 3753169533874152598565366874268438389456992745682145119212071756731941296561

input:'0x4d51bfc4000000000000000000000000 39b7820c1e4026df1e14b382f9c0644702bb8bec 000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5 000000000000000000000000000000000000000000000000022191f6e24af04b 000000000000000000000000000000000000000000000000000000000018910b084c37fb32394724c2557cc73736cacd336e814f10b3206a348c396db1ca99b1'

*/