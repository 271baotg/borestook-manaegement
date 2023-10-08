import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="container-fluid vh-100 m-0 gx-0">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
