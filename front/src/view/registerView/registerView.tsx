/* eslint-disable @next/next/no-img-element */
"use client";
import { registerUser } from "@/helpers/auth.helper";
import {
  validateConfirmPassword,
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
} from "@/helpers/formValidation";
import { Toast } from "@/helpers/toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";


const Register = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthday: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formateo del campo birthday
  const formatBirthday = (value: string) => {
    const numbersOnly = value.replace(/\D/g, ""); // Eliminar cualquier caracter no numérico
    let formattedValue = numbersOnly.slice(0, 4); // Año (4 caracteres)
    if (numbersOnly.length >= 5) formattedValue += "-" + numbersOnly.slice(4, 6); // Mes (2 caracteres)
    if (numbersOnly.length >= 7) formattedValue += "-" + numbersOnly.slice(6, 8); // Día (2 caracteres)
    return formattedValue;
  };

  // Validar en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Si el campo es "birthday", formateamos el valor
    if (name === "birthday") {
      setFormData({ ...formData, [name]: formatBirthday(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validación en tiempo real
    const newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name = validateName(value);
        break;
      case "lastname":
        newErrors.lastname = validateLastName(value);
        break;
      case "email":
        newErrors.email = validateEmail(value);
        break;
      case "password":
        newErrors.password = validatePassword(value);
        break;
      case "confirmPassword":
        newErrors.confirmPassword = validateConfirmPassword(formData.password, value);
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      lastname: validateLastName(formData.lastname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    // Imprimir API_URL desde .env
    console.log("API_URL: ", process.env.API_URL);

    try {
      setIsSubmitting(true);
      const user = await registerUser(formData);
      Toast.fire({
        icon: "success",
        title: "Registration successful!",
      });

      localStorage.setItem("user", JSON.stringify(user));
      setIsSubmitting(false);
      handleClick();
    } catch (error: any) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = Object.values(formData).some((value) => !value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3FFFC]">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-8">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-wrap gap-8 justify-center w-full">
          {/* Left Column */}
          <div className="w-full sm:w-2/5">
            <div className="mb-6">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-6">
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
            </div>
            <div className="mb-6">
              <input
                type="text"
                id="birthday"
                name="birthday"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                placeholder="YYYY-MM-DD"
                value={formData.birthday}
                onChange={handleChange}
                maxLength={10} // Limitar a 10 caracteres (formato YYYY-MM-DD)
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-2/5">
            {["email", "username", "password", "confirmPassword"].map((key) => (
              <div key={key} className="mb-6">
                <input
                  type={key.includes("password") ? "password" : "text"}
                  id={key}
                  name={key}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder={key
                    .replace("confirmPassword", "Confirm Password")
                    .replace(/([A-Z])/g, " $1")}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                />
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
        </form>

        {/* Botón de Registro - Siempre al final */}
        <button
          type="submit"
          className="w-1/3 py-2 px-4 bg-[#009375] text-white rounded-lg hover:bg-[#006c55] disabled:opacity-50 mx-auto"
          disabled={isSubmitting || isFormIncomplete}
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Google Login Button */}
        <div className="mt-4 flex justify-center w-full">
          <button
            onClick={() => signIn("google")}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 transition"
          >
            <FaGoogle className="text-blue-500 w-8 h-8" /> {/* Ícono de Google con color azul */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;