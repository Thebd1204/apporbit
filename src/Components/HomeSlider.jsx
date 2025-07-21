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
    <>
      <div className="md:w-11/12 mx-auto" data-aos="zoom-in-up">
        <div className="reviews-carousel">
          <h2 className="text-blue-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-6 hover:scale-110 transition-all duration-800">
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
          >
            <SwiperSlide>
              <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full h-auto md:h-[500px] lg:h-[600px] bg-[#f6f8fa] overflow-hidden rounded-xl group px-4 py-6">
                <div className="flex-1 text-center md:text-left pt-6 md:pt-0 px-2 sm:px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-snug w-full">
                    Launch your app with a reliable partner
                  </h1>
                  <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
                    The best and easiest way to get your business up and
                    running. Save money and time!
                  </p>
                </div>

                <div className="flex-1 mb-6 md:mb-0">
                  <img
                    src="https://i.ibb.co/b5f8kY6S/add-products.png"
                    alt="Enter to Win"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full h-auto md:h-[500px] lg:h-[600px] bg-[#f6f8fa] overflow-hidden rounded-xl group px-4 py-6">
                <div className="flex-1 text-center md:text-left pt-6 md:pt-0 px-2 sm:px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-snug w-full">
                    Discover the Hottest Tools Today
                  </h1>
                  <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
                    Stay ahead with trending apps, AI tools, and software loved
                    by the community.
                  </p>
                </div>

                <div className="flex-1 mb-6 md:mb-0">
                  <img
                    src="https://i.ibb.co/7JWj5nXB/trending-products.png"
                    alt="Enter to Win"
                    className="h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full h-auto md:h-[500px] lg:h-[600px] bg-[#f6f8fa] overflow-hidden rounded-xl group px-4 py-6">
                <div className="flex-1 text-center md:text-left pt-6 md:pt-0 px-2 sm:px-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-snug w-full">
                    Your experience, our priority.
                  </h1>
                  <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed w-full">
                    We listen, we improve — thanks to your feedback.
                  </p>
                </div>

                <div className="flex-1 mb-6 md:mb-0">
                  <img
                    src="https://i.ibb.co/Gv7Xqyc2/review.png"
                    alt="Enter to Win"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="w-11/12 flex justify-end">
            <div ref={progressCircle} className="progress-circle">
              <span ref={progressContent} className="progress-text text-black">
                0s
              </span>
            </div>
          </div>
        </div>
        <div className="border border-dashed border-gray-300 my-6"></div>
      </div>
    </>
  );
};

export default HomeSlider;
