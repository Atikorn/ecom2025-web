//rafce
import {React,useState} from 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'
import MainNavOnTop from '../components/MainNavOnTop'
import CartCard from '../components/card/CartCard'
import MainFooter from '../components/MainFooter'

const LayoutUser = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <MainNavOnTop />
      <MainNav onCartClick={() => setOpenCart(true)} />
  
      {/* Content ที่ต้องการให้เต็มจอ */}
      <main className="flex-grow w-full">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
  
      {/* Cart Drawer (Overlay) */}
      <CartCard open={openCart} onClose={() => setOpenCart(false)} />
  
      {/* Footer */}
      <MainFooter />
    </div>
  )
}

export default LayoutUser