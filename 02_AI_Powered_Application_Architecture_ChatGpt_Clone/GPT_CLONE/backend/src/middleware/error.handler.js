
//function to handle errors
export const errorHandler = (err, req, res, next) => {
   console.log("error:", err.message);
    return
     res.status(500).json({
        status: false,
        message: err.message || 'something went wrong try again later',
     });
    }

export default errorHandler;