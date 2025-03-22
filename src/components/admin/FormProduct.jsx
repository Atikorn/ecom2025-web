import React, { useState, useEffect } from "react";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { numberFormat } from "../../utils/number";
import moment from "moment";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
  modelsId: "",
};
const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnchange = (e) => {
    // ตรวจสอบว่าเป็น input ที่ชื่อว่า price หรือ quantity และค่าที่กรอกเป็นตัวเลขที่ไม่ต่ำกว่า 0
    if (
      (e.target.name === "price" || e.target.name === "quantity") &&
      Number(e.target.value) < 0
    ) {
      return; // ถ้าเป็นค่าติดลบจะไม่ทำอะไร
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure, you want to delete")) {
      try {
        await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // console.log('GG',products)
  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Add Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.title}
            onChange={handleOnchange}
            placeholder="Product name"
            name="title"
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.description}
            onChange={handleOnchange}
            placeholder="Description"
            name="description"
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.price}
            onChange={handleOnchange}
            placeholder="Price"
            name="price"
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={form.quantity}
            onChange={handleOnchange}
            placeholder="Quantity"
            name="quantity"
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            name="categoryId"
            onChange={handleOnchange}
            value={form.categoryId}
          >
            <option value="" disabled>
              Please select category
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Uploadfile form={form} setForm={setForm} />
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-green-600"
        >
          Add Product
        </button>
      </form>

      <hr className="my-6" />

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3">No.</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Product Description</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Last Updated</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {currentProducts.map((item, index) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{indexOfFirstProduct + index + 1}</td>
              <td className="px-6 py-4">
                {item.images.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-lg shadow-md"
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4">{numberFormat(item.price)}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">
                {moment(item.updatedAt).format("LL")}
              </td>
              <td className="px-6 py-4 flex justify-center gap-3 text-center">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <Pencil />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormProduct;
