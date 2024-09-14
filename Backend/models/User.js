const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


// User Schema
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    idImage: {
        type: Object,
        required: true,
        default: {
            url: "",
            publicId: null,
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    studentId: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    profilePicture: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId: null,
        }
    },
    bio: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
    location: {
        type: String
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    isFirstLogin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET
    );
}

// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        fullName: Joi.string().trim().min(2).max(200).required(),
        // idImage: Joi.object().required(),
        password: Joi.string().trim().min(8).required(),
        studentId: Joi.string().trim().min(3).max(50),
        email: Joi.string().trim().min(5).max(100).required().email(),
        location: Joi.string(),
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        fullName: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(8),
        studentId: Joi.string().trim().min(3).max(50),
        profilePicture: Joi.string(),
        bio: Joi.string(),
        location: Joi.string(),
    });
    return schema.validate(obj);
}

// Validate Email
function validateEmail(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

// Validate New Password
function validateNewPassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword,
}