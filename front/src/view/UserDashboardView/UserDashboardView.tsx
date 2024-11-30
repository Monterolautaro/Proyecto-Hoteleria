"use client";

import Credentials from "@/components/UserDashboard/Credentials";
import PersonalData from "@/components/UserDashboard/PersonalData";
import getUserData from "@/helpers/userDashboard/getUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/users";
import UserBookings from "@/components/UserDashboard/UserBookings";

const UserDashboardView = () => {
  // const [userInfo, setUserInfo] = useState({});
  const [view, setView] = useState("userInfo");
  const [user, setUser] = useState<User | null>(null);
  const userBookings = ["frist", "second"];

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("token");
      const user = JSON.parse(Cookies.get("user") || "{}");

      if (token) {
        const userData = await getUserData(user.id, token);
        setUser(userData);
      }
    };
    getData();
  }, []);

  const handleClick = (value: string) => {
    setView(value);
  };

  return (
    <div className="flex gap-8 w-[70%] justify-center mx-auto my-4">
      <div className="flex flex-col rounded-lg overflow-hidden h-fit min-w-[30%] border border-slate-300 font-medium">
        <button
          className=" text-start px-3 py-5 border-b border-b-slate-300 transition-all duration-200 ease-in-out hover:pl-[30px] hover:text-[#009375]"
          style={
            view === "userInfo"
              ? {
                  color: "#009375",
                  paddingLeft: "30px",
                }
              : {}
          }
          onClick={() => handleClick("userInfo")}
        >
          Personal Data
        </button>
        <button
          className="text-start px-3 py-5 transition-all ease-in-out hover:pl-[30px] hover:text-[#009375] duration-200"
          onClick={() => handleClick("bookings")}
          style={
            view === "bookings"
              ? {
                  color: "#009375",
                  paddingLeft: "30px",
                }
              : {}
          }
        >
          Bookings
        </button>
      </div>
      {view === "userInfo" ? (
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 rounded-lg ">
          <h2 className="text-3xl font-bold mb-3">Personal Data</h2>
          <h3 className="text-lg mb-8">
            Here you can see and modify your personal data
          </h3>
          <div className="flex justify-center">
            <PersonalData
              name={user?.name!}
              lastname={user?.lastname!}
              birthdate={user?.birthday!}
            />
            <Credentials username="Jonh1123" email="jhondon@mail.com" />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 rounded-lg min-h-[50dvh]">
          <UserBookings bookings={userBookings} />
        </div>
      )}
    </div>
  );
};

export default UserDashboardView;
