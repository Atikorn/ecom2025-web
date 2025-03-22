import React, { useRef } from "react";
import useEcomstore from "../../store/ecom-store";
import moment from "moment";
import { numberFormat } from "../../utils/number";
import { Download } from 'lucide-react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Receipt = () => {
    
  const receipt = useEcomstore((state) => state.receipt);
  const receiptRef = useRef(null); // อ้างอิงไปยังใบเสร็จ

  const downloadPDF = () => {
    const input = receiptRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Receipt-${receipt.trackingOrder}.pdf`);
    });
  };

  return (
    <div className="bg-gray-100 p-4">
      <div 
        ref={receiptRef} // ผูกกับ ref
        className="bg-white border rounded-lg shadow-lg px-6 py-6 max-w-md mx-auto"
      >
        <h1 className="font-bold text-2xl my-4 text-center text-indigo-600">
          AP E-commerce
        </h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-bold">Receipt</h2>
          <div className="text-gray-700 text-end">
            <div>Date: {moment(receipt.updatedAt).format("LL")}</div>
            <div>Track ID #: {receipt.trackingOrder}</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To: </h2>
          <div className="text-gray-700">{receipt?.address?.fullName || "N/A"}</div>
          <div className="text-gray-700">{receipt?.address?.street || "N/A"}</div>
          <div className="text-gray-700">
            {receipt?.address?.state || ""} {receipt?.address?.zipCode || ""}
          </div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {receipt?.products?.map((item, index) => (
              <tr key={index}>
                <td className="text-left text-gray-700">Product : {item.product.title}</td>
                <td className="text-right text-gray-700">฿ {numberFormat(item.price)}</td>
              </tr>
            ))}
            <tr>
              <td className="text-left text-gray-700">Shipping Fee : {receipt?.method}</td>
              <td className="text-right text-gray-700">฿ {numberFormat(receipt?.shippingFee || 0)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                ฿ {numberFormat(receipt.cartTotal + receipt.shippingFee)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-between">
          <div className="w-1/1">
            <div className="text-gray-700 mb-2">Thank you for your business!</div>
            <div className="text-gray-700 text-sm">Your satisfaction is our priority.</div>
          </div>
          <button onClick={downloadPDF}>
            <Download className="w-11 h-11 text-indigo-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
