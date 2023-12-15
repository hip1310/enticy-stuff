import { Router } from "express";
import { createPaymentIntent, webhook } from "./stripe.controller";

// Create an instance of the Express Router
const router = Router();

// Endpoint for creating a payment intent
// Middleware: createPaymentIntent function from stripe.controller
router.post("/create-payment-intent", [createPaymentIntent]);

// Endpoint for handling webhooks
// Middleware: webhook function from stripe.controller
router.post("/webhook", [webhook]);

// Export the router for use in other parts of the application
export default router;
