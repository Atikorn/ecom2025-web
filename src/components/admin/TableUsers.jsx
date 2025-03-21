import React, { useState, useEffect } from "react";
import {
  getListAllUser,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomstore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomstore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // console.log(users)

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangUserStatus = (userId, userStatus) => {
    const value = { id: userId, enabled: !userStatus };
    changeUserStatus(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("Update Status Success");
      })
      .catch((err) => console.log(err));
  };

  const handleChangUserRole = (userId, userRole) => {
    const value = { id: userId, role: userRole };
    changeUserRole(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("Update Role Success");
      })
      .catch((err) => console.log(err));
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          User Management
        </h1>
      </div>

      <table className="w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left">No.</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item, index) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="py-4 px-6">{indexOfFirstUser + index + 1}</td>
              <td className="py-4 px-6">{item.email}</td>
              <td className="py-4 px-6">
                <select
                  onChange={(e) => handleChangUserRole(item.id, e.target.value)}
                  value={item.role}
                  className="border border-gray-300 rounded-md p-2 w-32"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="py-4 px-6">
                {item.enabled ? "Active" : "Inactive"}
              </td>
              <td className="py-4 px-6">
                <button
                  className={`${
                    item.enabled
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white py-2 px-4 rounded-md shadow-md transition duration-300`}
                  onClick={() => handleChangUserStatus(item.id, item.enabled)}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableUsers;
