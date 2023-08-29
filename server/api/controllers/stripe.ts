import { stripeConfig } from "../configuration/stripeConfig";

// Example: Create a payment intent
export const createPaymentIntent = async (req: any, res: any, next: any) => {
  let { amount, currency } = req.body;
  amount = amount.concat("00");
  try {
    const paymentIntent = await stripeConfig.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
