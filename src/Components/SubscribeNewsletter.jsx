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
    <div
      data-aos="fade-up"
      className="max-w-3xl mx-auto px-8 py-15 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
        Subscribe to our Newsletter
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name Field */}
        <div className="relative mb-4">
          <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
            className={`pl-10 pr-4 py-3 w-full rounded-md border focus:outline-none transition 
              ${
                errors.name
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              }`}
          />
        </div>
        {errors.name && (
          <p className="text-red-600 text-sm mb-4">{errors.name.message}</p>
        )}

        {/* Email Field */}
        <div className="relative mb-4">
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
            className={`pl-10 pr-4 py-3 w-full rounded-md border focus:outline-none transition 
              ${
                errors.email
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm mb-4">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribeNewsletter;
