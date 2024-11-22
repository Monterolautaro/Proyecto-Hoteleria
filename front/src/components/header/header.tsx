"use client";
import React from "react";
import Navbar from "../navBar/navBar";
import SearchBar from "../searchBar/searchBar";
//import AdminDashboard from "../adminDashboard/adminDashboard"; 
import { usePathname } from "next/navigation";
import HotelCreationView from "@/view/HotelCreation/HotelCreationView";

const Header: React.FC = () => {
  const pathname = usePathname();

 if (pathname === "/admin" || pathname === "/admin/users" || pathname === "/admin/hotels") {

    return (
      <div>
      </div>
    );
  } 

  if (pathname === "/hotelcreation") {
  
    return (
      <div className="h-[80vh] bg-cover bg-center text-white bg-[#00352A]">
        <Navbar />
        <HotelCreationView />
      </div>
    );
  }

  if (pathname === "/") {
    
    return (
      <div className="h-[100vh] mb-[50px] bg-contain bg-center text-white bg-[url('/assets/Hotels.jpg')] ">
        <div className="bg-gradient-to-b from-[#111b] to-[#009375] flex flex-col justify-between items-center w-full h-full pb-[80px]">
          <Navbar />
          <SearchBar />
          <div className="text-center mb-8">
            <h1 className="text-[60px] font-semibold mb-4 w-[600px] m-auto leading-[70px]">
              WELCOME TO HOTELIFY!
            </h1>
            <p className="text-[24px] w-[800px] mx-auto text-pretty font-light">
              Discover exceptional comfort, curated just for you. Experience
              seamless service and unforgettable stays with us. Enjoy your
              journey!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[40vh] bg-cover bg-center text-white bg-[#00352A]">
      <div className="bg-gradient-to-b from-transparent to-[#009375] flex flex-col justify-between items-center w-full h-full">
        <Navbar />
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;