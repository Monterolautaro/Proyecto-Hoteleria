"use client";

import Credentials from "@/components/UserDashboard/Credentials";
import PersonalData from "@/components/UserDashboard/PersonalData";
import getUserData from "@/helpers/userDashboard/getUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/users";
import UserBookings from "@/components/UserDashboard/UserBookings";
import ProfilePhotoUploader from "@/components/profilePhotoUploader/profilePhotoUploader";
import Swal from "sweetalert2";
import getUserGoogleData from "@/helpers/userDashboard/getGoogleUser";
import { IUserGoogleData } from "@/interfaces";
import { IUserBookings } from "@/helpers/userDashboard/userBookings";

const UserDashboardView = () => {
  const [view, setView] = useState("userInfo");
  const [user, setUser] = useState<User | null>(null);
  const [userGoogle, setUserGoogle] = useState<IUserGoogleData | null>(null);
  const [googleImg, setGoogleImg] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [bookings, setBookings] = useState<IUserBookings[] | null>(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("token");
      const user = JSON.parse(Cookies.get("user") || "{}");
      const googleToken = Cookies.get("googleUserToken");
      const googleUser = JSON.parse(Cookies.get("googleUser") || "{}");
      console.log(user.id);

      if (googleUser && googleToken) {
        setSessionToken(googleToken);
        setGoogleImg(googleUser.image);

        const googleUserData = await getUserGoogleData(
          googleUser.email,
          googleToken
        );

        setBookings(googleUserData.bookings);
        setUserGoogle(googleUserData);
      }

      if (token) {
        const userData = await getUserData(user.id, token); // Recibe info del usuario al montarse

        setBookings(userData.bookings);

        setUser(userData);
      }
    };
    getData();
  }, []);

  const handleRefresh = async () => {
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    const googleToken = Cookies.get("googleUserToken");
    const googleUser = JSON.parse(Cookies.get("googleUser") || "{}");

    if (token) {
      setSessionToken(token);
      const userData = await getUserData(user.id, token);
      console.log("New image: ", userData.profile_photo);
      setBookings(userData.bookings);
      setUser(userData);
      setImage(userData.profile_photo);
    }

    if (googleToken && googleUser) {
      const googleUserData = await getUserGoogleData(
        googleUser.email,
        googleToken
      );
      setBookings(googleUserData.bookings);
    }
  };

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

    const user_id = userData?.user_id;

    if (!user_id) {
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener el id del usuario",
        icon: "error",
        confirmButtonColor: "#009375",
      });
    }

    return user_id;
  };

  useEffect(() => {
    const getData = async () => {
      const userId = await getUserId();
      setUserId(userId);
    };
    getData();
  }, []);

  return (
    <div className="flex gap-8 w-full min-h-fit h-[70vh] justify-center mx-auto py-5 px-[10%] bg-gradient-to-b from-[#d0f6e9] to-[#F3FFFC] mb-12 animate-fadeIn">
      <div className="flex flex-col rounded-lg overflow-hidden h-fit min-w-[30%] border bg-white border-slate-300 font-medium">
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
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 bg-white shadow-lg rounded-lg h-fit">
          {user ? (
            <>
              <div className="flex flex-row-reverse justify-between">
                <div className="flex flex-col w-fit items-end relative">
                  {userId && (
                    <ProfilePhotoUploader
                      handleRefresh={handleRefresh}
                      token={sessionToken && sessionToken}
                      uploadEndpoint={`${API_URL}/files/upload/profile/${userId}`} // endpoint del back
                      currentPhoto={image ? image : user.profile_photo} // url predeterminada para perfiles sin foto
                    />
                  )}
                </div>
                <div className="w-[60%]">
                  <h2 className="text-3xl font-bold mb-3">Personal Data </h2>
                  <h3 className="text-lg mb-8 w-full">
                    Here you can see and modify your personal data
                  </h3>
                </div>
              </div>
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
                  password={user.credential.password}
                  handleRefresh={handleRefresh}
                />
              </div>
            </>
          ) : (
            userGoogle && (
              <>
                {" "}
                <div className="flex flex-row-reverse justify-between">
                  <div className="flex flex-col w-fit items-end relative">
                    <div
                      className="w-[120px] h-[120px] rounded-full bg-cover shadow-xl mr-4"
                      style={{
                        backgroundImage: googleImg
                          ? `url(${googleImg})`
                          : `url('https://via.placeholder.com/100')`,
                      }} // url predeterminada para perfiles sin foto
                    />
                  </div>
                  <div className="w-[60%]">
                    <h2 className="text-3xl font-bold mb-3">Personal Data </h2>
                    <h3 className="text-lg mb-1 w-full">
                      Here you can see and modify your personal data
                    </h3>
                    <h3 className="font-light text-[#009375]">
                      You are logged as google user
                    </h3>
                  </div>
                </div>
                <div className="flex justify-cente">
                  <PersonalData
                    name={userGoogle?.name}
                    email={userGoogle.credential.email}
                  />
                </div>
              </>
            )
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col p-4 px-6 bg-white border border-slate-300 rounded-lg min-h-[50dvh]">
          {bookings && (
            <UserBookings bookings={bookings} handleRefresh={handleRefresh} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboardView;
