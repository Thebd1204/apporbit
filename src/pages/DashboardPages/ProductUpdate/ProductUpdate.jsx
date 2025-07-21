import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinners from "../../../Components/LoadingSpinners";
import AuthContext from "../../../context/AuthContext";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ProductUpdate = () => {
  const { loginUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Product Update";
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
        console.error("Upload failed:", err);
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

  const { id } = useParams();

  //   data

  const { data: productUpdate = [], isLoading } = useQuery({
    queryKey: ["product-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product-details/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingSpinners />;

  const { description, externalLink, photo, productName } = productUpdate;

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      tags: tags.map((tag) => tag.text),
    };


    const userRes = await axiosSecure.put(`/product-update/${id}`, formData);
    console.log(userRes?.data);

    navigate("/dashboard/my-products");

    reset();
    setTags([]);
    setProfilePic(null);
  };

  return (
    <div
      className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-2xl shadow-xl"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <h2
        className="text-3xl font-bold text-center text-blue-700 mb-10"
        data-aos="zoom-in"
      >
        Update your Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div data-aos="fade-up">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Product Image
          </label>
          <input
            type="hidden"
            {...register("photo", { required: "Image is required" })}
          />

          {profilePic ? (
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={profilePic}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl bg-gray-50 transition cursor-pointer ${
                errors.photo
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <p className="text-sm text-blue-500 animate-pulse">
                  Uploading...
                </p>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 text-gray-400 mb-2"
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
                  <p className="text-sm text-gray-600">
                    Click or drag to upload
                  </p>
                </>
              )}
            </div>
          )}
          {errors.photo && (
            <p className="text-red-500 text-xs mt-2">{errors.photo.message}</p>
          )}
        </div>

        <div data-aos="fade-up">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            placeholder="Enter product name"
            defaultValue={productName}
            className={`w-full px-4 py-2 rounded-md border ${
              errors.productName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
          {errors.productName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div data-aos="fade-up">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Describe the product..."
            defaultValue={description}
            className={`w-full px-4 py-2 border rounded-md h-28 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-300`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div data-aos="fade-up">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            External Link
          </label>
          <input
            type="url"
            {...register("externalLink", {
              required: "External link is required",
            })}
            placeholder="https://example.com"
            defaultValue={externalLink}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.externalLink ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
          {errors.externalLink && (
            <p className="text-red-500 text-xs mt-1">
              {errors.externalLink.message}
            </p>
          )}
        </div>

        <div data-aos="fade-up">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none",
              tag: "inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full mr-2 mb-2",
              remove: "ml-2 text-red-500 cursor-pointer",
            }}
          />
        </div>

        <div className="border-t pt-6 space-y-4" data-aos="fade-up">
          <p className="text-lg font-bold text-gray-700">Product Owner Info</p>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              defaultValue={loginUser?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Photo
            </label>
            <input
              type="url"
              defaultValue={loginUser?.photoURL || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Email
            </label>
            <input
              type="email"
              defaultValue={loginUser?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
