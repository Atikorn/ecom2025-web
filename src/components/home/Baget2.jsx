import React from 'react'
import { useNavigate } from 'react-router-dom'

const Baget2 = () => {
  const navigate = useNavigate()
  
    const handleGoToShop = () => {
      navigate("/shop"); // ใช้ navigate เพื่อไปที่หน้า login
    };
  return (
    <div className="container mx-auto px-6">
    <div className="md:flex mt-8 md:-mx-4">
    <div
      className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
        <div className="px-10 max-w-xl">
          <h2 className="text-2xl text-white font-semibold">Upgrade Your Workspace</h2>
          <p className="mt-2 text-gray-400">
          Explore high-performance IT products designed to enhance productivity and efficiency
          </p>
          <button onClick={handleGoToShop} className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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

    <div
      className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1604586376807-f73185cf5867?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
        <div className="px-10 max-w-xl">
          <h2 className="text-2xl text-white font-semibold">Essential Tech Accessories</h2>
          <p className="mt-2 text-gray-400">
          Complete your setup with premium accessories for work and play
          </p>
          <button onClick={handleGoToShop} className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
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
  </div>
  )
}

export default Baget2