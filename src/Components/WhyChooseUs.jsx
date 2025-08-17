import React from "react";
import { FaUsers, FaStar, FaCodeBranch } from "react-icons/fa"; // Importing icons

const WhyChooseUs = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-10 md:mb-12 animate-fade-in-up">
          Why Choose <span className="text-indigo-600">AppOrbit</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center animate-fade-in-left">
            <FaUsers className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Vibrant Community</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Join a thriving community of app enthusiasts, developers, and tech innovators. Share insights, get feedback, and collaborate on exciting projects. Your voice matters here!
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center animate-fade-in-up-delay">
            <FaStar className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Curated Excellence</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We meticulously curate our app listings to ensure you discover only the highest quality and most innovative applications. Say goodbye to endless searching and hello to exceptional digital experiences.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center animate-fade-in-right">
            <FaCodeBranch className="text-indigo-500 text-4xl sm:text-5xl mb-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Developer-Centric Platform</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Developers, showcase your creations to a targeted and engaged audience. Receive valuable feedback, gain visibility, and connect with potential users and collaborators effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
