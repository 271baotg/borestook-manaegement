import React from "react";
import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthProvider";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth);
    if (!auth) {
      navigate("/login");
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
