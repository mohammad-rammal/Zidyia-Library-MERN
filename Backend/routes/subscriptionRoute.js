const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const { verifyTokenAndSuperAdmin } = require('../middlewares/verifyToken');
const { createSubscription } = require('../controllers/subscriptionController');

// Create a subscription 
router.post('/', verifyTokenAndSuperAdmin, createSubscription);


module.exports = router;
