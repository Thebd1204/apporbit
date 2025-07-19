import React, { useEffect } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const DashboardLayouts = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out-cubic",
      mirror: true,
      offset: 100,
      delay: 50,
      anchorPlacement: "top-center",
      debounceDelay: 30,
      throttleDelay: 50,
      startEvent: "DOMContentLoaded",
      disableMutationObserver: false,
    });

    AOS.refresh();
  }, []);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:fixed md:top-0 md:left-0 md:h-screen md:w-52 w-full bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 p-4 py-14 md:py-4">
        <main className="md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
