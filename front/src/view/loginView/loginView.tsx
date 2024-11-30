"use client";
import { loginUser } from "@/helpers/auth.helper";
import { validateEmail, validatePassword } from "@/helpers/formValidation";
import { Toast } from "@/helpers/toast";
import { signIn } from "next-auth/react"; // Importamos signIn de next-auth
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa"; // Importamos el ícono de Google
import Cookies from "js-cookie";
import firstToUpperCase from "@/helpers/upperCase";

const Login = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); // Redirige a la página principal después del login
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
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
      setIsSubmitting(false);
      handleClick();
    } catch (error: any) {
      console.log(error);

      Toast.fire({
        icon: "error",
        title: error.message || "Login failed",
      });
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = !formData.email || !formData.password;

  return (
    <div className="flex justify-center items-center h-fit pt-4 pb-8 bg-gradient-to-b from-[#009375] to-[#F3FFFC]">
      <div className="bg-[#d0f6e9] p-8 rounded-xl mb-3 shadow-xl border w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-8">
          Sign in with your account
        </h2>
        <form onSubmit={handleLogin}>
          {["email", "password"].map((key) => (
            <div key={key} className="mb-4 flex gap-1 flex-col">
              <label htmlFor={key} className="font-medium">
                {firstToUpperCase(key)}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                className="w-full p-2 border bg-green-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400"
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
            className="w-full py-3 px-4 bg-[#009375] text-white rounded-lg hover:bg-[#1eb697] transition duration-100 disabled:opacity-50"
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
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-14 h-14 bg-white rounded-full border border-[#009375] flex items-center justify-center hover:bg-[#009375] mt-1 transition group"
          >
            <FaGoogle className="text-[#009375] w-8 h-8 group-hover:text-white" />{" "}
            {/* Ícono de Google */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
