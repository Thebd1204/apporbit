import React from "react";
import { SyncLoader } from "react-spinners";

const LoadingSpinners = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-white/10">
      <SyncLoader />
    </div>
  );
};

export default LoadingSpinners;
