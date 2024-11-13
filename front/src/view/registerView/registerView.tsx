"use client";
import {
  validateAddress,
  validateConfirmPassword,
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validatePhone,
} from "@/helpers/formValidation";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    lastName?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const addressError = validateAddress(address);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (
      nameError ||
      lastNameError ||
      emailError ||
      addressError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      setErrors({
        name: nameError,
        lastName: lastNameError,
        email: emailError,
        address: addressError,
        phone: phoneError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    // Aquí agregarías la lógica para registrar al usuario.
    console.log({
      name,
      lastName,
      email,
      address,
      phone,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="your lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="123 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="•••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="•••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
