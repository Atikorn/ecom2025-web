import React from "react";
import ContentSwipe from "../components/home/ContentSwipe";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";
import Baget from "../components/home/Baget";
import Profiles from "../components/home/Profiles";
import Newitem from "../image/new-item.gif";
import Best from "../image/black-friday.gif";
import Baget2 from "../components/home/Baget2";

const Home = () => {
  return (
    <div className="px-6 bg-gray-100">
      {/* ✅ ใช้ h1 เฉพาะตรงนี้ */}

      <ContentSwipe />

      {/* ✅ Best Seller Section */}
      <div className="flex justify-center">
      
        <div className="">
          <p className="text-3xl font-semibold text-center text-gray-800 my-6">
            New Arrival
          </p>
        </div>
        
      </div>
      
      <NewProduct />

      <Baget />

      {/* ✅ New Arrival Section */}
      <div className="flex justify-center">
        <div>
          <p className="text-3xl font-semibold text-center text-gray-800 my-6">
          Best Seller
          </p>
        </div>
      </div>
      <BestSeller />

      <Baget2 />

      {/* ✅ Developer Section */}
      {/* <Profiles /> */}
    </div>
  );
};

export default Home;
