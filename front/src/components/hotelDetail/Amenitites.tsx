/* eslint-disable @next/next/no-img-element */
import { icons } from "@/helpers/hotelDetail/iconsHelper";
import { IAmenities } from "@/interfaces";

const Amenities: React.FC<{ amenities: IAmenities | undefined }> = ({
  amenities,
}) => {
  const amm =
    amenities &&
    Object.entries(amenities)
      .filter(([key, value]) => value === true && key !== "amenities_id")
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

  return (
    <div className="w-full h-[240px] text-center flex flex-col rounded-xl shadow-lg bg-gradient-to-b from-[#d0f6e9] to-transparent gap-2 items-center justify-center text-[#00352a]">
      {amm
        ? amm.map((item, key) => {
            return (
              <div
                className="p-1 font-medium border border-[#009375] bg-[#f3fffc] gap-6 flex justify-start items-center rounded-lg w-[60%]"
                key={key}
              >
                {icons.filter((icon) => icon.name === item.toLowerCase())
                  .length > 0 ? (
                  <img
                    src={`/assets/icons/${item.toLowerCase()}.png`}
                    alt={item.toLowerCase()}
                    className="w-5 h-5 ml-5"
                  />
                ) : (
                  <></>
                )}
                {item}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Amenities;
