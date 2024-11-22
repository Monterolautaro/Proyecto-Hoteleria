"use client";

import { IPriceContext } from "@/interfaces/priceContext";
import { createContext, ReactNode, useContext, useState } from "react";

const PriceContext = createContext<IPriceContext>({
  bookingPrice: [],
  updatePrice: () => {},
});

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [bookingPrice, setBookingPrice] = useState<number[]>([]);

  const updatePrice = (index: number, price: number) => {
    setBookingPrice((prev) => {
      const updated = [...prev];
      updated[index] = price;
      return updated;
    });
  };

  return (
    <PriceContext.Provider value={{ bookingPrice, updatePrice }}>
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