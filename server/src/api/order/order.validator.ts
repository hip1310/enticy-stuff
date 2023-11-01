import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getValidationChecks, numericValidationChecks } from "../validator";

export const validateOrderUserId = [
  ...numericValidationChecks(["userId"]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateOrderUserIdAndName = [
  ...getValidationChecks(["name"]).concat(
    ...numericValidationChecks(["userId"])
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export const validateChangeOrderStatus = [
  ...getValidationChecks(["name", "status", "warehouseCode"]).concat(
    ...numericValidationChecks(["userId"])
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
