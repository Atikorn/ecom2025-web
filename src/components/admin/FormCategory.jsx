import React, { useState,useEffect }from 'react'
import { createCategory,listCategory,removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from "react-toastify";


const FormCategory = () => {
    //javascript
    const token = useEcomStore((state)=>state.token)
    const [name,setName] = useState('')
    //const [categories, setCategories] = useState([])
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)
    

    useEffect(()=>{
        getCategory(token)
    },[])

    
    const handleSubmit = async(e)=>{
        //code
        e.preventDefault()
        if(!name){
            return toast.warning('Please fill date')
        }
        try{
            const res = await createCategory(token,{name})
            // console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        }catch(err){
            console.log(err)
        }
    }
    const handleRemove = async(id)=>{
        // code
        // console.log(id)
        try{
            const res = await removeCategory(token,id)
            // console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory(token)
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Management</h1>

  {/* Form to add category */}
  <form className="mb-6" onSubmit={handleSubmit}>
    <div className="flex items-center space-x-4">
      <input 
        name="Add"
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-80"
        type="text"
        placeholder="Enter category name"
        required
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Category
      </button>
    </div>
  </form>

  <hr className="my-4" />

  {/* Category list */}
  <ul className="list-none space-y-4">
    {categories.map((item, index) => (
      <li 
        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
        key={index}
      >
        <span className="text-gray-700 text-lg font-medium">{item.name}</span>

        <button
          onClick={() => handleRemove(item.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
</div>

  )
}

export default FormCategory