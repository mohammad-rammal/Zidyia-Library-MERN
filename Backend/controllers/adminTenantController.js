const Subscription = require('../models/Subscription');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/User');

// Constants
const {
    HTTP_STATUS_OK,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} = require('../middlewares/constants');

/**-------------------------------------------------------------
 * @desc        Login as admin tenant
 * @route       /api/admin-tenant/login
 * @method      POST
 * @access      private (only super admin)
----------------------------------------------------------------*/
const loginAdminTenant = asyncHandler(async (req, res) => {
    try {
        const { adminEmail, password } = req.body;

        // Retrieve subscription based on adminEmail
        const subscription = await Subscription.findOne({ adminEmail });

        if (!subscription) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Subscription not found' });
        }

        // Retrieve user based on email
        const user = await User.findOne({ email: adminEmail });

        if (!user) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'Invalid email or password' });
        }

        // Trim whitespace from both passwords
        const storedPassword = subscription.autoGeneratedPassword.trim();
        const providedPassword = password.trim();

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(providedPassword, storedPassword);

        if (!isPasswordMatch) {
            return res.status(HTTP_STATUS_UNAUTHORIZED).json({ message: 'Invalid password' });
        }

        // Generate token (JWT)
        const token = user.generateAuthToken();

        // Update isFirstLogin flag to false
        subscription.isFirstLogin = false;
        await subscription.save();

        // Response to client
        res.status(HTTP_STATUS_OK).json({
            _id: user._id,
            role: User.role,
            fullName: user.fullName,
            email: user.email,
            token: token,
            message: 'Login successful'
        });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Failed to login as admin tenant' });
    }
});

module.exports = {
    loginAdminTenant
};
