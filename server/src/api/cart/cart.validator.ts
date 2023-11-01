import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getValidationChecks, numericValidationChecks } from "../validator";

// Common validation middleware to check for validation errors
export const validateCart = [
  ...getValidationChecks(["name", "category"]).concat(
    ...numericValidationChecks(["userId", "qty", "price"])
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

// Validation middleware for validating userId in cart
export const validateCartUserId = [
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

// Validation middleware for validating userId and name in cart
export const validateCartUserIdAndName = [
  // Validate userId & name field
  ...getValidationChecks(["name"]).concat(
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

// Validation middleware for validating userId and addressId in cart
export const validateCartUserIdAndAddressId = [
  // Validate userId field
  ...numericValidationChecks(["userId","addressId"]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];