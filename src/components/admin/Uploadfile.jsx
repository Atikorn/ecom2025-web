import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomstore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
  //javascript
  const token = useEcomstore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnchange = (e) => {
    //code
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        //console.log(files[i])

        //validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`file ${file.name} ไม่ใช่รูปโว้ย`);
          continue;
        }
        // Image Resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint Backend
            uploadFiles(token, data)
              .then((res) => {
                // console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("Upload image Sucess!!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  // console.log(form);

  const handleDelete = (public_id) => {
    const images = form.images
    removeFiles(token,public_id)
    .then((res)=> {
        
        const filterImages = images.filter((item)=>{
            // console.log(item)
            return item.public_id !== public_id
        })

        // console.log('filterImages',filterImages)
        setForm({
            ...form,
            images: filterImages
        })
        toast.error(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  return (
    <div className="my-6">
  <div className="flex mx-4 gap-6 my-4 flex-wrap">
    {/* Loading Spinner */}
    {isLoading && (
      <div className="w-16 h-16 flex items-center justify-center">
        <Loader className="w-full h-full animate-spin" />
      </div>
    )}

    {/* Image Preview Section */}
    {form.images.map((item, index) => (
      <div className="relative group" key={index}>
        <img
          className="w-24 h-24 object-cover rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          src={item.url}
          alt={`Image ${index + 1}`}
        />
        <span
          onClick={() => handleDelete(item.public_id)}
          className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white cursor-pointer opacity-75 group-hover:opacity-100 transition duration-200"
        >
          X
        </span>
      </div>
    ))}
  </div>

  {/* File Input */}
  <div className="mt-4">
    <input
      onChange={handleOnchange}
      type="file"
      name="images"
      multiple
      className="border border-gray-300 rounded-md p-2 cursor-pointer"
    />
  </div>
</div>

  );
};

export default Uploadfile;
