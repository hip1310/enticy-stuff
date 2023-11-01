import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Get the client secret from the URL parameters
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // Retrieve payment intent information
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Confirm the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect to payment completion page
        return_url: window.location.origin + "/payment-status",
      },
    });

    // Handle payment confirmation errors
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: "auto",
  };

  return (
    <div className="md:p-12 mt-20">
      <div className="my-0 mx-auto md:w-2/5 w-4/5 md:static fixed md:top-auto top-2/4 md:left-auto left-2/4 md:transform-none translate-y-[-50%] translate-x-[-50%]">
        <form
          id="payment-form"
          onSubmit={handleSubmit}
          className="mainContainer block w-full"
        >
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <div className="flex mt-2.5">
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="block w-11/12 !mr-2.5 !bg-slate-800 !text-white"
              type="submit"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </Button>
            <Button
              id="cancel"
              className="block w-11/12 !bg-slate-800 !text-white"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              <span id="button-text">Cancel</span>
            </Button>
          </div>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}
