import { IParams } from "@/interfaces/params";
import HotelDetailView from "@/view/HotelDetail/HotelDetailView";

const HotelDetail: React.FC<IParams> = async ({ params }) => {
  const hotelId = (await params).idHotel;

  return <HotelDetailView params={hotelId} />;
};

export default HotelDetail;
