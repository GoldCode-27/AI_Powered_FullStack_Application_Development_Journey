
//function to handle errors
export const errorHandler = (err, req, res, next) => {
    
    let customError = {
        // Set default error properties
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error',
    };
    return
     res.status(customError.statusCode).json({
         message: customError.message,
         status: false  });
};

export default errorHandler;