"use client";

import { useState } from "react";
import UsersList from "@/components/AdminDashboard/UsersList";
import HotelList from "@/components/AdminDashboard/HotelList";

const AdminDashboardView: React.FC = () => {
  const [view, setView] = useState("users");

  const handleClick = (value: string): void => {
    setView(value);
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#d0f6e9] to-[#F3FFFC]">
      <div className="flex flex-col w-[20%] h-full bg-white shadow-lg border-r border-gray-300">
        <h2 className="text-xl font-bold text-center py-6 border-b border-gray-200">
          Admin Panel
        </h2>
        <button
          className={`text-left px-6 py-4 border-b border-gray-200 hover:bg-gray-100 ${
            view === "users" ? "bg-gray-100 text-[#009375]" : "text-gray-600"
          }`}
          onClick={() => handleClick("users")}
        >
          Users
        </button>
        <button
          className={`text-left px-6 py-4 hover:bg-gray-100 ${
            view === "hotels" ? "bg-gray-100 text-[#009375]" : "text-gray-600"
          }`}
          onClick={() => handleClick("hotels")}
        >
          Hotels
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {view === "users" ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <UsersList />
          </div>
        ) : view === "hotels" ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <HotelList />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboardView;
