const router = require("express").Router();
const documentController = require("../controllers/documentController");
const documentUpload = require("../middlewares/documentUpload");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// Middleware for verifying token
router.use(verifyToken);

// Routes for uploading documents and getting all documents
router.post("/", documentUpload.single("documentUrl"), documentController.uploadDocumentCtrl);
router.get("/", documentController.getAllDocumentsCtrl);

// Routes for getting count of documents
router.get("/count", verifyTokenAndAdmin, documentController.getDocumentCountCtrl);
router.get("/count/:status", verifyTokenAndAdmin, documentController.getDocumentCountByStatusCtrl);

// Routes for users to get count of their documents
router.get("/mycount/:id", verifyTokenAndOnlyUser, documentController.getUserDocumentsCountCtrl);
router.get("/mycount/:userId/:status", verifyTokenAndAuthorization, documentController.getUserDocumentsCountByStatusCtrl);

// Route for updating document status
router.put("/:id/status", verifyTokenAndAdmin, documentController.updateDocumentStatus);

// Route for getting a single document by ID
router.get("/:id", validateObjectId, documentController.getSingleDocumentCtrl);

module.exports = router;
