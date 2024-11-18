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
        <form onSubmit={handleRegister}>
          {Object.keys(formData).map((key) => (
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
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#009375] text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            disabled={isSubmitting || isFormIncomplete}
          >
            Register
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <span className="text-sm text-gray-600">or continue with</span>
        </div>
        <div className="flex justify-center mt-4">
          <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full hover:shadow-md">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
