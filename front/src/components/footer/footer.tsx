import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#025746] text-white text-center py-6">
      <h2 className="text-2xl font-bold">HOTELIFY</h2>
      <div className="flex justify-center space-x-6 my-4">
        <button aria-label="Instagram" className="text-white hover:text-gray-300">
          <FaInstagram size={30} />
        </button>
        <button aria-label="Facebook" className="text-white hover:text-gray-300">
          <FaFacebook size={30} />
        </button>
        <button aria-label="Email" className="text-white hover:text-gray-300">
          <FaEnvelope size={30} />
        </button>
      </div>
      <p className="text-sm">© Copyright 2024 HOTELIFY</p>
    </footer>
  );
};

export default Footer;

