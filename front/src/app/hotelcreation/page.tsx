 import { HotelCreationProvider } from "@/components/HotelCreationContext/HotelCreationProvider";
import HotelCreationView from "@/view/HotelCreation/HotelCreationView";

const HotelCreation = () => {
  return (
    <div>
       <HotelCreationProvider> 
       <HotelCreationView /> 
       </HotelCreationProvider>
    </div>
  );
};

export default HotelCreation;
