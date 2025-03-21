import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Gauge } from "lucide-react";
import { LogOut } from "lucide-react";
import { useState,useEffect } from "react";
import useEcomstore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { UserCheck,Boxes,MonitorCog,ScrollText,ChartNoAxesCombined ,House } from 'lucide-react';

const Sidebar_admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const logout = useEcomstore((state) => state.logout);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // เปลี่ยนสถานะเมื่อคลิกปุ่ม
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className={`bg-white text-white flex flex-col h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow-md`}>
  <div className="h-24 bg-gray-800 flex items-center justify-between px-4">
    <div className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'}`}>
      Admin Panel
    </div>
    <button onClick={toggleSidebar} className="text-gray-100 hover:text-gray-500 p-2">
      <span className={`${isOpen ? 'block' : 'hidden'} text-2xl`}>-</span>
      <span className={`${isOpen ? 'hidden' : 'block'} text-2xl`}>+</span>
    </button>
  </div>

  <nav className="flex-1 py-4 px-2 space-y-2 flex flex-col">
    <NavLink
      to={"/admin"}
      end
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <House size={22} />
      {isOpen && <span>Home</span>}
    </NavLink>

    <NavLink
      to={"https://app.powerbi.com/groups/me/reports/8eed79b6-4a2b-4f91-812e-ff5fab4c645a?ctid=324a7ccc-f7db-4150-9c4f-eeec74662c4a&pbi_source=linkShare"}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <ChartNoAxesCombined  size={22} />
      {isOpen && <span>Report</span>}
    </NavLink>


    <NavLink
      to={"manage"}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <UserCheck size={22} />
      {isOpen && <span>Manage</span>}
    </NavLink>

    <NavLink
      to={"category"}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <Boxes size={22} />
      {isOpen && <span>Category</span>}
    </NavLink>

    <NavLink
      to={"product"}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <MonitorCog size={22} />
      {isOpen && <span>Product</span>}
    </NavLink>
    

    <NavLink
      to={"orders"}
      className={({ isActive }) =>
        isActive
          ? "bg-blue-500 text-white rounded-md px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <ScrollText size={22} />
      {isOpen && <span>Orders</span>}
    </NavLink>

    
    
  </nav>

  <div className="mb-4">
    <NavLink
      onClick={handleLogout}
      className={({ isActive }) =>
        isActive
          ? "bg-red-500 text-white px-4 py-3 flex items-center gap-3"
          : "text-gray-500 hover:bg-red-100 hover:text-red-500 rounded-md px-4 py-3 flex items-center gap-3"
      }
    >
      <LogOut size={22} />
      {isOpen && <span>Log out</span>}
    </NavLink>
  </div>
</div>





  );
};

export default Sidebar_admin;
