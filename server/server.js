// -------------------------------------------------
//  Server
// -------------------------------------------------
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/routes');
const app = express();
const db = require('./config/mongoDB');

app.use(bodyParser.json());

app.use('/', router);

app.listen(27017, () => {
    console.log('We are live on 27017 port');
});

module.exports = app;