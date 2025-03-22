import React, { useState, useEffect } from "react";
import useEcomstore from "../store/ecom-store";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(null);
  const user = useEcomstore((state) => state.user);
  const token = useEcomstore((state) => state.token);

  useEffect(() => {
    console.log("User:", user, "Token:", token); // ตรวจสอบค่าที่ได้

    if (!user || !token) {
      setOk(false);
      return;
    }

    let timeout = setTimeout(() => {
      console.warn("Timeout: API is taking too long...");
      setOk(false);
    }, 5000);

    currentUser(token)
      .then((res) => {
        console.log("API Response:", res); // ดูค่าที่ API ตอบกลับ
        clearTimeout(timeout);
        setOk(true);
      })
      .catch((err) => {
        console.error("API Error:", err); // ดู error ที่เกิดขึ้น
        clearTimeout(timeout);
        setOk(false);
      });

    return () => clearTimeout(timeout);
  }, [user, token]);

  if (ok === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
          <p className="mt-4 text-lg text-indigo-600 font-semibold">
            AP Ecommerce
          </p>
        </div>
      </div>
    );
  }

  if (ok === false) {
    return <LoadingToRedirect />;
  }

  return element;
};

export default ProtectRouteUser;
