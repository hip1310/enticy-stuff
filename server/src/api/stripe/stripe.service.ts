// Import the necessary modules and configurations
import Stripe from "stripe";
import { stripeConfig } from "../../config/stripe-config";
import { StripeInterface } from "./stripe.interface";
import logger from "../../middleware/logger";

// Function to create a payment intent
export const createPaymentIntent = async (body: StripeInterface) => {
  // Extract amount and currency from the request body
  let { amount, currency } = body;

  // Convert the amount to cents (Stripe uses the smallest currency unit)
  amount = amount.concat("00");

  // Create a payment intent using the Stripe API
  const paymentIntent = await stripeConfig.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });

  // Return the client secret from the payment intent
  return { clientSecret: paymentIntent.client_secret };
};

// Webhook handler for Stripe events
export const webhook = async (body: Stripe.Event) => {
  // Extract the event object from the request body
  const event = body;

  // Handle different types of Stripe events
  switch (event.type) {
    case "charge.succeeded":
      // Handle successful charge event
      const paymentSucceeded = event.data.object;
      break;
    case "payment_intent.succeeded":
      // Handle successful payment intent event
      const paymentIntent = event.data.object;
      // Example: handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "payment_method.attached":
      // Handle successful attachment of a PaymentMethod event
      const paymentMethod = event.data.object;
      // Example: handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      // Log unhandled event types
      logger.info(`Unhandled event type ${event.type}`);
  }

  // Respond to the webhook event
  // Example: response.json({ received: true });
};
