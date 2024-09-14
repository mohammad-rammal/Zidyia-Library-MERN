const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail } = require("../models/User");
const { VerificationToken } = require("../models/VerificationToken");
const crypto = require("crypto");
const email = require("../utils/email");
require("dotenv").config();

// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_OK,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Get Forgot Password View
 * @route       password/reset-password
 * @method      GET
 * @access      public
-------------------------------------------------*/
module.exports.getForgotPasswordView = asyncHandler ((req,res) => {
    res.render('forgot-password');
});

/**------------------------------------------------
 * @desc        Send Forgot Password Link
 * @route       password/reset-password
 * @method      POST
 * @access      public
-------------------------------------------------*/
module.exports.sendResetPasswordCtrl = asyncHandler(async (req, res) => {
    try {
        // Validation
        const { error } = validateEmail(req.body);
        if (error) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: error.details[0].message });
        }

        // Get user from DB using email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "User not found for entered email" })
        }

        // Create verification token
        let verificationToken = await VerificationToken.findOne({ userId: user._id });
        if (!verificationToken) {
            verificationToken = new VerificationToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            await verificationToken.save();
        }

        // Create reset password link
        const link = `${process.env.CLINET_HOST}/password/reset-password/${user._id}/${verificationToken.token}`;

        // Create HTML template for email
        const htmlTemplate = `
            <a href="${link}"> Click to link to reset password </a>
        `;

        // Send Email
        await email(user.email, "Reset Password", htmlTemplate);

        // Respond to client
        res.status(HTTP_STATUS_OK).json({ message: "Email reset password successfully sent, please check your email..." });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Get Reset Password View
 * @route       /password/reset-password/:userId/:token
 * @method      GET
 * @access      public
-------------------------------------------------*/
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!verificationToken) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid or expired token" });
        }

        res.render('reset-password', { email: user.email });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Error" });
    }
});

/**------------------------------------------------
 * @desc        Reset Password
 * @route       /password/reset-password/:userId/:token
 * @method      POST
 * @access      public
-------------------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
    try {
        const { userId, token } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
        }

        const verificationToken = await VerificationToken.findOne({ userId, token });
        if (!verificationToken) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Delete verification token
        await VerificationToken.findOneAndDelete({ userId });

        res.status(HTTP_STATUS_OK).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
});
