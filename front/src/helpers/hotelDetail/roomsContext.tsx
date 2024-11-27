"use client";

import { IBookingRooms, IRoomsContext } from "@/interfaces/roomsContext";
import { createContext, ReactNode, useContext, useState } from "react";

const RoomsContext = createContext<IRoomsContext>({
  bookingRooms: [],
  updateRooms: () => {},
  resetRooms: () => {},
});

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [bookingRooms, setBookingRooms] = useState<IBookingRooms[]>([
    { roomId: "room-1", rooms: 0, type: "single" },
    { roomId: "room-2", rooms: 0, type: "double" },
    { roomId: "room-2", rooms: 0, type: "triple" },
    { roomId: "room-3", rooms: 0, type: "suite" },
  ]);

  const updateRooms = (
    index: number,
    rooms: number,
    id: string,
    type: string
  ) => {
    setBookingRooms((prev) => {
      const updated = [...prev];
      const data: IBookingRooms = {
        roomId: id,
        rooms: rooms,
        type,
      };
      updated[index] = data;
      return updated;
    });
  };

  const resetRooms = () => {
    setBookingRooms([]);
  };

  return (
    <RoomsContext.Provider value={{ bookingRooms, updateRooms, resetRooms }}>
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
