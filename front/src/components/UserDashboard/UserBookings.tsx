"use client";

import { IUserBookings } from "@/helpers/userDashboard/userBookings";
import UserBooking from "../Bookings/userBooking";
import Link from "next/link";

const UserBookings: React.FC<{ bookings: IUserBookings[] }> = ({
  bookings,
}) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto hover:bg-[#009375] transition group duration-1000 rounded-lg">
      {bookings.length > 0 ? (
        bookings.map((booking, key) => {
          return <UserBooking key={key} id={key} booking={booking} />;
        })
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-[360px] w-full">
          <h2 className="text-center font-bold text-2xl">
            You haven't made a reservation yet
          </h2>
          <Link
            scroll={false}
            href="/"
            className="text-xl text-[#009375] outline-none rounded-lg px-3 py-1 group-hover:outline-white group-hover:outline-2  group-hover:text-white transition duration-600"
          >
            Start now
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
