const mongoose = require("mongoose");
const Joi = require("joi");

// Request Schema
const RequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    library: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required: true
    },
    // formFields: {
    //     type: Object,
    //     required: true
    // },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    adminNotes: String,
}, {
    timestamps: true
});

// Request Model
const Request = mongoose.model("Request", RequestSchema);

// Validate Request
function validateRequest(obj) {
    const schema = Joi.object({
        library: Joi.string().required(),
    });
    return schema.validate(obj);
}

// Validate Update Request Status
function validateUpdateRequestStatus(obj) {
    const schema = Joi.object({
        status: Joi.string().valid("pending", "approved", "rejected").required(),
        adminNotes: Joi.string().allow('').optional()
    });
    return schema.validate(obj);
}
module.exports = {
    Request,
    validateRequest,
    validateUpdateRequestStatus
}
