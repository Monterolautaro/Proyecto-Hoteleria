"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentView from "@/view/PaymentView/PaymentView";
import React from "react";

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
const stripePromise = loadStripe(STRIPE_KEY);

const PaymentClient: React.FC<{ hotelName: string }> = ({ hotelName }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentView params={hotelName} />
    </Elements>
  );
};

export default PaymentClient;
