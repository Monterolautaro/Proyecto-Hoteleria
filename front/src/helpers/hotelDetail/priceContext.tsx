"use client";

import { IPriceContext } from "@/interfaces/priceContext";
import { createContext, ReactNode, useContext, useState } from "react";

const PriceContext = createContext<IPriceContext>({
  bookingPrice: [],
  hotelId: "",
  setHotelId: () => {},
  updatePrice: () => {},
  resetPrice: () => [],
});

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [bookingPrice, setBookingPrice] = useState<number[] | []>([]);
  const [hotelId, setHotelId] = useState<string | null>(null);

  const updatePrice = (index: number, price: number) => {
    setBookingPrice((prev) => {
      const updated = [...prev];
      updated[index] = price;
      return updated;
    });
  };

  const resetPrice = (arr: number[]) => {
    setBookingPrice(arr);
  };

  return (
    <PriceContext.Provider
      value={{ bookingPrice, updatePrice, resetPrice, hotelId, setHotelId }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};
