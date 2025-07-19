import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "./LoadingSpinners";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CouponUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: coupon = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupon", id],
    queryFn: async () => {
      const res = await axiosSecure(`/coupon/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const onSubmit = async (data) => {
    console.log("Updating Coupon:", data);

    try {
      const res = await axiosSecure.put(`/coupon/${id}`, data);
      console.log(res.data);

      if (res?.data?.modifiedCount > 0) {
        navigate("/dashboard/manage-coupons");
        Swal.fire({
          icon: "success",
          title: "Coupon Updated!",
          text: `Coupon "${data.couponCode}" was successfully updated.`,
          confirmButtonColor: "#3085d6",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
        reset();
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: `Coupon "${data.couponCode}" was not modified.`,
          confirmButtonColor: "#999",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Update Coupon Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          "Server error. Please try again later.",
        confirmButtonColor: "#d33",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleCouponChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/\s/g, "");
    setValue("couponCode", value);
  };

  const { couponCode, description, discount, expiryDate } = coupon;

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-4 space-y-10"
      data-aos="fade-left"
    >
      <section className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-center  text-blue-700 mb-8">
          Update Coupon Data
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Coupon Code
            </label>
            <input
              type="text"
              defaultValue={couponCode}
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
              defaultValue={discount}
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
              defaultValue={expiryDate}
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
              defaultValue={description}
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
              Update Coupon
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CouponUpdate;
