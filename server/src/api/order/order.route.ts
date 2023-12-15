import { Router } from "express";
import {
  changeOrderStatus,
  findAll,
  findOneByUserIdAndName,
} from "./order.controller";
import {
  validateChangeOrderStatus,
  validateOrderUserId,
  validateOrderUserIdAndName,
} from "./order.validator";

// Create a new instance of Express router
const router = Router();

// Endpoint to find all orders
router.route("/findAll").get(validateOrderUserId, [findAll]);

// Endpoint to find one order by userId and name
router
  .route("/findOneByUserIdAndName")
  .get(validateOrderUserIdAndName, [findOneByUserIdAndName]);

// Endpoint to change the order status
router
  .route("/changeOrderStatus")
  .post(validateChangeOrderStatus, [changeOrderStatus]);

// Export the router for use in other files
export default router;
