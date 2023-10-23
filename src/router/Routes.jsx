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
import BookDetail from "../components/BookDetail/BookDetail"
import {Storage} from "../components/Storage/Storage";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Storage />} />
        <Route path="order" element={<OrderHistory />} />
        <Route path="customer" element={<Customer />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="master" element={<Master />} />
        <Route path="bookdetail/:id" element={<BookDetail />} />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
