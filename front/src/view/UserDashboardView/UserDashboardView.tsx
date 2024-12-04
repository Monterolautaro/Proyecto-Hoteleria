"use client";

import Credentials from "@/components/UserDashboard/Credentials";
import PersonalData from "@/components/UserDashboard/PersonalData";
import getUserData from "@/helpers/userDashboard/getUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/users";
import UserBookings from "@/components/UserDashboard/UserBookings";
import { userBookings } from "@/helpers/userDashboard/userBookings";
import ProfilePhotoUploader from "@/components/profilePhotoUploader/profilePhotoUploader";
import Swal from "sweetalert2";

const UserDashboardView = () => {
  const [view, setView] = useState("userInfo");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  }, [user]);

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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [userId, setUserId] = useState(null);

  const getUserId = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    const user = JSON.parse(Cookies.get("user") || "{}");
    const userData = await getUserData(user?.id, token);

    const user_id = userData?.user_id

    if(!user_id){
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener el id del usuario",
        icon: "error",
        confirmButtonColor: "#009375",
      })
    }

    return user_id;
  }
  
    useEffect(() => {
      const getData = async () => {
        const userId = await getUserId();
        setUserId(userId);
      };
      getData();
    }, []);

  return (
    <div className="flex gap-8 w-full h-[70vh] justify-center mx-auto py-5 px-[10%] bg-gradient-to-b from-[#d0f6e9] to-[#F3FFFC] mb-12 animate-fadeIn">
      <div className="flex flex-col rounded-lg overflow-hidden h-fit min-w-[30%] border bg-white border-slate-300 font-medium">
      <div>
      <h1>Mi Perfil</h1>
      <ProfilePhotoUploader
        uploadEndpoint={`${API_URL}/files/upload/profile/${userId}`} // endpoint del back
        currentPhoto="https://res.cloudinary.com/dln87ugim/image/upload/v1733280421/profile_xvxiir.png" // url predeterminada para perfiles sin foto
      />

    </div>
        <button
          className=" text-start px-3 py-5 border-b border-b-slate-300 transition-all duration-200 ease-in-out hover:pl-[30px] "
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
          className="text-start px-3 py-5 transition-all ease-in-out hover:pl-[30px]  duration-200"
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
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 bg-white shadow-lg rounded-lg ">
          <h2 className="text-3xl font-bold mb-3">Personal Data</h2>
          <h3 className="text-lg mb-8">
            Here you can see and modify your personal data
          </h3>
          <div className="flex justify-cente">
            <PersonalData
              name={user?.name}
              lastname={user?.lastname}
              birthdate={user?.birthday}
            />
            <Credentials
              username={user?.credential.username}
              email={user?.credential.email}
              userId={user?.user_id}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col p-4 px-6 bg-white border border-slate-300 rounded-lg min-h-[50dvh]">
          <UserBookings bookings={userBookings} />
        </div>
      )}
    </div>
  );
};

export default UserDashboardView;
