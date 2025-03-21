import React, { useEffect, useState } from "react";
import useEcomstore from "../../store/ecom-store";
import { getListAllUser, getOrdersAdmin } from "../../api/admin";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DashboardTest = () => {
  const token = useEcomstore((state) => state.token);
  const getProduct = useEcomstore((state) => state.getProduct);
  const products = useEcomstore((state) => state.products);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  
  useEffect(() => {
    handleGetUsers(token);
    handleGetOrder(token);
    getProduct(100);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
        const earnings = res.data.reduce((total, order) => total + order.cartTotal, 0);
        setTotalEarnings(earnings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getOrderStatusCount = (status) => {
    return orders.filter(order => order.orderStatus === status).length;
  };

  const getBestSellingProduct = () => {
    const soldItems = products.map(product => ({
      title: product.title,
      sold: product.sold,
    }));
    const bestSelling = soldItems.sort((a, b) => b.sold - a.sold)[0];
    return bestSelling;
  };

  const bestSellingProduct = getBestSellingProduct();

  const orderData = [
    { name: "Processing", value: getOrderStatusCount("Processing"), color: "#60A5FA" },
    { name: "Shipped", value: getOrderStatusCount("Shipped"), color: "#FACC15" },
    { name: "Completed", value: getOrderStatusCount("Completed"), color: "#22C55E" },
  ];

  const productData = products.map(product => ({ name: product.title, value: product.sold }));

  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Users</p>
        <p className="text-3xl font-bold text-gray-900">{users.length}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Orders</p>
        <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Products</p>
        <p className="text-3xl font-bold text-gray-900">{products.length}</p>
      </div>

      <div className="col-span-2 bg-white p-6 rounded-xl shadow-md min-h-[200px]">
        <p className="text-gray-500">Order Statistics</p>
        <PieChart width={400} height={300}>
          <Pie data={orderData} cx="50%" cy="50%" outerRadius={80} label>
            {orderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md min-h-[200px]">
        <p className="text-gray-500">Best Selling Product</p>
        <PieChart width={400} height={300}>
          <Pie data={productData} cx="50%" cy="50%" outerRadius={80} label>
            {productData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md min-h-[200px]">
        <p className="text-gray-500">Earnings</p>
        <p className="text-3xl font-bold text-gray-900">฿{totalEarnings}</p>
      </div>
    </div>
  );
};

export default DashboardTest;