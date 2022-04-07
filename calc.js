const {
    request,
    gql
  } = require('graphql-request')
const BigNumber = require('bignumber.js');
var Sim = require('./sim.js')


binarytraits = {
    "beast": {
        "eyes": {
            "001000": {
                "global": "Puppy"
            },
            "000010": {
                "global": "Zeal",
                "mystic": "Calico Zeal"
            },
            "000100": {
                "global": "Little Peas",
                "xmas": "Snowflakes"
            },
            "001010": {
                "global": "Chubby"
            }
        },
        "ears": {
            "001010": {
                "global": "Puppy"
            },
            "000100": {
                "global": "Nut Cracker"
            },
            "000010": {
                "global": "Nyan",
                "mystic": "Pointy Nyan"
            },
            "000110": {
                "global": "Innocent Lamb",
                "xmas": "Merry Lamb"
            },
            "001000": {
                "global": "Zen"
            },
            "001100": {
                "global": "Belieber"
            }
        },
        "back": {
            "001000": {
                "japan": "Hamaya",
                "global": "Risky Beast"
            },
            "000100": {
                "global": "Hero"
            },
            "000110": {
                "global": "Jaguar"
            },
            "000010": {
                "mystic": "Hasagi",
                "global": "Ronin"
            },
            "001010": {
                "global": "Timber"
            },
            "001100": {
                "global": "Furball"
            }
        },
        "horn": {
            "001000": {
                "japan": "Umaibo",
                "global": "Pocky"
            },
            "000100": {
                "global": "Imp",
                "japan": "Kendama"
            },
            "000110": {
                "global": "Merry"
            },
            "000010": {
                "mystic": "Winter Branch",
                "global": "Little Branch"
            },
            "001010": {
                "global": "Dual Blade"
            },
            "001100": {
                "global": "Arco"
            }
        },
        "tail": {
            "000100": {
                "global": "Rice"
            },
            "000010": {
                "global": "Cottontail",
                "mystic": "Sakura Cottontail"
            },
            "000110": {
                "global": "Shiba"
            },
            "001000": {
                "global": "Hare"
            },
            "001010": {
                "global": "Nut Cracker"
            },
            "001100": {
                "global": "Gerbil"
            }
        },
        "mouth": {
            "000100": {
                "global": "Goda"
            },
            "000010": {
                "global": "Nut Cracker",
                "mystic": "Skull Cracker"
            },
            "001000": {
                "global": "Axie Kiss"
            },
            "001010": {
                "global": "Confident"
            }
        }
    },
    "bug": {
        "mouth": {
            "001000": {
                "japan": "Kawaii",
                "global": "Cute Bunny"
            },
            "000010": {
                "global": "Mosquito",
                "mystic": "Feasting Mosquito"
            },
            "000100": {
                "global": "Pincer"
            },
            "001010": {
                "global": "Square Teeth"
            }
        },
        "horn": {
            "001010": {
                "global": "Parasite"
            },
            "000010": {
                "global": "Lagging",
                "mystic": "Laggingggggg"
            },
            "000110": {
                "global": "Caterpillars"
            },
            "000100": {
                "global": "Antenna"
            },
            "001000": {
                "global": "Pliers"
            },
            "001100": {
                "global": "Leaf Bug"
            }
        },
        "tail": {
            "001000": {
                "global": "Gravel Ant"
            },
            "000010": {
                "mystic": "Fire Ant",
                "global": "Ant"
            },
            "000100": {
                "global": "Twin Tail"
            },
            "000110": {
                "global": "Fish Snack",
                "japan": "Maki"
            },
            "001010": {
                "global": "Pupae"
            },
            "001100": {
                "global": "Thorny Caterpillar"
            }
        },
        "back": {
            "001000": {
                "global": "Sandal"
            },
            "000010": {
                "global": "Snail Shell",
                "mystic": "Starry Shell"
            },
            "000100": {
                "global": "Garish Worm",
                "xmas": "Candy Canes"
            },
            "000110": {
                "global": "Buzz Buzz"
            },
            "001010": {
                "global": "Scarab"
            },
            "001100": {
                "global": "Spiky Wing"
            }
        },
        "ears": {
            "000010": {
                "global": "Larva",
                "mystic": "Vector"
            },
            "000110": {
                "global": "Ear Breathing"
            },
            "000100": {
                "global": "Beetle Spike"
            },
            "001000": {
                "global": "Leaf Bug"
            },
            "001010": {
                "global": "Tassels"
            },
            "001100": {
                "japan": "Mon",
                "global": "Earwing"
            }
        },
        "eyes": {
            "000010": {
                "global": "Bookworm",
                "mystic": "Broken Bookworm"
            },
            "000100": {
                "global": "Neo"
            },
            "001010": {
                "global": "Kotaro?"
            },
            "001000": {
                "global": "Nerdy"
            }
        }
    },
    "aquatic": {
        "eyes": {
            "001000": {
                "global": "Gero"
            },
            "000010": {
                "global": "Sleepless",
                "mystic": "Insomnia",
                "japan": "Yen"
            },
            "000100": {
                "global": "Clear"
            },
            "001010": {
                "global": "Telescope"
            }
        },
        "mouth": {
            "001000": {
                "global": "Risky Fish"
            },
            "000100": {
                "global": "Catfish"
            },
            "000010": {
                "global": "Lam",
                "mystic": "Lam Handsome"
            },
            "001010": {
                "global": "Piranha",
                "japan": "Geisha"
            }
        },
        "horn": {
            "001100": {
                "global": "Shoal Star"
            },
            "000110": {
                "global": "Clamshell"
            },
            "000010": {
                "global": "Babylonia",
                "mystic": "Candy Babylonia"
            },
            "000100": {
                "global": "Teal Shell"
            },
            "001000": {
                "global": "Anemone"
            },
            "001010": {
                "global": "Oranda"
            }
        },
        "ears": {
            "000010": {
                "global": "Nimo",
                "mystic": "Red Nimo"
            },
            "000110": {
                "global": "Bubblemaker"
            },
            "000100": {
                "global": "Tiny Fan"
            },
            "001000": {
                "global": "Inkling"
            },
            "001010": {
                "global": "Gill"
            },
            "001100": {
                "global": "Seaslug"
            }
        },
        "tail": {
            "000010": {
                "global": "Koi",
                "mystic": "Kuro Koi",
                "japan": "Koinobori"
            },
            "000110": {
                "global": "Tadpole"
            },
            "000100": {
                "global": "Nimo"
            },
            "001010": {
                "global": "Navaga"
            },
            "001000": {
                "global": "Ranchu"
            },
            "001100": {
                "global": "Shrimp"
            }
        },
        "back": {
            "000010": {
                "global": "Hermit",
                "mystic": "Crystal Hermit"
            },
            "000100": {
                "global": "Blue Moon"
            },
            "000110": {
                "global": "Goldfish"
            },
            "001010": {
                "global": "Anemone"
            },
            "001000": {
                "global": "Sponge"
            },
            "001100": {
                "global": "Perch"
            }
        }
    },
    "bird": {
        "ears": {
            "001100": {
                "japan": "Karimata",
                "global": "Risky Bird"
            },
            "000010": {
                "global": "Pink Cheek",
                "mystic": "Heart Cheek"
            },
            "000100": {
                "global": "Early Bird"
            },
            "000110": {
                "global": "Owl"
            },
            "001010": {
                "global": "Curly"
            },
            "001000": {
                "global": "Peace Maker"
            }
        },
        "tail": {
            "001010": {
                "japan": "Omatsuri",
                "global": "Granma's Fan"
            },
            "000010": {
                "global": "Swallow",
                "mystic": "Snowy Swallow"
            },
            "000100": {
                "global": "Feather Fan"
            },
            "000110": {
                "global": "The Last One"
            },
            "001000": {
                "global": "Cloud"
            },
            "001100": {
                "global": "Post Fight"
            }
        },
        "back": {
            "000010": {
                "global": "Balloon",
                "mystic": "Starry Balloon"
            },
            "000110": {
                "global": "Raven"
            },
            "000100": {
                "global": "Cupid",
                "japan": "Origami"
            },
            "001000": {
                "global": "Pigeon Post"
            },
            "001010": {
                "global": "Kingfisher"
            },
            "001100": {
                "global": "Tri Feather"
            }
        },
        "horn": {
            "000110": {
                "global": "Trump"
            },
            "000010": {
                "global": "Eggshell",
                "mystic": "Golden Shell"
            },
            "000100": {
                "global": "Cuckoo"
            },
            "001000": {
                "global": "Kestrel"
            },
            "001010": {
                "global": "Wing Horn"
            },
            "001100": {
                "global": "Feather Spear",
                "xmas": "Spruce Spear"
            }
        },
        "mouth": {
            "000010": {
                "global": "Doubletalk",
                "mystic": "Mr. Doubletalk"
            },
            "000100": {
                "global": "Peace Maker"
            },
            "001000": {
                "global": "Hungry Bird"
            },
            "001010": {
                "global": "Little Owl"
            }
        },
        "eyes": {
            "000010": {
                "global": "Mavis",
                "mystic": "Sky Mavis"
            },
            "000100": {
                "global": "Lucas"
            },
            "001010": {
                "global": "Robin"
            },
            "001000": {
                "global": "Little Owl"
            }
        }
    },
    "reptile": {
        "eyes": {
            "001010": {
                "japan": "Kabuki",
                "global": "Topaz"
            },
            "000100": {
                "global": "Tricky"
            },
            "000010": {
                "global": "Gecko",
                "mystic": "Crimson Gecko"
            },
            "001000": {
                "global": "Scar",
                "japan": "Dokuganryu"
            }
        },
        "mouth": {
            "001000": {
                "global": "Razor Bite"
            },
            "000100": {
                "global": "Kotaro"
            },
            "000010": {
                "global": "Toothless Bite",
                "mystic": "Venom Bite"
            },
            "001010": {
                "global": "Tiny Turtle",
                "japan": "Dango"
            }
        },
        "ears": {
            "001000": {
                "global": "Small Frill"
            },
            "000110": {
                "global": "Curved Spine"
            },
            "000100": {
                "global": "Friezard"
            },
            "000010": {
                "global": "Pogona",
                "mystic": "Deadly Pogona"
            },
            "001010": {
                "global": "Swirl"
            },
            "001100": {
                "global": "Sidebarb"
            }
        },
        "back": {
            "001000": {
                "global": "Indian Star"
            },
            "000010": {
                "global": "Bone Sail",
                "mystic": "Rugged Sail"
            },
            "000100": {
                "global": "Tri Spikes"
            },
            "000110": {
                "global": "Green Thorns"
            },
            "001010": {
                "global": "Red Ear"
            },
            "001100": {
                "global": "Croc"
            }
        },
        "tail": {
            "000100": {
                "global": "Iguana"
            },
            "000010": {
                "global": "Wall Gecko",
                "mystic": "Escaped Gecko"
            },
            "000110": {
                "global": "Tiny Dino"
            },
            "001000": {
                "global": "Snake Jar",
                "xmas": "December Surprise"
            },
            "001010": {
                "global": "Gila"
            },
            "001100": {
                "global": "Grass Snake"
            }
        },
        "horn": {
            "000010": {
                "global": "Unko",
                "mystic": "Pinku Unko"
            },
            "000110": {
                "global": "Cerastes"
            },
            "000100": {
                "global": "Scaly Spear"
            },
            "001010": {
                "global": "Incisor"
            },
            "001000": {
                "global": "Scaly Spoon"
            },
            "001100": {
                "global": "Bumpy"
            }
        }
    },
    "plant": {
        "tail": {
            "001000": {
                "global": "Yam"
            },
            "000010": {
                "global": "Carrot",
                "mystic": "Namek Carrot"
            },
            "000100": {
                "global": "Cattail"
            },
            "000110": {
                "global": "Hatsune"
            },
            "001010": {
                "global": "Potato Leaf"
            },
            "001100": {
                "global": "Hot Butt"
            }
        },
        "mouth": {
            "000100": {
                "global": "Zigzag",
                "xmas": "Rudolph"
            },
            "000010": {
                "global": "Serious",
                "mystic": "Humorless"
            },
            "001000": {
                "global": "Herbivore"
            },
            "001010": {
                "global": "Silence Whisper"
            }
        },
        "eyes": {
            "000010": {
                "global": "Papi",
                "mystic": "Dreamy Papi"
            },
            "000100": {
                "global": "Confused"
            },
            "001010": {
                "global": "Blossom"
            },
            "001000": {
                "global": "Cucumber Slice"
            }
        },
        "ears": {
            "000010": {
                "global": "Leafy",
                "mystic": "The Last Leaf"
            },
            "000110": {
                "global": "Rosa"
            },
            "000100": {
                "global": "Clover"
            },
            "001000": {
                "global": "Sakura",
                "japan": "Maiko"
            },
            "001010": {
                "global": "Hollow"
            },
            "001100": {
                "global": "Lotus"
            }
        },
        "back": {
            "000110": {
                "global": "Bidens"
            },
            "000100": {
                "global": "Shiitake",
                "japan": "Yakitori"
            },
            "000010": {
                "global": "Turnip",
                "mystic": "Pink Turnip"
            },
            "001010": {
                "global": "Mint"
            },
            "001000": {
                "global": "Watering Can"
            },
            "001100": {
                "global": "Pumpkin"
            }
        },
        "horn": {
            "000100": {
                "global": "Beech",
                "japan": "Yorishiro"
            },
            "000110": {
                "global": "Rose Bud"
            },
            "000010": {
                "global": "Bamboo Shoot",
                "mystic": "Golden Bamboo Shoot"
            },
            "001010": {
                "global": "Cactus"
            },
            "001000": {
                "global": "Strawberry Shortcake"
            },
            "001100": {
                "global": "Watermelon"
            }
        }
    }
}

