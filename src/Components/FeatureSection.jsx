import React from "react";

const FeatureSection = ({ title, description, image, reverse }) => {
  return (
    <section className={`py-12 md:py-20 lg:py-24 ${reverse ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={image}
              alt={title}
              className="rounded-lg shadow-lg w-full max-w-md md:max-w-none h-auto object-cover transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;