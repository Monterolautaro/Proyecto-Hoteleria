/* eslint-disable @next/next/no-img-element */

import Amenities from "@/components/hotelDetail/Amenitites";
import DateRangePicker from "@/components/hotelDetail/DateSelector";
import MapComponent from "@/components/hotelDetail/Map";
import PeopleSelector from "@/components/hotelDetail/PeopleSelector";
import RoomsCard from "@/components/hotelDetail/RoomsCard";
import TotalPrice from "@/components/hotelDetail/TotalPrice";
import getHotelById from "@/helpers/hotelDetail/getHotelDetail";
import { IHotel } from "@/interfaces";

const HotelDetailView: React.FC<{ params: string }> = async ({ params }) => {
  const hotelInfo: IHotel | undefined = await getHotelById(params);

  return (
    <div className="w-full min-h-fit bg-[#f3fffc] px-[10vw] animate-fadeIn py-6">
      <header className="flex justify-between items-center pr-[8%]">
        <div>
          <h2 className="text-[40px] font-medium">{hotelInfo?.name}</h2>
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
          <div className=" w-[73%] rounded-lg max-h-[480px] h-[480px] grid-cols-12 ">
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-full h-full bg-cover bg-center rounded-lg"
            ></div>
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-auto  h-auto bg-cover bg-center"
            ></div>
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-auto  h-auto bg-cover bg-center"
            ></div>
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-auto  h-auto bg-cover bg-center"
            ></div>
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-auto  h-auto bg-cover bg-center"
            ></div>
            <div
              style={{ backgroundImage: `url(${hotelInfo?.details.imgUrl})` }}
              className="w-auto  h-auto bg-cover bg-center"
            ></div>
          </div>
          <div className="w-[25%] flex flex-col gap-3 justify-between rounded-lg">
            <Amenities amenities={hotelInfo?.amenities} />
            <div className="w-full bg-[#009375] rounded-lg overflow-hidden h-[45%]">
              <MapComponent location={hotelInfo?.address.city!} />
            </div>
          </div>
        </div>
        <section className="w-full flex">
          <div className="min-w-[70%] flex flex-col">
            <span className="max-w-full">
              <h3 className="text-3xl font-semibold mb-2 text-[#00352a]">
                Hotel description
              </h3>
              <p className="max-w-full pr-2">
                {hotelInfo?.details.description}
              </p>
            </span>
            {/* Availability */}
            <div className="w-full h-full mt-5 flex flex-col">
              <h3 className="text-3xl font-semibold mb-1 text-[#00352a]">
                Availability
              </h3>
              <p className="mb-4 text-[#009375]">
                Please select Start date & End date to choose the rooms
              </p>
              <div className="border border-[#000] shadow-xl rounded-xl w-[95%] mx-auto h-[60px]">
                <form className="w-full h-full gap-[1px] bg-black rounded-xl flex items-center">
                  <div className="min-w-[70%] w-[80%] h-full text-center font-semibold text-xl rounded-l-xl bg-[#f3fffc] flex items-center justify-around p-1 hover:bg-[#009375] transition ease-in-out duration-300">
                    <DateRangePicker />
                  </div>
                  <div className="w-full h-full rounded-r-xl flex bg-[#f3fffc] items-center justify-center pl-6">
                    <img
                      src="/assets/User.png"
                      alt="People icon"
                      className="w-7 h-7"
                    />
                    <PeopleSelector />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="w-full h-[240px] bg-gradient-to-tl px-8 text-pretty from-[#009375] to-[#d0f6e9] p-4 text-center flex justify-center items-center font-semibold rounded-xl">
            <h3 className="w-fit">
              Hotelify uses this information to know more about our travelers,
              their favorite places and destinations
            </h3>
          </div>
        </section>
        {/* Rooms */}

        <section className="my-6">
          <div className="flex flex-col">
            {hotelInfo?.room.map((rooms, key) => {
              return (
                <RoomsCard
                  id={rooms.room_id}
                  type={rooms.type}
                  description={rooms.room_type.description}
                  price={parseInt(rooms.room_type.price, 10)}
                  currency={rooms.room_type.currency}
                  key={key}
                  index={key}
                />
              );
            })}
            <TotalPrice
              hotelId={hotelInfo?.hotel_id!}
              hotelName={encodeURIComponent(hotelInfo?.name!)}
              currency={hotelInfo?.room[0].room_type.currency!}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelDetailView;
