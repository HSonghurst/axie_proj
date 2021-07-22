/*
Get transaction data
Get Axie data

log the data to the database


Run analytics on the databse



*/

axieEndpoint = "https://axieinfinity.com/graphql-server-v2/graphql"


const { request, gql } = require('graphql-request')
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

async function checkAxieListings(){
    AxieTransactionArray = []
  
      const query = gql`
      query GetAxieLatest($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
        axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
          total
          results {
            ...AxieRowData
            __typename
          }
          __typename
        }
      }
      
      fragment AxieRowData on Axie {
        id
        image
        class
        name
        birthDate
        genes
        owner
        class
        stage
        title
        breedCount
        level
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
      
    `
    const variables = 
    {
        "from": 0,
        "size": 20,
        "sort": "Latest",
        "auctionType": "Sale"
      }
      
    
    let returnData = await request(axieEndpoint, query, variables).then(data => {return data}).catch(err => console.log)
      if (typeof returnData.axies !== 'undefined'){
        AxieTransactionArray = AxieTransactionArray.concat(returnData.axies.results)
      } else {
        checkAxieListings()
      }
    
    
    return AxieTransactionArray
}


async function uploadAxieData(axieArray){
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");

    for (i=0;i <axieArray.length; i++){
      dbo.collection('axies_latest').updateOne({id: axieArray[i].id}, {$set: axieArray[i]}, { upsert: true })
    }
    
    return done = true
}

async function removeEntries() {
  const db = await MongoClient.connect(url);
  const dbo = db.db("mydb");
  dbo.collection('axies_latest').remove({})

}


async function main() {
  t1 = new Date()
  while (true) {
    
    t2 = new Date()

    if ((t2 -t1)/1000 > 30 ) {
      removeEntries()
      t1 = new Date()
    }
    res = await checkAxieListings()

    done = await uploadAxieData(res)

    console.log(done)

  }
    
}
main()
