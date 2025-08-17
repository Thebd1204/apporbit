import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import AuthContext from "./../../../context/AuthContext";
import { WithContext as ReactTags } from "react-tag-input";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
  const { loginUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Product";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`;
        const res = await axios.post(imageUploadUrl, formData);
        const imageUrl = res?.data?.data?.url;
        setProfilePic(imageUrl);
        setValue("photo", imageUrl);
        trigger("photo");
      } catch (err) {
        Swal.fire("Upload failed", "Please try again.", "error");
      } finally {
        setUploading(false);
      }
    },
    [setValue, trigger]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleRemove = () => {
    setProfilePic(null);
    setValue("photo", "");
    trigger("photo");
  };

  const handleDelete = (i) => {
    const updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userInfo", loginUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userInfo/${loginUser?.email}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      tags: tags.map((tag) => tag.text),
    };

    if (userData.subscription === true) {
      const userRes = await axiosSecure.post("/productInfo", formData);
      if (userRes?.data?.insertedId || userRes?.data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Post Successful",
          text: "Your product has been posted successfully!",
          timer: 1500,
        });
        navigate("/dashboard/my-products");
      }
    } else if (userData?.postLimit >= 1) {
      const userRes = await axiosSecure.post("/productInfo", formData);
      if (userRes?.data?.insertedId || userRes?.data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Post Successful",
          text: "Your product has been posted successfully!",
          timer: 1500,
        });
        const res = await axiosSecure.patch(`/postLimit/${loginUser?.email}`);
        navigate("/dashboard/my-products");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Subscription Required",
        text: "Please subscribe to unlock unlimited posting access.",
        confirmButtonText: "View Subscription Plans",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/my-profile");
        }
      });
    }

    reset();
    setTags([]);
    setProfilePic(null);
  };

  return (
    <div
      className="bg-gray-50 p-4 sm:p-6 md:p-8"
      data-aos="zoom-out-up"
      data-aos-duration="700"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8 md:mb-12"
          data-aos="zoom-in"
        >
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div data-aos="fade-up">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Product Image
            </label>
            <input
              type="hidden"
              {...register("photo", { required: "Image is required" })}
            />

            {profilePic ? (
              <div className="relative w-32 h-32 mx-auto group">
                <img
                  src={profilePic}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-lg"
                />
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-transform transform group-hover:scale-110"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl bg-gray-50 transition-all cursor-pointer ${
                  errors.photo
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <p className="text-lg text-blue-500 animate-pulse font-semibold">
                    Uploading...
                  </p>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg
                      className="w-10 h-10 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-4l-4-4m0 0L8 11m4-4v12"
                      />
                    </svg>
                    <p className="text-base font-medium">
                      Click or drag to upload
                    </p>
                    <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            )}
            {errors.photo && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.photo.message}
              </p>
            )}
          </div>

          <div data-aos="fade-up">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Product Name
            </label>
            <input
              type="text"
              {...register("productName", {
                required: "Product Name is required",
              })}
              placeholder="Enter product name"
              className={`w-full px-5 py-3 rounded-lg border ${
                errors.productName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow`}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div data-aos="fade-up">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Describe the product..."
              className={`w-full px-5 py-3 border rounded-lg h-32 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div data-aos="fade-up">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              External Link
            </label>
            <input
              type="url"
              {...register("externalLink", {
                required: "External link is required",
              })}
              placeholder="https://example.com"
              className={`w-full px-5 py-3 border rounded-lg ${
                errors.externalLink ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow`}
            />
            {errors.externalLink && (
              <p className="text-red-500 text-sm mt-1">
                {errors.externalLink.message}
              </p>
            )}
          </div>

          <div data-aos="fade-up">
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Tags (Drag to reorder)
            </label>
            <ReactTags
              tags={tags}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              inputFieldPosition="bottom"
              placeholder="Add a tag and press Enter"
              classNames={{
                tagInputField:
                  "w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mt-2",
                tag: "inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mr-2 mb-2 text-sm font-semibold",
                remove: "ml-2 text-red-500 cursor-pointer text-lg",
              }}
            />
          </div>

          <div
            className="border-t border-gray-200 pt-8 space-y-6"
            data-aos="fade-up"
          >
            <p className="text-xl font-bold text-gray-800">
              Product Owner Info
            </p>
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Owner Name
              </label>
              <input
                {...register("ownerName")}
                type="text"
                defaultValue={loginUser?.displayName || ""}
                readOnly
                className="w-full px-5 py-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Owner Photo URL
              </label>
              <input
                {...register("ownerImage")}
                type="url"
                defaultValue={loginUser?.photoURL || ""}
                readOnly
                className="w-full px-5 py-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-2">
                Owner Email
              </label>
              <input
                {...register("ownerEmail")}
                type="email"
                defaultValue={loginUser?.email || ""}
                readOnly
                className="w-full px-5 py-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
