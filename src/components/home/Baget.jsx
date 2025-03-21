import React from 'react'
import { useNavigate } from 'react-router-dom'

const Baget = () => {
  const navigate = useNavigate()

  const handleGoToShop = () => {
    navigate("/shop"); // ใช้ navigate เพื่อไปที่หน้า login
  };
  return (
    <div className="container mx-auto px-6">
  <div
    className="h-64 rounded-md overflow-hidden bg-cover bg-center mt-8"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1637329608420-a88f4c348ac9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
  >
    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
      <div className="px-10 max-w-xl">
        <h2 className="text-2xl text-white font-semibold">Experience the Best of Apple</h2>
        <p className="mt-2 text-gray-400">
        Discover the latest Apple devices, from MacBooks to iPhones, designed to elevate your work and lifestyle.
        </p>
        <button onClick={handleGoToShop} className="flex items-center mt-4 px-3 py-2 bg-indigo-600 text-white text-sm uppercase font-medium rounded hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800">
          <span>Shop Now</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  
</div>

  )
}

export default Baget
