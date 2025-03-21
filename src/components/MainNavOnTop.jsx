import React from 'react'

const MainNavOnTop = () => {
  
    return (
      <div className="bg-indigo-600 py-0.5">
        <div className="container mx-auto flex justify-between items-center px-6 text-white text-sm md:text-base">
          
          {/* เบอร์โทร */}
          <div>
            <p className=""> +099-999-9999</p>
          </div>
  
          {/* โปรโมชั่น */}
          <div className="hidden md:flex">
            <p className="">🔥 Get 50% off on selected items!</p>
          </div>
  
          {/* ภาษา */}
<div>
  <p className="cursor-pointer hover:underline">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png" alt="USA Flag" className="inline-block w-5 h-4 mr-2" />
    language | Eng
  </p>
</div>

        </div>
      </div>
    );
  };
  

export default MainNavOnTop