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
      {/* Coupon Cards Section */}
      {couponData.length > 0 && (
        <section className="w-full mx-auto px-4 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
            Existing Coupons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {couponData.map((coupon, idx) => (
              <div
                key={coupon._id || idx}
                className=" bg-white border border-gray-200 rounded-xl shadow-md px-10 py-8 min-h-[250px] w-full flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <h4 className="text-xl font-bold text-purple-700 uppercase mb-2 tracking-wide">
                    {coupon.couponCode}
                  </h4>
                  <p className="text-gray-800 text-sm mb-1">
                    <span className="font-semibold">Discount:</span>{" "}
                    {coupon.discount}%
                  </p>
                  <p className="text-gray-800 text-sm mb-2">
                    <span className="font-semibold">Expires:</span>{" "}
                    {new Date(coupon.expiryDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 text-sm">{coupon.description}</p>
                </div>

                <div className="flex justify-center gap-4 mt-5">
                  <Link
                    to={`/dashboard/manage-coupons/coupon-update/${coupon._id}`}
                  >
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium transition"
                  >
                    <FaTrash /> Delete
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
