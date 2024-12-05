import { IUserBookings } from "@/helpers/userDashboard/userBookings";
import CancelButton from "./cancelButton";

const UserBooking: React.FC<{ booking: IUserBookings; id: number }> = ({
  booking,
  id,
}) => {
  return (
    <div className="flex flex-col group border rounded-lg p-3 shadow-lg hover:bg-gradient-to-l hover:from-[#d0f6e988] transition-all duration-100 hover:to-transparent">
      <div className="flex justify-between">
        <h2>Ref # {id}</h2>
        <h3>
          {!booking.isDeleted ? (
            <div>
              <CancelButton bookId={booking.booking_id} />
            </div>
          ) : (
            <p>Status: Cancelled</p>
          )}
        </h3>
      </div>
      <h3 className="text-lg font-medium">{booking.hotel.name}</h3>
      <h3>
        <span className="font-medium">Check in:</span> {booking.start_date} -{" "}
        <span className="font-medium">Check out:</span> {booking.end_date}
      </h3>
      <h3>
        <span className="font-medium"> Total number of rooms:</span>{" "}
        {booking.booked_rooms.number_of_rooms}
      </h3>
    </div>
  );
};

export default UserBooking;
