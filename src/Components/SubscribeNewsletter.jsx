import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import Swal from "sweetalert2";
import axios from "axios";

const SubscribeNewsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://app-orbit-server-gamma.vercel.app/subscribenewsletter",
        data
      );

      if (res?.data?.acknowledged && res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Subscription Successful!",
          text: `Thanks, ${data.name}! You're now subscribed and will get our latest updates soon.`,
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Subscription Failed",
          text: "Something went wrong while saving your subscription. Please try again.",
          confirmButtonColor: "#d33",
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not connect to the server. Please try again later.",
        timer: 1500,
      });
    }
  };

  return (
    <div className="py-12 md:py-16 lg:py-20" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Subscribe to our Newsletter
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-6">
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`pl-12 pr-4 py-3 w-full rounded-lg border focus:outline-none transition-colors duration-300 ${
                    errors.name
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`pl-12 pr-4 py-3 w-full rounded-lg border focus:outline-none transition-colors duration-300 ${
                    errors.email
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;

