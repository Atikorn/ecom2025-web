import axios from "axios";

export const createUserCart = async (token, carts) => {
  // code body
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/user/cart", carts, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveSelectedAddress = async (token, selectedAddress) => {
  // code body
  return axios.post(
    "https://ecom2025-api-ecru.vercel.app/api/user/order",
     selectedAddress ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const listUserCart = async (token) => {
  // code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const saveAddress = async (token, address) => {
  // code body
  return axios.post(
    "https://ecom2025-api-ecru.vercel.app/api/user/address",
     address ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const saveOrder = async (token, payload, selectAddress, trackingOrder,shipping,method) => {
  return axios.post(
    "https://ecom2025-api-ecru.vercel.app/api/user/order", 
    { ...payload, selectAddress,trackingOrder,shipping,method }, // รวม payload กับ selectAddress เข้าด้วยกันเพราะ axios รับพารามิเตอร์ได้แค่ 3 ตัวเท่านั้น
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getOrders = async (token) => {
  // code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAddress = async (token) => {
  //code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/user/address",{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
}


// export const createAddress = async (token, address) => {
//   // code body
//   return axios.post("https://ecom2025-api-ecru.vercel.app/api/user/address",address,{
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
