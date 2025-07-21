import React, { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "./LoadingSpinners";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const TrendingProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { loginUser } = useContext(AuthContext);

  const {
    data: trendingProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trending-product"],
    queryFn: async () => {
      const res = await axios.get(
        `https://app-orbit-server-gamma.vercel.app/trending-products`
      );
      return res?.data;
    },
  });

  const navigate = useNavigate();

  const handleVote = async (id) => {
    if (!loginUser) {
      return navigate("/login");
    }

    try {
      const res = await axiosSecure.put(`/vote-product/${id}`, {
        userEmail: loginUser.email,
      });

      if (res.data.alreadyVoted) {
        return Swal.fire({
          icon: "info",
          title: "Already Voted",
          text: "You’ve already voted on this product.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Voted!",
          text: "Your vote has been submitted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Vote failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while voting.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  if (isLoading) return <LoadingSpinners />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2
        className="text-3xl font-bold text-center mb-12 text-gray-800"
        data-aos="fade-up"
      >
        Trending Products
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trendingProducts?.map(
          ({ _id, productName, productImage, tags, votes, ownerEmail }) => (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-5 flex flex-col"
              data-aos="zoom-in"
            >
              <div className="h-48 flex justify-center items-center overflow-hidden mb-4">
                <img
                  src={productImage}
                  alt={productName}
                  className="object-cover h-40 w-40 rounded-full border-2 border-gray-200 shadow-sm"
                />
              </div>

              <Link to={`/product-details/${_id}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {productName}
                </h3>
              </Link>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {tags?.length > 0 ? (
                  tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">No tags</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <button
                  onClick={() => handleVote(_id)}
                  className={`flex items-center gap-2 text-sm font-semibold transition ${
                    loginUser?.email === ownerEmail
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                  disabled={loginUser?.email === ownerEmail}
                  title={
                    loginUser?.email === ownerEmail
                      ? "You cannot vote on your own product"
                      : "Upvote this product"
                  }
                >
                  <FaThumbsUp className="text-blue-600" size={18} />
                  <span className="animate-pulse">{votes || 0} votes</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <Link to={"/products"}>
          <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Show All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;
