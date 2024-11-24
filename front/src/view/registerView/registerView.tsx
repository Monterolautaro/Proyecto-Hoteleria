/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validateConfirmPassword,

 
} from "@/helpers/formValidation";
import { registerUser } from "@/helpers/auth.helper";
import { Toast } from "@/helpers/toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthday:"",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    try {
      setIsSubmitting(true);
      const user = await registerUser(formData);
      Toast.fire({
        icon: "success",
        title: "Registration successful!",
    });
      
      localStorage.setItem("user", JSON.stringify(user));
      setIsSubmitting(false);
    } catch (error: any) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = Object.values(formData).some((value) => !value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3FFFC]">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
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
