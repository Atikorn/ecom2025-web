import React, { useEffect, useState,navigate } from "react";
import { getOrdersAdmin, changeOrdersStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const TableOrders = () => {
  const actionAdminReceipt = useEcomStore((state) => state.actionAdminReceipt)
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  
  const navigate = useNavigate();

  // console.log(orders)

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrdersStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("Update Order Status Completed");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process": return 'bg-gray-300';
      case "Processing": return 'bg-blue-300';
      case "Completed": return 'bg-green-300';
      case "Cancelled": return 'bg-red-300';
      default: return '';
    }
  };

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  //Receipt
  const handleClickReceipt = (item) =>{
    navigate('/admin/orders/receipt')
    actionAdminReceipt(item)
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-50 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Method</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Update Status</th>
              <th className="py-3 px-6">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="text-center py-4 px-6">{indexOfFirstOrder + index + 1}</td>
                <td className="text-center">{item.orderedBy.email}</td>
                <td className="text-center">{moment(item.createdAt).format('LL')}</td>
                <td className="text-center">
                  {item.products.map((product, idx) => (
                    <p key={idx}>{product.product.title} ({product.count}x {numberFormat(product.product.price)})</p>
                  ))}
                </td>
                <td className="text-center">{item.method?item.method : 'N/A'}</td>
                <td className="text-center">{numberFormat(item.cartTotal + item.shippingFee)}</td>
                <td className="text-center">{item.address ? `${item.address.street}, ${item.address.city}` : "No address"}</td>
                <td className="text-center"><span className={`${getStatusColor(item.orderStatus)} px-3 py-1 rounded-full`}>{item.orderStatus}</span></td>
                <td className="text-center">
                  <select
                    value={item.orderStatus}
                    onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                    className="border rounded-md p-2"
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="text-center">
                  <button onClick={() =>handleClickReceipt (item)} className="px-4 py-2 bg-indigo-600 text-white rounded-md mx-1">Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableOrders;
