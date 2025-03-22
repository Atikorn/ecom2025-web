//rafce
import React from "react";
import { ShoppingCart } from "lucide-react";
import DashboardTest from "../../components/admin/DashboardTest";

const Dashboard = () => {
  return (
    // <>
    // <DashboardTest/>
    // </>
    <div className="flex flex-col justify-center items-center h-full bg-gray-100 relative">
      {/* พื้นที่สำหรับรูปพื้นหลัง */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://i.namu.wiki/i/mClnTvRT_9QMJRIBZZyf8mqghMKkJPiPGqhFv1qhuphr9YImasmOQloINUUNRpLc5BAi5FfBOL9ETYA99v-ZLQ.svg')",
          backgroundSize: "contain", // ปรับให้ภาพพอดีกับขนาดพื้นที่
          backgroundRepeat: "no-repeat", // ป้องกันการทำซ้ำของภาพ
          backgroundPosition: "center center", // จัดกึ่งกลางให้พอดี
        }}
      ></div> */}

      {/* โลโก้ + ชื่อ */}
      <div className="flex items-center gap-6 z-10 animate-fadeIn">
        <h1 className="text-8xl font-extrabold opacity-80 text-gray-600  drop-shadow-lg">
          AP E-COMMERCE
        </h1>
      </div>

      {/* GOVERNMENT ข้างล่าง */}
      {/* <p className="text-7xl font-extrabold opacity-80 text-gray-600  drop-shadow-lg">
        GOVERNMENT
      </p> */}
    </div>
  );
};

export default Dashboard;
