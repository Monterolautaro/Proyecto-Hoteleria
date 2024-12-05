/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useDateContext } from "@/helpers/hotelDetail/dateContext";
import { usePriceContext } from "@/helpers/hotelDetail/priceContext";
import { useRoomsContext } from "@/helpers/hotelDetail/roomsContext";
import firstToUpperCase from "@/helpers/upperCase";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const RoomsCard: React.FC<{
  id: string;
  type: string;
  description: string;
  price: number;
  index: number;
  currency: string;
}> = ({ id, type, description, price, currency, index }) => {
  const { diffDays } = useDateContext();
  const { updatePrice } = usePriceContext();
  const { updateRooms } = useRoomsContext();
  const newType = firstToUpperCase(type); //Convierte en mayuscula la primera letra

  const [totalPrice, setTotalPrice] = useState<number | null>(price);
  const [totalRooms, setTotalRooms] = useState<number>(0);

  //Función para capturar el valor del número de habitaciones
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nRooms = parseInt(e.target.value, 10);
    setTotalRooms(nRooms);
  };

  useEffect(() => {
    if (diffDays) {
      updatePrice(index, price * diffDays * totalRooms);
      updateRooms(index, totalRooms, id, type);
    }
  }, [totalRooms]);

  useEffect(() => {
    if (diffDays) {
      setTotalPrice(price * diffDays); //Precio que se muestra en cada habitación
    }
  }, [diffDays]);

  return (
    <div>
      {diffDays ? (
        <div className="flex w-full bg-[#d0f6e9] h-[100px] mb-4 rounded-xl animate-fadeIn justify-evenly items-center py-2 shadow-lg">
          <div className="flex gap-4 items-center p-2 w-[10%]">
            <img src="/assets/Bed.png" alt="Bed icon" className="w-[36px]" />
            <span className="text-base font-medium text-[#00352a]">
              {newType}
            </span>
          </div>
          <div className="w-[50%] text-center flex flex-col  px-4 border-x-2 border-[#009375]">
            <span className="text-[#00352a] font-medium mb-2">Description</span>
            <span className="text-sm">{description}</span>
          </div>
          <div className="flex flex-col p-2 items-center">
            <span className="text-[#00352a] text-sm mb-2">
              {diffDays} nights for
            </span>
            <span className="font-bold">
              {totalPrice} {currency}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm mb-1 font-medium text-[#00352a]">
              N° Rooms
            </span>
            <select
              onChange={handleSelectChange}
              className="bg-[#f3fffc] rounded-lg border-[#009375] border-2"
            >
              <option className="border-none text-center" value="0">
                0
              </option>
              <option className="border-none text-center" value="1">
                1
              </option>
              <option className="border-none text-center" value="2">
                2
              </option>
              <option className="border-none text-center" value="3">
                3
              </option>
              <option className="border-none text-center" value="4">
                4
              </option>
            </select>
          </div>
        </div>
      ) : (
        <div className="animate-pulse"></div>
      )}
    </div>
  );
};

export default RoomsCard;
