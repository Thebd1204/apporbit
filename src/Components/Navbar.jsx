import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import AuthContext from "../context/AuthContext";
import LoadingSpinners from "./LoadingSpinners";

const Navbar = () => {
  const { loginUser, signOutUser, loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinners></LoadingSpinners>;
  }

  const navLinks = (
    <>
      <li>
        <NavLink to={"home"} className={"hover:bg-indigo-700 hover:text-white"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"products"}
          className={"hover:bg-indigo-700 hover:text-white"}
        >
          Products
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "✅ Logout Successful",
          text: "You have been successfully logged out.",
          icon: "success",
          draggable: true,
        });
      })
      .catch(() => {
        Swal.fire({
          title: "❌ Logout Failed",
          text: "Something went wrong. Please try again.",
          icon: "error",
          draggable: true,
        });
      });
  };

  return (
    <div className="navbar p-0 mt-2 rounded-xl px-10 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl p-0">
          AppOrbit
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 border border-gray-200 rounded-full px-20 shadow-sm">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <div className="flex items-center">
          {loginUser && (
            <>
              <button
                className="my-anchor-element"
                data-tooltip-id="my-tooltip"
              >
                <img
                  className="w-10 cursor-pointer rounded-full border"
                  src={
                    loginUser?.photoURL ||
                    "https://img.icons8.com/?size=80&id=108639&format=png"
                  }
                  alt=""
                />
              </button>
              <Tooltip
                id="my-tooltip"
                place="top"
                anchorSelect=".my-anchor-element"
              >
                <p>{loginUser?.displayName}</p>
              </Tooltip>
            </>
          )}
        </div>

        <div className="">
          {loginUser ? (
            <NavLink
              onClick={handleLogout}
              className={"btn hover:bg-indigo-700 hover:text-white"}
              to={"login"}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <div className="space-x-2">
                <NavLink
                  className={"btn hover:bg-blue-700 hover:text-white"}
                  to={"login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={"btn hover:bg-blue-700 hover:text-white"}
                  to={"signup"}
                >
                  Register
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
