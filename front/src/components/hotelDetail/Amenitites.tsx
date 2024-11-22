import { IAmenities } from "@/interfaces";

const Amenities: React.FC<{ amenities: IAmenities | undefined }> = ({
  amenities,
}) => {
  const amm =
    amenities &&
    Object.entries(amenities)
      .filter(([key, value]) => value === true && key !== "amenities_id")
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
  console.log(amm);

  return (
    <div className="w-full h-[240px] text-center flex flex-col rounded-xl bg-[#d0f6e9] gap-2 items-center justify-center">
      {amm
        ? amm.map((item, key) => {
            return (
              <div
                className="p-1 border border-[#009375] bg-[#f3fffc]  rounded-lg w-[80%]"
                key={key}
              >
                {item}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Amenities;
