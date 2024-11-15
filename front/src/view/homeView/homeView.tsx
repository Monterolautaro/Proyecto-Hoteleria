import Slider from "@/components/slider/slider";
import TravelGrid from "@/components/travelGrid/TravelGrid";
import WelcomeMessage from "@/components/wellcomeMessage/wellcomeMessage";
const HomeView = () => {
  return (
   <>
   <WelcomeMessage />
   <Slider />
   <TravelGrid />
   </>
  );
};

export default HomeView;

