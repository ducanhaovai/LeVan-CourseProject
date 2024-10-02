/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, role }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.role === role && isAuthorized !== true) {
          setIsAuthorized(true);
        } else if (decoded.role !== role && isAuthorized !== false) {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
  }, [role, isAuthorized]);

  if (isAuthorized === null) return null;

  if (!isAuthorized) return <Navigate to="/login" />;

  return element;
};

export default ProtectedRoute;
