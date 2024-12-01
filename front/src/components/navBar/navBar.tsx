/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import NavbarButtons from "../NavbarButtons/NavbarButtons";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <header className="w-full bg-transparent py-4 animate-fadeIn">
      <div className="mx-auto max-w-7xl pl-3">
        <div className="flex items-center justify-between">
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

          <div className="flex-1 flex justify-center space-x-6">
            <Link href="/hotels" className={styles.bubbleLink}>
              Hotels
            </Link>
            <Link href="/about" className={styles.bubbleLink}>
              About Us
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <NavbarButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
