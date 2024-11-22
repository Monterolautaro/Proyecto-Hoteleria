import React from 'react'

const HotelCreationView = () => {
  return (
    <div className=" text-white flex justify-center items-center px-6">
      <div className="grid grid-cols-2 gap-8 items-center w-full max-w-5xl">

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-[#00B894]">Hotel</span> Registration
          </h1>
          <p className="text-lg text-gray-300">
            Please fill out the form below to register a new hotel. Provide accurate details to ensure everything is set up correctly.
          </p>
        </div>

        <div className="bg-[#004D40] p-6 rounded-lg shadow-lg my-10">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <form className="space-y-5">

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="Hotel Marriott"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="Argentina"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                  placeholder="Buenos Aires"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 rounded bg-[#00352A] text-white border border-[#00B894] focus:outline-none focus:ring-2 focus:ring-[#00B894]"
                placeholder="Av Olivos"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#00B894] text-white px-4 py-2 rounded shadow hover:bg-[#009375] focus:outline-none"
              >
                Next →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HotelCreationView
