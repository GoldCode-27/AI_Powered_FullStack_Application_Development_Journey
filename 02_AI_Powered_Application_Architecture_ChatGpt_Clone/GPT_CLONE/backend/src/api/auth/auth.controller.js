import { login, signup } from "./auth.service.js";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required.",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  }

  const user = await signup({ name, email, password });
  return res.status(201).json({
     success: true,
     user 
    });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password) {
    return res
      .status(400)
      .json({
         success: false,
         message: "Email and password are required." 
        });
  }

  const user = await login({ 
    email, password });
  return res.json({ 
    success: true, user });
};
