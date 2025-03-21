import { React, useState, useEffect } from "react";
import useEcomstore from "../store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(null); // ใช้ null แทน false เพื่อแยก loading state
  const user = useEcomstore((state) => state.user);
  const token = useEcomstore((state) => state.token);

  useEffect(() => {
    if (!user || !token) return; // ถ้า user หรือ token ยังไม่มา อย่าพึ่งเช็ค
    currentAdmin(token)
      .then(() => setOk(true))
      .catch(() => setOk(false));
  }, [user, token]); 

  if (ok === null) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-700 font-semibold">
          Checking permissions...
        </p>
      </div>
    );
  }
  

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