classBaseStats = {"Aquatic":[39,39,35,27],
    "Beast": [31,35,31,43],
    "Bird":	[27,43,35,35],
    "Bug": [35,31,35,39],
    "Plant": [43,31,31,35],
    "Reptile": [39,35,31,35],
    "Dawn":	[35,35,39,31],
    "Dusk":	[43,39,27,31],
    "Mech":	[31,39,43,27],
}

partBaseStats = {"Aquatic":[1,3,0,0],
"Beast": [0,1,0,3],
"Bird":	[0,3,0,1],
"Bug": [1,0,0,3],
"Plant": [3,0,0,1],
"Reptile": [3,1,0,0],
}


axieEndpoint = "https://axieinfinity.com/graphql-server-v2/graphql"
var classGeneMap = {"0000": "beast", "0001": "bug", "0010": "bird", "0011": "plant", "0100": "aquatic", "0101": "reptile", "1000": "???", "1001": "???", "1010": "???"};
var typeOrder = {"patternColor": 1, "eyes": 2, "mouth": 3, "ears": 4, "horn": 5, "back": 6, "tail": 7};

var geneColorMap = {"0000": {"0010": "ffec51","0011": "ffa12a","0100": "f0c66e", "0110": "60afce"},
"0001": {"0010": "ff7183", "0011": "ff6d61", "0100": "f74e4e",},
"0010": {"0010": "ff9ab8", "0011": "ffb4bb","0100": "ff778e"},
"0011": {"0010": "ccef5e", "0011": "efd636","0100": "c5ffd9"},
"0100": {"0010": "4cffdf", "0011": "2de8f2","0100": "759edb", "0110": "ff5a71"},
"0101": {"0010": "fdbcff", "0011": "ef93ff","0100": "f5e1ff", "0110": "43e27d"},
//?
"1000": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"},
//?
"1001": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"},
//moon
"1010": {"0010": "D9D9D9", "0011": "D9D9D9","0100": "D9D9D9", "0110": "D9D9D9"}};

