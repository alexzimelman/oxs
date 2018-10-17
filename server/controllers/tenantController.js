const mongoose = require('mongoose');
const Tenant = require('../models/tenant');


module.exports = {

     showAllTenants(req, res){
        Tenant.find({}, (err, payload) => {
            res.send(payload);
        })
    },

     addTenant(req, res){
        let tenant = new Tenant(req.body);
        tenant.save((err, tenant) => {
            if(err) throw err;
            res.send(tenant);
        })
    },

     findTenant(req , res){
        Tenant.find({name: req.params.name}, (err, tenant) => {
            if(err) throw err;
            res.send(tenant);
        })
    },

     updateTenant(req, res){
        Tenant.findByIdAndUpdate(req.params.id, req.body, (err, tenant) => {
            if(err) throw err;
            res.send(req.body);
        })
    },

     removeTenant(req, res){
        Tenant.findByIdAndRemove(req.params.id, (err, tenant) => {
            if(err) throw err;
            res.send(tenant);
        });
    }
}
