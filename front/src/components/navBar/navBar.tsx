/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import NavbarButtons from "../NavbarButtons";

const Navbar = () => {
  return (
    <header className="w-full bg-transparent py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" scroll={false}>
              <img
                src="/assets/HotelifyWhite.png"
                alt="Hotelify Logo"
                className="w-[100px] h-[40px] hover:filter hover:drop-shadow-[0_4px_3px_rgba(14, 148, 136, 1)] transition ease-in-out duration-300"
                width={100}
                height={40}
              />
            </Link>
          </div>

          {/* Center Links */}
          <div className="flex-1 flex justify-center space-x-6">
            <Link
              href="/hotels"
              className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
            >
              Hotels
            </Link>
            <Link
              href="/about"
              className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
            >
              About Us
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-3">
            <NavbarButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
