import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import { FaExternalLinkAlt, FaThumbsUp, FaFlag } from "react-icons/fa";
import Swal from "sweetalert2";
import ProductReview from "../../ProductReview/ProductReview";
import { format } from "date-fns";
import AuthContext from "../../../context/AuthContext";

const ProductDetails = () => {
  const { loginUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Product Details";
  }, []);

  const {
    data: productDetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosSecure(`/product-details/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const {
    _id,
    productName,
    productImage,
    description,
    tags = [],
    externalLink,
    votes = 0,
    ownerName,
    ownerImage,
    ownerEmail,
    status,
    timestamp,
  } = productDetails;

  const dateObj = timestamp?.$date
    ? new Date(Number(timestamp.$date.$numberLong))
    : null;

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
        });
      }

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Voted!",
          text: "Your vote has been submitted.",
        });
      }
    } catch (error) {
      console.error("Vote failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while voting.",
      });
    }
  };

  const handleReport = async () => {
    try {
      const res = await axiosSecure.put(`/reported-contents/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Reported!",
          text: "The product has been reported successfully.",
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Reported",
          text: "You’ve already reported this product.",
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while reporting.",
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        className=" rounded-3xl shadow-xl p-8 flex flex-col  gap-8"
        data-aos="fade-up"
      >
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center justify-center bg-blue-600/5 py-8 rounded-4xl">
          <img
            src={productImage}
            alt={productName || "Product Logo"}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-300 shadow-md"
            loading="lazy"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 truncate">
                {productName || "Unnamed Product"}
              </h1>
              <span
                className={`inline-block px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full ${
                  status === "Accepted"
                    ? "bg-green-100 text-green-900"
                    : "bg-yellow-100 text-yellow-900"
                } shadow-inner whitespace-nowrap`}
              >
                {status || "Pending"}
              </span>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {description || "No description available."}
            </p>

            {ownerName && (
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={ownerImage}
                  alt={ownerName}
                  className="w-12 h-12 rounded-full border border-gray-300 object-cover shadow"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-gray-900">{ownerName}</p>
                  <p className="text-sm text-gray-500">Product Owner</p>
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full select-none cursor-default hover:bg-blue-200 transition"
                    title={`Tag: ${tag}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6"
              >
                Visit External Link <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>

  
          <div className="flex flex-wrap items-center gap-4 justify-start sm:justify-between border-t border-gray-200 pt-4 mt-auto">
         

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

            {dateObj && (
              <p className="text-gray-500 text-sm italic select-none whitespace-nowrap">
                Added on:{" "}
                <time dateTime={dateObj.toISOString()}>
                  {format(dateObj, "PPP")}
                </time>
              </p>
            )}

            <button
              onClick={handleReport}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Report this product"
            >
              <FaFlag />
              Report Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16" data-aos="fade-up" data-aos-delay="300">
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductDetails;
