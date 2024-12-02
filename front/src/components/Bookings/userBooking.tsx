import firstToUpperCase from "@/helpers/upperCase";
import { IUserBookings } from "@/helpers/userDashboard/userBookings";

const UserBooking: React.FC<{ booking: IUserBookings; id: number }> = ({
  booking,
  id,
}) => {
  return (
    <div className="flex flex-col group border rounded-lg p-3 shadow-lg hover:bg-gradient-to-l hover:from-[#d0f6e988] hover:to-transparent">
      <div className="flex justify-between">
        <h2>Booking N° {id}</h2>
        <h3>
          {booking.status ? (
            <div>
              <button className="border-2 border-[#009375] bg-white px-3 py-1 rounded-lg opacity-0 transition-all duration-70 group-hover:opacity-100">
                Cancel
              </button>
            </div>
          ) : null}
        </h3>
      </div>
      <h3>{booking.hotel}</h3>
      <h3>
        Check in: {booking.startDate} - Check out: {booking.endDate}
      </h3>
      <h3 className="flex">
        Rooms:
        <p className="flex ml-3">
          {booking.rooms.map((room, key) => (
            <p key={key} className="mr-4">{`${room.rooms} ${firstToUpperCase(
              room.type
            )}`}</p>
          ))}
        </p>
      </h3>
    </div>
  );
};

export default UserBooking;
