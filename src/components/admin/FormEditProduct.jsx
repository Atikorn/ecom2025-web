import React, { useState, useEffect } from "react";
import useEcomstore from "../../store/ecom-store";
import { createProduct,listProduct,readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from 'react-router-dom';


const initialState = {
  title: "RTX 7090 Super Ti",
  description: "desc",
  price: 200,
  quantity: 5,
  categoryId: '',
  images: [],
  modelsId: '',
}
const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getModel = useEcomStore((state) => state.getModel)
  const modelData = useEcomstore((state) => state.modelData)
  
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    //code
    getCategory();
    fetchProduct(token,id,form)
    getModel()
  }, []);


  const fetchProduct = async(token,id,form)=>{
    try{
      //code
      const res = await readProduct(token,id,form)
      // console.log('res from backend',res)
      setForm(res.data)
    }catch(err){
      console.log('Err fetch data',err)
    }
  }
  
  



  const handleOnchange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(token, id, form);
      // console.log(res);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };
  
  // console.log(categories)

  const IU = form.category?.name

  // console.log('IU',IU);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add Product</h1>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
          Product Name
        </label>
        <input
          id="title"
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.title}
          onChange={handleOnchange}
          placeholder="Title"
          name="title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
          Product Description
        </label>
        <input
          id="description"
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.description}
          onChange={handleOnchange}
          placeholder="Description"
          name="description"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="price">
          Price
        </label>
        <input
          id="price"
          type="number"
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.price}
          onChange={handleOnchange}
          placeholder="Price"
          name="price"
        />
      </div>
    </div>

    <div>
      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
        Quantity
        </label>
        <input
          id="quantity"
          type="number"
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.quantity}
          onChange={handleOnchange}
          placeholder="Quantity"
          name="quantity"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="categoryId">
        Categories
        </label>
        <select
                    className='mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500'
                    name='categoryId'
                    onChange={handleOnchange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }

                </select>
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="categoryId">
        Model
        </label>
        <select
          className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          name="modelsId"
          onChange={handleOnchange}
          required
          value={form.modelsId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {modelData.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div> */}
    </div>

    <div className="col-span-2">
      <hr className="my-6" />
      {/* Upload file */}
      <div>
        <Uploadfile form={form} setForm={setForm} />
      </div>
    </div>

    <div className="col-span-2 flex justify-end">
      {/* Submit Button */}
      <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200">
        Edit Product
      </button>
    </div>

    <hr className="my-6" />
  </form>
</div>
  );
};

export default FormEditProduct;
