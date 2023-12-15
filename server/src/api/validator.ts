import { check, validationResult } from "express-validator";

// Function to generate validation checks for specified fields
export function getValidationChecks(fields: string[]) {
  // Map through each field and create validation checks
  return fields.map((field) =>
    // Use Express Validator's check function to define validation rules for each field
    check(field)
      // Trim any leading or trailing whitespaces from the field value
      .trim()
      
      // Check if the field is not empty
      .notEmpty().withMessage(`Invalid empty ${field}!`)
      
      // Check if the field contains only alphanumeric characters
      .isString().withMessage(`Invalid alphanumeric ${field}!`)
      
      // Use bail to stop validation if any of the previous checks fail
      .bail()
  );
}

export function numericValidationChecks(fields: string[]) {
  // Map through each field and create validation checks
  return fields.map((field) =>
    // Use Express Validator's check function to define validation rules for each field
    check(field)
      // Trim any leading or trailing whitespaces from the field value
      .trim()
      
      // Check if the field contains only numeric characters
      .isInt().withMessage(`Invalid ${field}!`)
      
      // Use bail to stop validation if any of the previous checks fail
      .bail()
  );
}