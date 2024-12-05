import React from 'react';

const AboutUsView = () => {
  return (
    <div className="bg-[#F3FFFC] py-10 px-6 sm:px-12 lg:px-20 w-[80%] mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">About Us</h1>
        <p className="text-black mt-4">
          Discover who we are, our mission, vision, values, and what our clients say about us.
        </p>
      </div>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-black mb-4 text-center">Who We Are</h2>
        <p className="text-black leading-relaxed max-w-3xl mx-auto">
          We are a team of dedicated professionals passionate about driving innovation and providing exceptional services to our customers. Our journey started with a mission to make a positive impact in the industry and create value for our stakeholders.
        </p>
      </section>

      <section className="mb-12 space-y-12">
  <div className="flex flex-col md:flex-row items-center text-center md:text-left">
    <div className="md:w-1/2 flex justify-center">
      <img
        src="/assets/palladiumhotelibiza.jpg"
        alt="Mission"
        className="w-66 h-64 object-cover rounded-full shadow-lg"
      />
    </div>
    <div className="md:w-1/2 flex flex-col justify-center">
      <h2 className="text-3xl font-semibold text-black mb-4 text-center">Our Mission</h2>
      <p className="text-black leading-relaxed text-center">
      To empower travelers and hospitality providers by delivering innovative, seamless, and user-friendly solutions for hotel reservations. Hotelify is dedicated to driving growth, efficiency, and unforgettable experiences by connecting users to tailored accommodations while optimizing the booking process for businesses. We aim to redefine convenience, build trust, and inspire travel through technology-driven solutions that enhance every step of the journey.
      </p>
    </div>
  </div>

  <div className="flex flex-col md:flex-row items-center text-center md:text-left">
    <div className="md:w-1/2 flex flex-col justify-center">
      <h2 className="text-3xl font-semibold text-black mb-4 text-center">Our Vision</h2>
      <p className="text-black leading-relaxed text-center">
      To be a global leader recognized for revolutionizing the hospitality industry by transforming booking challenges into opportunities, fostering seamless travel experiences, and making a meaningful impact on society. Hotelify aspires to set the standard in innovation, trust, and sustainability, creating a world where every traveler’s journey is effortless and every hotel thrives in a digitally connected ecosystem.
      </p>
    </div>
    <div className="md:w-1/2 flex justify-center">
      <img
        src="/assets/palmas.webp"
        alt="Vision"
        className="w-66 h-64 object-cover rounded-full shadow-lg"
      />
    </div>
  </div>
</section>

<br></br>

<section className="mb-12 text-center">
  <h2 className="text-3xl font-semibold text-black mb-4">Our Values</h2>
  <div className="flex flex-wrap justify-center gap-6 mt-4">
    <span className="bg-[#D0F6E9] px-6 py-3 rounded-xl text-black font-semibold shadow-lg   hover:bg-[#009375] hover:text-white transition-all duration-300">
      Integrity
    </span>
    <span className="bg-[#D0F6E9] px-6 py-3 rounded-xl text-black font-semibold shadow-lg  hover:bg-[#009375] hover:text-white transition-all duration-300">
      Customer Focus
    </span>
    <span className="bg-[#D0F6E9] px-6 py-3 rounded-xl text-black font-semibold shadow-lg  hover:bg-[#009375] hover:text-white transition-all duration-300">
      Collaboration
    </span>
    <span className="bg-[#D0F6E9] px-6 py-3 rounded-xl text-black font-semibold shadow-lg  hover:bg-[#009375] hover:text-white transition-all duration-300">
      Sustainability
    </span>
  </div>
</section>


      <br></br>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-black mb-8 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-black italic mb-4">
              "An outstanding experience! Their team truly understands customer needs and delivers beyond expectations."
            </p>
            <p className="text-[#00352A] font-bold">- Alex Johnson</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-black italic mb-4">
              "Exceptional service and innovative solutions. Highly recommend!"
            </p>
            <br></br>
            <p className="text-black font-bold">- Emily Carter</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-black italic mb-4">
              "Their commitment to excellence is unmatched. I am thrilled with the results."
            </p>
            <br></br>
            <p className="text-black font-bold">- Michael Smith</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsView;

