import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Master from "../components/Master/Master";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import Customer from "../components/Customer/Customer";
import Statistic from "../components/Statistic/Statistic";
import Layout from "../components/Layout";
import { Storage } from "../components/Storage/Storage";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../components/Authentication/Login";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Storage />} />
          <Route path="order" element={<OrderHistory />} />
          <Route path="customer" element={<Customer />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="master" element={<Master />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
