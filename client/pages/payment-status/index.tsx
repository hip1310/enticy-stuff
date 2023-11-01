import { useState, useEffect } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import {
  getAddressId,
  getUser,
  isLoggedIn,
  removeCartItems,
} from "../../util/commonFunctions";
import { patch } from "../../services/axiosAPI";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
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
            if (isLoggedIn()) {
              const userData = getUser();
              const addressId = getAddressId();
              try {
                patch(`/cart/moveCartItem?userId=${userData?.id}&addressId=${addressId}`);
              } catch (error) {
                console.error("Error cart move:", error);
              }
            } else {
              removeCartItems();
            }

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
    <div className="text-center mt-20">
      <h4 className="font-bold capitalize text-2xl">
        {paymentIntentObj?.status}
      </h4>
      <br />
      {message}{" "}
      <Link href="/" className="underline  text-blue-600">
        Redirect to home in
      </Link>
    </div>
  );
};

export default PaymentStatus;
