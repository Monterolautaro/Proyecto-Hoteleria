import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-teal-700 text-white p-4 flex justify-between items-center">
      <div>
        <Link href="/">
          <Image src="/assets/Hotelify.png" alt="Hotelify Logo" width={100} height={40} />
        </Link>
      </div>
      <ul className="flex gap-6">
        <li>
          <Link href="/hotels" className="hover:text-blue-400 transition-colors">Hotels</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-400 transition-colors">About us</Link>
        </li>
        <li>
          <Link href="/bookings" className="hover:text-blue-400 transition-colors">Bookings</Link>
        </li>
        <li>
          <Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link>
        </li>
        <li>
          <Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
