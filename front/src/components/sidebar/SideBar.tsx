import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Hotels", href: "/admin/hotels" },
    { name: "Logout", href: "/logout"  },
  ];

  return (
    <>
    <div className="bg-gray-800 text-white w-64 p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
        <li key={item.name}>
            <Link  
                href={item.href}
                key={index}
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer"
            >
                <span>{item.name}</span>
            </Link>
        </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
