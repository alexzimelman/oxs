// -------------------------------------------------
//  Server
// -------------------------------------------------

const express = require('express');
const app = express();

app.listen(27017, () => {
    console.log('We are live on ' + 27017 + ' port');
});

module.exports = app;