function strMul(str, num) {
    var s = "";
    for (var i = 0; i < num; i++) {
        s += str;
    }
    return s;
}

function genesToBin(genes) {
    var genesString = genes.toString(2);
    genesString = strMul("0", 256 - genesString.length) + genesString
    return genesString;
}

function weakEscape(str) {
    return str.replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, '&lt;').replace(/>/g, "&gt;");
}

function setError(msg) {
    //TODO
    alert(msg);
}

const regionGeneMap = {"00000": "global", "00001": "japan"};
function getRegionFromGroup(group) {
    let regionBin = group.slice(8,13);
    if (regionBin in regionGeneMap) {
        return regionGeneMap[regionBin];
    }
    return "Unknown Region";
}

function getClassFromGroup(group) {
    let bin = group.slice(0, 4);
    if (!(bin in classGeneMap)) {
        return "Unknown Class";
    }
    return classGeneMap[bin];
}

function getPatternsFromGroup(group) {
    //patterns could be 6 bits. use 4 for now
    return {d: group.slice(2, 8), r1: group.slice(8, 14), r2: group.slice(14, 20)};
}

function getColor(bin, cls) {
    let color;
    if (bin == "0000") {
        color = "ffffff";
    } else if (bin == "0001") {
        color = "7a6767";
    } else {
        color = geneColorMap[cls][bin];
    }
    return color;
}

