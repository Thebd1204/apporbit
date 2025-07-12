import React from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayouts = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 ">
  {/* Fixed Sidebar */}
  <div className="w-64 fixed top-0 left-0 h-screen bg-white shadow-md z-10">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 ml-64 pl-10">
    <main className="pt-16 md:pt-2 p-4">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default DashboardLayouts;
