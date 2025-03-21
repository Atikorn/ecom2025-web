import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomstore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Qq9DwDIe5H5jclYpYi8cG5XM2s152lAhl994Ub8r8MgJo1cr8tLzNlmpQdOHw8JXhAePDweZmndiEehtiTJbSay00NeTTCV4J"
);

const Payment = () => {
  const token = useEcomstore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        // console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return <div className="p-5">
    {
      clientSecret && (
        <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )
    }
  </div>;
};

export default Payment;
