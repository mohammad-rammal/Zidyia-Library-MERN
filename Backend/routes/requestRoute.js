const express = require('express');
const router = express.Router();
const { createRequest, updateRequestStatus, getAllRequests, getUserRequests, approvedRequestsCountCtrl, pendingRequestsCountCtrl, rejectedRequestsCountCtrl, userApprovedRequestsCountCtrl, userPendingRequestsCountCtrl, userRejectedRequestsCountCtrl, userRequestsCountCtrl } = require('../controllers/requestController');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/verifyToken");
// Create a new request
router.post('/', verifyToken, createRequest);

// Update the status of a request
router.put('/:id', updateRequestStatus);

// Fetch all requests
router.get('/', verifyTokenAndAdmin, getAllRequests)

router.get('/user', verifyToken, getUserRequests); 

// /api/requests/approved/count
router.route("/approved/count").get(verifyTokenAndAdmin, approvedRequestsCountCtrl);

// /api/requests/pending/count
router.route("/pending/count").get(verifyTokenAndAdmin, pendingRequestsCountCtrl);

// /api/requests/rejected/count
router.route("/rejected/count").get(verifyTokenAndAdmin, rejectedRequestsCountCtrl);

// /api/requests/approved/user/count
router.route("/approved/user/count").get(verifyToken, userApprovedRequestsCountCtrl);

// /api/requests/pending/user/count
router.route("/pending/user/count").get(verifyToken, userPendingRequestsCountCtrl);

// /api/requests/rejected/user/count
router.route("/rejected/user/count").get(verifyToken, userRejectedRequestsCountCtrl);

// /api/requests/user/count
router.route("/user/count").get(verifyToken, userRequestsCountCtrl);


module.exports = router;
