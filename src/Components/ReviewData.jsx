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
    <div className="my-12">
      <h1 className="text-blue-700 text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:scale-110 transition-all duration-800">
        What Our Users Say
      </h1>
      <Marquee pauseOnHover speed={50}>
        {reviewData.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-lg border mt-8 border-gray-300 rounded-lg p-4 mx-4 w-80 flex-shrink-0"
            data-aos="fade-up"
          >
            <div className="flex items-center space-x-4 mb-3">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <div>
                <h4 className="font-semibold">{review.reviewerName}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(review.timestamp).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">"{review.review}"</p>
            <div className="text-yellow-500 text-sm">
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: 5 - review.rating }, (_, i) => (
                <span key={i}>☆</span>
              ))}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewData;
