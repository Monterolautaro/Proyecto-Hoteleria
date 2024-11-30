"use client";

import BasicInfoForm from "@/components/HotelBasicInfo/HotelBasicInfoForm";
import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
import HotelDetailsForm from "@/components/HotelDetailsForm/HotelDetailsForm";
import RoomInfoForm from "@/components/HotelRoomsForm/HotelRoomsForm";
import ImageUploadForm from "@/components/ImageUpload/ImageUpload";
import { IHotelCreation } from "@/interfaces/hotelCreation";
import { useEffect, useRef } from "react";

const HotelCreationView = () => {
  const { hotelInfo, hotelDetails, hotelRooms, step, setStep } =
    useHotelCreation();

  const formStepThreeRef = useRef<HTMLDivElement>(null);

  const handleNext = (): void => {
    if (step < 4) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = (): void => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const newHotel: IHotelCreation = {
      name: hotelInfo.name,
      details: {
        stars: parseInt(hotelDetails.stars, 10),
        rating: parseFloat(hotelDetails.rating),
        imgUrl: hotelDetails.img,
        description: hotelDetails.description,
      },
      address: {
        city: hotelInfo.city,
        country: hotelInfo.country,
        street: hotelInfo.address,
      },
      availability: {
        available: true,
        totalRoomsLeft: 0,
      },
      rooms: hotelRooms,
      amenities: {
        pool: false,
        spa: false,
        gym: false,
        restaurant: false,
        bar: false,
      },
    };

    console.log(newHotel);
    // await createHotel(newHotel);
  };

  useEffect(() => {
    if (step === 3 && formStepThreeRef.current) {
      formStepThreeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  return (
    <div className="bg-[#00352A] min-h-screen p-6 text-white">
      <div className="flex justify-center items-center">
        <div className="flex items-center bg-[#00352A] min-h-screen text-white px-4">
          <div className="w-full md:w-2/3 ml-32">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome to</h1>
            <h1 className="text-5xl font-bold text-white mb-2">
              <span className="text-[#00D1B2]">Hotel</span>
            </h1>
            <h1 className="text-5xl font-bold text-white mb-4">Registration</h1>
            <p className="text-lg text-white leading-relaxed">
              Please fill out the form below to register a new hotel. Provide
              accurate details to ensure everything is set up correctly.
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="w-full max-w-md bg-[#004D40] p-6 rounded-lg shadow-lg mr-14">
            <BasicInfoForm />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleNext}
                className="bg-[#00B894] text-white px-4 py-2 rounded ml-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md bg-[#004D40] p-6 rounded-lg shadow-lg mr-14">
            <HotelDetailsForm />
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-[#00B894] text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {step === 3 && (
        <div
          ref={formStepThreeRef}
          className="w-full flex flex-col justify-center items-center bg-[#009375] min-h-screen"
        >
          <div className="w-full max-w-5xl bg-[#004C3F] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">
              Choose the rooms
            </h2>
            <RoomInfoForm />
          </div>

          <div className="flex justify-between mt-4 w-full max-w-5xl">
            <button
              onClick={handlePrevious}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-[#00B894] text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="w-full flex flex-col justify-center items-center bg-[#00695C] min-h-screen">
          <div className="w-full max-w-5xl bg-[#004C3F] p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">
              Upload your images
            </h2>
            <ImageUploadForm />
          </div>

          <div className="flex justify-between mt-4 w-full max-w-5xl">
            <button
              onClick={handlePrevious}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#00B894] text-white px-4 py-2 rounded"
            >
              Finish register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelCreationView;
