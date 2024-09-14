const Subscription = require('../models/Subscription');
const randomstring = require("randomstring");
const asyncHandler = require("express-async-handler");
const email = require("../utils/email");
const mailTrap = require('../utils/mailTrap');
const { User } = require('../models/User');
const bcrypt = require("bcryptjs");

// Constants
const {
    HTTP_STATUS_BAD_REQUEST
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Create Subscription
 * @route       /api/subscriptions
 * @method      POST 
 * @access      public
-------------------------------------------------*/
const createSubscription = asyncHandler(async (req, res) => {
    try {
        // Check if a user with the same email already exists
        let existingUser = await User.findOne({ email: req.body.adminEmail });
        if (existingUser) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "A user with this email already exists." });
        }

        // Generate auto-generated password
        const autoGeneratedPassword = randomstring.generate(8);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(autoGeneratedPassword, salt);

        // Create subscription
        const subscription = await Subscription.create({
            ...req.body,
            autoGeneratedPassword: hashedPassword,
            isFirstLogin: true
        });

        const link = `${process.env.CLINET_HOST}/reset-password/${subscription._id}`;

        // Send email to subscriber with auto-generated password
        const emailTemplate = `
        <div>
            <p>Your subscription for ${req.body.organizationName} has been created successfully.</p>
            <p>Here are the details:</p>
            <ul>
                <li>Organization Name: ${req.body.organizationName}</li>
                <li>Location: ${req.body.location}</li>
                <li>Admin Email: ${req.body.adminEmail}</li>
                <li>Expiry Date: ${req.body.expiryDate}</li>
            </ul>
            <p>Here is your auto-generated password: ${autoGeneratedPassword}</p>
            <p>Please use this password to log in to the Verifier Platform.</p>
            <p>Upon first login, you will be requested to create a new password of your choice.</p>
            <p>Additionally, you can reset your password by clicking on the following link:</p>
            <a href="${link}"> Reset Password</a>
        </div>
        `;

        // Send email
        await mailTrap(req.body.adminEmail, "Subscription Created", emailTemplate);

        // Create new user
        let user = new User({
            fullName: req.body.organizationName,
            email: req.body.adminEmail,
            password: hashedPassword,
            role: "admin",
            isAccountVerified: true,
        });
        await user.save();

        res.status(201).json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create subscription' });
    }
});

module.exports = {
    createSubscription
};
