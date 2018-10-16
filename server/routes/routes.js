const express = require('express');
const router = express.Router();
const tenantController = require('../server/controllers/tenantController');


app.post('/', tenantController.addTenant, tenantController.removeTenant, tenantController.updateTenant);

app.get('/', tenantController.findTenant, tenantController.showAllTenants);

module.exports = router;


