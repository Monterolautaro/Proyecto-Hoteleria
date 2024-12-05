/* eslint-disable @next/next/no-img-element */
"use client";

import { IUserCredentials } from "@/interfaces/users";
import Loader from "./LoaderData";
import { useEffect, useState } from "react";
import {
  changeEmail,
  changePassword,
  changeUsername,
} from "@/helpers/userDashboard/changeCredential";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Credentials: React.FC<IUserCredentials> = ({
  email,
  username,
  userId,
  password,
  handleRefresh,
}) => {
  const [edit, setEdit] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [token, setToken] = useState("");
  const [changePswrd, setChangePswrd] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const router = useRouter();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token!);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = (e.target as HTMLButtonElement).name;
    if (buttonName === "email" && userId && token && isEmailValid) {
      const result = await changeEmail(newEmail, userId, token);
      if (result && handleRefresh) handleRefresh();
      setEdit("");
    }
    if (buttonName === "username" && userId && token && isUsernameValid) {
      const result = await changeUsername(newUsername, userId, token);
      if (result && handleRefresh) handleRefresh();
      setEdit("");
    }
  };

  const handleCancel = () => {
    setEdit("");
    setNewEmail("");
    setNewUsername("");
    setIsEmailValid(true);
    setIsUsernameValid(true);
  };

  const handleClick = (credential: string) => {
    setEdit(credential);
  };

  const handleClickPassword = (state: boolean) => {
    setChangePswrd(state);
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const handlePswrdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({ ...prev, [name]: value }));

    if (name === "oldPassword") {
      setPasswordErrors((prev) => ({
        ...prev,
        oldPassword: value.trim() === "",
      }));
    } else if (name === "newPassword") {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: value.trim().length < 8 || value === passwords.oldPassword, // Validación adicional
      }));
    } else if (name === "newPassword") {
      setPasswordErrors((prev) => ({
        ...prev,
        newPassword: value.trim().length < 8,
      }));
    } else if (name === "confirmPassword") {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: value !== passwords.newPassword,
      }));
    }
  };

  const handleChangePswrdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      oldPassword: passwords.oldPassword.trim() === "",
      newPassword:
        passwords.newPassword.trim().length < 8 ||
        passwords.newPassword === passwords.oldPassword,
      confirmPassword: passwords.newPassword !== passwords.confirmPassword,
    };

    setPasswordErrors(errors);

    if (!Object.values(errors).some((err) => err) && userId && token) {
      //! Hacer la petición al backend :)
      const result = await changePassword(passwords, userId, token);
      if (result) {
        setChangePswrd(false);
        router.refresh();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setNewEmail(value);
    } else if (name === "username") {
      setNewUsername(value);
    }

    if (
      newEmail.trim() &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmail.trim())
    ) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }

    if (newUsername.trim() && newUsername.trim().length >= 3) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }
  };

  const togglePasswordVisibility = (
    field: "oldPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="w-[50%] p-2 px-4 flex flex-col gap-3">
      {/* Sección Email */}
      <div>
        <h3 className="font-semibold text-lg">E-mail</h3>
        {email !== undefined ? (
          <div className="flex flex-col">
            {edit !== "email" ? (
              <div className="flex justify-between group">
                <p className="inline-block w-fit py-1 border-b border-b-transparent group-hover:text-[#009375] transiton duration-150">
                  {email}
                </p>
                <img
                  src="/assets/EditIcon.png"
                  alt="Edit property"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleClick("email")}
                />
              </div>
            ) : (
              <div className="w-full flex justify-between">
                <input
                  className={`pl-1 py-1 focus:outline-none border-b w-[60%] ${
                    isEmailValid
                      ? "text-black border-b-black focus:border-b-black"
                      : "text-red-500 border-b-red-500 focus:border-b-red-500"
                  }`}
                  type="text"
                  placeholder={email}
                  value={newEmail}
                  name="email"
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="text-sm mr-1 text-red-500 underline underline-offset-2 rounded-md"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-[#009375] text-white py-1 px-4 h-fit rounded-md"
                    name="email"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* Sección Username */}
      <div>
        <h3 className="font-semibold text-lg">Username</h3>
        {username !== undefined ? (
          <div className="flex flex-col">
            {edit !== "username" ? (
              <div className="flex justify-between group">
                <p className="inline-block w-fit py-1 border-b border-b-transparent group-hover:text-[#009375] transiton duration-150">
                  {username}
                </p>
                <img
                  src="/assets/EditIcon.png"
                  alt="Edit property"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleClick("username")}
                />
              </div>
            ) : (
              <div className="w-full flex justify-between">
                <input
                  className={`pl-1 focus:outline-none border-b w-[60%] ${
                    isUsernameValid
                      ? "text-black border-b-black focus:border-b-black"
                      : "text-red-500 border-b-red-500 focus:border-b-red-500"
                  }`}
                  type="text"
                  placeholder={username}
                  value={newUsername}
                  name="username"
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="text-sm mr-1 text-red-500 underline underline-offset-2 rounded-md"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-sm bg-[#009375] text-white py-1 px-4 h-fit rounded-md"
                    name="username"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* Sección Change Password */}
      <div>
        <h3 className="font-semibold text-lg">Change Password</h3>
        <p
          className="text-[#276b5d] hover:text-[#009375] cursor-pointer transition duration-100"
          onClick={() => handleClickPassword(true)}
        >
          Click here to change your password
        </p>
      </div>
      {changePswrd && (
        <div className="absolute bg-[#000a] w-full h-[118dvh] bottom-0 animate-fadeIn top-0 left-0">
          <div className="relative mx-auto bg-white w-[30%] h-fit top-[18%] rounded-lg shadow-2xl flex flex-col py-5 px-7">
            <form onSubmit={handleChangePswrdSubmit}>
              {/* Old Password */}
              <div className="flex flex-col mb-4">
                <label htmlFor="oldPassword">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    className={`border ${
                      passwordErrors.oldPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full px-3 py-2`}
                    onChange={handlePswrdChange}
                    id="oldPassword"
                    name="oldPassword"
                    value={passwords.oldPassword}
                  />
                  <svg
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.oldPassword ? (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    ) : (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    )}
                  </svg>
                </div>
                {passwordErrors.oldPassword && (
                  <span className="text-sm text-red-500 mt-1">
                    Current password is required
                  </span>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col mb-4">
                <label htmlFor="newPassword">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    className={`border ${
                      passwordErrors.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full px-3 py-2`}
                    onChange={handlePswrdChange}
                    id="newPassword"
                    name="newPassword"
                    value={passwords.newPassword}
                  />
                  <svg
                    onClick={() => togglePasswordVisibility("newPassword")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.newPassword ? (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    ) : (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    )}
                  </svg>
                </div>
                {passwordErrors.newPassword && (
                  <span className="text-sm text-red-500 mt-1">
                    Password must be at least 8 characters
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    className={`border ${
                      passwordErrors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full px-3 py-2`}
                    onChange={handlePswrdChange}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                  />
                  <svg
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.confirmPassword ? (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    ) : (
                      <path d="M12 4.5c-4.97 0-9 3.76-9 6.75s4.03 6.75 9 6.75 9-3.76 9-6.75-4.03-6.75-9-6.75zm0 12c-4.04 0-7.5-2.64-7.5-5.25s3.46-5.25 7.5-5.25 7.5 2.64 7.5 5.25-3.46 5.25-7.5 5.25z" />
                    )}
                  </svg>
                </div>
                {passwordErrors.confirmPassword && (
                  <span className="text-sm text-red-500 mt-1">
                    Passwords do not match
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleClickPassword(false)}
                  className=" px-4 py-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition duration-100 hover:bg-[#20c2a2] bg-[#009375] rounded-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credentials;
