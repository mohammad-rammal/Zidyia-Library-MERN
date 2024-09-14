const express = require('express');
const router = express.Router();
const { createLibrary } = require('../controllers/libraryController');
const { getAllLibraries, getLibraryById } = require('../controllers/libraryController');
const { verifyTokenAndSuperAdmin } = require("../middlewares/verifyToken");

// Route to create a tenant
router.post('/', verifyTokenAndSuperAdmin, createLibrary);

// Route to get all libraries
router.get('/', verifyTokenAndSuperAdmin, getAllLibraries);

// Route to get a library by ID
router.get('/:id', verifyTokenAndSuperAdmin, getLibraryById);

module.exports = router;
