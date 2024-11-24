"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";

const PaymentView: React.FC<{ params: string }> = ({ params }) => {
  const { startDateContext, endDateContext, people } = useDateContext();
  const { bookingRooms } = useRoomsContext();
  useEffect(() => {
    console.log(startDateContext, endDateContext);
  }, [startDateContext]);

  return (
    <div className="text-lg h-[50dvh] p-6">
      <h2 className="text-xl font-bold">Booking details</h2>
      <h3 className="font-bold">{decodeURIComponent(params)}</h3>
      <h3>
        <span className="font-semibold">Start date:</span>{" "}
        {startDateContext?.toLocaleDateString()}{" "}
        <span className="font-semibold"> - End date:</span>{" "}
        {endDateContext?.toLocaleDateString()}
      </h3>
      <h3>
        <span className="font-semibold">Total rooms: </span>
        {bookingRooms.reduce((acc, price) => acc + price, 0)} rooms for{" "}
        <span>
          {differenceInDays(endDateContext!, startDateContext!)} nights
        </span>
      </h3>
      <h3>
        <span className="font-semibold">N° Travelers:</span> {people}
      </h3>
    </div>
  );
};

export default PaymentView;
