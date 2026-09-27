import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/index.js";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message
    })
    return
  }

  
  console.error('Unhandled error:');
  console.error(`Message: ${err.message}`);
  console.error(err.stack);
  
  res.status(500).json({
    success: false,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something Went Wrong'
  })
}

export default globalErrorHandler