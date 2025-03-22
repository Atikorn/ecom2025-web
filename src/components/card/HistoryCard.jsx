import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomstore from "../../store/ecom-store";
import moment from "moment";
import { numberFormat } from "../../utils/number";
import { CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryCard = () => {
  const actionReceipt = useEcomstore((state) => state.actionReceipt)
  const token = useEcomstore((state) => state.token);
  const [orders, setOrders] = useState([]);
  
  // ⏩ State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // จำนวนคำสั่งซื้อต่อหน้า
  const navigate = useNavigate();

  // console.log(orders)

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.error("Error details: ", err);
      });
  };

  const handleClickInvoice = (item) =>{
    navigate('/user/receipt')
    actionReceipt(item)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-500";
      case "Processing":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6 p-5 bg-gray-100">
      <div className="flex gap-2 items-center justify-center">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Order History
        </h1>
        <CalendarCheck className="items-center" />
      </div>

      {/* คลุมทั้งหมด */}
      <div className="space-y-6">
        {/* Card Loop Order */}
        {currentOrders.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
            >
              {/* Header in Card */}
              <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
                {/* วันที่สั่งซื้อ */}
                <div className="flex items-center gap-2">
                  <p className="text-md text-gray-500">Order date:</p>
                  <p className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
                    {moment(item.updatedAt).format("LL")}
                  </p>
                </div>

                {/* Tracking Order */}
                <div className="flex items-center gap-2">
                  <p className="text-md text-gray-700">Tracking No:</p>
                  <p className="text-xl font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-lg shadow-sm">
                    {item.trackingOrder}
                  </p>
                </div>

                {/* สถานะคำสั่งซื้อ */}
                <div>
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} text-white px-4 py-2 rounded-full text-sm font-medium`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>

              {/* Table in Card Loop Product */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-indigo-200">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Address
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Method
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-t border-gray-200 hover:bg-indigo-50"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {product.product.title}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            ฿{numberFormat(product.product.price)}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {product.count}
                          </td>

                          {/* การแสดงที่อยู่ */}
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.address ? (
                              <>
                                <p>{item.address.fullName}</p>
                                <p>
                                  {item.address.street}, {item.address.district}
                                </p>
                                <p>
                                  {item.address.city}, {item.address.state}
                                </p>
                                <p>{item.address.zipCode}</p>
                              </>
                            ) : (
                              <span className="text-red-500">No Address</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-sm text-gray-600">
                            {item.method? item.method : "N/A"}
                          </td>

                          <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                            ฿{numberFormat(product.count * product.product.price)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total in Card */}
              <div className="mt-4 flex justify-between">
                <div>
                  <button onClick={() => handleClickInvoice(item)} className="px-4 py-2 bg-indigo-600 text-white rounded-md mx-1">View Receipt</button>
                </div>
               <div>
                <p className="text-gray-600 text-right">Shipping Fee: {numberFormat(item.shippingFee)} ฿</p>
                <p className="text-gray-600 text-right">Subtotal</p>
                <p className="text-2xl font-bold text-gray-800 text-right">
                  {numberFormat(item.cartTotal + item.shippingFee)} ฿
                </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
<div className="flex justify-center mt-6">
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md disabled:opacity-50"
  >
    Prev
  </button>

  {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
    <button
      key={index}
      onClick={() => paginate(index + 1)}
      className={`px-4 py-2 ${
        currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
      } rounded-md mx-1`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default HistoryCard;
