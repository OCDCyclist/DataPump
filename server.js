'use strict';
const {DataPump} = require('./src/DataPump');
const {pumpData} = require('./src/pumpData');
const app = require('./src/app');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const whichListen = 0 || process.argv.length > 2 ? Number(process.argv[2]) : 3000;
const portListen = Number.isSafeInteger(whichListen) ? whichListen : 3000;

const whichSend = 0 || process.argv.length > 3 ? Number(process.argv[3]) : 4000;
const portTarget = Number.isSafeInteger(whichSend) ? whichSend : 4000;

console.log( `portListen=${portListen} and portTarget=${portTarget}`);

app.targetURL = process.env.TARGET.replace("xxPORTxx", portTarget);
app.pumpName = `App ${portListen}`;
app.dataPump = new DataPump( app.pumpName, app.targetURL, pumpData);

const server = app.listen( portListen, () => {
    const host  = server.address().address;
    const port  = server.address().port;
    console.log(`Data pump listening at http://${host}:${port} and targeting ${app.targetURL}`);
});