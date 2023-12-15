import { Router } from "express";
import { promoteOrders } from "./scheduler.controller";

// Create an instance of Express Router
const router = Router();
// Route to promote orders for scheduler
router.post("/promoteOrders", [promoteOrders]);

// Export the router for use in other parts of the application
export default router;
