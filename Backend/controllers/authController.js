const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
    User,
    validateRegisterUser,
    validateLoginUser,
} = require("../models/User");
const fs = require("fs");
const path = require("path");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const axios = require("axios");
const { VerificationToken } = require("../models/VerificationToken");
const crypto = require("crypto");
const email = require("../utils/email");

// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_OK,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require("../middlewares/constants");

/**------------------------------------------------
 * @desc        Register New User
 * @route       /api/auth/register
 * @method      POST
 * @access      public
-------------------------------------------------*/
const registerUserCtrl = asyncHandler(async (req, res) => {
    try {
        // Validation
        const { error } = validateRegisterUser(req.body);
        if (error) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: error.details[0].message });
        }
        if (!req.file) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "No image provided." });
        }

        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "User with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Upload photo
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
        const result = await cloudinaryUploadImage(imagePath);

        // Fetch user location based on IP address
        let locationData = { country: null, city: null };
        try {
            const ip = "178.135.255.255" || req.ip || req.connection.remoteAddress;
            console.log(ip);
            const locationResponse = await axios.get(`https://ipinfo.io/${ip}/json`);
            locationData.country = locationResponse.data.country;
            locationData.city = locationResponse.data.city;
        } catch (error) {
            console.error("Error fetching user location:", error.message);
        }

        // Set user role based on conditions
        let role = "user";
        if (req.body.email === process.env.SUPER_ADMIN_EMAIL) {
            role = "superadmin";
        }

        // Create new user and save to DB
        user = new User({
            fullName: req.body.fullName,
            idImage: {
                url: result.secure_url,
                publicId: result.public_id,
            },
            email: req.body.email,
            password: hashedPassword,
            studentId: req.body.studentId,
            role: role,
            location: `${locationData.country}, ${locationData.city}` || null,
        });

        await user.save();

        // Create VerificationToken with save in DB
        const verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        });
        await verificationToken.save();

        // Create link
        const link = `${process.env.CLINET_HOST}/users/${user._id}/verify/${verificationToken.token}`;

        // Add link to htmlTemplate
        const htmlTemplate = `
        <div>
            <p>  Click on the link to verify your email   </p>
            <a href="${link}">  Verify  </a>
        </div>
        `;

        // Send Email
        await email(user.email, "Verification Email", htmlTemplate);

        // Send a response to the client
        res
            .status(HTTP_STATUS_CREATED)
            .json({
                message:
                    "Email verification successfully sent, please verify your email...",
            });

        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to register new user" });
    }
});

/**------------------------------------------------
 * @desc        Login User
 * @route       /api/auth/login
 * @method      POST
 * @access      public
-------------------------------------------------*/
const loginUserCtrl = asyncHandler(async (req, res) => {
    try {
        // Validation
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: error.details[0].message });
        }

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "Invalid email or password." });
        }

        // Check the password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordMatch) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "Invalid email or password." });
        }

        // Generate token (JWT)
        const token = user.generateAuthToken();

        // Response to client
        res.status(HTTP_STATUS_OK).json({
            _id: user._id,
            role: user.role,
            profilePicture: user.profilePicture,
            fullName: user.fullName,
            email: user.email,
            location: user.location,
            bio: user.bio,
            token: token,
            isFirstLogin: user.isFirstLogin,
        });
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to login user" });
    }
});

/**------------------------------------------------
 * @desc        Verify User Account
 * @route       /api/auth/:userId/verify/:token
 * @method      GET
 * @access      public
-------------------------------------------------*/
const verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "Invalid Link!" });
        }

        const verificationToken = await VerificationToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!verificationToken) {
            return res
                .status(HTTP_STATUS_BAD_REQUEST)
                .json({ message: "Invalid Link!" });
        }

        // Mark account as verified
        user.isAccountVerified = true;
        await user.save();

        // Remove verification token from DB
        await VerificationToken.findByIdAndDelete(verificationToken._id);

        res
            .status(HTTP_STATUS_OK)
            .json({ message: "Account Successfully Verified" });
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to verify user account" });
    }
});

module.exports = {
    registerUserCtrl,
    loginUserCtrl,
    verifyUserAccountCtrl,
};
