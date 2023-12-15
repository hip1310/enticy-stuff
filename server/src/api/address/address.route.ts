import { Router } from "express";
import {
  addOrUpdate,
  findAll,
  deleteAddress,
} from "./address.controller";
import {
  validateAddress,
  validateAddressUserId,
  validateAddressUserIdAndId,
} from "./address.validator";

// Create an instance of Express Router
const router = Router();

// Route for adding or updating address items
router.route("/add").post(validateAddress, [addOrUpdate]);

// Route for finding all address items for a specific user
router.route("/findAll").get(validateAddressUserId, [findAll]);

// Route for finding all address items for a specific user
router.route("/deleteAddress").delete(validateAddressUserIdAndId, [deleteAddress]);

// Export the router for use in other parts of the application
export default router;
