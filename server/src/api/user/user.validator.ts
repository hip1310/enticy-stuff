// Import necessary modules from Express and Express Validator
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getValidationChecks } from "../validator"

// Middleware to validate user data
export const validateUser = [
  // Spread operator is used to include the validation checks for each field
  ...getValidationChecks(["email", "name", "picture", "sub"]),
  
  // Handler function to check for validation errors
  (req: Request, res: Response, next: NextFunction) => {
    // Get validation errors from the request
    const errors = validationResult(req);
    
    // If there are validation errors, return a 422 Unprocessable Entity status with the errors
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    // If there are no validation errors, move to the next middleware or route handler
    next();
  },
];
