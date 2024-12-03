import { UserBookings } from "@/interfaces/bookings";

const BookingCard: React.FC<{ booking: UserBookings; index: number }> = ({
  booking,
  index,
}) => {
  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md bg-gradient-to-l from-[#d0f6e988] to-transparent">
      <h3 className="font-bold">Booking N° {index + 1}</h3>
      <p>
        <strong>Hotel:</strong> {booking.hotel}
      </p>
      <p>
        <strong>Check-in:</strong> {booking.startDate}
      </p>
      <p>
        <strong>Check-out:</strong> {booking.endDate}
      </p>
      <p>
        <strong>Nights:</strong> {booking.nights}
      </p>
      <p>
        <strong>Rooms:</strong>{" "}
        {booking.rooms.map((room, i) => (
          <span key={i} className="mr-2">
            {`${room.rooms} ${room.type}`}
          </span>
        ))}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {booking.status ? "Active" : "Cancelled"}
      </p>
    </div>
  );
};

export default BookingCard;
