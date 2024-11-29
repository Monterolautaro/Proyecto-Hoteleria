"use client";

const UserBookings: React.FC<{ bookings: string[] }> = ({ bookings }) => {
  return (
    <div>
      {bookings.map((booking, key) => {
        return <div key={key}>{booking}</div>;
      })}
    </div>
  );
};

export default UserBookings;
