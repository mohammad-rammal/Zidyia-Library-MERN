/\*\*-------------------------------------------------------------

- @desc Login as admin tenant
- @route /api/admin-tenant/login
- @method POST
- @access private (only super admin)
  ----------------------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Register New User
- @route /api/auth/register
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Login User
- @route /api/auth/login
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Verify User Account
- @route /api/auth/:userId/verify/:token
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Upload New Document
- @route /api/documents
- @method POST
- @access private (only logged in user)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Update the status of a document
- @route PUT /api/requests/:id/status
- @method PUT
- @access private
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get All Documents
- @route /api/documents
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Single Document
- @route /api/documents/:id
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Document Count
- @route /api/documents/count
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Count of Documents by Status
- @route /api/documents/count/:status
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Count of User's Documents
- @route /api/documents/count/user
- @method GET
- @access private (only logged in user)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Count of Documents by Status
- @route /api/documents/mycount/:userId/:status
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Create a new library
- @route /api/libraries
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get all libraries
- @route /api/libraries
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get a library by ID
- @route /api/libraries/:id
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Send Reset Password
- @route /api/password/reset-password
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Reset Password
- @route /api/password/reset-password/:userId/:token
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Reset Password
- @route /api/password/reset-password/:userId/:token
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Create a new request
- @route POST /api/requests
- @method POST
- @access private
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Update the status of a request
- @route PUT /api/requests/:id/status
- @method PUT
- @access private
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Fetch all requests
- @route GET /api/requests
- @method GET
- @access private
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Fetch user requests
- @route GET /api/userRequests
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Approved Requests Count
- @route /api/requests/approved/count
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Pending Requests Count
- @route /api/requests/pending/count
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Rejected Requests Count
- @route /api/requests/pending/count
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get User's Approved Requests Count
- @route /api/requests/approved/user/count
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get User's Pending Requests Count
- @route /api/requests/pending/user/count
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get User's Rejected Requests Count
- @route /api/requests/rejected/user/count
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get User's Requests Count
- @route /api/requests/user/count
- @method GET
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Create Subscription
- @route /api/subscriptions
- @method POST
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get All Users Profile
- @route /api/users/profile
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get User Profile
- @route /api/users/profile/:id
- @method GET
- @access public
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Update User Profile
- @route /api/users/profile/:id
- @method PUT
- @access private (only user himself)
  -------------------------------------------------\*/

/\*\*------------------------------------------------

- @desc Get Users Count
- @route /api/users/count
- @method GET
- @access private (only admin)
  -------------------------------------------------\*/

/\*\*----------------------------------------------------

- @desc Profile Photo Upload
- @route /api/users/profile/profile-photo-upload
- @method POST
- @access private (only logged in user)
  -----------------------------------------------------\*/

/\*\*----------------------------------------------------

- @desc ID Photo Upload
- @route /api/users/profile/id-photo-upload
- @method POST
- @access private (only logged in user)
  -----------------------------------------------------\*/

/\*\*----------------------------------------------------

- @desc Delete User Profile (Account)
- @route /api/users/profile/:id
- @method DELETE
- @access private (only admin or user himself)
  -----------------------------------------------------\*/
