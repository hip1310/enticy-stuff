import { Request, Response } from "express";
import * as StripeService from "./stripe.service";
import CustomError from "../../exception/custom-error";

// Create a payment intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    // Call the StripeService to create a payment intent based on the request body
    res.json(await StripeService.createPaymentIntent(req.body));
  } catch (error) {
    // If an error occurs, throw a custom error with a meaningful message
    throw new CustomError(error, "Error creating payment intent");
  }
};

// Webhook endpoint for handling Stripe events
export const webhook = async (req: Request, res: Response) => {
  // Call the StripeService to handle the incoming webhook payload
  await StripeService.webhook(req.body);
};
