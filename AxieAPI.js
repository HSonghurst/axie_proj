/*
Get transaction data
Get Axie data

log the data to the database


Run analytics on the databse



*/

axieEndpoint = "https://axieinfinity.com/graphql-server-v2/graphql"


const {
  request,
  gql
} = require('graphql-request')
var datetimenow = new Date();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

/*
async function getDataFromDb(){
    uniTx = []
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");

    var cursor = await dbo.collection('axies').find({to: uniRouterV2}).toArray();
        
    for(i=0; i<cursor.length -1; i++) {
        if ((datetimenow -cursor[i].datetime) < timeDelayAccept) {
            cursor[i]["inputParsed"] = parseUniTx(cursor[i].input)
            cursor[i]["tokenData"] = []
            uniTx.push(cursor[i])
        }
    }
    
    return uniTx  
}
*/

async function downloadAxieTransactionData() {
  AxieTransactionArray = []
  for (i = 0; i < 5; i++) {
    const query = gql `
      query GetRecentlyAxiesSold($from: Int, $size: Int) {
        settledAuctions {
          axies(from: $from, size: $size) {
            total
            results {
              ...AxieSettledBrief
              transferHistory {
                ...TransferHistoryInSettledAuction
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      
      fragment AxieSettledBrief on Axie {
        id
        name
        image
        class
        breedCount
        chain
        genes
        owner
        birthDate
        bodyShape
        class
        sireId
        sireClass
        matronId
        matronClass
        stage
        title
        level
        figure {
          atlas
          model
          image
          __typename
        }
        parts {
          id
          name
          class
          type
          specialGenes
          stage
          abilities {
            id
            name
            attack
            defense
            energy
            description
            backgroundUrl
            effectIconUrl
            __typename
          }
          __typename
        }
        stats {
          hp
          speed
          skill
          morale
          __typename
        }
        __typename
      }
      
      fragment TransferHistoryInSettledAuction on TransferRecords {
        total
        results {
          ...TransferRecordInSettledAuction
          __typename
        }
        __typename
      }
      
      fragment TransferRecordInSettledAuction on TransferRecord {
        from
        to
        txHash
        timestamp
        withPrice
        withPriceUsd
        fromProfile {
          name
          __typename
        }
        toProfile {
          name
          __typename
        }
        __typename
      }
      
      
    `
    const variables = {
      "from": i * 20,
      "size": 20,
      "sort": "Latest",
      "auctionType": "Sale"
    }


    let returnData = await request(axieEndpoint, query, variables).then(data => {
      return data
    }).catch(err => console.log)
    if (typeof returnData.settledAuctions !== 'undefined') {
      AxieTransactionArray = AxieTransactionArray.concat(returnData.settledAuctions.axies.results)
    } else {
      console.log('failed to get data from API')
      downloadAxieTransactionData()
    }
    
  }



  return AxieTransactionArray
}

async function downloadAxieData(idList) {
  AxieDetailArray = []
  for (i = 0; i < idList.length; i++) {
    const query = gql `
    query GetAxieDetail($axieId: ID!) {
      axie(axieId: $axieId) {
        ...AxieDetail
        transferHistory {
          ...TransferHistoryInSettledAuction
          __typename
        }
        __typename
      }
    }
    
    fragment AxieDetail on Axie {
      id
      image
      class
      chain
      name
      genes
      owner
      birthDate
      bodyShape
      class
      sireId
      sireClass
      matronId
      matronClass
      stage
      title
      breedCount
      level
      
      figure {
        atlas
        model
        image
        __typename
      }
      parts {
        ...AxiePart
        __typename
      }
      stats {
        ...AxieStats
        __typename
      }
      auction {
        ...AxieAuction
        __typename
      }
      ownerProfile {
        name
        __typename
      }
      battleInfo {
        ...AxieBattleInfo
        __typename
      }
      children {
        id
        name
        class
        image
        title
        stage
        __typename
      }
      __typename
    }
    
    fragment AxieBattleInfo on AxieBattleInfo {
      banned
      banUntil
      level
      __typename
    }
    
    fragment AxiePart on AxiePart {
      id
      name
      class
      type
      specialGenes
      stage
      abilities {
        ...AxieCardAbility
        __typename
      }
      __typename
    }
    
    fragment AxieCardAbility on AxieCardAbility {
      id
      name
      attack
      defense
      energy
      description
      backgroundUrl
      effectIconUrl
      __typename
    }
    
    fragment AxieStats on AxieStats {
      hp
      speed
      skill
      morale
      __typename
    }
    
    fragment AxieAuction on Auction {
      startingPrice
      endingPrice
      startingTimestamp
      endingTimestamp
      duration
      timeLeft
      currentPrice
      currentPriceUSD
      suggestedPrice
      seller
      listingIndex
      state
      __typename
    }
    fragment TransferHistoryInSettledAuction on TransferRecords {
      total
      results {
        ...TransferRecordInSettledAuction
        __typename
      }
      __typename
    }
    
    fragment TransferRecordInSettledAuction on TransferRecord {
      from
      to
      txHash
      timestamp
      withPrice
      withPriceUsd
      fromProfile {
        name
        __typename
      }
      toProfile {
        name
        __typename
      }
      __typename
    }
    
    `
    const variables = {
      "axieId": idList[i]
    }


    let returnData = await request(axieEndpoint, query, variables).then(data => {
      return data
    }).catch(err => console.log)
    AxieDetailArray.push(returnData.axie)

  }

  return AxieDetailArray
}

async function uploadAxieData(axieArray) {
  const db = await MongoClient.connect(url);
  const dbo = db.db("mydb");

  for (i = 0; i < axieArray.length; i++) {
    dbo.collection('axies_25_08').updateOne({
      id: axieArray[i].id
    }, {
      $set: axieArray[i]
    }, {
      upsert: true
    })
  }

  return done = true
}

function getIdFromObjList(objList) {
  idList = []
  for (i = 0; i < objList.length; i++) {
    idList.push(objList[i].id)
  }

  return idList
}

function mergeTransDetail(res, ares) {
  final = []
  for (i = 0; i < res.length; i++) {
    final.push({
      ...res[i],
      ...ares[i]
    })
  }
  return final
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function uploadSpAxie(id) {
  ares = await downloadAxieData(id)
  done = await uploadAxieData(ares)
}

async function main() {
  count = 0
  while (true) {
    res = await downloadAxieTransactionData()

    //idList = getIdFromObjList(res)

    //ares = await downloadAxieData(idList)


    //inal = mergeTransDetail(res, ares)

    done = await uploadAxieData(res)

    await delay(10000)
    console.log("Downloaded Axie TX Data, iter:", count)
    count += 1

  }

}
main()
//uploadSpAxie(["2109731", "1552825"])