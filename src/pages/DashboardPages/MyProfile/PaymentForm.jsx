import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext";
import LoadingSpinners from "../../../Components/LoadingSpinners";
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
    <div className="mt-8">
      {userData?.subscription === true ? (
        <div className="text-center">
          <button
            disabled
            className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-md cursor-not-allowed"
          >
            Premium Verified
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Subscribe for ${finalPayment.toFixed(2)}
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Complete Your Subscription
            </h2>

            <div className="mb-6 flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id="useCoupon"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                onChange={(e) =>
                  setPaymentMethod(e.target.checked ? "coupon" : "direct")
                }
              />
              <label htmlFor="useCoupon" className="text-sm text-gray-600">
                I have a coupon code
              </label>
            </div>

            {paymentMethod === "coupon" && (
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  maxLength={6}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border-gray-300 border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                />
                <button
                  onClick={handleCouponPayment}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {discountAmount > 0 && (
                <div className="text-sm text-gray-700 bg-gray-100 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span>${subscription_fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount:</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-bold text-indigo-700 text-lg">
                    <span>Amount to Pay:</span>
                    <span>${finalPayment.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="p-4 border border-gray-300 rounded-lg focus-within:border-indigo-500 transition-colors">
                <CardElement className="p-1" />
              </div>

              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={!stripe || isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay ${finalPayment.toFixed(2)}`}
              </button>

              {error && (
                <p className="text-red-500 text-center text-sm mt-4">{error}</p>
              )}
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <IoIosClose size={30} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
