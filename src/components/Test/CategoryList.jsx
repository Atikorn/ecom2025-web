import React, { useState } from 'react';
import categories from '../Test/Categories';

const CategoryList = () => {
  // State สำหรับการเปิด/ปิด subcategory
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-gray-100 p-4 rounded-lg">
          {/* คลิกที่ Category เพื่อเปิด/ปิด Subcategories */}
          <button
            className="w-full text-left font-semibold text-lg text-blue-500"
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </button>

          {/* แสดง Subcategories เมื่อคลิกเปิด Category */}
          {openCategory === category.id && (
            <ul className="mt-2 space-y-2 pl-4">
              {category.subcategories.map((subcategory) => (
                <li
                  key={subcategory.id}
                  className="bg-white p-2 rounded-md shadow-sm cursor-pointer hover:bg-blue-100"
                >
                  {subcategory.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
