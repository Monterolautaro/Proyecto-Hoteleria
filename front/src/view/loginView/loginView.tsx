"use client";
import { loginUser } from "@/helpers/auth.helper";
import { validateEmail, validatePasswordLogin } from "@/helpers/formValidation";
import { Toast } from "@/helpers/toast";
import firstToUpperCase from "@/helpers/upperCase";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const handleClick = () => {
    router.push("/", {
      scroll: false,
    }); // Redirige a la página principal después del login
  };

  const handleGoogleClick = async () => {
    await signIn("google", { redirect: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePasswordLogin(formData.email, formData.password),
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
        <h2 className="text-xl font-bold text-center mb-6">
          Sign in with your account
        </h2>
        <form onSubmit={handleLogin}>
          {["email", "password"].map((key) => (
            <div key={key} className="mb-3 flex gap-1 flex-col">
              <label htmlFor={key} className="font-medium">
                {firstToUpperCase(key)}
              </label>
              <div className="relative">
                <input
                  type={
                    key === "password" && !showPassword ? "password" : "text"
                  } // Alternar entre tipo 'password' y 'text' según el estado
                  id={key}
                  name={key}
                  className="w-full p-2 pr-12 border bg-green-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400" // Ajustamos el padding derecho para que haya espacio para el ícono
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                />
                {key === "password" && (
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2" // Posicionar el ícono al lado derecho
                    onClick={() => setShowPassword(!showPassword)} // Alternar la visibilidad de la contraseña
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-[#009375]" />
                    ) : (
                      <FaEye className="text-[#009375]" />
                    )}
                  </button>
                )}
              </div>
              <p
                className={`text-red-500 text-sm mt-1 h-5 ${
                  errors[key] ? "visible" : "invisible"
                }`}
              >
                {errors[key]}
              </p>
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
            onClick={handleGoogleClick}
            className="w-14 h-14 bg-white rounded-full border border-[#009375] flex items-center justify-center hover:bg-[#009375] mt-1 transition group"
          >
            <FaGoogle className="text-[#009375] w-8 h-8 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
