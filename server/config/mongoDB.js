var mongoose = require('mongoose');

mongoose.connect('mongodb://alexadmin:alexadmin21@ds233323.mlab.com:33323/oxs', {useNewUrlParser: true}, function(err){
    if(err) throw err;
console.log('connected to database');
});

module.exports = {mongoose};

