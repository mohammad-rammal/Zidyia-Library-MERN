const router = require("express").Router();
const { registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl } = require("../controllers/authController");
const photoUpload = require("../middlewares/photoUpload");


// / api/auth/register
router.post("/register", photoUpload.single("idImage"), registerUserCtrl);


// / api/auth/login
router.post("/login", loginUserCtrl);


// / api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);



module.exports = router;