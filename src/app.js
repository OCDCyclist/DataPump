'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {DataPump} = require('./DataPump');
const {pumpData} = require('./pumpData');

const app = express();
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204
};

app.use( cors(corsOptions));
app.use( bodyParser.urlencoded({extended: false}) );
app.use( express.json());

const dataPump = new DataPump('Source A', '//localhost:4100/add', pumpData);

app.get('/', (req, res) => {
    res.status(200).send('Hello from the the Data Pump!  You have made a most excellent connection.');
});

app.get('/start/:rate', (req, res) => {
    const rateArg = Number( req.params.rate );
    if( typeof rateArg === 'number' && Number.isSafeInteger( rateArg ) && rateArg >=1 && rateArg <= 1000000 ){
        res.status(200).send(dataPump.Start(rateArg));
    }
    else{
        res.status(401).send('Invalid rate argument.');
    }
});

app.get('/stop', (req, res) => {
    res.status(200).send(dataPump.Stop());
});
    
app.get('/count', (req, res) => {
    res.status(200).send(dataPump.getSa());
});

module.exports = app;