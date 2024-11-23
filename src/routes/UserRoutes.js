import express from "express";
import userController from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/CreateUser", userController.createUser);
UserRouter.post("/LoginUser", userController.loginUser);

export default UserRouter;
