import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useEcomstore from "../store/ecom-store";
import { ChevronDown, ShoppingCart } from "lucide-react";

const MainNav = ({ onCartClick }) => {
  const carts = useEcomstore((state) => state.carts);
  const user = useEcomstore((state) => state.user);
  const logout = useEcomstore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    logout();
    if (location.pathname.toLowerCase().startsWith("/user/history")) {
      navigate("/login");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  console.log(user);
  return (
    <nav className="bg-white  ">
      <div className="mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Brand and Navigation Links */}
          <div className="flex items-center gap-5">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              AP Ecommerce
            </Link>
          </div>

          <div className="flex gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray"
                  : "px-4 py-2 rounded-md text-sm font-semibold text-gray hover:bg-gray-200 hover:text-gray-900 "
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray"
                  : "px-4 py-2 rounded-md text-sm font-semibold text-gray hover:bg-gray-200 hover:text-gray-900"
              }
            >
              Shop
            </NavLink>
            {/* Cart Link (ถ้าต้องการให้มีลิงค์ไปหน้า Cart ด้วย) */}
            {/* <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray relative"
                  : "px-4 py-2 rounded-md text-sm font-semibold text-gray hover:bg-gray-200 hover:text-gray-900 relative"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs font-semibold">
                  {carts.length}
                </span>
              )}
            </NavLink> */}
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray"
                  : "px-4 py-2 rounded-md text-sm font-semibold text-indigo-600 hover:bg-gray-200 hover:text-gray-900 "
              }
            >
              About Us
            </NavLink>
          </div>

          {/* Right Section - User Dropdown or Authentication Links */}
          <div className="flex items-center gap-5 relative">
            <button onClick={onCartClick} className="relative">
              <ShoppingCart className="h-6 w-6" />
              {carts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-semibold">
                  {carts.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropDown}
                  className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                    alt="User Avatar"
                  />
                  <span className="text-sm">{user.email}</span>
                  <ChevronDown />
                </button>
                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 z-50 border">
                    <Link
                      to="/user/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      History
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      LogOut
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
                      : "px-4 py-2 rounded-md text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
                      : "px-4 py-2 rounded-md text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                  }
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
