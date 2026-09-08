import express from "express";
import { loginController, signupController } from "./auth.controller.js";
import {
  validateLogin,
  validateSignup,
} from "../../middleware/authValidator.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signupController);
authRouter.post("/login", validateLogin, loginController);

export default authRouter;
