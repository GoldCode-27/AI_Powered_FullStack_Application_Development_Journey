import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!jwtSecret || !token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
