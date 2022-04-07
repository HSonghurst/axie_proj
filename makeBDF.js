const {
    request,
    gql
  } = require('graphql-request')
const BigNumber = require('bignumber.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const partList = require('./partList.js')

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


axieEndpoint = "https://axieinfinity.com/graphql-server-v2/graphql"
var classGeneMap = {"0000": "beast", "0001": "bug", "0010": "bird", "0011": "plant", "0100": "aquatic", "0101": "reptile", "1000": "???", "1001": "???", "1010": "???"};
var typeOrder = {"patternColor": 1, "eyes": 2, "mouth": 3, "ears": 4, "horn": 5, "back": 6, "tail": 7};
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

function getPartClass(group) {

    let dClass = classGeneMap[group.slice(2, 6)];
   
    let r1Class = classGeneMap[group.slice(12, 16)];

    let r2Class = classGeneMap[group.slice(22, 26)];

    return {"d": dClass, "r1": r1Class, "r2": r2Class};
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
function getPrunedTraits(genes) {
    var groups = [genes.slice(0, 32), genes.slice(32, 64), genes.slice(64, 96), genes.slice(96, 128), genes.slice(128, 160), genes.slice(160, 192), genes.slice(192, 224), genes.slice(224, 256)];
    let cls = getClassFromGroup(groups[0]);
    let eyes = getPartClass( groups[2]);
    let mouth = getPartClass( groups[3]);
    let ears = getPartClass( groups[4]);
    let horn = getPartClass( groups[5]);
    let back = getPartClass( groups[6]);
    let tail = getPartClass( groups[7]);
    return {cls: cls, eyes: eyes, mouth: mouth, ears: ears, horn: horn, back: back, tail: tail};
}

function addLists(list1, list2) {
    newList = []
    for (f = 0; f< list1.length; f++) {        
        newList = newList.concat(list1[f] + list2[f])
    }
    return newList
}
async function getAllAxies() {

    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
    allAxies = await dbo.collection("axies_26_07").find({}).toArray()
    //var axie = {"class": data.class,"stats": data.stats,"breedcount": data.breedCount, "sireId": data.sireId, "matronId": data.matronId, "genes": genesToBin(new BigNumber(data.genes))}; //, "owner": data.owner, "class": data.class, "exp": data.exp};
    return allAxies;
    if (callback != null) {
        callback(axie);
    }
}

var patternMap = {"000001": "greyfuzzy","000010": "(0, 0, 64, 130)", "000011": "(0, 0, 61, 107)", "000100": "(0, 0, 82, 74)", "000101": "(0, 0, 66, 101)", "000110": "(0, 0, 51, 134)", "000111": "(0, 0, 57, 117)", "001000": "(0, 0, 59, 67)", "001001": "(0, 0, 51, 104)", "001010": "(0, 0, 63, 131)", "001011": "(0, 0, 73, 153)", "001100": "(0, 0, 78, 127)", "001101": "(0, 0, 63, 99)", "001110": "(0, 0, 65, 55)", "011101": "greyspiky", "011110": "greycurly", "100001": "greywetdog", "100010": "greychubby", "110001": "greybigyak"};


function OHEAxieClass(axieClass) {
    classList =[ "PLANT", "BEAST", "AQUATIC", "BIRD", "BUG", "REPTILE", "MECH", "DAWN", "DUSK"]

    OHEclass = [0,0,0,0,0,0,0,0,0]

    OHEclass[classList.indexOf(axieClass.toUpperCase())]+=1

    return OHEclass
}

function OHEAbilityClasses(axieTraits) {

    classList =[ "PLANT", "BEAST", "AQUATIC", "BIRD", "BUG", "REPTILE"]

    dClasses = [axieTraits.eyes.d, axieTraits.mouth.d, axieTraits.ears.d, axieTraits.horn.d, axieTraits.back.d, axieTraits.tail.d,]
    r1Classes = [axieTraits.eyes.r1, axieTraits.mouth.r1, axieTraits.ears.r1, axieTraits.horn.r1, axieTraits.back.r1, axieTraits.tail.r1,]
    r2Classes = [axieTraits.eyes.r2, axieTraits.mouth.r2, axieTraits.ears.r2, axieTraits.horn.r2, axieTraits.back.r2, axieTraits.tail.r2,]
    var dClassesOHE = [0,0,0,0,0,0]
    var r1ClassesOHE = [0,0,0,0,0,0]
    var r2ClassesOHE = [0,0,0,0,0,0]
   
    for (i=0; i < dClasses.length; i++) {
        dClassesOHE[classList.indexOf(dClasses[i].toUpperCase())]+=1
        r1ClassesOHE[classList.indexOf(r1Classes[i].toUpperCase())]+=1
        r2ClassesOHE[classList.indexOf(r2Classes[i].toUpperCase())]+=1
    }
    return [dClassesOHE, r1ClassesOHE, r2ClassesOHE]
}

function OHEAbilityNames(axieTraits) {
    parts = partList.partList
    emptyList = []
    partsToCheck = ["back", "ears", "eyes", "horn", "tail", "mouth"]
    for (i in parts) {
        emptyList.push(0)
        parts[i] = parts[i].toUpperCase()
    }

    for (i in partsToCheck) {
        emptyList[parts.indexOf(axieTraits[partsToCheck[i]].d.toUpperCase())] +=1
        emptyList[parts.indexOf(axieTraits[partsToCheck[i]].r1.toUpperCase())] +=1
        emptyList[parts.indexOf(axieTraits[partsToCheck[i]].r2.toUpperCase())] +=1
    }
    
    return emptyList
}
function getStats2(axieClass, partClasses) {
    
    baseStats = classBaseStats[axieClass]
    partStats = [0,0,0,0]
    for (i=0;i <partClasses.length; i++) {
        partStats = addLists(partStats, partBaseStats[partClasses[i]])
    }
    return addLists(baseStats, partStats)
}

function organiseAxieDataLong(axie) {
    axieGenes = genesToBin(new BigNumber(axie.genes))

    axieBreedCount = axie.breedCount

    axiePrunedTraits = getPrunedTraits(axieGenes)

    if (axiePrunedTraits.cls == "???") { return 0}

    axieTraits = getTraits(axieGenes)

    axieAbilityNamesOHE = OHEAbilityNames(axieTraits)

    axieStats = getStats2(axiePrunedTraits.cls, [axiePrunedTraits.ears.d, axiePrunedTraits.back.d, axiePrunedTraits.eyes.d, axiePrunedTraits.horn.d, axiePrunedTraits.mouth.d, axiePrunedTraits.tail.d,])

    axieStats = [axieStats[0] -31, axieStats[1] -31, axieStats[2] -27, axieStats[3] -27]

    axieClassOHE = OHEAxieClass(axiePrunedTraits.cls)

    abilityClasses = OHEAbilityClasses(axiePrunedTraits)

    allOHE = [].concat(axieBreedCount, axieStats, axieClassOHE, abilityClasses[0], abilityClasses[1], abilityClasses[2], axieAbilityNamesOHE)

    return allOHE
}

function organiseAxieData(axie) {
    axieGenes = genesToBin(new BigNumber(axie.genes))

    let axiePrunedTraits = getPrunedTraits(axieGenes)

    let axieBreedCount = axie.breedCount

    let axieStats = [axie.stats.hp -31, axie.stats.speed -31, axie.stats.skill -27, axie.stats.morale -27]

    let axieClassOHE = OHEAxieClass(axiePrunedTraits.cls)

    let abilityClasses = OHEAbilityClasses(axiePrunedTraits)

    let allOHE = [].concat(axieBreedCount, axieStats, axieClassOHE, abilityClasses[0], abilityClasses[1], abilityClasses[2])

    return allOHE

}
async function uploadAxieData(axieArray) {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
  
    dbo.collection('axies_blend_BDF').insertMany(axieArray, {})
    
  
    return done = true
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

function getAxiesOHEWithPrice(allAxies) {
    bigListOHE = []
    priceList = []

    for (axieI=0; axieI < allAxies.length; axieI++) {
        if (allAxies[axieI].genes == undefined) { continue }
        obj = {}
        price = parseInt(allAxies[axieI]['transferHistory']['results'][0]['withPriceUsd'].split('.')[0])
        priceList.push(price)
        obj["id"] = allAxies[axieI].id
        obj["data"] = [organiseAxieData(allAxies[axieI]), price]

        bigListOHE.push(obj)
    }
    avgList = calculatePriceStats(priceList)
    
    for (o in bigListOHE) {
        bigListOHE[o].data[0].push(avgList[o])
    }

    return bigListOHE
}

function getAxiesOHELive(allAxies) {
    bigListOHE = []

    for (axieI=0; axieI < allAxies.length; axieI++) {
        obj = {}
        price = parseInt(allAxies[axieI]['auction']['currentPriceUSD'].split('.')[0])
        obj["id"] = allAxies[axieI].id
        obj["data"] = [organiseAxieDataLong(allAxies[axieI]), price]

        bigListOHE.push(obj)
    }
    

    return bigListOHE
}

async function main(){
    allAxies = await getAllAxies()
    bigList = getAxiesOHEWithPrice(allAxies)
    done = await uploadAxieData(bigListOHE)
    console.log("finished:", done)
}


module.exports = {
    getAxiesOHELive,
    genesToBin,
    getPrunedTraits,
    OHEAxieClass,
    OHEAbilityClasses,
    getTraits,
    OHEAbilityNames,
    getStats2,

}