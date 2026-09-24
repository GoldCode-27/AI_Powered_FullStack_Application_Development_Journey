import express from "express";
import { loginController, signupController } from "./auth.controller.js";
import { validateLogin, validateSignup } from "../../middleware/authValidator.js";

const authRouter = express.Router();

//localhost:3888/signup(login)

// /api/auth/signup
// /api/auth/signin

authRouter.post("/signup", validateSignup, signupController);
authRouter.post("/login", validateLogin, loginController);


export default authRouter;