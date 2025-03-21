import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomstore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";

const Shop = () => {
  const getProduct = useEcomstore((state) => state.getProduct);
  const products = useEcomstore((state) => state.products);
  const [open, setOpen] = useState(false);
  
  const itemsPerPage = 20; // จำนวนสินค้าที่จะแสดงในแต่ละหน้า
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="w-screen h-screen flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/5 h-full p-3 bg-gray-100 shadow-lg overflow-y-auto">
          <SearchCard />
        </div>

        {/* Product Section */}
        <div className="flex-1 h-full p-6 overflow-y-auto bg-gray-100">
          <p className="text-3xl font-bold text-gray-800 mb-6">All Products</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentItems.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartCard open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Shop;
