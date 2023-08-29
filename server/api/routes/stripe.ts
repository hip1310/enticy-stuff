import { createPaymentIntent } from "../controllers/stripe";
import { Router } from "express";
const router = Router();

router.post("/create-payment-intent", [createPaymentIntent]);

export default router;
