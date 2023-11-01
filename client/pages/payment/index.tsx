import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "../../components/payment/stripeCheckout";
import { getTotal, getUser, isLoggedIn } from "../../util/commonFunctions";
import { get, post } from "../../services/axiosAPI";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);
const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    let data;
    if (isLoggedIn()) {
      const userData = getUser();
      try {
        get(`/cart/findAll?userId=${userData?.id}`).then((response) => {
          data = {
            amount: getTotal(response?.data),
            currency: "inr",
          };
          post("/stripe/create-payment-intent", data).then(
            async (response: any) => {
              if (response.status === 200) {
                setLoading(false);
                const { clientSecret } = response?.data;
                setClientSecret(clientSecret);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error create payment intent:", error);
      }
    } else {
      data = {
        amount: getTotal(),
        currency: "inr",
      };
      try {
        post("/stripe/create-payment-intent", data).then(
          async (response: any) => {
            if (response.status === 200) {
              setLoading(false);
              const { clientSecret } = response?.data;
              setClientSecret(clientSecret);
            }
          }
        );
      } catch (error) {
        console.error("Error finding cart items:", error);
      }
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
      <div className="mainContainer text-align-center">
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
