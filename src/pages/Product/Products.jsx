import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinners from "../../Components/LoadingSpinners";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";
import { FaThumbsUp } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Products";
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: matchedProductsData = { products: [], totalPages: 1 },
    isLoading: isProductsLoading,
    refetch: refetchMatchedProducts,
  } = useQuery({
    queryKey: ["products-by-search", debouncedSearchTerm, page],
    queryFn: async () => {
      const response = await axios.get(
        `https://app-orbit-server-gamma.vercel.app/products/search`,
        {
          params: {
            searchParams: debouncedSearchTerm,
            page,
          },
        }
      );
      return response?.data;
    },
    enabled: !!debouncedSearchTerm,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const {
    data: allProductsData = { products: [], total: 0, totalPages: 1 },
    isLoading: isProductsLoadingAll,
    refetch: refetchAllProducts,
  } = useQuery({
    queryKey: ["product", page],
    queryFn: async () => {
      const res = await axios.get(
        `https://app-orbit-server-gamma.vercel.app/product?page=${page}&limit=${limit}`
      );
      return res?.data;
    },
  });

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
        refetchAllProducts();
        refetchMatchedProducts();
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

  return (
    <div className="max-w-7xl mx-auto px-4" data-aos="zoom-out-left">
      <div className="mb-12 flex justify-center px-4">
        <label className="relative w-full max-w-2xl">
          <svg
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            placeholder="Search by tags or name..."
            className="w-full pl-16 pr-6 py-4 text-xl rounded-full border border-gray-300  bg-white text-gray-900 placeholder-gray-400  focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-lg transition-all duration-300"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            aria-label="Search products"
          />
        </label>
      </div>

      {(isProductsLoading || isProductsLoadingAll) && <LoadingSpinners />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mb-10">
        {debouncedSearchTerm ? (
          matchedProductsData.products.length > 0 ? (
            matchedProductsData.products.map(
              ({ _id, productName, productImage, tags, votes, ownerEmail }) => (
                <ProductCard
                  key={_id}
                  product={{
                    _id,
                    productName,
                    productImage,
                    tags,
                    votes,
                    ownerEmail,
                  }}
                  handleVote={handleVote}
                  loginUserEmail={loginUser?.email}
                />
              )
            )
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No results found for “{debouncedSearchTerm}”
            </p>
          )
        ) : (
          allProductsData.products.map(
            ({ _id, productName, productImage, tags, votes, ownerEmail }) => (
              <ProductCard
                key={_id}
                product={{
                  _id,
                  productName,
                  productImage,
                  tags,
                  votes,
                  ownerEmail,
                }}
                handleVote={handleVote}
                loginUserEmail={loginUser?.email}
              />
            )
          )
        )}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1.5 text-sm rounded-md border transition ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Previous
        </button>

        {Array.from(
          {
            length: debouncedSearchTerm
              ? matchedProductsData.totalPages
              : allProductsData.totalPages,
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 text-sm rounded-md border transition ${
                page === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                debouncedSearchTerm
                  ? matchedProductsData.totalPages
                  : allProductsData.totalPages
              )
            )
          }
          disabled={
            page ===
            (debouncedSearchTerm
              ? matchedProductsData.totalPages
              : allProductsData.totalPages)
          }
          className={`px-3 py-1.5 text-sm rounded-md border transition ${
            page ===
            (debouncedSearchTerm
              ? matchedProductsData.totalPages
              : allProductsData.totalPages)
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, handleVote, loginUserEmail }) => {
  const { _id, productName, productImage, tags, votes, ownerEmail } = product;
  const isOwner = loginUserEmail === ownerEmail;
  return (
    <div
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
            isOwner
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:text-blue-700"
          }`}
          disabled={isOwner}
          title={
            isOwner
              ? "You cannot vote on your own product"
              : "Upvote this product"
          }
          aria-disabled={isOwner}
        >
          <FaThumbsUp className="text-blue-600" size={18} />
          <span className="animate-pulse">{votes || 0} votes</span>
        </button>
      </div>
    </div>
  );
};

export default Products;
