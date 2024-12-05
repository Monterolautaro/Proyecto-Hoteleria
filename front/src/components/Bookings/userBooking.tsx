import { IUserBookings } from "@/helpers/userDashboard/userBookings";
import CancelButton from "./cancelButton";

const UserBooking: React.FC<{
  booking: IUserBookings;
  id: number;
  handleRefresh: () => void;
}> = ({ booking, id, handleRefresh }) => {
  return (
    <div className="flex flex-col group border rounded-lg cursor-default p-3 bg-white shadow-lg hover:bg-gradient-to-l hover:from-[#00937511] transition-all duration-100 hover:to-transparent">
      <div className="flex justify-between">
        <h2 className="font-medium text-[#009375]">Ref # {id}</h2>
        <h3>
          {!booking.isDeleted ? (
            <div>
              <CancelButton
                bookId={booking.booking_id}
                handleRefresh={handleRefresh}
              />
            </div>
          ) : (
            <p className="font-medium">Cancelled</p>
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
