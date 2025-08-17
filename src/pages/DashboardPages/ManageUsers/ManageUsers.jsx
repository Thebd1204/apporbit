import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Manage Users";
  }, []);

  const {
    data: manageUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-users");
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const handleActions = async (productId, actions) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${actions.toLowerCase()} this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actions.toLowerCase()}!`,
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/status-update/${productId}`, {
          status: actions,
        });
        if (res?.data?.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `User ${actions.toLowerCase()} successfully.`,
            timer: 1500,
            showConfirmButton: false,
          });

          refetch();
        }
      } catch (error) {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div
      className="overflow-x-auto mt-4 sm:mt-6 md:mt-10 px-2 sm:px-4 md:px-6 lg:px-8"
      data-aos="fade-right"
    >
      <div className="w-full inline-block align-middle">
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase tracking-wider">
              <tr>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">No</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                  User Name
                </th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                  User Email
                </th>
                <th className="px-3 py-3 text-center text-xs sm:text-sm font-semibold">
                  Make Moderator
                </th>
                <th className="px-3 py-3 text-center text-xs sm:text-sm font-semibold">
                  Make Admin
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {manageUsers.map((users, index) => (
                <tr key={users._id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {index + 1}
                  </td>

                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                    title={users?.name || "N/A"}
                  >
                    {users?.name || "N/A"}
                  </td>

                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm text-gray-500"
                    title={users.email}
                  >
                    {users.email}
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap text-center">
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleActions(users._id, "Moderator")}
                        disabled={users.role === "Moderator"}
                        className={`text-xs sm:text-sm px-3 py-1 rounded-md transition 
                      ${
                        users.role === "Moderator"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }
                    `}
                      >
                        Make Moderator
                      </button>

                      {users.role === "Moderator" && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-xs px-2 py-1 bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                          Already Moderator
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap text-center">
                    <div className="relative group inline-block">
                      <button
                        onClick={() => handleActions(users._id, "Admin")}
                        disabled={users.role === "Admin"}
                        className={`text-xs sm:text-sm px-3 py-1 rounded-md transition 
                      ${
                        users.role === "Admin"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }
                    `}
                      >
                        Make Admin
                      </button>

                      {users.role === "Admin" && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-xs px-2 py-1 bg-black text-white rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-300">
                          Already Admin
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {manageUsers.length === 0 && (
            <div className="p-6 text-center text-gray-500">No Users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;



