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
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10"
      data-aos="zoom-in-up"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative shadow-[0_0_40px_rgba(255,255,255,0.08)]"
      >
        {/* Avatar with neon ring */}
        <motion.div
          className="relative w-40 h-40 mx-auto rounded-full group"
          whileHover={{ scale: 1.05 }}
        >
          {/* Neon ring */}
          <motion.div
            className="absolute inset-0 rounded-full z-0 bg-gradient-to-tr from-fuchsia-500 via-indigo-500 to-blue-500 animate-spin-slow"
            style={{
              filter: "blur(14px)",
              opacity: 0.7,
            }}
          />

          {/* User image */}
          <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
            <img
              src={loginUser?.photoURL}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Glowing aura */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-500 opacity-30 z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Info */}
        <div className="text-center mt-8 text-white">
          <h2 className="text-3xl font-bold drop-shadow">
            {loginUser?.displayName || "Anonymous"}
          </h2>
          <p className="text-gray-300 text-sm mt-1">{loginUser?.email}</p>
        </div>

        {/* Payment Section */}
        <div className="mt-6">
          <Payment />
        </div>

         

      </motion.div>
    </div>
  );
};

export default MyProfile;
