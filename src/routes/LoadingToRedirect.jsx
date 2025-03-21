import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Nopermission from "../image/fail.gif";
import useEcomstore from "../store/ecom-store";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);
  const user = useEcomstore((state) => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval); // หยุด interval ถ้านับถึง 0
          setRedirect(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (redirect) {
    return <Navigate to={"/"} replace={true} />; // ใช้ replace เพื่อป้องกันการกด back แล้วกลับมา
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
