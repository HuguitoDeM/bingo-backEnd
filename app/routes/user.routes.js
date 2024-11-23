const userController = require("../controllers/user.controller.js");
const express = require("express");

const UserRouter = express.Router();

UserRouter.post("/signup", userController.signup);
UserRouter.post("/signin", userController.signin);
UserRouter.post("/signout", userController.signout);

module.exports = UserRouter;
