import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HomeSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="py-8 md:py-12 lg:py-16" data-aos="zoom-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-blue-700 text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 hover:scale-105 transition-all duration-800">
          Powering Your Digital Growth
        </h2>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="rounded-lg overflow-hidden"
        >
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center bg-[#f6f8fa] group">
              <div className="w-full md:w-1/2 p-6 md:p-12 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Launch your app with a reliable partner
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
                  The best and easiest way to get your business up and running.
                  Save money and time!
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="https://i.ibb.co/b5f8kY6S/add-products.png"
                  alt="Enter to Win"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center bg-[#f6f8fa] group">
              <div className="w-full md:w-1/2 p-6 md:p-12 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Discover the Hottest Tools Today
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
                  Stay ahead with trending apps, AI tools, and software loved by
                  the community.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="https://i.ibb.co/7JWj5nXB/trending-products.png"
                  alt="Enter to Win"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center bg-[#f6f8fa] group">
              <div className="w-full md:w-1/2 p-6 md:p-12 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Your experience, our priority.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
                  We listen, we improve — thanks to your feedback.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src="https://i.ibb.co/Gv7Xqyc2/review.png"
                  alt="Enter to Win"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="flex justify-end mt-4">
          <div ref={progressCircle} className="progress-circle">
            <span ref={progressContent} className="progress-text text-black">
              0s
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 my-8 md:my-12"></div>
    </div>
  );
};

export default HomeSlider;

