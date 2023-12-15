import { Router } from "express";
import {
  addOrUpdate,
  findAll,
  findOneByUserIdAndName,
  moveCartItem,
} from "./cart.controller";
import {
  validateCart,
  validateCartUserId,
  validateCartUserIdAndAddressId,
  validateCartUserIdAndName,
} from "./cart.validator";

// Create an instance of Express Router
const router = Router();

// Route for adding or updating cart items
router.route("/add").post(validateCart, [addOrUpdate]);

// Route for finding all cart items for a specific user
router.route("/findAll").get(validateCartUserId, [findAll]);

// Route for finding a specific cart item by user ID and name
router
  .route("/findOneByUserIdAndName")
  .get(validateCartUserIdAndName, [findOneByUserIdAndName]);

// Route for moving a cart item to another user
router.route("/moveCartItem").patch(validateCartUserIdAndAddressId, [moveCartItem]);

// Export the router for use in other parts of the application
export default router;
