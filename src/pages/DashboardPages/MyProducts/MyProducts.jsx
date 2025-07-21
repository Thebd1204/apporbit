import React, { useContext, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext";

const MyProducts = () => {
  const { loginUser, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "My Products";
  }, []);

  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products", loginUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-products?email=${loginUser?.email}`
      );
      return res?.data;
    },
  });

  if (isLoading || loading) return <LoadingSpinners />;

  console.log(myProducts);

  const handleActions = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the reported content.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/product-delete/${id}`);
        if (res?.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "The content has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the content.",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    }
  };

  return (
    <div
      className="overflow-x-auto mt-10 px-2 md:px-4 lg:px-6"
      data-aos="fade-right"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <div className="w-full inline-block shadow-lg rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm md:text-[14px] text-gray-700 text-center border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase tracking-wider">
            <tr className="">
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">No</th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Product Name
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Total Vote
              </th>

              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Status
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Update
              </th>

              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {myProducts.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-3 lg:px-6 lg:py-4 text-center font-medium text-gray-800 ">
                  {index + 1}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  {product?.productName || "N/A"}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">{product?.votes}</td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  {product.status === "pending" && (
                    <span className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-2xl">
                      Pending
                    </span>
                  )}
                  {product.status === "Rejected" && (
                    <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded-2xl">
                      Rejected
                    </span>
                  )}
                  {product.status === "Accepted" && (
                    <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-2xl">
                      Accepted
                    </span>
                  )}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <Link
                    to={`/dashboard/product-update/${product._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition"
                  >
                    Update
                  </Link>
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <button
                    onClick={() => handleActions(product._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myProducts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
