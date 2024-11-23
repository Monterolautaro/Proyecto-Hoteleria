"use client";

import { IRoomsContext } from "@/interfaces/roomsContext";
import { createContext, ReactNode, useContext, useState } from "react";

const RoomsContext = createContext<IRoomsContext>({
  bookingRooms: [],
  updateRooms: () => {},
});

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [bookingRooms, setBookingRooms] = useState<number[]>([]);

  const updateRooms = (index: number, rooms: number) => {
    setBookingRooms((prev) => {
      const updated = [...prev];
      updated[index] = rooms;
      return updated;
    });
  };

  return (
    <RoomsContext.Provider value={{ bookingRooms, updateRooms }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};
