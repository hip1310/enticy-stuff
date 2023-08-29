import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "./StripeCheckout";
import { getTotal } from "./util/commonFunctions";
import { axiosAPI } from "../services/axiosAPI";
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
);
const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const data = {
      amount: getTotal(),
      currency: "inr",
    };
    axiosAPI
      .post("/stripe/create-payment-intent", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
        },
      })
      .then(async (response: any) => {
        if (response.status === 200) {
          const { clientSecret } = response?.data;
          setClientSecret(clientSecret);
        }
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };
  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckout />
    </Elements>
  ) : (
    <></>
  );
};

export default Payment;
