import getHotelById from "@/helpers/hotelDetail/getHotelDetail";
import { IHotel } from "@/interfaces";

const HotelDetailView: React.FC<{ params: string }> = async ({ params }) => {
  const hotelInfo: IHotel | undefined = await getHotelById(params);

  return (
    <div className="w-full min-h-fit bg-[#f3fffc] px-[10vw] py-6">
      <header>
        <h2 className="text-[40px]">{hotelInfo?.name}</h2>
        <h3 className="text-[#009375] mb-4">
          <span>{hotelInfo?.address.street}</span>, {hotelInfo?.address.city},{" "}
          {hotelInfo?.address.country}
        </h3>
      </header>
      <main className="flex flex-col gap-7">
        {/* Imgs y Amenities */}
        <div className="w-full flex justify-between">
          <div className="bg-[#d0f6e9] w-[73%] h-[450px] flex items-center justify-center"></div>
          <div className="w-[25%] flex flex-col gap-3">
            <div className="w-full h-[240px] bg-slate-300 text-center">
              Amenities
            </div>
            <div className="w-full bg-slate-500 text-center h-[198px]">Map</div>
          </div>
        </div>
        <div className="w-full bg-slate-100 flex">
          <div className="w-[70%]">
            <span className="w-[70%]">
              <h3 className="text-2xl">Hotel description</h3>
              <p>{hotelInfo?.details.description}</p>
            </span>

            <h3>Availability</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetailView;
