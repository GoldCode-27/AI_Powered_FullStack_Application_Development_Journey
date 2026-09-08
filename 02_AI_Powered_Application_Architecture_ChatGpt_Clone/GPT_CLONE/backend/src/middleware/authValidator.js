const normalizeEmail = (email) => email?.trim().toLowerCase();

const rejectInvalid = (res, message) =>
  res.status(400).json({
    success: false,
    message,
  });

export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name?.trim())
     return rejectInvalid(res, "Name is required.");
  if (!email?.trim())
     return rejectInvalid(res, "Email is required.");
  if (!password)
     return rejectInvalid(res, "Password is required.");
  if (password.length < 6) {
    return rejectInvalid(res, "Password must be at least 6 characters.");
  }

  req.body = {
    name: name.trim(),
    email: normalizeEmail(email),
    password,
  };

  return next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email?.trim()) 
    return rejectInvalid(res, "Email is required.");
  if (!password)
     return rejectInvalid(res, "Password is required.");

  req.body = {
    email: normalizeEmail(email),
    password,
  };

  return next();
};
