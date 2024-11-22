import firstToUpperCase from "@/helpers/upperCase";

/* eslint-disable @next/next/no-img-element */
const RoomsCard: React.FC<{
  type: string;
  description: string;
  price: number;
}> = ({ type, description, price }) => {
  const newType = firstToUpperCase(type);

  return (
    <div className="flex w-full bg-[#d0f6e9] h-[100px] mb-4 rounded-xl justify-evenly items-center py-2 shadow-lg">
      <div className="flex gap-4 items-center p-2 w-[10%]">
        <img src="/assets/Bed.png" alt="Bed icon" className="w-[36px]" />
        <span className="text-base font-medium text-[#00352a]">{newType}</span>
      </div>
      <div className="w-[50%] text-center flex flex-col  px-4 border-x-2 border-[#009375]">
        <span className="text-[#00352a] font-medium mb-2">Description</span>
        <span className="text-sm">{description}</span>
      </div>
      <div className="flex flex-col p-2 items-center">
        <span>Price</span>
        <span>{price} COP</span>
      </div>
    </div>
  );
};

export default RoomsCard;
