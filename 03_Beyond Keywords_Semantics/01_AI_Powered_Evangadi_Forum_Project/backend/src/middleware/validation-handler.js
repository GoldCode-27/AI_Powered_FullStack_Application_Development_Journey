import { validationResult } from 'express-validator';
// import { BadRequestError } from '../utils/errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      eror:errors
      })
      const errorMessages = errors.array().map(err => err.msg);
      throw new BadRequestError(errorMessages.join('. '));
    }
  next();
};
