"use client";
import Image from "next/image";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "@/helpers/formValidation"; // Importamos las validaciones

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones de email y password
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Actualizamos los errores en el estado
    setErrors({ email: emailError, password: passwordError });

    // Si hay errores, evitamos que el formulario se envíe
    if (emailError || passwordError) {
      return;
    }

    // Aquí agregarías la lógica para autenticar al usuario.
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in or create an account</h2>
        <form onSubmit={handleLogin}>
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              Remember password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-600">or sign in with</span>
        </div>

        <a
          href="https://accounts.google.com/signin/v2/identifier?service=cloudconsole"
          target="_blank"
          rel="noopener noreferrer"
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

export default Login;
