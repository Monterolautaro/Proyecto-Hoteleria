"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/interfaces/bookings";
import getUserById from "@/helpers/getUserDetail";

const UserDetail: React.FC<{ params: string }> = ({ params }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      const user = await getUserById(params);
      if (user) {
        setUserInfo(user);
      }
    };

    fetchDetails();
  }, [params]);

  if (!userInfo) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="p-6 w-[80%] mx-auto">
      <div className="bg-white shadow rounded-lg p-4 mb-6">
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
          <strong>Average Session Duration:</strong>{" "}
          {userInfo.average_session_duration}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        {userInfo.bookings.map((booking, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <p className="text-[#009375]">
              <strong>Booking #</strong> {index}
            </p>
            <p>
              <strong>Hotel Name:</strong> {booking.hotel.name}
            </p>
            <p>
              <strong>Start Date:</strong> {booking.start_date}
            </p>
            <p>
              <strong>End Date:</strong> {booking.end_date}
            </p>
            <p>
              <strong>Rooms Booked:</strong>{" "}
              {booking.booked_rooms.number_of_rooms}
            </p>
          </div>
        ))}
      </div>

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
