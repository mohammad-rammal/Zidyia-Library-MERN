const path = require("path");
const multer = require("multer");

// file Storage
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../doc"));
    },
    filename: function (req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
        } else {
            cb(null, false);
        }
    }
})

// Photo Upload Middleware
const documentUpload = multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('application/') || file.mimetype === 'text/plain' || file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true)
        } else {
            cb({ message: "Unsupported file format" }, false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 10 }
});


module.exports = documentUpload;
