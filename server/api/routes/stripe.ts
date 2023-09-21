import { createPaymentIntent, webhook } from "../controllers/stripe";
import { Router } from "express";
const router = Router();

router.post("/create-payment-intent", [createPaymentIntent]);
router.post("/webhook", [webhook]);

export default router;
