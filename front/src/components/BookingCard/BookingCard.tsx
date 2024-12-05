import React from "react";
import { UsersBookings } from "@/interfaces/bookings";

interface BookingCardProps {
  booking: UsersBookings;
}

const UserBookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Booking ID: {booking.booking_id}</h3>
      <p>
        <strong>Hotel Name:</strong> {booking.hotel_name}
      </p>
      <p>
        <strong>Start Date:</strong> {new Date(booking.start_date).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(booking.end_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Payment Status:</strong> {booking.payments_details.payment_status}
      </p>
      <p>
        <strong>Payment Method:</strong> {booking.payments_details.payment_method}
      </p>
      <p>
        <strong>Room Number:</strong> {booking.booked_rooms.room_number}
      </p>
      <p>
        <strong>Room Type:</strong> {booking.booked_rooms.room_type}
      </p>
    </div>
  );
};

export default UserBookingCard;
