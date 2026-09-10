import jwt from "jsonwebtoken";
import { login, signup } from "./auth.service.js";

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is not configured.");
    error.status = 500;
    throw error;
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  const generatedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",})

  return generatedToken;
};
       
export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signup({ name, email, password });

    return res.status(201).json({
      success: true,
      user,
      token: createToken(user),
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Signup failed.",
    });
  }
}; 

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login({ email, password });

    return res.status(200).json({
      success: true,
      user,
      token: createToken(user),
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};
