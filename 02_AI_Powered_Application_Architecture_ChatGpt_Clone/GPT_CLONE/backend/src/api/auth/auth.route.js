import express from "express";
import { loginController, signupController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export default authRouter;
