"use client";

import {
    validateConfirmPassword,
    validateEmail,
    validateLastName,
    validateName,
    validatePassword,
} from "@/helpers/formValidation";
import { sendVerificationCode } from "@/helpers/hotelowner/register";
import { Toast } from "@/helpers/toast";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterHotelOwner = () => {
  const router = useRouter();

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "birthday") {
      const formattedDate = value ? format(new Date(value), "yyyy-MM-dd") : "";
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }

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
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      setIsSubmitting(true);

      // Send the verification code to the user's email
      await sendVerificationCode(formData.email);

      Toast.fire({
        icon: "success",
        title: "Verification code sent to your email!",
      });

      // Redirect to verification page with email as query param
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormIncomplete = Object.values(formData).some((value) => !value);

  return (
    <div className="flex justify-center pt-4 pb-8 items-center bg-gradient-to-b from-[#009375] to-[#F3FFFC]">
      <div className="bg-[#d0f6e9] py-4 pb-5 rounded-lg shadow-xl w-[40%] max-w-[60%] flex flex-col items-center">
        <h2 className="text-xl font-bold text-center mt-2 mb-8">
          Create an account
        </h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-wrap gap-4 justify-center w-full"
        >
          <div className="w-full sm:w-2/5">
            <div className="mb-1">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400 mt-1"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <p
                className={`text-red-500 text-xs mt-1 h-5 ${
                  errors.name ? "visible" : "invisible"
                }`}
              >
                {errors.name}
              </p>
            </div>
            <div className="mb-1">
              <label htmlFor="lastname" className="font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400 mt-1"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
              <p
                className={`text-red-500 text-xs mt-1 h-5 ${
                  errors.lastname ? "visible" : "invisible"
                }`}
              >
                {errors.lastname}
              </p>
            </div>
            <div className="mb-1">
              <label htmlFor="birthday" className="font-medium">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400 mt-1"
                value={formData.birthday}
                onChange={handleChange}
              />
              <p className="text-red-500 text-xs mt-1 h-5 invisible"></p>
            </div>
          </div>

          <div className="w-full sm:w-2/5">
            {["email", "username", "password", "confirmPassword"].map((key) => (
              <div key={key} className="mb-1">
                <label htmlFor={key} className="font-medium">
                  {key.replace("confirmPassword", "Confirm Password").replace(
                    /([A-Z])/g,
                    " $1"
                  )}
                </label>
                <div className="relative">
                  <input
                    type={
                      key === "password" || key === "confirmPassword"
                        ? key === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : showConfirmPassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    id={key}
                    name={key}
                    className="w-full p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#009375] placeholder-gray-400 mt-1"
                    placeholder={key
                      .replace("confirmPassword", "Confirm Password")
                      .replace(/([A-Z])/g, " $1")}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                  />
                  {(key === "password" || key === "confirmPassword") && (
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 transform -translate-y-1/2"
                      onClick={() =>
                        key === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {key === "password"
                        ? showPassword
                          ? <FaEyeSlash className="text-[#009375]" />
                          : <FaEye className="text-[#009375]" />
                        : showConfirmPassword
                        ? <FaEyeSlash className="text-[#009375]" />
                        : <FaEye className="text-[#009375]" />}
                    </button>
                  )}
                </div>
                <p
                  className={`text-red-500 text-xs mt-1 h-5 ${
                    errors[key] ? "visible" : "invisible"
                  }`}
                >
                  {errors[key]}
                </p>
              </div>
            ))}
          </div>
        </form>

        <button
          type="submit"
          className="w-1/3 py-2 px-4 bg-[#009375] mt-3 text-white rounded-lg hover:bg-[#006c55] disabled:cursor-not-allowed mx-auto"
          disabled={isSubmitting || isFormIncomplete}
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RegisterHotelOwner;
