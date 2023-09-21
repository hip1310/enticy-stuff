import { stripeConfig } from "../configuration/stripeConfig";

//Create a payment intent
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

//webhook
export const webhook = async (req: any, res: any, next: any) => {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case "charge.succeeded":
      const paymentSucceeded = event.data.object;
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  // response.json({received: true});
};
