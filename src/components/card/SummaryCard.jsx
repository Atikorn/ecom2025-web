import React, { useState, useEffect } from "react";
import {
  listUserCart,
  saveAddress,
  getAddress,
} from "../../api/user";
import useEcomstore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const initialStateAddress = {
  fullName: "",
  phone: "",
  street: "",
  district: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  isDefault: true,
};

const SummaryCard = () => {
  const token = useEcomstore((state) => state.token);
  const selectedAddress = useEcomstore((state) => state.selectedAddress);
  const actionSelectedAddress = useEcomstore((state) => state.actionSelectedAddress);
  const actionGetShipping = useEcomstore((state) => state.actionGetShipping);
  
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [changColor, setChangColor] = useState(null); 
  const [shippingFee, setShippingFee] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('');
  const [address, setAddress] = useState(initialStateAddress);
  const [addresses, setAddresses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart();
    handleGetAddress();
  }, []);

  const handleGetUserCart = () => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => console.error(err));
  };

  const handleGetAddress = () => {
    getAddress(token)
      .then((res) => setAddresses(res.data.addresses))
      .catch((err) => console.error(err));
  };

  const handleOnChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSeclectedAddress = (item, index) => {
    actionSelectedAddress(item);
    setChangColor(index);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.street || !address.zipCode) {
      return toast.warning("Please fill in your address information complete");
    }

    try {
      await saveAddress(token, address);
      toast.success("Address Saved ✅");
      setAddress(initialStateAddress);
      handleGetAddress();
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoToPayment = () => {
    navigate("/user/payment");
  };

  const handleShippingChange =  async (price,value) => {
    setShippingFee(price);
    setShippingMethod(value);
    actionGetShipping(price,value)
  }
  // console.log(products)

  return (
    <div className="mx-auto p-5">
      <div className="flex gap-4">
        {/* Left: Address Section */}
        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg border shadow-md space-y-4">
            {!showForm ? (
              <>
                <h1 className="font-bold text-lg text-gray-800">📦 Saved Addresses</h1>
                {addresses.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSeclectedAddress(item, index)}
                    className={`flex justify-between items-center border-b pb-3 p-3 cursor-pointer rounded-md transition duration-300 hover:bg-blue-50 ${
                      changColor === index ? "bg-blue-100 border-blue-500" : ""
                    }`}
                  >
                    <div>
                      <p className="font-bold text-gray-800">{item.fullName}</p>
                      <p className="text-sm text-gray-600">{`${item.street}, ${item.district}, ${item.city}, ${item.state}, ${item.zipCode} - Phone: ${item.phone}`}</p>
                    </div>
                    {changColor === index && <span className="text-blue-500 font-bold">✔</span>}
                  </div>
                ))}
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-700 transition duration-300"
                  onClick={() => setShowForm(true)}
                >
                  Add Address
                </button>
              </>
            ) : (
              <form className="space-y-4" onSubmit={handleSaveAddress}>
                <h1 className="font-bold text-lg text-gray-800">🏡 Shipping Address</h1>
                {["fullName", "phone", "street", "district", "city", "state", "zipCode"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    name={field}
                    value={address[field]}
                    onChange={handleOnChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right: Order Summary Section */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-md border shadow-md space-y-4">
            <h1 className="text-lg font-bold text-gray-800">Your Order</h1>

            {/* Product List */}
            {products.map((item, index) => (
              <div key={index} className="flex justify-between items-end mb-4">
                <div>
                  <p className="font-bold text-gray-800">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Quantity : {item.count} x ฿{numberFormat(item.product.price)}
                  </p>
                </div>
                <div>
                  <p className="text-red-500 font-bold">฿{numberFormat(item.count * item.product.price)}</p>
                </div>
              </div>
            ))}

            <hr className="border-gray-300" />

            {/* Shipping Methods */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Shipping Method</p>
              <div className="space-y-2">
                {[
                  { id: "standard", name: "Standard (Free)", price: 0, value:'Standard' },
                  { id: "express", name: "Express (+50 THB)", price: 50, value:'Express' },
                  { id: "worldwide", name: "Worldwide (+100 THB)", price: 100, value:'Worldwide' },
                ].map((option) => (
                  <button
                    key={option.id}
                    className={`w-full p-3 text-left border rounded-lg transition-all flex justify-between items-center ${
                      shippingFee === option.price ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                    onClick={() => handleShippingChange(option.price,option.value)}
                  >
                    <span>{option.name}</span>
                    <span className="font-semibold text-gray-900">฿{option.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Shipping Fee:</p>
                <p>{numberFormat(shippingFee)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Discount:</p>
                <p>0.00</p>
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <p>Total Amount:</p>
              <p className="text-red-500 text-xl">฿{numberFormat(cartTotal + shippingFee)}</p>
            </div>

            <hr className="border-gray-300" />

            {/* Proceed to Payment Button */}
            <button
              onClick={handleGoToPayment}
              className={`bg-green-500 w-full p-3 rounded-md shadow-md text-white font-semibold transition-all ${
                changColor === null ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
              disabled={changColor === null}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
