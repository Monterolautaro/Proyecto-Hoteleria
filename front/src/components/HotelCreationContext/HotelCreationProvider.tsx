// components/HotelCreationContext/HotelCreationProvider.tsx
"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IHotelCreationContext {
  hotelInfo: {
    name: string;
    country: string;
    city: string;
    address: string;
  };
  setHotelInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    country: string;
    city: string;
    address: string;
  }>>;

  hotelDetails: {
    stars: string;
    rating: string;
    img: string;
    description: string;
  };
  setHotelDetails: React.Dispatch<React.SetStateAction<{
    stars: string;
    rating: string;
    img: string;
    description: string;
  }>>;

  hotelRooms: {
    price: string;
    currency: string;
    roomsLeft: string;
    description: string;
  };
  setHotelRooms: React.Dispatch<React.SetStateAction<{
    price: string;
    currency: string;
    roomsLeft: string;
    description: string;
  }>>;

  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const HotelCreationContext = createContext<IHotelCreationContext | undefined>(undefined);

export const HotelCreationProvider = ({ children }: { children: ReactNode }) => {
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    country: "",
    city: "",
    address: "",
  });

  const [hotelDetails, setHotelDetails] = useState({
    stars: "",
    rating: "",
    img: "",
    description: "",
  });

  const [hotelRooms, setHotelRooms] = useState({
    price: "",
    currency: "",
    roomsLeft: "",
    description: "",
  });

  const [step, setStep] = useState(1);

  return (
    <HotelCreationContext.Provider
      value={{
        hotelInfo,
        setHotelInfo,
        hotelDetails,
        setHotelDetails,
        hotelRooms,
        setHotelRooms,
        step,
        setStep,
      }}
    >
      {children}
    </HotelCreationContext.Provider>
  );
};

// Custom hook to use the HotelCreationContext
export const useHotelCreation = () => {
  const context = useContext(HotelCreationContext);
  if (!context) {
    throw new Error("useHotelCreation must be used within a HotelCreationProvider");
  }
  return context;
};
