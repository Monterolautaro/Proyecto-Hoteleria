"use client";

import BasicInfoForm from "@/components/HotelBasicInfo/HotelBasicInfoForm";
import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
import HotelDetailsForm from "@/components/HotelDetailsForm/HotelDetailsForm";
import RoomInfoForm from "@/components/HotelRoomsForm/HotelRoomsForm";
import createHotel from "@/helpers/hotelCreation/createHotel";
import { IHotelCreation } from "@/interfaces/hotelCreation";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

const HotelCreationView = () => {
  const { hotelInfo, hotelDetails, hotelRooms, step, setStep, isFormValid } =
    useHotelCreation();
  const router = useRouter();
  const formStepThreeRef = useRef<HTMLDivElement>(null);

  const handleNext = (): void => {
    if (step < 4 && isFormValid) {
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
        rating: 4,
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
        totalRoomsLeft: 50,
      },
      rooms: hotelRooms,
      amenities: {
        pool: false,
        spa: true,
        gym: true,
        restaurant: true,
        bar: false,
      },
    };

    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log("Este es el hotel que se crea", newHotel);
    if (token && user) {
      const result = await createHotel(newHotel, token, user.id);
      if (result) router.push("/admin");
    }
  };

  useEffect(() => {
    if (step === 3 && formStepThreeRef.current) {
      formStepThreeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  return (
    <div className="bg-[#00352A] min-h-screen p-6 text-white relative">
      {/* Botón fijo en la esquina superior izquierda */}
      <div className="fixed top-6 left-6 z-10">
        <button
          onClick={() => router.push("/admin")} // Cambia "/" por la ruta deseada
          className="bg-[#00D1B2] text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          Back
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex items-center bg-[#00352A] min-h-screen text-white px-4">
          <div className="w-full md:w-2/3 ml-32">
            <h1 className="text-5xl font-bold text-white mb-2">Hotel</h1>
            <h1 className="text-5xl font-bold text-white mb-2">
              <span className="text-[#00D1B2]">Registration</span>
            </h1>
            <h1 className="text-5xl font-bold text-white mb-4">Dashboard</h1>
            <p className="text-lg text-white leading-relaxed">
              Use this form to register hotels into the system. Ensure all
              provided details are accurate and verified before submission. This
              information will be used to manage and display the hotel's
              availability and details.
            </p>
          </div>
        </div>

        {step === 1 && (
          <div className="w-full max-w-md bg-[#004D40] p-6 rounded-lg shadow-lg mr-14">
            <BasicInfoForm />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleNext}
                className={`bg-[#00B894] text-white px-4 py-2 rounded ml-auto ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid}
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
                className={`bg-[#00B894] text-white px-4 py-2 rounded ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid}
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
              onClick={handleSubmit}
              className={`bg-[#00B894] text-white px-4 py-2 rounded ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* {step === 4 && (
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
              Create Hotel
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default HotelCreationView;
