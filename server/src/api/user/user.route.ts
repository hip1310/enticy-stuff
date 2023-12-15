// Import the Router class from the express package
import { Router } from "express";

// Import the createUser function from the user.controller module
import { createUser } from "./user.controller";

// Import the validateUser function from the user.validator module
import { validateUser } from './user.validator';

// Create an instance of the Router class
const router = Router();

// Define a route for handling POST requests to create a user
router.route("/create").post(
  // Use the validateUser middleware to validate the request body
  validateUser,
  // Use the createUser controller function to handle the request
  [createUser]
);

// Export the router instance to make it available to other modules
export default router;
