const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const path = require("path"); // from Node.js
const fs = require("fs"); // Node.js module for file system operations
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");

// Constants for HTTP status codes
const {
    HTTP_STATUS_OK,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_FORBIDDEN,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Get All Users Profile
 * @route       /api/users/profile
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(HTTP_STATUS_OK).json(users);
});

/**------------------------------------------------
 * @desc        Get User Profile
 * @route       /api/users/profile/:id
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
    }
    res.status(HTTP_STATUS_OK).json(user);
});

/**------------------------------------------------
 * @desc        Update User Profile
 * @route       /api/users/profile/:id
 * @method      PUT
 * @access      private (only user himself)
-------------------------------------------------*/
const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: error.details[0].message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            fullName: req.body.fullName,
            studentId: req.body.studentId,
            bio: req.body.bio,
            location: req.body.location,
        }
    }, { new: true }).select("-password");

    res.status(HTTP_STATUS_OK).json(updateUser);
});

/**------------------------------------------------
 * @desc        Get Users Count
 * @route       /api/users/count
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const getUsersCountCtrl = asyncHandler(async (req, res) => {
    const count = await User.countDocuments();
    res.status(HTTP_STATUS_OK).json(count);
});

/**----------------------------------------------------
 * @desc        Profile Photo Upload
 * @route       /api/users/profile/profile-photo-upload
 * @method      POST
 * @access      private (only logged in user)
-----------------------------------------------------*/
const profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
    // Validation
    if (!req.file) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'Please insert an image file' })
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

    const result = await cloudinaryUploadImage(imagePath);

    const user = await User.findById(req.user.id);

    if (user.profilePicture.publicId !== null) {
        await cloudinaryRemoveImage(user.profilePicture.publicId);
    }

    user.profilePicture = {
        url: result.secure_url,
        publicId: result.public_id,
    }
    await user.save();

    res.status(HTTP_STATUS_OK).json({
        message: "The profile photo changed successfully.",
        profilePhoto: { url: result.secure_url, publicId: result.public_id }
    });

    fs.unlinkSync(imagePath);
});

/**----------------------------------------------------
 * @desc        ID Photo Upload
 * @route       /api/users/profile/id-photo-upload
 * @method      POST
 * @access      private (only logged in user)
-----------------------------------------------------*/
const idPhotoUploadCtrl = asyncHandler(async (req, res) => {
    // Validation
    if (!req.file) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: 'Please insert an image file' })
    }

    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

    const result = await cloudinaryUploadImage(imagePath);

    const user = await User.findById(req.user.id);

    if (user.idImage.publicId !== null) {
        await cloudinaryRemoveImage(user.idImage.publicId);
    }

    user.idImage = {
        url: result.secure_url,
        publicId: result.public_id,
    }
    await user.save();

    res.status(HTTP_STATUS_OK).json({
        message: "The ID photo changed successfully.",
        idPhoto: { url: result.secure_url, publicId: result.public_id }
    });

    fs.unlinkSync(imagePath);
});

/**----------------------------------------------------
 * @desc        Delete User Profile (Account)
 * @route       /api/users/profile/:id
 * @method      DELETE
 * @access      private (only admin or user himself)
-----------------------------------------------------*/
const deleteUserProfileCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        if (user.profilePhoto && user.profilePhoto.publicId) {
            await cloudinaryRemoveImage(user.profilePhoto.publicId);
        }
        await User.findByIdAndDelete(req.params.id);
    } else {
        return res.status(HTTP_STATUS_FORBIDDEN).json({ message: "Forbidden: You don't have permission to perform this action" });
    }

    res.status(HTTP_STATUS_OK).json({ message: "The profile has been deleted" });
});

module.exports = {
    getAllUsersCtrl,
    getUserProfileCtrl,
    updateUserProfileCtrl,
    getUsersCountCtrl,
    profilePhotoUploadCtrl,
    idPhotoUploadCtrl,
    deleteUserProfileCtrl
};
