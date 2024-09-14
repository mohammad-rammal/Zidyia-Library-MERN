const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Document, validateDocumentUpload, validateUpdateDocumentStatus } = require("../models/Document");
const { cloudinaryUploadDocument } = require("../utils/cloudinary");

// Constants
const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_OK
} = require('../middlewares/constants');

/**------------------------------------------------
 * @desc        Upload New Document
 * @route       /api/documents
 * @method      POST
 * @access      private (only logged in user)
-------------------------------------------------*/
const uploadDocumentCtrl = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: "No file provided." })
        }

        // Upload file
        const filePath = path.join(__dirname, `../doc/${req.file.filename}`);
        const result = await cloudinaryUploadDocument(filePath);

        // Create new document and save to DB
        const document = new Document({
            user: req.user.id,
            library: req.body.library,
            documentUrl: {
                url: result.secure_url,
                publicId: result.public_id
            },
            status: req.body.status
        });

        await document.save();

        // Send a response to the client
        res.status(HTTP_STATUS_CREATED).json(document);

        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Failed to upload document' });
    }
});

/**------------------------------------------------
 * @desc        Update the status of a document
 * @route       PUT /api/requests/:id/status
 * @method      PUT
 * @access      private
-------------------------------------------------*/
const updateDocumentStatus = asyncHandler(async (req, res) => {
    try {
        // Validate the request body
        const { error } = validateUpdateDocumentStatus(req.body);
        if (error) return res.status(HTTP_STATUS_BAD_REQUEST).send(error.details[0].message);

        // Check if the document exists
        let document = await Document.findById(req.params.id);
        if (!document) return res.status(HTTP_STATUS_NOT_FOUND).send("Document not found");

        // Update the status of the document
        document.status = req.body.status;
        if (req.body.adminNotes) {
            document.adminNotes = req.body.adminNotes;
        }

        // Save the updated document to the database
        document = await document.save();

        res.status(HTTP_STATUS_OK).json(document);
    } catch (error) {
        console.error("Error updating document status:", error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get All Documents
 * @route       /api/documents
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getAllDocumentsCtrl = asyncHandler(async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(HTTP_STATUS_OK).json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get Single Document
 * @route       /api/documents/:id
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getSingleDocumentCtrl = asyncHandler(async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: "Document not found" });
        }
        res.status(HTTP_STATUS_OK).json(document);
    } catch (error) {
        console.error("Error fetching document:", error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get Document Count
 * @route       /api/documents/count
 * @method      GET
 * @access      public
-------------------------------------------------*/
const getDocumentCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Document.countDocuments();
        res.status(HTTP_STATUS_OK).json(count);
    } catch (error) {
        console.error("Error fetching document count:", error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get Count of Documents by Status
 * @route       /api/documents/count/:status
 * @method      GET
 * @access      private (only admin)
-------------------------------------------------*/
const getDocumentCountByStatusCtrl = asyncHandler(async (req, res) => {
    const { status } = req.params;
    try {
        const count = await Document.countDocuments({ status });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(`Error fetching ${status} documents count:`, error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get Count of User's Documents
 * @route       /api/documents/count/user
 * @method      GET
 * @access      private (only logged in user)
-------------------------------------------------*/
const getUserDocumentsCountCtrl = asyncHandler(async (req, res) => {
    try {
        const count = await Document.countDocuments({ user: req.user.id });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error("Error fetching user documents count:", error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

/**------------------------------------------------
 * @desc        Get Count of Documents by Status
 * @route       /api/documents/mycount/:userId/:status
 * @method      GET
 * @access      private (only user himself)
-------------------------------------------------*/
const getUserDocumentsCountByStatusCtrl = asyncHandler(async (req, res) => {
    const { status } = req.params;
    try {
        // Find documents belonging to the user with the specified status
        const count = await Document.countDocuments({ user: req.user.id, status });
        res.status(HTTP_STATUS_OK).json({ count });
    } catch (error) {
        console.error(`Error fetching user documents count by status (${status}):`, error);
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});

module.exports = {
    uploadDocumentCtrl,
    updateDocumentStatus,
    getAllDocumentsCtrl,
    getSingleDocumentCtrl,
    getDocumentCountCtrl,
    getDocumentCountByStatusCtrl,
    getUserDocumentsCountCtrl,
    getUserDocumentsCountByStatusCtrl
};
