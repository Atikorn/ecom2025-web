import axios from "axios";

export const createProduct = async (token, form) => {
  // code body
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 100) => {
  // code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/products/" + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete("https://ecom2025-api-ecru.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProduct = async (token, id, form) => {
  // code body
  return axios.put("https://ecom2025-api-ecru.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  // code body
  //console.log('form api frontend',form)
  return axios.post(
    "https://ecom2025-api-ecru.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeFiles = async (token, public_id) => {
  // code body
  //console.log('form api frontend',form)
  return axios.post(
    "https://ecom2025-api-ecru.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const searchFilters = async (arg) => {
  // code body
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/search/filters", arg);
};
export const listproductBy = async (sort, order, limit) => {
  // code body
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/productby", {
    sort,
    order,
    limit,
  });
};
export const searchModels = async (arg) => {
  return axios.post(`https://ecom2025-api-ecru.vercel.app/api/search/model`, arg)

} //Latest Edited

export const ModelByCategorys = async (categoryId) => {
  return axios.get(`https://ecom2025-api-ecru.vercel.app/api/models/` + categoryId);

} //Latest Edited

export const ProductsByModels = async (modelsId) => {
  return axios.get(`https://ecom2025-api-ecru.vercel.app/api/products/model/` + modelsId,);

}

