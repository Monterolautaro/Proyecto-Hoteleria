"use client";

import { useEffect, useState } from "react";
import { useHotelCreation } from "../HotelCreationContext/HotelCreationProvider";

const HotelRoomsForm = () => {
  const { setHotelRooms, validateForm } = useHotelCreation();
  const [rooms, setRooms] = useState([
    {
      id: 1,
      type: "single",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "USD",
      enabled: true,
    },
    {
      id: 2,
      type: "double",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "USD",
      enabled: false,
    },
    {
      id: 3,
      type: "triple",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "USD",
      enabled: false,
    },
    {
      id: 4,
      type: "suite",
      description: "",
      roomsLeft: 0,
      price: 0,
      currency: "USD",
      enabled: false,
    },
  ]);

  const [errors, setErrors] = useState({
    description: "",
    roomsLeft: "",
    price: "",
    currency: "USD",
  });

  const [touched, setTouched] = useState({
    description: false,
    roomsLeft: false,
    price: false,
    currency: false,
  });

  // Función para alternar el estado de habilitación de las habitaciones
  const handleToggle = (id: number) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, enabled: !room.enabled } : room
    );

    // Si la última habitación habilitada es desmarcada, eliminarla
    const lastRoom = updatedRooms[updatedRooms.length - 1];
    if (lastRoom.id === id && !lastRoom.enabled) {
      const filteredRooms = updatedRooms.filter((room) => room.id !== id);
      setRooms(filteredRooms);
    } else {
      setRooms(updatedRooms);
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

    setRooms(updatedRooms);
    setHotelRooms(updatedRooms);
  };

  // Validación de los campos de la habitación
  const validateFields = () => {
    const newErrors: any = {};
    let isValid = true;

    rooms.forEach((room) => {
      if (room.enabled) {
        // Validación de descripción
        if (!room.description.trim()) {
          newErrors.description = "Description is required.";
          isValid = false;
        } else if (room.description.trim().length < 10) {
          newErrors.description = "Min 10 chars.";
          isValid = false;
        }

        // Validación de cantidad de habitaciones
        if (room.roomsLeft <= 0) {
          newErrors.roomsLeft = "Must be > 0.";
          isValid = false;
        }

        // Validación de precio
        if (room.price <= 0) {
          newErrors.price = "Must be > 0.";
          isValid = false;
        }

        // Validación de moneda (ya no es necesario, ya que está fija en USD)
        // if (!room.currency.trim()) {
        //   newErrors.currency = "Currency required.";
        //   isValid = false;
        // }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Validar cuando los campos cambian
  useEffect(() => {
    const isValid = validateFields();
    validateForm("rooms", isValid); // Avisa al contexto si es válido o no
  }, [rooms, validateForm]);

  // Manejo de la interacción del campo para marcarlo como tocado
  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <div className="w-full border border-gray-700 rounded">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 text-white p-3 rounded-t">
          <div className="font-semibold">Room Type</div>
          <div className="font-semibold">
            Description <span className="text-red-500">*</span>
          </div>
          <div className="font-semibold">
            Rooms <span className="text-red-500">*</span>
          </div>
          <div className="font-semibold">
            Price <span className="text-red-500">*</span>
          </div>
          <div className="font-semibold">
            Currency <span className="text-red-500">*</span>
          </div>
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
              <div className={room.enabled ? "" : "blur-sm pointer-events-none"}>
                <textarea
                  value={room.description}
                  onChange={(e) =>
                    handleInputChange(room.id, "description", e.target.value)
                  }
                  onBlur={() => handleBlur("description")}
                  disabled={!room.enabled}
                  className="w-full p-2 rounded text-white bg-gray-800 border border-green-400"
                  placeholder="Description"
                />
                <div className="col-span-5 text-red-500 text-xs mt-2 min-h-[20px]">
                  {touched.description && errors.description}
                </div>
              </div>
              <div>
                <input
                  type="number"
                  value={room.roomsLeft}
                  onChange={(e) =>
                    handleInputChange(room.id, "roomsLeft", e.target.value)
                  }
                  onBlur={() => handleBlur("roomsLeft")}
                  disabled={!room.enabled}
                  className="w-full p-2 text-white rounded bg-gray-800 border border-green-400"
                  placeholder="Rooms Left"
                />
                <div className="col-span-5 text-red-500 text-xs mt-2 min-h-[20px]">
                  {touched.roomsLeft && errors.roomsLeft}
                </div>
              </div>
              <div>
                <input
                  type="number"
                  value={room.price}
                  onChange={(e) =>
                    handleInputChange(room.id, "price", e.target.value)
                  }
                  onBlur={() => handleBlur("price")}
                  disabled={!room.enabled}
                  className="w-full p-2 text-white rounded bg-gray-800 border border-green-400"
                  placeholder="Price"
                />
                <div className="col-span-5 text-red-500 text-xs mt-2 min-h-[20px]">
                  {touched.price && errors.price}
                </div>
              </div>

              {/* Aquí cambiaremos la moneda para que sea fija y no editable */}
              <div>
                <span className="w-full p-2 text-white rounded bg-gray-800 border border-green-400">
                  USD
                </span>
                <div className="col-span-5 text-red-500 text-xs mt-2 min-h-[20px]">
                  {/* Aquí puedes manejar si hay errores de validación, aunque no sería necesario */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelRoomsForm;
