// import React from 'react'

// const ChangForGotPassword = () => {
//   return (
//     <div>ChangForGotPassword</div>
//   )
// }

// export default ChangForGotPassword
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChangForGotPassword = () => {
  const [form, setShowForm] = useState({
    email: ""
  })
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    // console.log(e.target.name,e.target.value)
    setShowForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  //ดึง token จาก Url
  const { token } = useParams();

  const handlesubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("https://ecom2025-api-ecru.vercel.app/api/reset-password/" + token,form)
      // console.log(res)
      toast.success("Password reset successfully")
      navigate('/login')
    }catch(err){
      const errMg = (err.response?.data?.message)
      toast.error('Server error')
    //   console.log(token)
    }
  }
const handleGoToLogin = () => {
    navigate("/login"); // ใช้ navigate เพื่อไปที่หน้า login
  };
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
              <h2 to='' className="text-4xl font-bold text-center text-gray-700 ">
              Set a New Password
              </h2>
              <p className="mt-3 text-gray-500 ">
              Please enter your new password.
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handlesubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your new password"
                    onChange={handleForgotPassword}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                  Reset password
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangForGotPassword;
