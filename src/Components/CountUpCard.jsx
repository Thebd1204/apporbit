import React from "react";
import CountUp from "react-countup";
import { IoMdHeart } from "react-icons/io";
import { FaBoxOpen, FaUserEdit, FaUserFriends } from "react-icons/fa";

const CountUpCard = () => {
  return (
    <>
      <div className="w-full lg:w-11/12 mx-auto my-12">
        <h1 className="text-blue-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:scale-110 transition-all duration-800">
          Building the Future of Tech Discovery
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-11/12 md:w-full lg:w-full mx-auto">
          <CountUp
            start={0}
            end={110}
            delay={1}
            duration={10}
            scrollSpyDelay={100}
            enableScrollSpy={true}
          >
            {({ countUpRef }) => (
              <div
                className="bg-gradient-to-br from-white/80 to-blue-50 
       
              backdrop-blur-md  border border-gray-100  shadow-md hover:shadow-xl
              px-8 py-10 rounded-3xl hover:scale-105 hover:border-blue-500 transition-all duration-700 cursor-pointer"
              >
                <img className="mb-3" />
                <span
                  ref={countUpRef}
                  className="text-4xl md:text-5xl font-extrabold text-blue-700"
                ></span>
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  +
                </span>
                <div className="text-[#0F0F0F] opacity-60 lg:text-xl font-medium mt-3">
                  <div className="mb-6 mt-6 w-16 h-16 rounded-full bg-blue-100  flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-500">
                    <FaBoxOpen
                      className="text-blue-600 group-hover:text-blue-700"
                      size={32}
                    />
                  </div>
                  <div className="text-gray-700  text-lg md:text-xl font-semibold leading-snug">
                    Products
                  </div>
                </div>
              </div>
            )}
          </CountUp>

          <CountUp
            start={1}
            end={225}
            delay={1}
            duration={10}
            scrollSpyDelay={100}
            enableScrollSpy={true}
          >
            {({ countUpRef }) => (
              <div
                className="bg-gradient-to-br from-white/80 to-blue-50
            
              backdrop-blur-md border border-gray-100  shadow-md hover:shadow-xl
              px-8 py-10 rounded-3xl hover:scale-105 hover:border-blue-500 transition-all duration-700 cursor-pointer"
              >
                <img className="mb-3" />
                <span
                  ref={countUpRef}
                  className="text-4xl md:text-5xl font-extrabold text-blue-700"
                ></span>
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  +
                </span>
                <div className="text-[#0F0F0F] opacity-60 lg:text-xl font-medium">
                  <div className="mb-6 mt-6 w-16 h-16 rounded-full bg-blue-100  flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-500">
                    <IoMdHeart
                      className="text-blue-600 group-hover:text-blue-700"
                      size={32}
                    />
                  </div>
                  <div className="text-gray-700  text-lg md:text-xl font-semibold leading-snug">
                   Votes
                  </div>
                </div>
              </div>
            )}
          </CountUp>

          <CountUp
            start={0}
            end={320}
            delay={1}
            duration={10}
            scrollSpyDelay={100}
            enableScrollSpy={true}
          >
            {({ countUpRef }) => (
              <div
                className="bg-gradient-to-br from-white/80 to-blue-50
             
              backdrop-blur-md border border-gray-100 shadow-md hover:shadow-xl
              px-8 py-10 rounded-3xl hover:scale-105 hover:border-blue-500 transition-all duration-700 cursor-pointer"
              >
                <img className="mb-3" />
                <span
                  ref={countUpRef}
                  className="text-4xl md:text-5xl font-extrabold text-blue-700"
                ></span>
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  +
                </span>
                <div className="text-[#0F0F0F] opacity-60 lg:text-xl font-medium mt-3">
                  <div className="mb-6 mt-6 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-500">
                    <FaUserFriends
                      className="text-blue-600 group-hover:text-blue-700"
                      size={32}
                    />
                  </div>
                  <div className="text-gray-700  text-lg md:text-xl font-semibold leading-snug">
                    Users 
                  </div>
                </div>
              </div>
            )}
          </CountUp>

          <CountUp
            start={0}
            end={20}
            delay={1}
            duration={10}
            scrollSpyDelay={100}
            enableScrollSpy={true}
          >
            {({ countUpRef }) => (
              <div
                className="bg-gradient-to-br from-white/80 to-blue-50
             
              backdrop-blur-md border border-gray-100  shadow-md hover:shadow-xl
              px-8 py-10 rounded-3xl hover:scale-105 hover:border-blue-500 transition-all duration-700 cursor-pointer"
              >
                <img className="mb-3" />
                <span
                  ref={countUpRef}
                  className="text-4xl md:text-5xl font-extrabold text-blue-700"
                ></span>
                <span className="text-4xl md:text-5xl font-extrabold text-blue-700">
                  +
                </span>
                <div className="text-[#0F0F0F] opacity-60 lg:text-xl font-medium mt-3">
                  <div className="mb-6 mt-6 w-16 h-16 rounded-full bg-blue-100  flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-500">
                    <FaUserEdit
                      className="text-blue-600 group-hover:text-blue-700"
                      size={32}
                    />
                  </div>
                  <p className="text-gray-700  text-lg md:text-xl font-semibold leading-snug">
                   Creators
                  </p>
                </div>
              </div>
            )}
          </CountUp>
        </div>
      </div>
    </>
  );
};

export default CountUpCard;
