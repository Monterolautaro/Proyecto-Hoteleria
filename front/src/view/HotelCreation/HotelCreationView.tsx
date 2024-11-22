"use client";

import createHotel from "@/helpers/hotelCreation/createHotel";
import { IHotelCreation } from "@/interfaces/hotelCreation";
import React, { useState } from "react";

const HotelCreationView = () => {
  //Manejador de evento del botón de creación
  const handleClick = async () => {
    console.log(newHotel);
    await createHotel(newHotel);
  };

  // Estado para el primer formulario
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    country: "",
    city: "",
    address: "",
  });

  // Estado para el segundo formulario (de prueba)
  const [hotelDetails, setHotelDetails] = useState({
    stars: "",
    rating: "",
    img: "",
    description: "",
  });

  //Estado para el tercer formulario
  const [hotelRooms, setHotelRooms] = useState({
    price: "",
    currency: "",
    roomsLeft: "",
    description: "",
  });

  const newHotel: IHotelCreation = {
    name: hotelInfo.name,
    details: {
      stars: parseInt(hotelDetails.stars, 10),
      rating: 0,
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
    rooms: {
      single: {
        price: parseInt(hotelRooms.price, 10),
        currency: hotelRooms.currency,
        rooms_left: parseInt(hotelRooms.roomsLeft, 10),
        description: hotelRooms.description,
      },
      double: {
        price: 0,
        currency: "",
        rooms_left: 0,
        description: "",
      },
      triple: {
        price: 0,
        currency: "",
        rooms_left: 0,
        description: "",
      },
      suite: {
        price: 0,
        currency: "",
        rooms_left: 0,
        description: "",
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

  // Manejadores de cambio para el primer formulario
  const handleHotelInfoChange = (e) => {
    const { id, value } = e.target;
    setHotelInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Manejadores de cambio para el segundo formulario
  const handleHotelDetailsChange = (e) => {
    const { id, value } = e.target;
    setHotelDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Manejadores de cambio para el tercer formulario
  const handleHotelRoomsChange = (e) => {
    const { id, value } = e.target;
    setHotelRooms((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Función para manejar el envío del primer formulario
  const handleHotelInfoSubmit = (e) => {
    e.preventDefault();
  };

  // Función para manejar el envío del segundo formulario
  const handleHotelDetailsSubmit = (e) => {
    e.preventDefault();
  };

  // Función para manejar el envío del tercer formulario
  const handleHotelRoomsSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-white flex justify-center items-center px-6 bg-[#00352A]">
      <div className="grid grid-cols-2 gap-8 items-center w-full max-w-5xl">
        {/* Primer formulario */}
        <div className="bg-[#004D40] p-6 rounded-lg shadow-lg my-10">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <form className="space-y-5" onSubmit={handleHotelInfoSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={hotelInfo.name}
                onChange={handleHotelInfoChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="Hotel Marriott"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={hotelInfo.country}
                  onChange={handleHotelInfoChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="Argentina"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={hotelInfo.city}
                  onChange={handleHotelInfoChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="Buenos Aires"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={hotelInfo.address}
                onChange={handleHotelInfoChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="Av Olivos"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#00B894] text-white px-4 py-2 rounded shadow hover:bg-[#009375] focus:outline-none"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Segundo formulario */}
        <div className="bg-[#004D40] p-6 rounded-lg shadow-lg my-10">
          <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
          <form className="space-y-5" onSubmit={handleHotelDetailsSubmit}>
            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">
                Stars
              </label>
              <input
                type="text"
                id="stars"
                value={hotelDetails.stars}
                onChange={handleHotelDetailsChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium mb-1"
                >
                  Rating
                </label>
                <input
                  type="text"
                  id="rating"
                  value={hotelDetails.rating}
                  onChange={handleHotelDetailsChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label htmlFor="img" className="block text-sm font-medium mb-1">
                  Img URL
                </label>
                <input
                  type="text"
                  id="img"
                  value={hotelDetails.img}
                  onChange={handleHotelDetailsChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={hotelDetails.description}
                onChange={handleHotelDetailsChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="5"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#00B894] text-white px-4 py-2 rounded shadow hover:bg-[#009375] focus:outline-none"
              >
                Next →
              </button>
            </div>
          </form>
        </div>

        {/* Tercer form */}
        <div className="bg-[#004D40] p-6 rounded-lg shadow-lg my-10">
          <h2 className="text-xl font-semibold mb-4">Single</h2>
          <form className="space-y-5" onSubmit={handleHotelRoomsSubmit}>
            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={hotelRooms.price}
                onChange={handleHotelRoomsChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium mb-1"
                >
                  Currency
                </label>
                <input
                  type="text"
                  id="currency"
                  value={hotelRooms.currency}
                  onChange={handleHotelRoomsChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label htmlFor="img" className="block text-sm font-medium mb-1">
                  N° Rooms
                </label>
                <input
                  type="text"
                  id="roomsLeft"
                  value={hotelRooms.roomsLeft}
                  onChange={handleHotelRoomsChange}
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="stars" className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={hotelRooms.description}
                onChange={handleHotelRoomsChange}
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="5"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#00B894] text-white px-4 py-2 rounded shadow hover:bg-[#009375] focus:outline-none"
              >
                Next →
              </button>
            </div>
          </form>
        </div>
      </div>
      <button onClick={handleClick} className="text-white text-3xl">
        CREATE
      </button>
    </div>
  );
};

export default HotelCreationView;
