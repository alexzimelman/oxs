const express = require('express');
const router = express.Router();
const app = express();
const tenantController = require('../controllers/tenantController');


router.get('/tenants/list', tenantController.showAllTenants);

router.post('/tenants/create' , tenantController.addTenant);

router.post('/tenants/update/:id', tenantController.updateTenant);

router.get('/tenants/find/:id', tenantController.findTenant);

router.post('/tenants/delete/:id', tenantController.removeTenant);

router.get('*', function(req, res) {
    res.end("HI");
});

module.exports = router;


