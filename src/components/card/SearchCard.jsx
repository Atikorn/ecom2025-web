import React, { useEffect, useState } from "react";
import useEcomstore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomstore((state) => state.getProduct);
  const products = useEcomstore((state) => state.products);
  const actionSearchFiltersProducts = useEcomstore((state) => state.actionSearchFiltersProducts);

  const getCategory = useEcomstore((state) => state.getCategory);
  const categories = useEcomstore((state) => state.categories);
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([0, 30000]);
  const [ok, setOk] = useState(false);

  // console.log(categories)
  useEffect(() => {
    getCategory();
  }, []);

  //step 1 Search Text
  //console.log(text)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFiltersProducts({ query: text });
      } else {
        getProduct();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  //step 2 Search by Category
  const handleCheck = (e) => {
    // console.log(e.target.value)
    const inCheck = e.target.value; // ค่าที่เรา ติ้ก
    const inState = [...categorySelected]; // [1,2,3] arry ว่าง
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอจะ  return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFiltersProducts({ category: inState });
    } else {
      getProduct();
    }
  };
  //console.log(categorySelected)

  //Step 3 Search by Price
  useEffect(() => {
    actionSearchFiltersProducts({ price });
  }, [ok]);
  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-xl font-bold mb-4">Search Product</h1>
  
  {/* Search by Text */}
  <div className="mb-6">
    <input
      className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search Product"
      type="text"
      onChange={(e) => setText(e.target.value)}
    />
  </div>

  <hr className="my-4" />

  {/* Search by Category */}
  <div className="mb-6">
    <h2 className="font-semibold text-lg mb-2">Product Categories</h2>
    <div>
      {categories.map((item, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <input 
            onChange={handleCheck} 
            value={item.id} 
            type="checkbox" 
            id={`category-${item.id}`}
          />
          <label htmlFor={`category-${item.id}`} className="text-sm">{item.name}</label>
        </div>
      ))}
    </div>
  </div>

  <hr className="my-4" />

  {/* Search by Price */}
  <div>
    <h2 className="font-semibold text-lg mb-2">Price Range</h2>
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Min : {numberFormat(price[0])}</span>
        <span>Max : {numberFormat(price[1])}</span>
      </div>

      <Slider
        onChange={handlePrice}
        range
        min={0}
        max={100000}
        defaultValue={[0, 30000]}
      />
    </div>
  </div>
</div>

  );
};

export default SearchCard;
