const mongoose = require("mongoose");
const Joi = require("joi");

// Document Schema
const DocumentSchema = new mongoose.Schema({
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
    documentUrl: {
        type: Object,
        required: true,
        default: {
            url: "",
            publicId: null,
        }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionReason: {
        type: String
    },
    adminNotes: String,
}, {
    timestamps: true
});

// Document Model
const Document = mongoose.model("Document", DocumentSchema);

// Validate Document Upload
function validateDocumentUpload(obj) {
    const schema = Joi.object({
        library: Joi.string().required(),

    });
    return schema.validate(obj);
}

// Validate Update Request Status
function validateUpdateDocumentStatus(obj) {
    const schema = Joi.object({
        status: Joi.string().valid("pending", "approved", "rejected").required(),
        adminNotes: Joi.string().allow('').optional()
    });
    return schema.validate(obj);
}

module.exports = {
    Document,
    validateDocumentUpload,
    validateUpdateDocumentStatus

}