function getColorsFromGroup(group, cls) {
    return {d: getColor(group.slice(20, 24), cls), r1: getColor(group.slice(24, 28), cls), r2: getColor(group.slice(28, 32), cls)};
}
//hack. key: part name + " " + part type
var partsClassMap = {};
function getPartName(cls, part, region, binary) {
    let trait;
    if (binary in binarytraits[cls][part]) {
        if (region in binarytraits[cls][part][binary]) {
            trait = binarytraits[cls][part][binary][region];
        } else if ("global" in binarytraits[cls][part][binary]) {
            trait = binarytraits[cls][part][binary]["global"];
        } else {
            trait = "UNKNOWN Regional " + cls + " " + part;
        }
    } else {
        trait = "UNKNOWN " + cls + " " + part;
    }
    //return part + "-" + trait.toLowerCase().replace(/\s/g, "-");
    partsClassMap[trait + " " + part] = cls;
    return trait;
}

function getPartsFromGroup(part, group, region) {

    let dClass = classGeneMap[group.slice(2, 6)];
    let dBin = group.slice(6, 12);
    let dID = getPartName(dClass, part, region, dBin);

    let r1Class = classGeneMap[group.slice(12, 16)];
    let r1Bin = group.slice(16, 22);
    let r1ID = getPartName(r1Class, part, region, r1Bin);

    let r2Class = classGeneMap[group.slice(22, 26)];
    let r2Bin = group.slice(26, 32);
    let r2ID = getPartName(r2Class, part, region, r2Bin);

    return {d: dID, r1: r1ID, r2: r2ID};
}

