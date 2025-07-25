import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext";
import LoadingSpinners from "./../../../Components/LoadingSpinners";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const PaymentForm = () => {
  const { loginUser } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("direct");
  const [discountAmount, setDiscountAmount] = useState(0);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: userData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo", loginUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userInfo/${loginUser?.email}`);
      return res?.data;
    },
    enabled: !!loginUser?.email,
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupon");
      return res.data;
    },
  });

  const subscription_fee = 99;
  const finalPayment = subscription_fee - discountAmount;

  const handleCouponPayment = () => {
    const matched = coupons.find(
      (c) => c.couponCode.toLowerCase() === couponCode.trim().toLowerCase()
    );

    if (!matched) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: "No matching coupon code found.",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    const now = new Date();
    const expiry = new Date(matched.expiryDate);
    if (expiry < now) {
      return Swal.fire({
        icon: "warning",
        title: "Coupon Expired",
        text: "This coupon code is no longer valid.",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    const discountValue = matched.discount;
    const calculatedDiscount = (subscription_fee * discountValue) / 100;
    setDiscountAmount(calculatedDiscount);

    Swal.fire({
      icon: "success",
      title: "Coupon Applied",
      html: `You received <strong>${discountValue}%</strong> discount!`,
      timer: 1500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error?.message);
      setIsProcessing(false);
      return;
    }

    const finalCostInCents = Math.round(finalPayment * 100);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        subscriptionCostInCents: finalCostInCents,
        email: userData.email,
      });

      const clientSecret = res.data?.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: loginUser.displayName,
            email: loginUser.email,
          },
        },
      });

      if (result?.error) {
        setError(result?.error?.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result?.paymentIntent?.id;

        const paymentData = {
          email: loginUser?.email,
          subscription_fee: parseFloat(finalPayment.toFixed(2)),
          transactionId,
          paymentMethod: result?.paymentIntent?.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes?.data?.insertedId) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            html: `Transaction ID: <strong>${transactionId}</strong>`,
            timer: 1500,
          }).then(() => navigate("/dashboard/myProfile"));
        }
        setShowModal(false);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    }

    setIsProcessing(false);
  };

  if (isLoading) return <LoadingSpinners />;

  return (
    <div>
      {userData?.subscription === true && (
        <div className="w-full mt-6 text-center">
          <button
            disabled
            className="relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto max-w-full px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base tracking-wide uppercase bg-gradient-to-br from-green-600 via-green-700 to-green-900 shadow-[0_0_40px_rgba(34,197,94,0.7)] border border-green-500/40 cursor-default backdrop-blur-lg"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 via-white/10 to-white/25 pointer-events-none"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              style={{ mixBlendMode: "screen", zIndex: 1 }}
            />

            <motion.div
              className="absolute -inset-1 rounded-full border-2 border-green-400/50 blur-xl opacity-40 pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />

            <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(34,197,94,0.9)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.9)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M10.97 16.97a.75.75 0 01-1.06 0l-3.47-3.47a.75.75 0 111.06-1.06l2.44 2.44 5.44-5.44a.75.75 0 111.06 1.06l-6 6z"
                  clipRule="evenodd"
                />
              </svg>
              Premium Verified
            </span>
          </button>
        </div>
      )}

      {userData?.subscription === false && (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="relative overflow-hidden inline-flex items-center justify-center w-full sm:w-auto max-w-full px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-white text-base sm:text-lg lg:text-xl tracking-wider uppercase bg-gradient-to-br from-[#9400D3] via-[#4B0082] to-[#000080] shadow-[0_0_60px_rgba(155,48,255,0.8)] border border-purple-200/30 hover:scale-105 hover:brightness-125 transition-all duration-500 ease-in-out backdrop-blur-xl"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-white/10 to-white/20 pointer-events-none"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              style={{ mixBlendMode: "screen", zIndex: 1 }}
            />

            <motion.div
              className="absolute -inset-2 rounded-full border-4 border-violet-400 blur-2xl opacity-30 pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
            />

            <div className="absolute inset-0 rounded-full border border-white/10 shadow-inner shadow-white/10 pointer-events-none" />

            <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]"
              >
                <path d="M12 2L15 8H9L12 2Z M12 22L9 16H15L12 22Z M2 12L8 15V9L2 12Z M22 12L16 9V15L22 12Z" />
              </svg>
              <span className="text-sm sm:text-base lg:text-[15px] ">
                Membership Subscribe ${finalPayment.toFixed(2)}
              </span>
            </span>
          </button>
        </div>
      )}

      {/* 🪟 Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center">
          <div
            data-aos="zoom-in"
            className="bg-white p-6 w-full max-w-md rounded-xl relative shadow-xl"
          >
            <h2 className="text-lg font-bold mb-4 text-center">
              Complete Your Subscription
            </h2>

            {/* 🎟 Coupon Checkbox */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id="useCoupon"
                onChange={(e) =>
                  setPaymentMethod(e.target.checked ? "coupon" : "direct")
                }
              />
              <label htmlFor="useCoupon" className="text-sm text-gray-700">
                I have a coupon code
              </label>
            </div>

            {/* 🎫 Coupon Input */}
            {paymentMethod === "coupon" && (
              <>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  maxLength={6}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border p-2 w-full mb-3 rounded"
                />
                <button
                  onClick={handleCouponPayment}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Apply Coupon
                </button>
              </>
            )}

            {/* 💳 Stripe Form */}
            {userData?.subscription === false && (
              <form
                onSubmit={handleSubmit}
                className="mt-4 bg-white p-4 mb-10 rounded-xl border shadow-sm space-y-4"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Stripe Payment
                  </h2>
                </div>

                {/* 📊 Summary */}
                {discountAmount > 0 && (
                  <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded space-y-1">
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span>${subscription_fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount:</span>
                      <span>- ${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between font-semibold text-indigo-700">
                      <span>Amount to Pay:</span>
                      <span>${finalPayment.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="p-3 border rounded focus-within:border-indigo-500 transition">
                  <CardElement className="p-1" />
                </div>

                <button
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full font-semibold py-2 rounded-md transition disabled:opacity-50"
                  type="submit"
                  disabled={!stripe || isProcessing}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Pay $${finalPayment.toFixed(2)}`}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
              aria-label="Close modal"
            >
              <IoIosClose
                size={30}
                className=" bg-red-700/20 text-red-700 rounded-full cursor-pointer hover:bg-red-700/40  transition duration-300 ease-in-out
                "
              />
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="absolute bottom-2 right-3 bg-red-600 hover:bg-red-700 text-white text-base rounded-full px-4 py-2 transition cursor-pointer"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
