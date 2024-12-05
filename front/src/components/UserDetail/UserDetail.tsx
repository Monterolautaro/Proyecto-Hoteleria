'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/users";
import { UsersBookings } from "@/interfaces/bookings";
import getUserById from "@/helpers/getUserDetail";
import getBookingsByUserId from "@/helpers/getUserBookings";
import UserBookingCard from "@/components/BookingCard/BookingCard";

const UserDetail: React.FC<{ params: string }> = ({ params }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [bookings, setBookings] = useState<UsersBookings[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      const user = await getUserById(params);
      const userBookings = await getBookingsByUserId(params);

      setUserInfo(user || null);
      setBookings(userBookings || null);
    };

    fetchDetails();
  }, [params]);

  if (!userInfo) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="p-6 w-[80%] mx-auto">
      <div className="flex gap-6">
        {/* User Details Section */}
        <div className="bg-white shadow rounded-lg p-4 mb-6 w-[50%]">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.lastname}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.credential.email}
          </p>
          <p>
            <strong>Username:</strong> {userInfo.credential.username}
          </p>
          <p>
            <strong>Role:</strong> {userInfo.role}
          </p>
          <p>
            <strong>Birthdate:</strong> {userInfo.birthday}
          </p>
          <p>
            <strong>Total Visits:</strong> {userInfo.total_visits}
          </p>
          <p>
            <strong>Average Session Duration:</strong> {userInfo.average_session_duration}
          </p>
        </div>

        {/* Bookings Section */}
        <div className="bg-white shadow rounded-lg p-4 mb-6 w-[50%]">
          <h2 className="text-2xl font-bold mb-4">Bookings</h2>
          {bookings && bookings.length > 0 ? (
            <div className="flex flex-col gap-3">
              {bookings.map((booking) => (
                <UserBookingCard key={booking.booking_id} booking={booking} />
              ))}
            </div>
          ) : (
            <p>No bookings found for this user.</p>
          )}
        </div>
      </div>

      {/* Go Back Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetail;
