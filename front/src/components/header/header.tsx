"use client";
import React from "react";
import Navbar from "../navBar/navBar";
import SearchBar from "../searchBar/searchBar";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <div>
      {pathname == "/" ? (
        <div className="h-[90vh] bg-contain bg-center text-white bg-[url('/assets/Hotels.jpg')] ">
          <div className="bg-gradient-to-b from-[#111b] to-[#009375] flex flex-col justify-between items-center w-full h-full pb-7">
            <Navbar />
            <SearchBar />

            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-extrabold mb-4">
                WELCOME TO HOTELIFY!
              </h1>
              <p className="text-lg max-w-lg mx-auto">
                Discover exceptional comfort, curated just for you. Experience
                seamless service and unforgettable stays with us. Enjoy your
                journey!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#002019] to-[#005f4c] flex flex-col justify-between items-center w-full h-full">
          <Navbar />
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Header;
