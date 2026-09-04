//function to handle errors
export const errorHandler = (err, req, res, next) => {
  console.error("error:", err.message);

  return res.status(err.status || 500).json({
    status: false,
    message: err.message || "Something went wrong. Try again later.",
  });
};

export default errorHandler;
