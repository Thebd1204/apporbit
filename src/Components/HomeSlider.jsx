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
            Slider
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
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl group">
                <img
                  src="https://one.welhat.gov.uk/onewh/images/litter_picking.png"
                  alt="Enter to Win"
                  className="w-full h-full hover:bg-black/60 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl group">
                <img
                  src="https://news.uga.edu/wp-content/uploads/2024/09/GettyImages-1536775656.jpg"
                  alt="Enter to Win"
                  className="w-full h-full hover:bg-black/60 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl group">
                <img
                  src="https://taking.care/cdn/shop/articles/blog-hero-elderly-volunteering.jpg?v=1679567010"
                  alt="Enter to Win"
                  className="w-full h-full hover:bg-black/60 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl group">
                <img
                  src="https://www.accsv.org/wp-content/uploads/2023/10/ACC-Rides-at-Airport-2.jpg"
                  alt="Enter to Win"
                  className="w-full h-full hover:bg-black/60 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-black"
                />
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
