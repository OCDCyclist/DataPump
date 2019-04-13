const axios = require("axios");
const randomWords = require("random-words");

pumpData = async (count, time) => {
    let payload = createPayload( count, time);
    axios
        .post("http://localhost:4100/add", payload)
        .then(response => {
            //console.log(`Added ${this.count} ${response}`);
        })
        .catch(function(error) {
            console.log(`pumpData error for id ${count}: ${error.message}`);
        });
};

const createPayload = (count, time)=>{
    switch( count % 3){
        case 0:{
            const thisKey = randomWords({ exactly: 2, join: "-" });
            return [
                {
                    id: `${time}.${count}`,
                    key: thisKey,
                    words: randomWords({ exactly: 5, join: " " }),
                    crud: "insert"
                },
                {
                    id: `${time}.${count+1}`,
                    key: thisKey,
                    words: randomWords({ exactly: 6, join: " " }),
                    crud: "update"
                }
            ];
            break;
        }
        case 1:{
            const thisKey = randomWords({ exactly: 2, join: "-" });
            return [
                {
                    id: `${time}.${count}`,
                    key: thisKey,
                    words: randomWords({ exactly: 5, join: " " }),
                    crud: "insert"
                },
                {
                    id: `${time}.${count+1}`,
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
                  id: `${time}.${count}`,
                  key: randomWords({ exactly: 2, join: "-" }),
                  words: randomWords({ exactly: 5, join: " " }),
                  crud: "insert"
                }
            ];
            break;
        }
    }
}

module.exports = { pumpData };
