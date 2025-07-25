import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import LoadingSpinners from "./LoadingSpinners";
import Marquee from "react-fast-marquee";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ReviewData = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: reviewData = [], isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(
        "https://app-orbit-server-gamma.vercel.app/product-review"
      );
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  return (
    <div className="my-12 py-4" data-aos="fade-up">
      <h1 className="text-blue-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:scale-110 transition-all duration-800">
        What Our Users Say
      </h1>

      <div className="">
        <Marquee
          pauseOnHover
          speed={50}
          gradient={true}
          gradientColor={[255, 255, 255]}
          gradientWidth={100}
          direction="left"
          className="mt-12"
        >
          {reviewData.map((review) => (
            <div
              key={review._id}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-6 mx-6 w-80 flex-shrink-0"
              data-aos="fade-up"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {review.reviewerName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p className="relative text-gray-700 text-sm leading-relaxed italic mb-4 pl-6">
                <span className="absolute left-0 top-0 text-2xl text-gray-300 leading-none">
                  “
                </span>
                {review.review}
              </p>

              {/* Rating Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <span key={i} className="text-gray-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="">
        <Marquee
          pauseOnHover
          speed={50}
          gradient={true}
          gradientColor={[255, 255, 255]}
          gradientWidth={100}
          direction="right"
          className="mt-12"
        >
          {reviewData.map((review) => (
            <div
              key={review._id}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-6 mx-6 w-80 flex-shrink-0"
              data-aos="fade-up"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {review.reviewerName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p className="relative text-gray-700 text-sm leading-relaxed italic mb-4 pl-6">
                <span className="absolute left-0 top-0 text-2xl text-gray-300 leading-none">
                  “
                </span>
                {review.review}
              </p>

              {/* Rating Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - review.rating }, (_, i) => (
                  <span key={i} className="text-gray-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ReviewData;
