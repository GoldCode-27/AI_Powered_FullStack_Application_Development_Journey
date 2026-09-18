
//normalizing the input email
const normalizeEmail = (email) => email?.trim().toLowerCase();

//custome response method for all handlers
const rejectInvalid = (res, message) =>
  res.status(400).json({
    success: false,
    message,
  });

  //function to validate signup
export const validateSignup = (req, res, next) => {
  const { Fname, Lname, email, password } = req.body || {};

  if (!name?.trim())
     return rejectInvalid(res, "Name is required.");

    //or 
//   if (!name?.trim()) {
//   return res.status(400).json({
//     success: false,
//     message: "Name is required.",
//   });
// }

  if (!email?.trim())
     return rejectInvalid(res, "Email is required.");
  if (!password)
     return rejectInvalid(res, "Password is required.");
  if (!Fname)
     return rejectInvalid(res, "First Name is required.");
  if (!Lname)
     return rejectInvalid(res, "Last Name is required.");
  if (password.length < 6) {
    return rejectInvalid(res, "Password must be at least 6 characters.");
  }

  req.body = {
    Fname: Fname.trim(),
    Lname:Fname.trim(),
    email: normalizeEmail(email),
    password,
  };

  return next();
};

//function to validate login
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
