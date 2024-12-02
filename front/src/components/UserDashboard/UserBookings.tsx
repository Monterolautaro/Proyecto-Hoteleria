"use client";

import { IUserBookings } from "@/helpers/userDashboard/userBookings";
import UserBooking from "../Bookings/userBooking";

const UserBookings: React.FC<{ bookings: IUserBookings[] }> = ({
  bookings,
}) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {bookings.map((booking, key) => {
        return <UserBooking key={key} id={key} booking={booking} />;
      })}
    </div>
  );
};

export default UserBookings;
