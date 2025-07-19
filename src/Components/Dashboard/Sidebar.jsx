import React, { useState } from "react";
import { Link, Navigate, NavLink } from "react-router";
import {
  FaUserCircle,
  FaPlusCircle,
  FaBoxOpen,
  FaClipboardCheck,
  FaFlag,
  FaChartLine,
  FaUsersCog,
  FaTags,
  FaBars,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";
import LoadingSpinners from "../LoadingSpinners";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  console.log("role", role);

  if (roleLoading) return <LoadingSpinners />;

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 font-semibold text-[15px] ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
    }`;

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 flex items-center gap-2 bg-blue-600 text-white font-semibold px-3 py-2 rounded-md shadow-lg hover:bg-blue-700 transition"
        onClick={toggleDrawer}
        aria-label="Open menu"
      >
        <FaBars className="text-lg" />
        <span className="text-sm">Admin Dashboard</span>
      </button>

      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={toggleDrawer}
      ></div>
      <aside
        className={`fixed top-0 left-0 min-h-screen w-65 md:w-72 bg-white shadow-md p-4 md:p-6 z-50 transform transition-transform
    md:static md:translate-x-0 flex flex-col  
    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex justify-between">
          <Link to={"/"} className="btn btn-circle btn-sm bg-blue-700/20">
            <FaArrowLeft className="text-xl" />
          </Link>

          <button
            className="md:hidden btn btn-circle btn-sm bg-red-700/20"
            onClick={toggleDrawer}
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="pt-2 md:pt-5">
          <h2 className=" text-2xl font-extrabold md:mt-0 lg:mb-8 text-blue-700 tracking-tight">
           {role} Dashboard
          </h2>

          <ul className="space-y-3 my-4">
            {!roleLoading && role === "users" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/myprofile"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaUserCircle className="text-lg" /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-product"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaPlusCircle className="text-lg" /> Add Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-products"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaBoxOpen className="text-lg" /> My Products
                  </NavLink>
                </li>
              </>
            )}

            {!roleLoading && role === "Moderator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/review-queue"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaClipboardCheck className="text-lg" /> Review Queue
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/reported-contents"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaFlag className="text-lg" /> Reported Contents
                  </NavLink>
                </li>
              </>
            )}

            {!roleLoading && role === "Admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/statistics"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaChartLine className="text-lg" /> Statistics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaUsersCog className="text-lg" /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-coupons"
                    className={linkClasses}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaTags className="text-lg" /> Manage Coupons
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="text-sm text-gray-400 mt-10 absolute bottom-4">
          <p>© {new Date().getFullYear()} AppOrbit</p>
          <p className="text-gray-300">All rights reserved</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
