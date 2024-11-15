'use client'
import React from 'react';
import Navbar from '../navBar/navBar';
import SearchBar from '../searchBar/searchBar';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {

  const pathname = usePathname()

  return (

  <div>
    {pathname == "/" ? (  <div
      className="h-[70vh] bg-cover bg-center text-white bg-[url('/assets/img1.jpg')]"
    >
  <div className='bg-gradient-to-b from-transparent to-[#009375] flex flex-col justify-between items-center w-full h-full'>
    <Navbar />

    <SearchBar />
  
      {
        pathname == "/" ? (<div className="relative z-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">WELCOME TO HOTELIFY!</h1>
          <p className="text-lg max-w-lg mx-auto">
            Discover exceptional comfort, curated just for you. Experience seamless service and unforgettable stays with us. Enjoy your journey!
          </p>
        </div>) : (null)
      }
    </div>
    </div>) : (  <div
      className="h-[20vh] bg-cover bg-center text-white bg-green-900"
    >
  <div className='bg-gradient-to-b from-transparent to-[#009375] flex flex-col justify-between items-center w-full h-full'>
    <Navbar />

    <SearchBar />
  
      {
        pathname == "/" ? (<div className="relative z-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">WELCOME TO HOTELIFY!</h1>
          <p className="text-lg max-w-lg mx-auto">
            Discover exceptional comfort, curated just for you. Experience seamless service and unforgettable stays with us. Enjoy your journey!
          </p>
        </div>) : (null)
      }
    </div>
    </div>)}
  </div>
    
  );
};

export default Header;
