"use client";

import createHotel from "@/helpers/hotelCreation/createHotel";
import { IHotelCreation } from "@/interfaces/hotelCreation";
import { useState } from "react";

const HotelCreationView = () => {
  const [step, setStep] = useState(1);
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

  const handleNext = () => {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
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
        totalRoomsLeft: parseInt(hotelRooms.roomsLeft, 10),
      },
      rooms: {
        single: {
          price: parseFloat(hotelRooms.price),
          currency: hotelRooms.currency,
          rooms_left: parseInt(hotelRooms.roomsLeft, 10),
          description: hotelRooms.description,
        },
      },
      amenities: {
        pool: false,
        spa: false,
        gym: false,
        restaurant: false,
        bar: false,
      },
    };

    console.log(newHotel);
    await createHotel(newHotel);
  };

  return (
    <div className="flex justify-center items-center bg-[#00352A] min-h-screen p-6 text-white">
      {/* Contenedor del texto a la izquierda */}
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

      {/* Formulario a la derecha */}
      <div className="w-full max-w-md bg-[#004D40] p-6 rounded-lg shadow-lg mr-14">
        {step === 1 && (
          <>
            <h2 className="flex justify-center items-center text-xl font-semibold mb-4">Basic Information</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={hotelInfo.name}
                  onChange={(e) =>
                    setHotelInfo({ ...hotelInfo, name: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="Hotel Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={hotelInfo.country}
                    onChange={(e) =>
                      setHotelInfo({ ...hotelInfo, country: e.target.value })
                    }
                    className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={hotelInfo.city}
                    onChange={(e) =>
                      setHotelInfo({ ...hotelInfo, city: e.target.value })
                    }
                    className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                    placeholder="City"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={hotelInfo.address}
                  onChange={(e) =>
                    setHotelInfo({ ...hotelInfo, address: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="Address"
                />
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="stars" className="block text-sm font-medium mb-1">
                  Stars
                </label>
                <input
                  type="number"
                  id="stars"
                  value={hotelDetails.stars}
                  onChange={(e) =>
                    setHotelDetails({ ...hotelDetails, stars: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="5"
                />
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  value={hotelDetails.rating}
                  onChange={(e) =>
                    setHotelDetails({ ...hotelDetails, rating: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label htmlFor="img" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="img"
                  value={hotelDetails.img}
                  onChange={(e) =>
                    setHotelDetails({ ...hotelDetails, img: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="https://example.com/image"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={hotelDetails.description}
                  onChange={(e) =>
                    setHotelDetails({
                      ...hotelDetails,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="Hotel description"
                ></textarea>
              </div>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Room Information</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={hotelRooms.price}
                  onChange={(e) =>
                    setHotelRooms({ ...hotelRooms, price: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="Price"
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  id="currency"
                  value={hotelRooms.currency}
                  onChange={(e) =>
                    setHotelRooms({ ...hotelRooms, currency: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="USD"
                />
              </div>
              <div>
                <label htmlFor="roomsLeft" className="block text-sm font-medium mb-1">
                  Rooms Left
                </label>
                <input
                  type="number"
                  id="roomsLeft"
                  value={hotelRooms.roomsLeft}
                  onChange={(e) =>
                    setHotelRooms({ ...hotelRooms, roomsLeft: e.target.value })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="10"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Room Description
                </label>
                <textarea
                  id="description"
                  value={hotelRooms.description}
                  onChange={(e) =>
                    setHotelRooms({
                      ...hotelRooms,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894]"
                  placeholder="Room description"
                ></textarea>
              </div>
            </form>
          </>
        )}

        {/* Botón de siguiente y anterior */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              className="bg-[#00352A] hover:bg-[#00291F] text-white py-2 px-4 rounded"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          <div className="flex justify-end w-full">
            {step < 3 ? (
              <button
                className="bg-[#00B894] hover:bg-[#008F6E] text-white py-2 px-4 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-[#00B894] hover:bg-[#008F6E] text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCreationView;
