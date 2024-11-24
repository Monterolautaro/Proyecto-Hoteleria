"use client";
import { loginUser } from "@/helpers/auth.helper";
import { validateEmail, validatePassword } from "@/helpers/formValidation";
import { Toast } from "@/helpers/toast";
import { signIn } from "next-auth/react"; // Importamos signIn de next-auth
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa"; // Importamos el ícono de Google

const Login = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      setIsSubmitting(true);
      const { token, user } = await loginUser(formData); 
      localStorage.setItem("token", token); 
      localStorage.setItem("user", JSON.stringify(user)); 
      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
      setIsSubmitting(false);
      handleClick();
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.message || "Login failed",
      });
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = !formData.email || !formData.password;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3FFFC]">
      <div className="bg-green-100 p-8 rounded-xl shadow-md border w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-6">
          Sign in or create an account
        </h2>
        <form onSubmit={handleLogin}>
          {["email", "password"].map((key) => (
            <div key={key} className="mb-4">
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                className="w-full p-3 border bg-green-50 rounded-lg focus:outline-none focus:ring-2 placeholder-gray-400"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={(formData as any)[key]}
                onChange={handleChange}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#009375] text-white rounded-lg disabled:opacity-50"
            disabled={isSubmitting || isFormIncomplete}
          >
            Log In
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <span className="text-sm text-gray-600">or sign in with</span>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => signIn("google")}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 transition"
          >
            <FaGoogle className="text-blue-500 w-8 h-8" /> {/* Ícono de Google */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
