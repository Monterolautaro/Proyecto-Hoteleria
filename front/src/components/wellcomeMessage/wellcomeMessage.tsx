import React from 'react';
import Navbar from '../navBar/navBar';
import SearchBar from '../searchBar/searchBar';

const WelcomeMessage: React.FC = () => {
  return (

    <div

      style={{ backgroundImage: "url('/assets/img1.jpg')", opacity: "80%" }}
      className=" h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white px-4"
    >
    <Navbar />

    <SearchBar />
   <div className=" inset-0 bg-green-900 opacity-50"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold mb-4">WELCOME TO HOTELIFY!</h1>
        <p className="text-lg max-w-lg mx-auto">
          Discover exceptional comfort, curated just for you. Experience seamless service and unforgettable stays with us. Enjoy your journey!
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