function getTraits(genes) {
    var groups = [genes.slice(0, 32), genes.slice(32, 64), genes.slice(64, 96), genes.slice(96, 128), genes.slice(128, 160), genes.slice(160, 192), genes.slice(192, 224), genes.slice(224, 256)];
    let cls = getClassFromGroup(groups[0]);
    let region = getRegionFromGroup(groups[0]);
    let pattern = getPatternsFromGroup(groups[1]);
    let color = getColorsFromGroup(groups[1], groups[0].slice(0, 4));
    let eyes = getPartsFromGroup("eyes", groups[2], region);
    let mouth = getPartsFromGroup("mouth", groups[3], region);
    let ears = getPartsFromGroup("ears", groups[4], region);
    let horn = getPartsFromGroup("horn", groups[5], region);
    let back = getPartsFromGroup("back", groups[6], region);
    let tail = getPartsFromGroup("tail", groups[7], region);
    return {cls: cls, region: region, pattern: pattern, color: color, eyes: eyes, mouth: mouth, ears: ears, horn: horn, back: back, tail: tail};
}
async function getAxieDetails(id) {
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
        "axieId": id
        }
    
    
        let returnData = await request(axieEndpoint, query, variables).then(data => {
        return data
        }).catch(err => console.log)
    return returnData.axie
    }

async function getAxie(id, callback) {
    let data = await getAxieDetails(id);

    if (data.stage < 3) {
        //callback(null);
        return null;
    }
    var axie = {"id": id, "class": data.class, "sireId": data.sireId, "matronId": data.matronId, "genes": genesToBin(new BigNumber(data.genes))}; //, "owner": data.owner, "class": data.class, "exp": data.exp};
    return axie;
    if (callback != null) {
        callback(axie);
    }
}

const PROBABILITIES = {d: 37.5, r1: 9.375, r2: 3.125};
function sumProbs(sireTraits, matronTraits) {
    let probs = {};
    for (let place in sireTraits) {
        if (sireTraits[place] in probs) {
            probs[sireTraits[place]] += PROBABILITIES[place];
        } else {
            probs[sireTraits[place]] = PROBABILITIES[place];
        }
    }
    for (let place in matronTraits) {
        if (matronTraits[place] in probs) {
            probs[matronTraits[place]] += PROBABILITIES[place];
        } else {
            probs[matronTraits[place]] = PROBABILITIES[place];
        }
    }
    return probs;
}

