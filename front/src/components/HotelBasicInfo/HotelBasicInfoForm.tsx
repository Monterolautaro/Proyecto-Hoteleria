"use client";

import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
import { useEffect, useState } from "react";

const HotelBasicInfoForm = () => {
  const { hotelInfo, setHotelInfo, validateForm } = useHotelCreation();
  const [errors, setErrors] = useState({
    name: "",
    country: "",
    city: "",
    address: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    country: false,
    city: false,
    address: false,
  });

  // Función para manejar los errores de validación
  const validateFields = () => {
    const newErrors: any = {};

    // Validación del nombre (Solo texto)
    if (hotelInfo.name.trim() === "") {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(hotelInfo.name.trim())) {
      newErrors.name = "Name must only contain letters and spaces.";
    }

    // Validación del país (Solo texto)
    if (hotelInfo.country.trim() === "") {
      newErrors.country = "Country is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(hotelInfo.country.trim())) {
      newErrors.country = "Country must only contain letters and spaces.";
    }

    // Validación de la ciudad (Solo texto)
    if (hotelInfo.city.trim() === "") {
      newErrors.city = "City is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(hotelInfo.city.trim())) {
      newErrors.city = "City must only contain letters and spaces.";
    }

    // Validación de la dirección (Solo texto y al menos 5 caracteres)
    if (hotelInfo.address.trim() === "") {
      newErrors.address = "Address is required.";
    } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(hotelInfo.address.trim())) {
      newErrors.address = "Address must only contain letters, numbers, and common address characters (e.g., commas, periods).";
    } else if (hotelInfo.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters.";
    }

    setErrors(newErrors);
  };

  // Verificar y actualizar la validación en el formulario
  useEffect(() => {
    validateFields();
    const isValid =
      hotelInfo.name.trim() !== "" &&
      hotelInfo.country.trim() !== "" &&
      hotelInfo.city.trim() !== "" &&
      hotelInfo.address.trim() !== "" &&
      hotelInfo.address.length >= 5;

    validateForm("basicInfo", isValid);
  }, [hotelInfo, validateForm]);

  // Manejo de la interacción del campo para que se marque como tocado
  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name{" "}
            {touched.name && errors.name && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            id="name"
            value={hotelInfo.name}
            onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Hotel Name"
          />
          {/* Espacio fijo con tamaño de mensaje reducido */}
          <div className="h-4">
            {touched.name && errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country{" "}
              {touched.country && errors.country && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="country"
              value={hotelInfo.country}
              onChange={(e) => setHotelInfo({ ...hotelInfo, country: e.target.value })}
              onBlur={() => handleBlur("country")}
              className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
              placeholder="Country"
            />
            {/* Espacio fijo con tamaño de mensaje reducido */}
            <div className="h-4">
              {touched.country && errors.country && (
                <p className="text-red-500 text-xs">{errors.country}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City{" "}
              {touched.city && errors.city && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              id="city"
              value={hotelInfo.city}
              onChange={(e) => setHotelInfo({ ...hotelInfo, city: e.target.value })}
              onBlur={() => handleBlur("city")}
              className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
              placeholder="City"
            />
            {/* Espacio fijo con tamaño de mensaje reducido */}
            <div className="h-4">
              {touched.city && errors.city && (
                <p className="text-red-500 text-xs">{errors.city}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address{" "}
            {touched.address && errors.address && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            id="address"
            value={hotelInfo.address}
            onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
            onBlur={() => handleBlur("address")}
            className="w-full p-2 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Address"
          />
          {/* Espacio fijo con tamaño de mensaje reducido */}
          <div className="h-4">
            {touched.address && errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelBasicInfoForm;
