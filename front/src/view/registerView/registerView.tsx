"use client";
import Image from "next/image";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="your name "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-600">or register with</span>
        </div>

        <a
  href="https://accounts.google.com/signin/v2/identifier?service=cloudconsole" // URL de Google Account
  target="_blank" // Abre en una nueva pestaña
  rel="noopener noreferrer" // Mejora la seguridad
  className="flex items-center justify-center w-full py-2 px-4"
>
  <Image
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGcgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiNmNGYyZWQiIHJ4PSI2MCIvPjxwYXRoIGZpbGw9IiM0Mjg1ZjQiIGQ9Ik00MS42MzYgMjAzLjAzOWgzMS44MTh2LTc3LjI3M0wyOCA5MS42NzZ2OTcuNzI3YzAgNy41NDUgNi4xMTQgMTMuNjM2IDEzLjYzNiAxMy42MzYiLz48cGF0aCBmaWxsPSIjMzRhODUzIiBkPSJNMTgyLjU0NSAyMDMuMDM5aDMxLjgxOWM3LjU0NSAwIDEzLjYzNi02LjExNCAxMy42MzYtMTMuNjM2VjkxLjY3NWwtNDUuNDU1IDM0LjA5MSIvPjxwYXRoIGZpbGw9IiNmYmJjMDQiIGQ9Ik0xODIuNTQ1IDY2LjY3NXY1OS4wOTFMMjI4IDkxLjY3NlY3My40OTJjMC0xNi44NjMtMTkuMjUtMjYuNDc3LTMyLjcyNy0xNi4zNjMiLz48cGF0aCBmaWxsPSIjZWE0MzM1IiBkPSJNNzMuNDU1IDEyNS43NjZ2LTU5LjA5TDEyOCAxMDcuNTgzbDU0LjU0NS00MC45MDl2NTkuMDkxTDEyOCAxNjYuNjc1Ii8+PHBhdGggZmlsbD0iI2M1MjIxZiIgZD0iTTI4IDczLjQ5M3YxOC4xODJsNDUuNDU0IDM0LjA5MXYtNTkuMDlMNjAuNzI3IDU3LjEzQzQ3LjIyNyA0Ny4wMTYgMjggNTYuNjMgMjggNzMuNDkzIi8+PC9nPjwvc3ZnPg=="
    alt="Gmail Logo"
    width={20}
    height={20}
  />
  
</a>

      </div>
    </div>
  );
};

export default Register;
