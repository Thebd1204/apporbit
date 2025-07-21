import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import CouponCard from "../../../Components/CouponCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../../../Components/LoadingSpinners";
const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Manage Coupons";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: couponData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupon"],
    queryFn: async () => {
      const res = await axiosSecure("/coupon");
      return res?.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/coupon", data);

      if (res?.data?.acknowledged && res?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Coupon Added!",
          text: `Coupon "${data.couponCode}" was successfully created.`,
          confirmButtonColor: "#3085d6",
          timer: 1500,
        });
        refetch();
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Coupon",
          text: "Something went wrong while saving the coupon.",
          confirmButtonColor: "#d33",
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Add Coupon Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not connect to the server. Please try again later.",
        timer: 1500,
      });
    }
  };

  const handleCouponChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/\s/g, "");
    setValue("couponCode", value);
  };

  if (isLoading) return <LoadingSpinners />;

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-4 space-y-10"
      data-aos="fade-left"
    >
      <div className="">
        <CouponCard
          refetch={refetch}
          couponData={couponData}
          isLoading={isLoading}
        />
      </div>

      {/* Add Coupon Form Section */}
      <section className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center  text-blue-700 mb-8">
          Add Coupon
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Coupon Code
            </label>
            <input
              type="text"
              maxLength={6}
              {...register("couponCode", {
                required: "Coupon code is required",
                pattern: {
                  value: /^[A-Z0-9]{6}$/,
                  message: "Must be exactly 6 uppercase letters or numbers",
                },
              })}
              onChange={handleCouponChange}
              placeholder="e.g. SAVE20"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.couponCode && (
              <p className="text-red-600 text-xs mt-1">
                {errors.couponCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Discount Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="numeric"
              {...register("discount", {
                required: "Discount is required",
                min: { value: 0.01, message: "Minimum $0.01" },
                max: { value: 10000, message: "Cannot exceed $10,000" },
                valueAsNumber: true,
              })}
              placeholder="e.g. 20"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.discount && (
              <p className="text-red-600 text-xs mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expiryDate", {
                required: "Expiry date is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate > today || "Expiry date must be in the future"
                  );
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.expiryDate && (
              <p className="text-red-600 text-xs mt-1">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed",
                },
              })}
              rows="4"
              placeholder="Brief description of the coupon..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition"
            >
              Add Coupon
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ManageCoupons;
