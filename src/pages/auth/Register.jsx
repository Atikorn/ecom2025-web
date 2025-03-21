//rafce
import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomstore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import imageecom from "../../image/16544.jpg";
import imageecom2 from "../../image/GRPink.jpg";
import { Navigate } from "react-router-dom";
import cartImg from "../../image/shopping-cart.gif";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please try again",
    path: ["confirmPassword"],
  });

const Register = () => {
  //javascript
  const [passwordScore,setPasswordScore] = useState(0)



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  // const ValidatePassword = () => {
  //   let password = watch().password
  //   return zxcvbn(password ?password :'').score
  // }

  // const handleOnChange = (e) => {
  //   //code
  //   console.log(e.target.name, e.target.value);
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleGoToLogin = () => {
    navigate("/login"); // ใช้ navigate เพื่อไปที่หน้า login
  };

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 3) {
    //   toast.warning('Password Not Strong!!!!!')
    //   console.log(passwordScore)
    //   return
    // }
    try {
      const res = await axios.post("https://ecom2025-api-ecru.vercel.app/api/register", data);
      // console.log(res.data);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  // const onSubmit = async (data) => {
  //   // const passwordScore = zxcvbn(data.password).score;
  //   // if (passwordScore < 3) {
  //   //   toast.warning('Password Not Strong!!!!!')
  //   //   return
  //   // }
  //   // console.log(data)
  // };

  
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
          <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                  {...register("email")}
                    // type="email"
                    // name="email"
                    // id="email"
                    placeholder="Email"
                    // onChange={''}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                  </div>

                  <input
                  {...register("password")}
                    // type="password"
                    // name="password"
                    // id="password"
                    placeholder="Your Password"
                    // onChange={''}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
                </div>

                <div className="mt-6">
                  <div className="flex mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Confirm Password
                    </label>
                  </div>

                  <input
                  {...register("confirmPassword")}
                    // type="password"
                    // name="password"
                    // id="password"
                    placeholder="Confirm Password"
                    // onChange={''}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>
              </form>

            <p className="mt-6 text-sm text-center text-gray-400">
            If you already have an account, you can{" "}
              <button
                onClick={handleGoToLogin}
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

export default Register;
