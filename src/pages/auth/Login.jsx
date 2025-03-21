//rafce
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomstore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import imageecom from "../../image/16544.jpg";
import imageecom2 from "../../image/GRPink.jpg";
import { Navigate } from "react-router-dom";
import cartImg from "../../image/shopping-cart.gif";

const Login = () => {
  //javascript
  const navigate = useNavigate();
  const actionLogin = useEcomstore((state) => state.actionLogin);
  const user = useEcomstore((state) => state.user);
  // console.log("user form zustand", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    //code
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };
  const handleGoToForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      // console.log("role", role);
      roleRedirect(role); //พาไปหน้าต่างๆตาม role ที่ประกาศไว้ด้านล่าง
      toast.success("Welcome Back"); //เข้าเสร็จแล้วให้แสดงว่าอะไร
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };
  //ตกแต่ง css ได้เลยข้างล่างใช้ taiwin ที่ import มา
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Build your dream business today</h2>
              <p className="max-w-xl mt-3 text-gray-300">
              Start free and discover amazing eCommerce deals.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <Link to='/' className="text-4xl font-bold text-center text-gray-700 ">
                AP Ecommerce
              </Link>
              <p className="mt-3 text-gray-500 ">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={handleOnChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                    <p
                      onClick={handleGoToForgotPassword}
                      className="text-sm focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </p>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    onChange={handleOnChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <button
                  onClick={handleGoToRegister}
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
