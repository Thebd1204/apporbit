import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import LoadingSpinners from "./../../../Components/LoadingSpinners";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ReviewQueue = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Review Queue";
  }, []);

  const {
    data: pendingProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-product"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-products");
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const handleActions = async (productId, actions) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${actions.toLowerCase()} this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/product-status-update/${productId}`,
          {
            status: actions,
          }
        );
        if (res?.data?.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `Product ${actions.toLowerCase()} successfully.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          refetch();
        }
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div
      className="overflow-x-auto mt-10 px-2 md:px-4 lg:px-6"
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <div className="w-full inline-block shadow-lg rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm md:text-[14px] text-gray-700 text-center border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase tracking-wider">
            <tr>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">No</th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Product Name
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">View</th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Featured
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Accept
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Reject
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pendingProduct.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-3 lg:px-6 lg:py-4">{index + 1}</td>
                <td className="px-2 py-3 lg:px-6 lg:py-4 text-center font-medium text-gray-800">
                  {product.productName}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <Link to={`/dashboard/product-details/${product._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition">
                      Product Details
                    </button>
                  </Link>
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <button
                    disabled={product.isFeatured === true}
                    onClick={() => handleActions(product._id, "Featured")}
                    className={`text-xs sm:text-sm px-3 py-1 rounded-md transition ${
                      product.isFeatured
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {product.isFeatured ? "Featured" : "Make Featured"}
                  </button>
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <button
                    onClick={() => handleActions(product._id, "Accepted")}
                    className="text-xs sm:text-sm px-3 py-1 rounded-md text-white transition bg-green-600 hover:bg-green-700"
                  >
                    Accept
                  </button>
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <button
                    onClick={() => handleActions(product._id, "Rejected")}
                    className="text-xs sm:text-sm px-3 py-1 rounded-md text-white transition
                     bg-red-600 hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pendingProduct.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewQueue;
