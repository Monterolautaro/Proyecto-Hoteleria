"use client";

import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
import { useState } from "react";

const HotelRoomsForm = () => {
  const { setHotelRooms } = useHotelCreation(); // Accediendo a la función para actualizar el estado de las habitaciones en el contexto
  const [rooms, setRooms] = useState([
    { id: 1, type: "single", description: "", roomsLeft: 0, price: 0, currency: "", enabled: true },
    { id: 2, type: "double", description: "", roomsLeft: 0, price: 0, currency: "", enabled: false },
    { id: 3, type: "triple", description: "", roomsLeft: 0, price: 0, currency: "", enabled: false },
    { id: 4, type: "suite", description: "", roomsLeft: 0, price: 0, currency: "", enabled: false },
  ]);

  const handleToggle = (id: number) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, enabled: !room.enabled } : room
    );
    setRooms(updatedRooms);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    let updatedValue = value;

    // Validación para campos numéricos
    if (field === "price" || field === "roomsLeft") {
      updatedValue = value ? parseFloat(value) : 0;
      // Si parseFloat devuelve NaN, lo reemplazamos por 0
      if (isNaN(updatedValue)) updatedValue = 0;
    }

    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, [field]: updatedValue } : room
    );
    setRooms(updatedRooms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatear las habitaciones a un array sin anidar
    const formattedRooms = rooms
      .filter(room => room.enabled) // Solo las habitaciones habilitadas
      .map(room => ({
        type: room.type,
        price: parseFloat(room.price.toString()),
        currency: room.currency,
        rooms_left: parseInt(room.roomsLeft.toString(), 10),
        description: room.description,
      }));

    console.log(formattedRooms); // Verifica los datos antes de enviarlos

    // Actualiza el estado global con las habitaciones formateadas
    setHotelRooms(formattedRooms);
  };

  return (
    <div className="text-white mt-max-w-4xl">
      <form onSubmit={handleSubmit}>
        <div className="w-full border mt border-gray-700 rounded">
          {/* Header */}
          <div className="grid grid-cols-5 gap-4 text-white p-3 rounded-t">
            <div className="font-semibold">Room Type</div>
            <div className="font-semibold">Description</div>
            <div className="font-semibold">Rooms</div>
            <div className="font-semibold">Price</div>
            <div className="font-semibold">Currency</div>
          </div>

          {/* Room Rows */}
          <div>
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`grid grid-cols-5 gap-4 items-center p-3 ${
                  room.enabled ? "opacity-100" : "opacity-50"
                }`}
              >
                {/* Room Type + Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={room.enabled}
                    onChange={() => handleToggle(room.id)}
                    className="form-checkbox w-6 h-6 text-green-500 mr-2"
                  />
                  {/* Campo de solo lectura para Room Type */}
                  <input
                    type="text"
                    value={room.type}
                    readOnly
                    className="w-full p-2 text-gray-300 rounded bg-gray-800 border cursor-not-allowed"
                    disabled={!room.enabled}
                  />
                </div>

                {/* Description */}
                <div className={room.enabled ? "" : "blur-sm pointer-events-none"}>
                  <textarea
                    value={room.description}
                    onChange={(e) => handleInputChange(room.id, "description", e.target.value)}
                    disabled={!room.enabled}
                    className="w-full p-2 text-black rounded bg-gray-800 border"
                    placeholder="Description"
                  />
                </div>

                {/* Rooms Left */}
                <div>
                  <input
                    type="number"
                    value={room.roomsLeft}
                    onChange={(e) => handleInputChange(room.id, "roomsLeft", e.target.value)}
                    disabled={!room.enabled}
                    className="w-full p-2 text-black rounded bg-gray-800 border"
                    placeholder="Rooms Left"
                  />
                </div>

                {/* Price */}
                <div>
                  <input
                    type="number"
                    value={room.price}
                    onChange={(e) => handleInputChange(room.id, "price", e.target.value)}
                    disabled={!room.enabled}
                    className="w-full p-2 text-black rounded bg-gray-800 border"
                    placeholder="Price"
                  />
                </div>

                {/* Currency */}
                <div>
                  <input
                    type="text"
                    value={room.currency}
                    onChange={(e) => handleInputChange(room.id, "currency", e.target.value)}
                    disabled={!room.enabled}
                    className="w-full p-2 text-black rounded bg-gray-800 border"
                    placeholder="Currency (e.g., USD)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Save Rooms
        </button>
      </form>
    </div>
  );
};

export default HotelRoomsForm;
