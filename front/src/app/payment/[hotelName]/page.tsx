import { IParamsPayment } from "@/interfaces/params";
import PaymentClient from "./PaymentClient";

const PaymentPage: React.FC<IParamsPayment> = async ({ params }) => {
  const hotelName = (await params).hotelName;
  return <PaymentClient hotelName={hotelName} />;
};

export default PaymentPage;
