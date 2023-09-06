import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "./StripeCheckout";
import { getTotal, getUser, isLoggedIn } from "./util/commonFunctions";
import { axiosAPI } from "../services/axiosAPI";
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
);
const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    let data;
    if (isLoggedIn()) {
      const userData = getUser();
      axiosAPI.get(`/cart/findAll?userId=${userData?.id}`).then((response) => {
        data = {
          amount: getTotal(response?.data),
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
              setLoading(false);
              const { clientSecret } = response?.data;
              setClientSecret(clientSecret);
            }
          });
      });
    } else {
      data = {
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
            setLoading(false);
            const { clientSecret } = response?.data;
            setClientSecret(clientSecret);
          }
        });
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };
  if (loading) {
    return (
      <div className="mainContainer" style={{ textAlign: "center" }}>
        <h3>Loading...</h3>
      </div>
    );
  } else {
    return clientSecret ? (
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckout />
      </Elements>
    ) : (
      <></>
    );
  }
};

export default Payment;
