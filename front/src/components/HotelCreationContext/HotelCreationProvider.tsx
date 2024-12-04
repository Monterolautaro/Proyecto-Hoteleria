"use client";

import { uploadImages } from "@/helpers/imageUpload/imageUpload";
import { HotelRooms } from "@/interfaces/hotelCreation";
import React, { createContext, ReactNode, useContext, useState } from "react";
import Cookies from "js-cookie";

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

  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;

  isFormValid: boolean;
  validateForm: (formName: string, isValid: boolean) => void;

  uploadHotelImages: () => Promise<string>;
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
      rooms_left: 0,
      description: "",
    },
  });

  const [images, setImages] = useState<File[]>([]);
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
        rooms_left: room.roomsLeft,
        description: room.description,
      };
    });

    setHotelRoomsState(rooms as HotelRooms);
  };

  const [step, setStep] = useState(1);

  const validateForm = (formName: string, isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const uploadHotelImages = async (): Promise<string> => {
    const user = JSON.parse(Cookies.get("user") || "{}");

    if (images.length === 0) {
      return "No images to upload.";
    }

    try {
      const result = await uploadImages(images, user.id || "test-token");
      return result;
    } catch (error) {
      console.error("Error uploading images:", error);
      return "Error uploading images.";
    }
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
        images,
        setImages,
        isFormValid,
        validateForm,
        uploadHotelImages,
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
