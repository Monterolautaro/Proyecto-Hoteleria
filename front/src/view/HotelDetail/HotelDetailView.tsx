import Amenities from "@/components/hotelDetail/Amenitites";
import DateRangePicker from "@/components/hotelDetail/DateSelector";
import RoomsCard from "@/components/hotelDetail/RoomsCard";
import getHotelById from "@/helpers/hotelDetail/getHotelDetail";
import { IHotel } from "@/interfaces";

const HotelDetailView: React.FC<{ params: string }> = async ({ params }) => {
  const hotelInfo: IHotel | undefined = await getHotelById(params);
  console.log(hotelInfo);

  return (
    <div className="w-full min-h-fit bg-[#f3fffc] px-[10vw] py-6">
      <header className="flex justify-between items-center pr-[8%]">
        <div>
          <h2 className="text-[40px]">{hotelInfo?.name}</h2>
          <h3 className="text-[#009375] mb-4">
            <span>{hotelInfo?.address.street}</span>, {hotelInfo?.address.city},{" "}
            {hotelInfo?.address.country}
          </h3>
        </div>
        <h3 className="h-fit text-lg font-medium self-end pb-3">Amenities</h3>
      </header>
      <main className="flex flex-col gap-7">
        {/* Imgs y Amenities */}
        <div className="w-full flex justify-between">
          <div
            className="bg-cover w-[73%] h-[450px] flex items-center justify-center"
            style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
          ></div>
          <div className="w-[25%] flex flex-col gap-3 bg-[#d0f6e9] rounded-lg">
            <Amenities amenities={hotelInfo?.amenities} />
            <div className="w-full bg-slate-500 text-center h-[198px]">Map</div>
          </div>
        </div>
        <section className="w-full flex">
          <div className="min-w-[70%] flex flex-col">
            <span className="max-w-full">
              <h3 className="text-2xl">Hotel description</h3>
              <p className="max-w-full">{hotelInfo?.details.description}</p>
            </span>
            {/* Availability */}
            <div className="w-full h-full mt-5 flex flex-col">
              <h3 className="text-2xl font-semibold mb-5">Availability</h3>
              <div className="border border-[#000] shadow-xl rounded-xl w-[95%] mx-auto h-[60px]">
                <form className="w-full h-full gap-[1px] bg-black rounded-xl flex items-center">
                  <div className="min-w-fit w-[80%] h-full text-center font-semibold text-xl rounded-l-xl bg-[#f3fffc] flex items-center justify-around p-1">
                    <DateRangePicker />
                  </div>
                  <input type="text" className="w-full h-full rounded-r-xl" />
                </form>
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="w-full h-[240px] bg-slate-800">Reviews</div>
        </section>
        {/* Rooms */}
        <section className="my-6">
          <div>
            {hotelInfo?.room.map((rooms, key) => {
              return (
                <RoomsCard
                  type={rooms.type}
                  description={rooms.room_type.description}
                  price={parseInt(rooms.room_type.price, 10)}
                  key={key}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelDetailView;
