//rafce

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useEcomstore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "motion/react";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomstore((state) => state.actionAddtoCart);
  // console.log(item)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="group relative bg-white border rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-200">
        {/* Image Section */}
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
              alt="Product Image"
            />
          ) : (
            <div className="w-full h-30 bg-gray-200 rounded-md text-center flex items-center justify-center shadow-md">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 truncate">{item.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900">{numberFormat(item.price)}</p>
            <button
              onClick={() => actionAddtoCart(item)}
              className="mt-2 bg-blue-500 text-white rounded-full p-2 shadow-lg transform hover:bg-blue-600 transition duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
