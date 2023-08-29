import { useState, useEffect } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
import { removeCartItems } from "./util/commonFunctions";
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
);
const PaymentStatus = () => (
  <Elements stripe={stripePromise}>
    <PaymentStatusComponent />
  </Elements>
);

const PaymentStatusComponent = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>("");
  const [paymentIntentObj, setPaymentIntentObj] = useState<any>();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret: any = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        setPaymentIntentObj(paymentIntent);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            removeCartItems();
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);
  return (
    <div style={{ marginTop: 150, textAlign: "center" }}>
      <h4 style={{ fontWeight: "bold", textTransform: "capitalize" }}>
        {paymentIntentObj?.status}
      </h4>
      <br />
      {message} <Link to={"/"}>Redirect to home in</Link>
    </div>
  );
};

export default PaymentStatus;
