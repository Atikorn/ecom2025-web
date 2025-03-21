import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomstore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {nanoid} from "nanoid";

export default function CheckoutForm() {
  const token = useEcomstore((state) => state.token);
  const clearCart = useEcomstore((state) => state.clearCart);
  const selectedAddress = useEcomstore((state) => state.selectedAddress);
  const shipping = useEcomstore((state) => state.shipping);
  const method = useEcomstore((state) => state.method);
  const trackingOrder = `AP-${nanoid(10).toUpperCase()}`;

  // console.log('Shipping',method)

  
  const natavigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      //   confirmParams: {
      //     // Make sure to change this to your payment completion page
      //     return_url: "http://localhost:3000/complete",
      //   },
      redirect: "if_required",
    });
    // console.log("payload", payload);
    if (payload.error) {
      setMessage(payload.error.message);
      console.log("error");
      toast.error(payload.error.message)
    } else if (payload.paymentIntent.status == "succeeded") {
      // console.log("Ready or Saveorder");
      //Create Order
      // console.log(trackingOrder,selectedAddress)
      // return
      saveOrder(token, payload, selectedAddress,trackingOrder,shipping,method)
        .then((res) => {
          // console.log(res);
          clearCart()
          toast.success('Payment success')
          natavigate('/user/history')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log("Someting Wrong");
      toast.warning("Payment not success")
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="stripe-button"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
