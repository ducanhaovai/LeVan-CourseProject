/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, role }) => {
  const [authStatus, setAuthStatus] = useState("loading"); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.role === role) {
          setAuthStatus("authorized");
        } else {
          setAuthStatus("unauthorized");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setAuthStatus("unauthorized");
      }
    } else {
      setAuthStatus("unauthorized");
    }
  }, [role]);


  // Nếu không được phép, chuyển hướng về trang đăng nhập
  if (authStatus === "unauthorized") {
    return <Navigate to="/authentication/sign-in" />;
  }

  // Nếu được phép, render component cần hiển thị
  return element;
};

export default ProtectedRoute;
