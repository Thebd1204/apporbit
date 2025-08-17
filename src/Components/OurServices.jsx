import React from "react";
import { FaShieldAlt, FaHeadset, FaComments, FaSearch } from "react-icons/fa";

const OurServices = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12 animate-fade-in-up">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Service 1: Secure Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <FaShieldAlt className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Secure Payment Method</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Enjoy peace of mind with our encrypted and secure payment gateway, ensuring your transactions are always safe.
            </p>
          </div>

          {/* Service 2: 24/7 Customer Support */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <FaHeadset className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">24/7 Customer Support</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our dedicated support team is available around the clock to assist you with any queries or issues.
            </p>
          </div>

          {/* Service 3: Quick Messaging */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <FaComments className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Quick Messaging</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Communicate seamlessly with other users and developers through our integrated quick messaging system.
            </p>
          </div>

          {/* Service 4: Advanced Search Options */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <FaSearch className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Advanced Search Options</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Find exactly what you're looking for with powerful and flexible search filters and criteria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;