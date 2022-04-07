
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const concurrently = require('concurrently');

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
  

async function findGapsInTs() {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
  
    var cursor = await dbo.collection('axies_tester_2').find({}).toArray();
    var cursor1 = await dbo.collection('axies_txr_06_08').find({}).toArray();

    cursor.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });
      cursor1.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });

    startEndList = [[findWithAttr(cursor1, "timestamp", cursor[cursor.length-1].timestamp), cursor1.length-1]]
    /*

    for (i =0;i< cursor1.length; i++) {
        haveit = false
        for (k =0 ; k<cursor.length; k++) {
            f = cursor[k].timestamp
            if(cursor1[i].timestamp == cursor[k].timestamp && cursor1[i].id == cursor[k].id) {
                haveit=true
                break
            }
        }
        if (haveit==false) {
            startEndList.push([i, i+1])
        }
    }
    */
  /*
    for (i =1;i< cursor.length -1; i++) {
      if (cursor[i].timestamp - cursor[i-1].timestamp > 3){
        if (findWithAttr(cursor1, "timestamp", cursor[i].timestamp) - findWithAttr(cursor1, "timestamp", cursor[i-1].timestamp) > 2) {
            if(cursor1[findWithAttr(cursor1, "timestamp", cursor[i].timestamp) -1].timestamp != cursor1[findWithAttr(cursor1, "timestamp", cursor[i].timestamp)].timestamp && cursor1[findWithAttr(cursor1, "timestamp", cursor[i-1].timestamp) +1].timestamp != cursor1[findWithAttr(cursor1, "timestamp", cursor[i-1].timestamp)].timestamp) {
                startEndList.push([ findWithAttr(cursor1, "timestamp", cursor[i-1].timestamp), findWithAttr(cursor1, "timestamp", cursor[i].timestamp)])
                console.log(cursor1.slice(findWithAttr(cursor1, "timestamp", cursor[i-1].timestamp), findWithAttr(cursor1, "timestamp", cursor[i].timestamp)))
            }
        }
      }
    }
  
    bigGap = (cursor1.length-1) - findWithAttr(cursor1, "timestamp", cursor[cursor.length-1].timestamp)
    bigStartEndList = []

    if (bigGap > 10000) {
        divisions = parseInt(bigGap/10)
        
        for (i=5; i>1; i--) {
            bigStartEndList.push([ (cursor1.length-1) - divisions*i, (cursor1.length-1) - divisions*(i-1)])
        }

    } else {
        divisions = 2000

        for (i=Math.floor(bigGap/divisions); i>1; i--) {
            bigStartEndList.push([ (cursor1.length-1) - divisions*i, (cursor1.length-1) - divisions*(i-1)])
        }
    }
      
    //return this one at some point startEndList

    finalStartEndList = bigStartEndList.concat(startEndList)
    */
   finalStartEndList = startEndList
   /*
    counter =0
    for (i =0; i<startEndList.length-1; i++) {
        if(startEndList[i][1] == startEndList[i+1][0]) {
            counter++
        } else {
            if (counter >0) {
                finalStartEndList.push([startEndList[i-counter][0], startEndList[i][1]])
            }
            counter=0
        }
    }
    console.log(startEndList)
    console.log(finalStartEndList)
    */

    return finalStartEndList
  }


function flattengaps(gaps) {
    newgaps = " "
    for(i=0; i < gaps.length; i++) {
        newgaps = newgaps.concat(gaps[i][0].toString())
        newgaps = newgaps.concat(" ")
        newgaps = newgaps.concat(gaps[i][1].toString())
        newgaps = newgaps.concat(" ")
    }
    return newgaps
}


function runChildren(gaps1, gaps2, gaps3) {

    gaps1 = flattengaps(gaps1)
    gaps2 = flattengaps(gaps2)
    gaps3 = flattengaps(gaps3)

    arg1 = "start node GetAxieStatsForRonin.js".concat(gaps1)
    arg2 = "start node GetAxieStatsForRonin.js".concat(gaps2)
    arg3 = "start node GetAxieStatsForRonin.js".concat(gaps3)
    
    concurrently([arg1, arg2, arg3])
}
function runChild(gaps1) {

    gaps1 = flattengaps(gaps1)


    arg1 = "start node GetAxieStatsForRonin.js".concat(gaps1)

    
    concurrently([arg1])
}



async function main() {
    gaps = await findGapsInTs()
    totalDiff=0
    for (i in gaps) {
        totalDiff += gaps[i][1] -gaps[i][0]
    }
    sep = parseInt(gaps.length/3)
    gaps1 = gaps.slice(0,sep)
    gaps2 = gaps.slice(sep+1,2*sep)
    gaps3 = gaps.slice((2*sep)+1, (3*sep)-1)

    console.log(totalDiff)

    runChild(gaps)
    
    //runChildren(gaps1, gaps2, gaps3)
    
}

main()