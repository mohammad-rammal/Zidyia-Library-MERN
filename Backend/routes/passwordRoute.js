const router = require("express").Router();

const { getForgotPasswordView, sendResetPasswordCtrl, getResetPasswordView, resetPasswordCtrl } = require("../controllers/passwordController");

router.route("/forgot-password")
    .get(getForgotPasswordView)
    .post(sendResetPasswordCtrl);

router.route("/reset-password/:userId/:token")
    .get(getResetPasswordView)
    .post(resetPasswordCtrl);

module.exports = router;
