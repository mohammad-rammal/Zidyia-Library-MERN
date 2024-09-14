const asyncHandler = require("express-async-handler");
const { Request, validateRequest, validateUpdateRequestStatus } = require('../models/Request');



// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_OK
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Create a new request
 * @route       POST /api/requests
 * @method      POST
 * @access      private
-------------------------------------------------*/
const createRequest = asyncHandler(async (req, res) => {
    try {
        // Validate the request body
        const { error } = validateRequest(req.body);
        if (error) return res.status(HTTP_STATUS_BAD_REQUEST).send(error.details[0].message);

        // Check if the library exists
        const library = await Library.findById(req.body.library);
        if (!library) return res.status(HTTP_STATUS_NOT_FOUND).send("Library not found");

        // Create a new request
        const request = new Request({
            user: req.user.id,
            library: req.body.library,
            // formFields: req.body.formFields
        });

        // Save the request to the database
        await request.save();

        res.status(HTTP_STATUS_CREATED).json(request);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Update the status of a request
 * @route       PUT /api/requests/:id/status
 * @method      PUT
 * @access      private
-------------------------------------------------*/
const updateRequestStatus = asyncHandler(async (req, res) => {
    try {
        // Validate the request body
        const { error } = validateUpdateRequestStatus(req.body);
        if (error) return res.status(HTTP_STATUS_BAD_REQUEST).send(error.details[0].message);

        // Check if the request exists
        let request = await Request.findById(req.params.id);
        if (!request) return res.status(HTTP_STATUS_NOT_FOUND).send("Request not found");

        // Update the status of the request
        request.status = req.body.status;
        if (req.body.adminNotes) {
            request.adminNotes = req.body.adminNotes;
        }

        // Save the updated request to the database
        request = await request.save();

        res.status(HTTP_STATUS_OK).json(request);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Fetch all requests
 * @route       GET /api/requests
 * @method      GET
 * @access      private
-------------------------------------------------*/
const getAllRequests = asyncHandler(async (req, res) => {
    try {
        // Fetch all requests from the database
        const requests = await Request.find().populate('user').populate('library');
        res.status(HTTP_STATUS_OK).json(requests);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Fetch user requests
 * @route       GET /api/userRequests
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const getUserRequests = asyncHandler(async (req, res) => {
    try {
        // Fetch all requests for the current user from the database
        const requests = await Request.find({ user: req.user.id }).populate('library');
        res.status(HTTP_STATUS_OK).json(requests);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get Approved Requests Count
 * @route       /api/requests/approved/count
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const approvedRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ status: 'approved' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get Pending Requests Count
 * @route       /api/requests/pending/count
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const pendingRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ status: 'pending' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get Rejected Requests Count
 * @route       /api/requests/pending/count
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const rejectedRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ status: 'rejected' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get User's Approved Requests Count
 * @route       /api/requests/approved/user/count
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const userApprovedRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ user: req.user.id, status: 'approved' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get User's Pending Requests Count
 * @route       /api/requests/pending/user/count
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const userPendingRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ user: req.user.id, status: 'pending' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get User's Rejected Requests Count
 * @route       /api/requests/rejected/user/count
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const userRejectedRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ user: req.user.id, status: 'rejected' });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get User's Requests Count
 * @route       /api/requests/user/count
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const userRequestsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Request.countDocuments({ user: req.user.id });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

module.exports = {
    createRequest,
    updateRequestStatus,
    getAllRequests,
    getUserRequests,
    approvedRequestsCountCtrl,
    pendingRequestsCountCtrl,
    rejectedRequestsCountCtrl,
    userApprovedRequestsCountCtrl,
    userPendingRequestsCountCtrl,
    userRejectedRequestsCountCtrl,
    userRequestsCountCtrl
};