var patternMap = {"000001": "greyfuzzy","000010": "(0, 0, 64, 130)", "000011": "(0, 0, 61, 107)", "000100": "(0, 0, 82, 74)", "000101": "(0, 0, 66, 101)", "000110": "(0, 0, 51, 134)", "000111": "(0, 0, 57, 117)", "001000": "(0, 0, 59, 67)", "001001": "(0, 0, 51, 104)", "001010": "(0, 0, 63, 131)", "001011": "(0, 0, 73, 153)", "001100": "(0, 0, 78, 127)", "001101": "(0, 0, 63, 99)", "001110": "(0, 0, 65, 55)", "011101": "greyspiky", "011110": "greycurly", "100001": "greywetdog", "100010": "greychubby", "110001": "greybigyak"};

function traitsToProb(traits) {
    let temp = {};
    temp[traits.d] = "D";
    if (traits.r1 in temp) {
        temp[traits.d] = "D, R1";
    } else {
        temp[traits.r1] = "R1";
    }
    if (traits.r2 in temp) {
        temp[traits.r2] += ", R2";
    } else {
        temp[traits.r2] = "R2";
    }

    return temp;
}

function isBreedable(axie1, axie2) {
    //self check
    if (axie1.id == axie2.id) {
        return false;
    }
    //parents check
    if (axie2.matronId == axie1.id || axie2.sireId == axie1.id) {
        return false;
    }
    if (axie1.matronId == axie2.id || axie1.sireId == axie2.id) {
        return false;
    }
    //After checking parents, skip if ether is a tagged axie
    if (axie1.matronId == 0 || axie2.matronId == 0) {
        return true;
    }
    //check siblings
    if (axie1.matronId == axie2.matronId || axie1.matronId == axie2.sireId) {
        return false;
    }
    if (axie1.sireId == axie2.matronId || axie1.sireId == axie2.sireId) {
        return false;
    }
    return true;
}

function getClassProbs(sire, matron) {
    obj = {}

    if (sire.class == matron.class) {
        obj[sire.class] = 100
        return obj
        
    } else {
        obj[sire.class] = 50
        obj[matron.class] = 50
        return obj
    }
}

