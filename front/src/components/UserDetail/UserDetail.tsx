/* 'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@/interfaces/users';
import { Booking } from '@/interfaces/bookings'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserDetail: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const userResponse = await axios.get<User>(`${API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const bookingsResponse = await axios.get<Booking[]>(`${API_URL}/users/${userId}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Lastname:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.credential.email}</p>
        <p><strong>Birthdate:</strong> {user.birthday}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking.booking_id} className="border-b py-2">
                <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                <p><strong>Hotel:</strong> {booking.hotel_name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found for this user.</p>
        )}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserDetail;
 */