import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Reported Contents";
  }, []);

  const {
    data: reportedContents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-contents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-contents");
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

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
          Swal.fire("Deleted!", "The content has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete the content.", "error");
      }
    }
  };

  return (
    <div
      className="overflow-x-auto mt-10 px-2 md:px-4 lg:px-6"
      data-aos="zoom-out-down"
    >
      <div className="w-full inline-block shadow-lg rounded-xl overflow-hidden bg-white">
        <table className="w-full text-sm md:text-[14px] text-gray-700 text-center border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase tracking-wider">
            <tr>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">No</th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Product Name
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                View Details
              </th>
              <th className="font-semibold px-2 py-3 lg:px-6 lg:py-4">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reportedContents?.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-3 lg:px-6 lg:py-4 text-center font-medium text-gray-800">
                  {index + 1}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  {product?.productName || "N/A"}
                </td>

                <td className="px-2 py-3 lg:px-6 lg:py-4">
                  <Link
                    to={`/dashboard/product-details/${product._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm transition"
                  >
                    View
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

        {reportedContents?.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No reported contents found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedContents;
