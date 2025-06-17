const { Router } = require("express");
const { Register, Login } = require("../controllers/authController");
const userVerification = require("../controllers/authHelpers");
const logoutUser = require("../controllers/authLogout");
const validateUser = require("../middleware/validateUser");

const router = Router();

router.post("/register", validateUser, Register);
router.post("/login", Login);
router.post("/verify", userVerification);
router.post("/logout", logoutUser);

module.exports = router;
