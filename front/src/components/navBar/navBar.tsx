import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-transparent py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
       
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/HotelifyWhite.png"
                alt="Hotelify Logo"
                className="w-[100px] h-[40px] hover:filter hover:drop-shadow-[0_4px_3px_rgba(14, 148, 136, 1)] transition ease-in-out duration-300"
                width={100}
                height={40}
              />
            </Link>
          </div>

          <ul className="hidden md:flex gap-8">
            <li>
              <Link
                href="/hotels"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                About us
              </Link>
            </li>
          </ul>

          <ul className="flex gap-6">
            <li>
              <Link
                href="/login"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
