import React from 'react'
import useEcomstore from '../../store/ecom-store'
import { ShieldCheck } from 'lucide-react';

const Header_admin = () => {

  const  user = useEcomstore((state)=> state.user)

  // console.log(user)
  return (
    <header className="bg-gray-800 h-16 flex items-center px-6 shadow-md">
  <div className="flex justify-between items-center w-full">
    {/* Logo or Title */}
    <div className="text-2xl text-white font-semibold flex items-center gap-2">
  <span className="">Welcome {user.email}</span>
  <ShieldCheck size={24} className="text-green-500" />
</div>

    
    {/* Right-side Icons (Optional) */}
    <div className="flex gap-4 items-center">
      <button className="text-gray-300 hover:text-white transition-colors duration-200">
        <i className="fas fa-bell"></i> {/* Example Icon */}
      </button>
      <button className="text-gray-300 hover:text-white transition-colors duration-200">
        <i className="fas fa-cogs"></i> {/* Example Icon */}
      </button>
      <button className="text-gray-300 hover:text-white transition-colors duration-200">
        <i className="fas fa-user"></i> {/* Example Icon */}
      </button>
    </div>
  </div>
</header>


  )
}

export default Header_admin