// adminTenantRoutes.js

const express = require('express');
const router = express.Router();
const { loginAdminTenant } = require('../controllers/adminTenantController');

// Login as admin tenant
router.post('/login', loginAdminTenant);

module.exports = router;