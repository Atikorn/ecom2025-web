import axios from "axios";

export const payment = async (token) =>
    await axios.post(
      "https://ecom2025-api-ecru.vercel.app/api/user/create-payment-intent",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );