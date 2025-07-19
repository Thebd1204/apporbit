import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../Components/LoadingSpinners";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCopy, FaTags, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const CouponSlider = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const { data: couponData = [], isLoading } = useQuery({
    queryKey: ["coupon"],
    queryFn: async () => {
      const res = await axios.get(
        "https://app-orbit-server-gamma.vercel.app/coupon"
      );
      return res?.data;
    },
  });

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  if (isLoading) return <LoadingSpinners />;

  return (
    <div data-aos="fade-up" className="my-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-blue-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:scale-110 transition-all duration-800">
        Exclusive Coupon Deals
      </h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {couponData.map((coupon) => (
          <SwiperSlide key={coupon._id}>
            <div
              className="bg-gradient-to-br mt-8 from-white via-blue-50 to-white border border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition relative"
              data-aos="zoom-in"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-blue-700">
                  {coupon.couponCode}
                </h3>
                <button
                  onClick={() => handleCopy(coupon.couponCode)}
                  className="text-blue-700 hover:text-blue-900 transition"
                  title="Copy coupon code"
                >
                  <FaCopy size={18} />
                </button>
              </div>

              {copiedCode === coupon.couponCode && (
                <span className="absolute top-2 right-2 text-green-600 text-sm">
                  Copied!
                </span>
              )}

              <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                <FaTags className="text-blue-600" />
                <span className="font-medium">
                  Discount:{" "}
                  <span className="font-bold">{coupon.discount}%</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 text-sm mb-2">
                <FaCalendarAlt className="text-blue-600" />
                <span className="font-medium">
                  Expires:{" "}
                  {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3">{coupon.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CouponSlider;
