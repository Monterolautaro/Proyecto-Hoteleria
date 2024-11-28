// "use client";


//! Falta hacer la validación de los inputs, como límite de rooms, poner cualquier currency...

import { useState } from "react";
import { useHotelCreation } from "../HotelCreationContext/HotelCreationProvider";

const HotelRoomsForm = () => {
  const { setHotelRooms } = useHotelCreation();
  const [rooms, setRooms] = useState([
    {
      id: 1,
      type: "single",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "",
      enabled: true,
    },
    {
      id: 2,
      type: "double",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "",
      enabled: false,
    },
    {
      id: 3,
      type: "triple",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "",
      enabled: false,
    },
    {
      id: 4,
      type: "suite",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "",
      enabled: false,
    },
  ]);

  // Función para alternar el estado de habilitación de las habitaciones
  const handleToggle = (id: number) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, enabled: !room.enabled } : room
    );

    // Si la última habitación habilitada es desmarcada, eliminarla
    const lastRoom = updatedRooms[updatedRooms.length - 1];
    if (lastRoom.id === id && !lastRoom.enabled) {
      // Eliminamos la habitación si se desmarca
      const filteredRooms = updatedRooms.filter((room) => room.id !== id);
      setRooms(filteredRooms);
    } else {
      setRooms(updatedRooms);

      //! Eliminé esto para evitar que se creen más tipos de room
      // Si la última habitación habilitada es activada, agregar una nueva fila deshabilitada
      // if (lastRoom.id === id && lastRoom.enabled) {
      //   const newRoom = {
      //     id: rooms.length + 1,
      //     type: `Room ${rooms.length + 1}`,
      //     description: "",
      //     roomsLeft: "",
      //     price: "",
      //     currency: "",
      //     enabled: false,
      //   };
      //   setRooms([...updatedRooms, newRoom]);
      // }
    }
  };

  // Función para manejar el cambio en los campos de entrada de la habitación
  const handleInputChange = (
    id: number,
    field: string,
    value: string | number
  ) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, [field]: value } : room
    );

    setHotelRooms(updatedRooms);

    setRooms(updatedRooms);
  };

  return (
    <div className="p-6  text-white  max-w-4xl mx-auto">
      <div className="w-full border border-gray-700 rounded">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 text-white p-3 rounded-t">
          <div className="font-semibold">Room Type</div>
          <div className="font-semibold">Description</div>
          <div className="font-semibold">Rooms</div>
          <div className="font-semibold">Price</div>
          <div className="font-semibold">Currency</div>
        </div>

        {/* Contenedor con scroll */}
        <div className="max-h-[300px] overflow-y-scroll">
          {/* Room Rows */}
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`grid grid-cols-5 gap-4 items-center p-3 border-b border-gray-700 ${
                room.enabled ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* Room Type + Checkbox */}
              <div className="flex items-center">
                {/* Checkbox para habilitar y deshabilitar habitación */}
                {index > 0 && (
                  <input
                    type="checkbox"
                    checked={room.enabled}
                    onChange={() => handleToggle(room.id)}
                    className="form-checkbox w-6 h-6 text-green-500 mr-2"
                  />
                )}
                {/* Input para seleccionar el tipo de habitación */}
                <h3>{room.type}</h3>
              </div>

              {/* Inputs Deshabilitados si no está activo */}
              <div
                className={room.enabled ? "" : "blur-sm pointer-events-none"}
              >
                <textarea
                  value={room.description}
                  onChange={(e) =>
                    handleInputChange(room.id, "description", e.target.value)
                  }
                  disabled={!room.enabled}
                  className="w-full p-2 rounded text-white bg-gray-800 border border-green-400"
                  placeholder="Description"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={room.roomsLeft}
                  onChange={(e) =>
                    handleInputChange(room.id, "roomsLeft", e.target.value)
                  }
                  disabled={!room.enabled}
                  className="w-full p-2 text-white rounded bg-gray-800 border border-green-400"
                  placeholder="Rooms Left"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={room.price}
                  onChange={(e) =>
                    handleInputChange(room.id, "price", e.target.value)
                  }
                  disabled={!room.enabled}
                  className="w-full p-2 text-white rounded bg-gray-800 border border-green-400"
                  placeholder="Price"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={room.currency}
                  onChange={(e) =>
                    handleInputChange(room.id, "currency", e.target.value)
                  }
                  disabled={!room.enabled}
                  className="w-full p-2 text-white rounded bg-gray-800 border border-green-400"
                  placeholder="Currency (e.g., USD)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelRoomsForm;


