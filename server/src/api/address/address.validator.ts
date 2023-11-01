import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getValidationChecks, numericValidationChecks } from "../validator";

// Common validation middleware to check for validation errors
export const validateAddress = [
  ...getValidationChecks(["name", "address_line1", "pincode", "mobile"]).concat(
    ...numericValidationChecks(["userId"])
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

// Validation middleware for validating userId in address
export const validateAddressUserId = [
  // Validate userId field
  ...numericValidationChecks(["userId"]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

// Validation middleware for validating userId and id in address
export const validateAddressUserIdAndId = [
  // Validate userId field
  ...numericValidationChecks(["userId","id"]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];
