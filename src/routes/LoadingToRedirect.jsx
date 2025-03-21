import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Nopermission from "../image/fail.gif";
import useEcomstore from "../store/ecom-store";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);
  const user = useEcomstore((state) => state.user)

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (count === 0 && user) {
      setRedirect(true);
    }
  }, [count, user]);
  

  if (redirect) {
    return <Navigate to={"/"} replace={true} />; // ใช้ replace เพื่อไม่ให้กด back แล้วกลับมา
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-4xl">
      <img src={Nopermission} className="w-80" alt="logo" />
      <br />
      <span>Unauthorized access. Redirecting in {count} seconds...</span>
    </div>
  );
};

export default LoadingToRedirect;
