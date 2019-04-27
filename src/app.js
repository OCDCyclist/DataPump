const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
    res.status(200).send(`Hello from the the Data Pump ${app.pumpName}!  You have made a most excellent connection.`);
});

app.get('/start/:rate', (req, res) => {
    const rateArg = Number( req.params.rate );
    if( typeof rateArg === 'number' && Number.isSafeInteger( rateArg ) && rateArg >=1 && rateArg <= 1000000 ){
        res.status(200).send(app.dataPump.Start(rateArg));
    }
    else{
        res.status(401).send('Invalid rate argument.');
    }
});

app.get('/stop', (req, res) => {
    res.status(200).send(app.dataPump.Stop());
});

app.get('/sendOne', (req, res) => {
    res.status(200).send(app.dataPump.SendOne());
});

module.exports = app;