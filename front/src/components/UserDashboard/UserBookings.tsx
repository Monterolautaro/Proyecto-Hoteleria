"use client";

import { IUserBookings } from "@/helpers/userDashboard/userBookings";
import UserBooking from "../Bookings/userBooking";
import Link from "next/link";

const UserBookings: React.FC<{
  bookings: IUserBookings[];
  handleRefresh: () => void;
}> = ({ bookings, handleRefresh }) => {
  return (
    <div
      className={
        bookings
          ? `flex flex-col gap-3 overflow-y-auto`
          : `flex flex-col gap-3 overflow-y-auto hover:bg-[#009375] transition group duration-1000 rounded-lg`
      }
    >
      {bookings.length > 0 ? (
        bookings
          .slice()
          .reverse()
          .map((booking, index) => {
            const reversedKey = bookings.length - 1 - index;
            return (
              <UserBooking
                key={reversedKey} // Clave basada en el índice invertido
                id={reversedKey}
                booking={booking}
                handleRefresh={handleRefresh}
              />
            );
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
