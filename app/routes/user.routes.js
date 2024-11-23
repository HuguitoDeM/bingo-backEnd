import express from "express";
import userController from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/auth/signup", userController.createUser);
UserRouter.post("/auth/signin", userController.createUser);
UserRouter.post("/auth/signout", userController.createUser);
UserRouter.get("/auth/test/user", userController.createUser);

export default UserRouter;
