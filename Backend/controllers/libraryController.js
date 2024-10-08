const Library = require('../models/Library');
const randomstring = require('randomstring');
const email = require("../utils/email");
const { User } = require('../models/User');
const bcrypt = require("bcryptjs");

// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_OK
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Create a new library
 * @route       /api/libraries
 * @method      POST
 * @access      public
-------------------------------------------------*/
const createLibrary = async (req, res) => {
    try {
        const { libraryName, location, libraryAdminEmail } = req.body;

        // Check if libraryAdminEmail already exists
        const existingLibrary = await Library.findOne({ libraryAdminEmail });
        if (existingLibrary) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ msg: 'library with this email already exists' });
        }

        // Generating auto-generated password
        const autoGeneratedPassword = randomstring.generate(8);

        const newLibrary = new Library({
            libraryName,
            location,
            libraryAdminEmail,
            autoGeneratedPassword,
        });

        const savedLibrary = await newLibrary.save();

        // Logic for sending email with generated password and verification link
        const htmlTemplate = `
        <div>
            <p>Your Library for ${req.body.libraryName} has been created successfully.</p>
            <p>Here are the details:</p>
            <ul>
                <li>Library Name: ${req.body.libraryName}</li>
                <li>Location: ${req.body.location}</li>
                <li>Admin Email: ${req.body.libraryAdminEmail}</li>
            </ul>
            <p>Here is your auto-generated password: ${autoGeneratedPassword}</p>
            <p>Please use this password to log in to the Admin Dashboard.</p>
            <p>Upon first login, you will be requested to create a new password of your choice.</p>
        </div>
        `;

        // Hash the auto-generated password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(autoGeneratedPassword, salt);

        // Create a new user for the admin
        let user = new User({
            fullName: req.body.libraryName,
            email: req.body.libraryAdminEmail,
            password: hashedPassword,
            role: "admin",
            isAccountVerified: true,
        });

        // Save the new user to the database
        await user.save();

        // Send Email
        await email(librarytAdminEmail, "Library Email", htmlTemplate);

        // Send a response to the client
        res.status(HTTP_STATUS_CREATED).json({ message: "Please check your email for verification" });
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
};

/**------------------------------------------------
 * @desc        Get all libraries
 * @route       /api/libraries
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getAllLibraries = async (req, res) => {
    try {
        const libraries = await Library.find();
        res.status(HTTP_STATUS_OK).json(libraries);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
};

/**------------------------------------------------
 * @desc        Get a library by ID
 * @route       /api/libraries/:id
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getLibraryById = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id);
        if (!library) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ msg: 'Library not found' });
        }
        res.status(HTTP_STATUS_OK).json(library);
    } catch (error) {
        console.error(error.message);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send('Server Error');
    }
};

module.exports = {
    createLibrary,
    getAllLibraries,
    getLibraryById
};
