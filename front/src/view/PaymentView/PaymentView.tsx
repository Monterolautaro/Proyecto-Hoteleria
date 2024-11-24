"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { useEffect } from "react";

const PaymentView = () => {
  const { startDateContext, endDateContext } = useDateContext();
  useEffect(() => {
    console.log(startDateContext, endDateContext);
  }, [startDateContext]);

  return <div></div>;
};

export default PaymentView;