classBaseStats = {"Aquatic":[39,39,35,27],
    "Beast": [31,35,31,43],
    "Bird":	[27,43,35,35],
    "Bug": [35,31,35,39],
    "Plant": [43,31,31,35],
    "Reptile": [39,35,31,35],
    "Dawn":	[35,35,39,31],
    "Dusk":	[43,39,27,31],
    "Mech":	[31,39,43,27],
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

async function calc(sireId, matronId) {
    if (!sireId || !matronId) {
        setError("Invalid axie ID");
        return;
    }
    let sire = await getAxie(sireId);
    if (!sire) {
        console.log("not genes")
        return;
    }
    let matron = await getAxie(matronId);

    let sireTraits = getTraits(sire.genes);
    let matronTraits = getTraits(matron.genes);

    if (sireId == matronId) {
        var patternProbs = traitsToProb(sireTraits.pattern);
        var colorProbs = traitsToProb(sireTraits.color);
        var eyesProbs = traitsToProb(sireTraits.eyes);
        var mouthProbs = traitsToProb(sireTraits.mouth);
        var earsProbs = traitsToProb(sireTraits.ears);
        var hornProbs = traitsToProb(sireTraits.horn);
        var backProbs = traitsToProb(sireTraits.back);
        var tailProbs = traitsToProb(sireTraits.tail);
    } else {
        var patternProbs = sumProbs(sireTraits.pattern, matronTraits.pattern);
        var colorProbs = sumProbs(sireTraits.color, matronTraits.color);
        var eyesProbs = sumProbs(sireTraits.eyes, matronTraits.eyes);
        var mouthProbs = sumProbs(sireTraits.mouth, matronTraits.mouth);
        var earsProbs = sumProbs(sireTraits.ears, matronTraits.ears);
        var hornProbs = sumProbs(sireTraits.horn, matronTraits.horn);
        var backProbs = sumProbs(sireTraits.back, matronTraits.back);
        var tailProbs = sumProbs(sireTraits.tail, matronTraits.tail);
        if (!isBreedable(sire, matron)) {
            console.log("not breedable")
        }
    }
    var classProbs = getClassProbs(sire, matron)

    simResults = Sim.sim([classProbs, eyesProbs, mouthProbs, earsProbs, hornProbs, backProbs, tailProbs], 20000)
    Sim.uploadSim(simResults)
    

    //probsOfCombos([classProbs, eyesProbs, mouthProbs, earsProbs, hornProbs, backProbs, tailProbs])
    /*
    renderProbs("eyes", eyesProbs, "row1");
    $("#row1").append('<div class="col-1"></div>');
    renderProbs("ears", earsProbs, "row1");
    renderProbs("mouth", mouthProbs, "row2");
    $("#row2").append('<div class="col-1"></div>');
    renderProbs("horn", hornProbs, "row2");
    renderProbs("back", backProbs, "row3");
    $("#row3").append('<div class="col-1"></div>');
    renderProbs("tail", tailProbs, "row3");
    renderProbs("pattern", patternProbs, "row4");
    $("#row4").append('<div class="col-1"></div>');
    renderProbs("color", colorProbs, "row4");

    $('[data-toggle="tooltip"]').tooltip();
    */
}

function cumulativeSumObj(obj) {
    list = []
    for (ii in obj){
        list.push(obj[ii])
    }
    cumulativeSum = (sum => value => sum += value)(0);

    return list.map(cumulativeSum)
}


function organiseAxieData(axie) {
    axieGenes = genesToBin(new BigNumber(axie.genes))

    let axieTraits = getPrunedTraits(axieGenes)

    let axieBreedCount = axie.breedCount

    let axieStats = [axie.stats.hp -31, axie.stats.speed -31, axie.stats.skill -27, axie.stats.morale -27]

    let axieClassOHE = OHEAxieClass(axieTraits.cls)

    let abilityClasses = OHEAbilityClasses(axieTraits)

    let allOHE = [].concat(axieBreedCount, axieStats, axieClassOHE, abilityClasses[0], abilityClasses[1], abilityClasses[2])

    return allOHE

}

function probsOfCombos(AxieProbs) {
    // eyesProbs, mouthProbs, earsProbs, hornProbs, backProbs, tailProbs
    possibleAxies = {}
    counter = 0
    probcheck = 0

    for (var key0 in AxieProbs[0]) {
        for (var key1 in AxieProbs[1]) {
            for (var key2 in AxieProbs[2]) {
                for (var key3 in AxieProbs[3]) {
                    for (var key4 in AxieProbs[4]) {
                        for (var key5 in AxieProbs[5]) {
                            for (var key6 in AxieProbs[6]) {
                                
                                eyeClass = getKeyByValue(binarytraits,key1)
                                mouthClass = getKeyByValue(binarytraits,key2)
                                earClass = getKeyByValue(binarytraits,key3)
                                hornClass = getKeyByValue(binarytraits,key4)
                                backClass = getKeyByValue(binarytraits,key5)
                                tailClass = getKeyByValue(binarytraits,key6)
                                thisPartClassList = [eyeClass, mouthClass, earClass, hornClass, backClass, tailClass]
                                possibleAxies[counter] = {
                                    "class": key0,
                                    "eyes":  key1,
                                    "mouth":  key2,
                                    "ears": key3,
                                    "horn":  key4,
                                    "back":  key5,
                                    "tail":  key6,
                                    "skillclasses": thisPartClassList,
                                    "stats": getStats(key0, thisPartClassList),
                                    "prob": AxieProbs[0][key0] * AxieProbs[1][key1] * AxieProbs[2][key2] * AxieProbs[3][key3] * AxieProbs[4][key4] * AxieProbs[5][key5] * AxieProbs[6][key6] /100000000000000
                                }
                                probcheck = probcheck + AxieProbs[0][key0] * AxieProbs[1][key1] * AxieProbs[2][key2] * AxieProbs[3][key3] * AxieProbs[4][key4] * AxieProbs[5][key5] * AxieProbs[6][key6] /100000000000000
                                counter++
                                
                                /*
                                let axieBreedCount = 0
                                let axieStatsList = getStats(key0, thisPartClassList)
                                let axieStatsList = [axieStatsList[0] -31, axieStatsList[1] -31, axieStatsList[2] -27, axieStatsList[3] -27,]
                                let axieClassOHE = OHEAxieClass(key0)
                                let abilityClasses = OHEAbilityClasses(axieTraits)
                                */

                            }
                        }
                    }
                }
            }
        }
    }
    console.log(possibleAxies[0])
    console.log(probcheck)
}
function getKeyByValue(object, value) {
    for (var key0 in object) {
        for (var key1 in object[key0]) {
            for (var key2 in object[key0][key1]) {
                if (object[key0][key1][key2]['global'] == value) {
                    return key0
                }
            }
        }
    }
}
  



calc("3132217", "2999686")