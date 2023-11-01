// File: error-handler.js
import { Request, Response } from "express";
import CustomError from "./custom-error";
import { ErrnoException } from "./error.interface";

// errorHandler function handles errors and sends appropriate responses
export const errorHandler = (
  err: ErrnoException,
  req: Request,
  res: Response
) => {
  // Check if the error is an instance of CustomError
  if (err instanceof CustomError) {
    // Handle custom error with a 400 Bad Request status
    return res.status(400).json({ error: err.message });
  } else {
    // Handle other errors with a 500 Internal Server Error status
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the errorHandler function as the default export
export default errorHandler;
