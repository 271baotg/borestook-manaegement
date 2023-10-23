import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="container-fluid vh-100 m-0 gx-0">
      {location.pathname != "/login" && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
