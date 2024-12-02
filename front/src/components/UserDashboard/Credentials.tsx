/* eslint-disable @next/next/no-img-element */
"use client";

import { IUserCredentials } from "@/interfaces/users";
import Loader from "./LoaderData";
import { useEffect, useState } from "react";
import {
  changeEmail,
  changeUsername,
} from "@/helpers/userDashboard/changeCredential";
import Cookies from "js-cookie";

const Credentials: React.FC<IUserCredentials> = ({
  email,
  username,
  userId,
}) => {
  const [edit, setEdit] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token || "");
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = (e.target as HTMLButtonElement).name; //Tipado para permitir usar el e.target.name
    if (buttonName === "email" && userId && token) {
      await changeEmail(newEmail, userId, token);
      setEdit("");
    }
    if (buttonName === "username" && userId && token) {
      await changeUsername(newUsername, userId, token);
      setEdit("");
    }
  };

  const handleCancel = () => {
    setEdit("");
  };

  const handleClick = (credential: string) => {
    setEdit(credential);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") setNewEmail(e.target.value);
    else if (e.target.name === "username") setNewUsername(e.target.value);
  };

  return (
    <div className="w-[50%] p-2 px-4 flex flex-col gap-3">
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
                  className="pl-1 py-1 focus:outline-none border-b-transparent w-[80%] border-b focus:border-b-black focus:border-b"
                  type="text"
                  placeholder={email}
                  value={newEmail}
                  name="email"
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2">
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
      <div>
        <h3 className="font-semibold text-lg">Username</h3>
        {username !== undefined ? (
          <div className="flex flex-col ">
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
                  className="pl-1 py-1 focus:outline-none w-[60%] border-b-transparent border-b focus:border-b-black focus:border-b"
                  type="text"
                  placeholder={username}
                  value={newUsername}
                  name="username"
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2">
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
      <div>
        <h3 className="font-semibold text-lg">Change Password</h3>
        <p>here ou change it</p>
      </div>
    </div>
  );
};

export default Credentials;
