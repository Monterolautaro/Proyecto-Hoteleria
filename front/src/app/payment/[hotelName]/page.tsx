import { IParamsPayment } from "@/interfaces/params";
import PaymentView from "@/view/PaymentView/PaymentView";
import React from "react";

const Payment: React.FC<IParamsPayment> = async ({ params }) => {
  const hotelName = (await params).hotelName;
  return <PaymentView params={hotelName} />;
};

export default Payment;
