import React, { useState, useEffect } from 'react';
import useEcomStore from '../../store/ecom-store';
import { createModel, removeModel } from '../../api/model';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import { Plus } from 'lucide-react';

const FormModel = () => {
    const token = useEcomStore((state) => state.token);
    const modelData = useEcomStore((state) => state.modelData);
    const getModel = useEcomStore((state) => state.getModel);
    const categories = useEcomStore((state) => state.categories);
    const getCategory = useEcomStore((state) => state.getCategory);

    console.log(modelData)
    const [form, setForm] = useState({
        name: '',
        categoryId: '',
    });

    useEffect(() => {
        getModel(token);
        getCategory();
    }, [token, getModel, getCategory]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data before Submit:", form);

        // ตรวจสอบให้แน่ใจว่า form.name และ form.categoryId ไม่เป็นค่าว่าง
        if (!form.name || !form.categoryId) {
            toast.warning('Please fill all fields');
        } else {
            try {
                const res = await createModel(token, {
                    name: form.name,
                    categoryId: form.categoryId,
                });
                console.log(res.data.name);
                toast.success(`Add Model ${res.data.name} Success!`);
                getModel(token);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleRemove = async (id) => {
        console.log(id);
        try {
            const res = await removeModel(token, id);
            console.log(res);
            toast.success(`Deleted ${res.data.name} Success!`);
            getModel(token);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1>Model Management</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    value={form.name} // เชื่อมโยงกับ form.name
                    onChange={handleOnChange}
                    className='py-2 px-4 border-b'
                    placeholder="Enter model name"
                />
                <button
                    className='bg-green-500 rounded-md shadow-md text-white font-bold p-1 hover:scale-125 hover:duration-200 py-2 px-2 justify-center'>
                    <Plus />
                </button>

                <select
                    className='border'
                    name='categoryId'
                    value={form.categoryId} // เชื่อมโยงกับ form.categoryId
                    onChange={handleOnChange}
                    required
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </form>

            <hr />

            <ul className='list-none'>
                {
                    modelData.map((item, index) => (
                        <li className='flex justify-between my-2' key={index}>
                            <span>{item.name}</span>
                            <button
                                className='bg-red-400 rounded-md shadow-md p-1 hover:scale-125 hover:duration-200'
                                onClick={() => handleRemove(item.id)}
                            >
                                <Trash2 />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default FormModel;