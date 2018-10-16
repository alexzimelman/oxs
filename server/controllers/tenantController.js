const mongoose = require('mongoose');
const {Tenant} = require('../models');


module.exports = {

    async showAllTenants(){
        try{
            const tenants = await Tenant.findAll({})
        }   catch(err){
            throw new Error('cant load tenants')
        }
        return tenants;
    },

    async addTenant(newTenant){
        try{
            const tenant = await newTenant.create(req.body);
        }   catch(err){
                throw new Error('cant add tenant');
        }
        return tenant;
    },

    async findTenant(query, options){
        try{
            let tenant = await Tenant.findOne(query, option);
            if(tenant) 
                return tenant;
            return null;

        }   catch(err){
                throw new Error('cant find tenant');
        }
    },

    async updateTenant(tenantName, newInfo){
        try{
            let tenant = await Tenant.findOneAndUpdate({"name": tenantName}, newInfo);
        }   catch(err){
                throw new Error('cant update tenante');
        }
    },

    async removeTenant(tenantName){
        try{
            let tenant = await Tenant.findOneAndRemove({"name": tenantName});
        }   catch(error){
            throw new Error('cant remove tenant')
        }
    }
}