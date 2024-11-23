import express from "express";
import userController from "../controllers/userController.js";

const UserRouter = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/signout", userController.signout);

export default UserRouter;
