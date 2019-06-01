const axios = require("axios");
const randomWords = require("random-words");

pumpData = async ( tartgetURL, sourceName,  count, time) => {
    let payload = createPayload( sourceName, count, time);
    axios
        .post( tartgetURL, payload)
        .then(response => {
            //console.log(`Added ${this.count} ${response}`);
        })
        .catch(function(error) {
            console.log(`pumpData error targeting ${tartgetURL} for id ${count}: ${error.message}`);
        });
};

const createPayload = (sourceName, count, time)=>{
    switch( count % 3){
        case 0:{
            const thisKey = randomWords({ exactly: 5, join: "-" });
            return [
                {
                    id: `${time}.${count}.${sourceName}`,
                    key: thisKey,
                    words: randomWords({ exactly: 5, join: " " }),
                    crud: "insert"
                },
                {
                    id: `${time}.${count+1}.${sourceName}`,
                    key: thisKey,
                    words: randomWords({ exactly: 6, join: " " }),
                    crud: "update"
                }
            ];
            break;
        }
        case 1:{
            const thisKey = randomWords({ exactly: 5, join: "-" });
            return [
                {
                    id: `${time}.${count}.${sourceName}`,
                    key: thisKey,
                    words: randomWords({ exactly: 6, join: " " }),
                    crud: "insert"
                },
                {
                    id: `${time}.${count+1}.${sourceName}`,
                    key: thisKey,
                    crud: "delete"
                }
            ];
            break;
        }
        default:
        case 3:{
            return [
                {
                  id: `${time}.${count}.${sourceName}`,
                  key: randomWords({ exactly: 5, join: "-" }),
                  words: randomWords({ exactly: 6, join: " " }),
                  crud: "insert"
                }
            ];
            break;
        }
    }
}

module.exports = { pumpData };
