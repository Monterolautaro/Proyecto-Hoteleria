"use client";

import { HotelRooms } from "@/interfaces/hotelCreation";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IHotelCreationContext {
  hotelInfo: {
    name: string;
    country: string;
    city: string;
    address: string;
  };
  setHotelInfo: React.Dispatch<
    React.SetStateAction<{
      name: string;
      country: string;
      city: string;
      address: string;
    }>
  >;

  hotelDetails: {
    stars: string;
    rating: string;
    img: string;
    description: string;
  };
  setHotelDetails: React.Dispatch<
    React.SetStateAction<{
      stars: string;
      rating: string;
      img: string;
      description: string;
    }>
  >;

  hotelRooms: HotelRooms;
  setHotelRooms: (
    roomsArray: {
      id: number;
      type: string;
      description: string;
      roomsLeft: number;
      price: number;
      currency: string;
      enabled: boolean;
    }[]
  ) => void;

  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  isFormValid: boolean;
  validateForm: (formName: string, isValid: boolean) => void;
}

const HotelCreationContext = createContext<IHotelCreationContext | undefined>(
  undefined
);

export const HotelCreationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  const [hotelRooms, setHotelRoomsState] = useState<HotelRooms>({
    single: {
      price: 0,
      currency: "USD",
      roomsLeft: 0,
      description: "",
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const setHotelRooms = (
    roomsArray: {
      id: number;
      type: string;
      description: string;
      roomsLeft: number;
      price: number;
      currency: string;
      enabled: boolean;
    }[]
  ) => {
    const filteredRooms = roomsArray.filter(
      (room) => room.roomsLeft > 0 && room.enabled
    );

    const rooms: Partial<HotelRooms> = {};
    filteredRooms.forEach((room) => {
      rooms[room.type as keyof HotelRooms] = {
        price: room.price,
        currency: room.currency,
        roomsLeft: room.roomsLeft,
        description: room.description,
      };
    });

    setHotelRoomsState(rooms as HotelRooms);
  };

  const [step, setStep] = useState(1);

  const validateForm = (formName: string, isValid: boolean) => {
    setIsFormValid(isValid);
  };

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

        isFormValid,
        validateForm,
      }}
    >
      {children}
    </HotelCreationContext.Provider>
  );
};

export const useHotelCreation = () => {
  const context = useContext(HotelCreationContext);
  if (!context) {
    throw new Error(
      "useHotelCreation debe usarse dentro de HotelCreationProvider"
    );
  }
  return context;
};
