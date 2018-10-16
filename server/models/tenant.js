// ------------------------------------
//  Tenant Model
// ------------------------------------

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tenantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    adress: {
        type: String,
        require: true
    },
    debt: {
        type: Boolean
    },
    balance: {
        type: Number
    }
});

var Tenant = module.exports = mongoose.model('Tenants', tenantSchema);

