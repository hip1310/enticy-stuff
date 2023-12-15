// Import the logger middleware for logging errors
import logger from "../middleware/logger";

// Define a custom error class that extends the built-in Error class
class CustomError extends Error {
  // Constructor for the custom error class
  constructor(error: any, message: string) {
    // Call the constructor of the parent class (Error) with the provided message
    super(message);

    // Log the error using the logger middleware
    logger.error(error);

    // Set the name property of the error instance to "CustomError"
    this.name = "CustomError";
  }
}

// Export the custom error class for use in other parts of the application
export default CustomError;
