"use client";

import { useHotelCreation } from "@/components/HotelCreationContext/HotelCreationProvider";
import { useEffect, useState } from "react";

const HotelDetailsForm = () => {
  const { hotelDetails, setHotelDetails, validateForm } = useHotelCreation();
  const [errors, setErrors] = useState({
    stars: "",
    img: "",
    description: "",
  });

  const [touched, setTouched] = useState({
    stars: false,
    img: false,
    description: false,
  });

  // Función para manejar los errores de validación
  const validateFields = () => {
    const newErrors: any = {};

    // Validación de las estrellas (entre 1 y 5)
    if (!hotelDetails.stars) {
      newErrors.stars = "Stars are required.";
    } else {
      const stars = Number(hotelDetails.stars); // Convertir a número
      if (isNaN(stars) || stars < 1 || stars > 5) {
        newErrors.stars = "Stars must be a number between 1 and 5.";
      }
    }

    // Validación de la calificación (entre 1 y 5)

    // Validación de la URL de la imagen
    if (!hotelDetails.img.trim()) {
      newErrors.img = "Image URL is required.";
    }

    // Validación de la descripción (mínimo 10 caracteres)
    if (!hotelDetails.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (hotelDetails.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);

    // Validación final del formulario para habilitar el botón "Next"
    const isValid =
      !isNaN(Number(hotelDetails.stars)) &&
      Number(hotelDetails.stars) >= 1 &&
      Number(hotelDetails.stars) <= 5 &&
      hotelDetails.img.trim() !== "" &&
      hotelDetails.description.trim().length >= 10;

    validateForm("details", isValid);
  };

  // Verificar y actualizar la validación en el formulario
  useEffect(() => {
    validateFields();
  }, [hotelDetails, validateForm]);

  // Manejo de la interacción del campo para que se marque como tocado
  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="stars" className="block text-sm font-medium mb-2">
            Stars{" "}
            {touched.stars && errors.stars && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="number"
            id="stars"
            value={hotelDetails.stars}
            onChange={(e) =>
              setHotelDetails({ ...hotelDetails, stars: e.target.value })
            }
            onBlur={() => handleBlur("stars")}
            className="w-full p-3 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Stars (1-5)"
          />
          {/* Espacio fijo con tamaño de mensaje reducido */}
          <div className="h-4">
            {touched.stars && errors.stars && (
              <p className="text-red-500 text-xs">{errors.stars}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="img" className="block text-sm font-medium mb-2">
            Image URL{" "}
            {touched.img && errors.img && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="text"
            id="img"
            value={hotelDetails.img}
            onChange={(e) =>
              setHotelDetails({ ...hotelDetails, img: e.target.value })
            }
            onBlur={() => handleBlur("img")}
            className="w-full p-3 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Image URL"
          />
          {/* Espacio fijo con tamaño de mensaje reducido */}
          <div className="h-4">
            {touched.img && errors.img && (
              <p className="text-red-500 text-xs">{errors.img}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description{" "}
            {touched.description && errors.description && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <textarea
            id="description"
            value={hotelDetails.description}
            onChange={(e) =>
              setHotelDetails({ ...hotelDetails, description: e.target.value })
            }
            onBlur={() => handleBlur("description")}
            className="w-full p-3 rounded bg-gray-800 text-white border border-green-400"
            placeholder="Hotel description"
          ></textarea>
          {/* Espacio fijo con tamaño de mensaje reducido */}
          <div className="h-4">
            {touched.description && errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelDetailsForm;
