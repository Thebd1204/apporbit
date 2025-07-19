import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../../Components/LoadingSpinners";
import { formatDistanceToNow } from "date-fns";

const ProductReview = () => {
  const { loginUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);

  const { id } = useParams();



  const handleRating = (rate) => {
    setRating(rate);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (rating === 0) {
      Swal.fire({
        title: "Please select a star rating. ",
        icon: "warning",
      });
      return;
    }
    const review = {
      productId: id,
      ...data,
      rating,
      timestamp: new Date(),
    };

    const res = await axiosSecure.post("/product-review", review);
    if (res.data?.insertedId || res.data?.acknowledged) {
      Swal.fire({
        icon: "success",
        title: "Thank you for your review!",
        text: "Your feedback has been submitted successfully.",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        iconColor: "#22c55e",
      });

      await refetch();
      reset();
      setRating(0);
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const {
    data: productReview = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product-review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product-review/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  console.log(productReview);

  return (
    <>
      <div className="flex flex-col p-8 my-10 rounded-xl lg:p-12 border border-gray-300">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-3xl font-semibold text-center">
                Your opinion matters!
              </h2>
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-center">How was your experience?</span>

                <div className="flex flex-row">
                  <Rating
                    onClick={handleRating}
                    SVGstyle={{ display: "inline-block" }}
                    initialValue={rating}
                    allowHover={true}
                  />
                </div>
              </div>

              <div data-aos="fade-up">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  {...register("reviewerName")}
                  defaultValue={loginUser?.displayName}
                  readOnly
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>

              <div data-aos="fade-up">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Reviewer Image
                </label>
                <input
                  type="text"
                  {...register("reviewerImage")}
                  defaultValue={loginUser?.photoURL}
                  readOnly
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>

              <div data-aos="fade-up">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Review Description
                </label>
                <textarea
                  rows="5"
                  {...register("review", {
                    required: "Review Description is required",
                  })}
                  placeholder="Message..."
                  className={`p-4 rounded-md resize-none text-gray-800 bg-gray-50 w-full border ${
                    errors.review ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                ></textarea>
                {errors.review && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.review.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer py-4 my-8 font-semibold rounded-md dark:text-green-200 dark:bg-blue-700 animate-pulse hover:shadow-xl"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        <div className="">
          {productReview.map((review, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-gray-100 hover:shadow-xl rounded-2xl my-4"
            >
              <div className="container flex flex-col w-full mx-auto divide-y divide-dashed divide-gray-400 rounded-md px-4">
                <div className="flex justify-between py-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src={review?.reviewerImage}
                        alt=""
                        className="object-cover w-12 h-12 rounded-full border"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{review?.reviewerName}</h4>
                      <span className="text-gray-500 text-sm">
                        {formatDistanceToNow(new Date(review.timestamp), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <Rating
                      initialValue={review.rating}
                      readonly
                      size={30}
                      SVGstyle={{ display: "inline-block" }}
                    />
                    <span className="text-xl font-bold">{review.rating}</span>
                  </div>
                </div>
                <div className="py-4 space-y-2 text-sm ">
                  <p>{review.review}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="">
            {productReview.length === 0 && (
              <p className="text-center text-gray-500 py-10 text-lg">
                No reviews yet. Be the first to share your experience!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
