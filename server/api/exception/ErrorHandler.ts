// File: error-handler.js
import CustomError from "./CustomError";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof CustomError) {
    // Handle custom error
    return res.status(400).json({ error: err.message });
  } else {
    // Handle other errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default errorHandler;
