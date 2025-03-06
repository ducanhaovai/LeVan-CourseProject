/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ element, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/authentication/sign-in" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (role === 1 && decoded.role !== 1) {
      return <Navigate to="/authentication/sign-in" />;
    }

  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/authentication/sign-in" />;
  }

  return element;
};

export default ProtectedRoute;
