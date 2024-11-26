import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Hotels", href: "/hotelcreation" },
    { name: "Logout", href: "/logout"  },
  ];

  return (
    <>
    <div className="bg-[#009375] text-white w-64 p-6 flex flex-col">
      
      <Link href="/" className="flex items-center mb-8" scroll={false}>
              <Image
                src="/assets/HotelifyWhite.png"
                alt="Hotelify Logo"
                className="w-[100px] h-[40px] hover:filter hover:drop-shadow-[0_4px_3px_rgba(14, 148, 136, 1)] transition ease-in-out duration-300"
                width={100}
                height={40}
              />
            </Link>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
        <li key={item.name}>
            <Link  
                href={item.href}
                key={index}
                className="flex items-center space-x-3 hover:bg-[#00352A] p-2 rounded-md cursor-pointer"
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
