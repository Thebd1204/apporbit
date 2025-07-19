import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../../context/AuthContext";
import LoadingSpinners from "../../Components/LoadingSpinners";


const PrivetRoutes = ({ children }) => {
  const { loginUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinners></LoadingSpinners>;
  }

  if (loginUser) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
};

export default PrivetRoutes;
