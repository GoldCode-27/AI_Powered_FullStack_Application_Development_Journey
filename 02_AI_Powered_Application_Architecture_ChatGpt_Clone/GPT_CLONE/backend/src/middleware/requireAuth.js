import { getUserByToken } from "../api/auth/auth.service.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const user = await getUserByToken(token);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Please log in first." });
  }

  req.authToken = token;
  req.user = user;
  return next();
};
