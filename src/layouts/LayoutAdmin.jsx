//rafce
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar_admin from "../components/admin/Sidebar_admin";
import Header_admin from "../components/admin/Header_admin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <Sidebar_admin />
      <div className="flex-1 flex flex-col">
          <Header_admin />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
