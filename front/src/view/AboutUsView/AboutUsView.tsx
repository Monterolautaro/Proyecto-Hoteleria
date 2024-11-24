import React from 'react'

const AboutUsView = () => {
  return (

    <div className="bg-gray-50 py-10 px-6 sm:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-4">
          Discover who we are, our mission, vision, values, and what our clients
          say about us.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed">
          We are a team of dedicated professionals passionate about driving
          innovation and providing exceptional services to our customers. Our
          journey started with a mission to make a positive impact in the
          industry and create value for our stakeholders.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          To empower individuals and organizations by delivering innovative
          solutions that drive growth, efficiency, and success.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h2>
        <p className="text-gray-600 leading-relaxed">
          To be a global leader recognized for transforming challenges into
          opportunities and making a meaningful impact on society.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Values</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Integrity: We uphold the highest standards of honesty and ethics.</li>
          <li>Innovation: We embrace creativity and strive for continuous improvement.</li>
          <li>Customer Focus: We prioritize the needs and satisfaction of our clients.</li>
          <li>Collaboration: We believe in the power of teamwork and shared success.</li>
          <li>Sustainability: We are committed to building a better future for all.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic mb-4">
              "An outstanding experience! Their team truly understands customer
              needs and delivers beyond expectations."
            </p>
            <p className="text-gray-800 font-bold">- Alex Johnson</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic mb-4">
              "Exceptional service and innovative solutions. Highly recommend!"
            </p>
            <p className="text-gray-800 font-bold">- Emily Carter</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic mb-4">
              "Their commitment to excellence is unmatched. I am thrilled with
              the results."
            </p>
            <p className="text-gray-800 font-bold">- Michael Smith</p>
          </div>
        </div>
      </section>
    </div>


  
  )
}

export default AboutUsView
