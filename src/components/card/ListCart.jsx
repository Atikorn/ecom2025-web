import React from "react";
import { List } from "lucide-react";
import useEcomstore from "../../store/ecom-store";
import { Link, Links, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomstore((state) => state.carts);
  const user = useEcomstore((state) => state.user);
  const token = useEcomstore((state) => state.token);
  const getTotalPrice = useEcomstore((state) => state.getTotalPrice);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        // console.log(res);
        toast.success("Add to Cart Success");
        navigate("/checkout"); // ย้ายเข้าไปใน then()
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-sm p-6">
  {/* Header */}
  <div className="flex gap-4 mb-6 items-center">
    <List size={38} />
    <p className="text-2xl font-bold text-gray-800">Shopping Cart ({cart.length} item)</p>
  </div>

  {/* List */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Left */}
    <div className="col-span-2 space-y-4">
      {/* Card */}
      {cart.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4 hover:shadow-lg transition-all duration-300">
          {/* Row 1 */}
          <div className="flex justify-between mb-4">
            {/* Left */}
            <div className="flex gap-4 items-center">
              {item.images && item.images.length > 0 ? (
                <img
                  className="w-16 h-16 rounded-md object-cover"
                  src={item.images[0].url}
                  alt={item.title}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div>
                <p className="font-bold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">
                  {numberFormat(item.price)} x {numberFormat(item.count)}
                </p>
              </div>
            </div>
            {/* Right */}
            <div className="font-bold text-blue-500">
              {numberFormat(item.price * item.count)}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Right */}
    <div className="bg-white p-6 rounded-md shadow-md space-y-6">
      <p className="text-2xl font-bold text-gray-800">Total</p>
      <div className="flex justify-between text-lg">
        <span className="text-gray-700">Subtotal</span>
        <span className="text-2xl font-bold text-gray-900">
          {numberFormat(getTotalPrice())}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {user ? (
          <Link>
            <button
              disabled={cart.length < 1}
              onClick={handleSaveCart}
              className="bg-red-500 w-full rounded-md text-white shadow-md py-2 hover:bg-red-700 transition-colors duration-300"
            >
              Checkout
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 w-full rounded-md text-white shadow-md py-2 hover:bg-blue-700 transition-colors duration-300">
              Login
            </button>
          </Link>
        )}

        <Link to="/shop">
          <button className="bg-gray-500 w-full rounded-md text-white shadow-md py-2 hover:bg-gray-700 transition-colors duration-300">
          Edit Cart
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default ListCart;
