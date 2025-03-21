import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavOfCart from '../components/MainNavOfCart'
import MainFooter from '../components/MainFooter'
import MainNavOnTop from '../components/MainNavOnTop'


const LayoutOfCart = () => {
  return (
    <div>
      <MainNavOnTop />
      <MainNavOfCart/>
      <main className="flex-grow w-full">
        <div className="w-full h-full">
        <Outlet />
        </div>
      </main>
      <MainFooter />
    </div>
  )
}

export default LayoutOfCart