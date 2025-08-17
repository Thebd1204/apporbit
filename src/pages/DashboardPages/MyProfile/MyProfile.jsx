import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import AuthContext from "../../../context/AuthContext";
import Payment from "./Payment";

const MyProfile = () => {
  const { loginUser } = useContext(AuthContext);

  useEffect(() => {
    document.title = "My Profile";
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
      data-aos="zoom-in-up"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full group mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full z-0 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 animate-spin-slow"
              style={{
                filter: "blur(16px)",
                opacity: 0.6,
              }}
            />
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={loginUser?.photoURL}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 truncate max-w-xs"
            title={loginUser?.displayName}
          >
            {loginUser?.displayName}
          </h2>

          <p className="text-gray-500 text-sm md:text-base mt-1 truncate max-w-xs">
            {loginUser?.email}
          </p>
        </div>

        <div className="mt-8">
          <Payment />
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;

