const router = require("express").Router();
const { sendResetPasswordCtrl, getResetPasswordCtrl, resetPasswordCtrl } = require("../controllers/passController");

// /api/password/reset-password
router.post("/reset-password", sendResetPasswordCtrl);

// /api/password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
    .get(getResetPasswordCtrl)
    .post(resetPasswordCtrl);
module.exports = router;