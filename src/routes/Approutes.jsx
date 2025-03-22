// rafce
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import HomeTest from "../pages/HomeTest";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import AboutUs from "../components/home/AboutUs";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangForGotPassword from "../pages/auth/ChangForGotPassword";


import History from "../pages/user/History";
import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import EditProduct from "../pages/admin/EditProduct";
import Payment from "../pages/user/Payment";
import ManageOrders from "../pages/admin/ManageOrders";
import LayoutOfCart from "../layouts/LayoutOfCart";
import CategoryList from "../components/Test/CategoryList";
import Receipt from "../components/card/Receipt";
import ReceiptAdmin from "../pages/admin/ReceiptAdmin";

// import Model from "../pages/admin/model";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //Parent Layout
    children: [
      { index: "true", element: <Home /> }, //Children layout
      { path: "shop", element: <Shop /> },
      { path: "hometest", element: <HomeTest /> },
      { path: "aboutus", element: <AboutUs /> },

      //{ path: 'Login', element: <Login /> }
      //{ path: 'Register', element: <Register /> },

      ,
    ],
  },
  { element:<LayoutOfCart />, 
    children: [{path: "checkout", element: <Checkout />}]  },
  {
    element: <LayoutOfCart />,
    children: [{ path: "cart", element: <Cart /> }],
  },
  {
    path: "/login", //แยกแทบ Nav Bar ออกจาก Element หลักด้านบน
    element: <Login />,
  },
  {
    path: "/categoryList", //แยกแทบ Nav Bar ออกจาก Element หลักด้านบน
    element: <CategoryList />,
  },
  {
    path: "/forgotpassword", //แยกแทบ Nav Bar ออกจาก Element หลักด้านบน
    element: <ForgotPassword />,
  },
  {
    path: "/ChangForGotPassword/:token",
    element: <ChangForGotPassword />, //แยกแทบ Nav Bar ออกจาก Element หลักด้านบน
  },
  {
    path: "/register", //แยกแทบ Nav Bar ออกจาก Element หลักด้านบน
    element: <Register />,
  },
  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "orders/receipt", element: <ReceiptAdmin /> },
    ],
  },
  {
    path: "/user",
    //element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
      { path: "receipt", element: <Receipt /> },
    ],
  },
]);

const Approutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Approutes;
