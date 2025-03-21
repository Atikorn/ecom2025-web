import React from 'react'
import IG from "../image/Instagram_icon.png";
import Facebook from "../image/Facebook.png";
import X from "../image/X.png";
import G from "../image/174857.png";

const MainFooter = () => {
  return (
    <footer className="relative bg-gray-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <img src={Facebook}/>
                <i className="fab fa-twitter"></i>
              </button>
              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <img src={IG}/>
                <i className="fab fa-facebook-square"></i>
              </button>
              <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <img src={X}/>
                <i className="fab fa-dribbble"></i>
              </button>
              <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <img src={G}/>
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="http://localhost:5173/aboutus">About Us</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Blog</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Github</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Free Products</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">MIT License</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" >Terms & Conditions</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Privacy Policy</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
<div className="flex flex-wrap items-center md:justify-between justify-center">
  <div className="w-full md:w-4/12 px-4 mx-auto text-center">
    <div className="text-sm text-blueGray-500 font-semibold py-1">
      Copyright © <span>2025</span>
      
      <a
        className="text-blueGray-500 hover:text-gray-800 mx-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        AP Ecommerce
      </a>

      {/* เพิ่มการเว้นระยะห่างระหว่างลิงค์ */}
      <a
        
        className="text-blueGray-500 hover:text-blueGray-800 mx-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Develop By Atikorn & Chaiyaphat
      </a>
    </div>
  </div>
</div>

      </div>
    </footer>
  )
}

export default MainFooter