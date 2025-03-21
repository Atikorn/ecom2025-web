import React from "react";
import axios from "axios";

export const getOrdersAdmin = async (token) => {
  // code body
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrdersStatus = async (token, orderId, orderStatus) => {
  // code body
  return axios.put(
    "https://ecom2025-api-ecru.vercel.app/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//ทำข้ามไว้ก่อน
export const getListAllUser = async (token) => {
  return axios.get("https://ecom2025-api-ecru.vercel.app/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const changeUserStatus = async (token, value) => {
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/change-status", value, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const changeUserRole = async (token, value) => {
  return axios.post("https://ecom2025-api-ecru.vercel.app/api/change-role", value, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
// export const searchFiltersEmail = async (token, arg) => {
//   return axios.post("https://ecom2025-api-ecru.vercel.app/api/", arg, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

const admin = () => {
  return <div>admin</div>;
};

export default admin;
