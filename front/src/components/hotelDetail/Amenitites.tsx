import { IAmenities } from "@/interfaces";

const ammenitiesList = ["Pool", "Spa", "Restaurant", "Gym", "Bar"];

const Amenities: React.FC<{ amenities: IAmenities | undefined }> = ({
  amenities,
}) => {
  return (
    <div className="w-full h-[240px] text-center flex flex-col gap-2 items-center justify-center">
      {ammenitiesList.map((item, key) => {
        return (
          <div
            className="p-1 border border-[#009375] bg-[#f3fffc]  rounded-lg w-[80%]"
            key={key}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Amenities;
