import React from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router";

const DashboardLayouts = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 gap-5">
      <div className="">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <main className="pt-16 md:pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayouts;
