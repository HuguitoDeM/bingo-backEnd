const checkDuplicateUsernameOrEmail = require("../middlewares/verifySignUp");
const express = require("express");
const controllers = require("../controllers/auth.controller");

const router = express.Router();

// Rutas de autenticación
router.post("/signup", [checkDuplicateUsernameOrEmail], controllers.signup);
router.post("/signin", controllers.signin);
router.post("/signout", controllers.signout);

module.exports = router;
