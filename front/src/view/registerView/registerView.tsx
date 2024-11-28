/* eslint-disable @next/next/no-img-element */
"use client";

import { registerUser } from "@/helpers/auth.helper";
import {
  validateBirthday,
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
import styles from "./register.module.css";

const Register = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
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
    let formattedValue = "";
    if (numbersOnly.length > 0) {
      formattedValue += numbersOnly.slice(0, 4); // Año (primeros 4 caracteres)
    }
    if (numbersOnly.length > 4) {
      formattedValue += "-" + numbersOnly.slice(4, 6); // Mes (siguientes 2 caracteres)
    }
    if (numbersOnly.length > 6) {
      formattedValue += "-" + numbersOnly.slice(6, 8); // Día (últimos 2 caracteres)
    }
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
        newErrors.confirmPassword = validateConfirmPassword(
          formData.password,
          value
        );
        break;
      case "birthday":
        newErrors.birthday = validateBirthday(value);
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
      birthday: validateBirthday(formData.birthday),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      setIsSubmitting(true);
      const user = await registerUser(formData);
      console.log(user);

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
    <div className="flex justify-center p-8 items-center bg-[#F3FFFC]">
      <div className="bg-green-100 p-4 rounded-lg shadow-lg w-[60%] max-w-[60%] flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mt-2 mb-8">
          Register
        </h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-wrap gap-8 justify-center w-full"
        >
          {/* Left Column */}
          <div className="w-full sm:w-2/5">
            <div className="mb-3">
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009375] placeholder-gray-400 mt-1"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-3">
              <label className={styles.label} htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009375] placeholder-gray-400 mt-1"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>
            <div className="mb-3">
              <label className={styles.label} htmlFor="birthday">
                Birthday
              </label>
              <input
                type="text"
                id="birthday"
                name="birthday"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009375] placeholder-gray-400 mt-1"
                placeholder="YYYY-MM-DD"
                value={formData.birthday}
                onChange={handleChange}
                maxLength={10} // Limitar a 10 caracteres (formato YYYY-MM-DD)
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-2/5">
            {["email", "username", "password", "confirmPassword"].map((key) => (
              <div key={key} className="mb-3">
                <label className={styles.label} htmlFor={key}>
                  {key
                    .replace("confirmPassword", "Confirm Password")
                    .replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={
                    key === "password" || key === "confirmPassword"
                      ? "password"
                      : "text"
                  }
                  id={key}
                  name={key}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009375] placeholder-gray-400 mt-1"
                  placeholder={key
                    .replace("confirmPassword", "Confirm Password")
                    .replace(/([A-Z])/g, " $1")}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                />
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>
        </form>

        {/* Botón de Registro */}
        <button
          type="submit"
          className="w-1/3 py-2 px-4 bg-[#009375] mt-3 text-white rounded-lg hover:bg-[#006c55] disabled:cursor-not-allowed mx-auto"
          disabled={isSubmitting || isFormIncomplete}
          onClick={handleRegister}
        >
          Sign Up
        </button>

        {/* Google Login Button */}
        <div className="mt-4 flex justify-center w-full">
          <button
            onClick={() => signIn("google")}
            className="w-14 h-14 bg-white rounded-full border border-[#009375] flex items-center justify-center hover:border-gray-400 mt-1 transition"
          >
            <FaGoogle className="text-[#009375] w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
