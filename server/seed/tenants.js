const mongoose = require('mongoose');
const Tenant = require('../models/tenant');


var t = new Tenant({
    name: 'alex',
    phone: 123456789,
    adress: 'Hagra 9 Holon',
    debt: false,
    balance: 0
});

t.save(function (err){
    if(err) return handleError(err);
    else return console.log("saved");
});
