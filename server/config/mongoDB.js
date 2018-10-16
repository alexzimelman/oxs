const mongoose = require('mongoose');

mongoose.connect('mongodb://alexadmin:alexadmin21@ds233323.mlab.com:33323/oxs', function(err){
    if(err) throw err;
    console.log('connected to database');
});

