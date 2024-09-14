const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/User");
const { VerificationToken } = require("../models/VerificationToken");
const crypto = require("crypto");
const email = require("../utils/email");

// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_OK
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Send Reset Password
 * @route       /api/password/reset-password
 * @method      POST
 * @access      public
-------------------------------------------------*/
const sendResetPasswordCtrl = asyncHandler(async (req, res) => {
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
        }

        // Create reset password link
        const link = `${process.env.CLINET_HOST}/reset-password/${user._id}/${verificationToken.token}`;

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
 * @desc        Get Reset Password
 * @route       /api/password/reset-password/:userId/:token
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getResetPasswordCtrl = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid Link!" });
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!verificationToken) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid Link!" });
        }

        res.status(HTTP_STATUS_OK).json({ message: "Valid Link." });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

/**------------------------------------------------
 * @desc        Reset Password
 * @route       /api/password/reset-password/:userId/:token
 * @method      POST
 * @access      public
-------------------------------------------------*/
const resetPasswordCtrl = asyncHandler(async (req, res) => {
    try {
        const { error } = validateNewPassword(req.body);
        if (error) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: error.details[0].message });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid Link!" });
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!verificationToken) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "Invalid Link!" });
        }

        if (!user.isAccountVerified) {
            user.isAccountVerified = true;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedPassword;
        await user.save();
        await verificationToken.remove();

        res.status(HTTP_STATUS_OK).json({ message: "Successfully Password Reset, Please Login Again." });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
});

module.exports = {
    sendResetPasswordCtrl,
    getResetPasswordCtrl,
    resetPasswordCtrl
};
