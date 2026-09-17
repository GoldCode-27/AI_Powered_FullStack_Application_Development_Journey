
import {statusCodes} from'http-status-codes'
//function to handle errors
export const errorHandler = (err, req, res, next) => {
  
  let customError = {
    statusCode:err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    message:err.message || 'something went wrong.'
  }

  if(err?.code='ER_DUP_ENTRY'){
   
    customError.statusCode = statusCodes.BAD_REQUEST,
    customError.message = 'You have used duplicated email address so you have to make it different '
  }

  return res.status(customError.statusCode).json({
    msg:customError.message
  })
};

export default errorHandler;
