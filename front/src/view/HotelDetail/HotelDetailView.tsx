import getHotelById from "@/helpers/hotelDetail/getHotelDetail";

const HotelDetailView: React.FC<{ params: string }> = async ({ params }) => {
  const hotelInfo = await getHotelById(params);
  if (hotelInfo) {
    // const { name, description } = hotelInfo;
  }

  return (
    <div className="w-full min-h-fit bg-[#f3fffc] px-[10vw] py-6">
      <header>
        <h2 className="text-[40px]">Hotel Marryot Bogota</h2>
        <h3>Calle 20 #15a, Bogota, Colombia</h3>
      </header>
      <main className="flex gap-5">
        {/* Imgs y Amenities */}
        <div className="bg-slate-400 w-[70%] h-[450px]"></div>
        <div className="w-[25%] flex flex-col gap-3">
          <div className="w-full h-[240px] bg-slate-300 text-center">
            Amenities
          </div>
          <div className="w-full bg-slate-500 text-center h-[198px]">Map</div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetailView;
