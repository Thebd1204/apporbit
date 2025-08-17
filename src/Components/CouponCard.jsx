import React from "react";
import LoadingSpinners from "./LoadingSpinners";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

const CouponCard = ({ couponData, refetch, isLoading }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupon/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "The coupon has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Try again.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinners />;

  return (
    <div>
      {couponData.length > 0 && (
        <section className="w-full mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
            Existing Coupons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {couponData.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-blue-300"
              >
                <div>
                  <h4 className="text-xl font-bold text-purple-700 uppercase mb-3 tracking-wider">
                    {coupon.couponCode}
                  </h4>
                  <p className="text-gray-700 text-base mb-2">
                    <span className="font-semibold">Discount:</span>{" "}
                    {coupon.discount}%
                  </p>
                  <p className="text-gray-700 text-base mb-3">
                    <span className="font-semibold">Expires:</span>{" "}
                    {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {coupon.description}
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
                  <Link
                    to={`/dashboard/manage-coupons/coupon-update/${coupon._id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <FaEdit /> <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CouponCard;
