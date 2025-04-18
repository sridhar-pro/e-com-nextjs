"use client";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser, useClerk } from "@clerk/nextjs"; 

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    cartItems,
    setCartItems,
    products,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const { user } = useUser(); 
  const { openSignIn } = useClerk(); 

  const fetchUserAddresses = async () => {
    const saved = JSON.parse(localStorage.getItem("user-addresses")) || [];
    setUserAddresses(saved);

    // 🔥 Auto-select last added address if available
    const autoSelected = localStorage.getItem("selected-address");
    if (autoSelected) {
      setSelectedAddress(JSON.parse(autoSelected));
      localStorage.removeItem("selected-address");
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    if (!user) {
      toast.error("You must be signed in to place an order");
      openSignIn(); // Open sign-in modal
      return;
    }
  
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
  
    const orderItems = Object.keys(cartItems).map((itemId) => {
      const product = products.find((p) => p._id === itemId);
      return {
        _id: product._id,
        name: product.name,
        image: product.image[0],
        price: product.offerPrice,
        quantity: cartItems[itemId],
        total: product.offerPrice * cartItems[itemId],
      };
    }).filter(item => item.quantity > 0); // 👈 filter out zero-quantity items
  
    if (orderItems.length === 0) {
      toast.error("No items in cart to place an order");
      return;
    }
  
    const order = {
      items: orderItems,
      address: selectedAddress,
      amount: getCartAmount() + Math.floor(getCartAmount() * 0.02),
      date: new Date().toISOString(),
    };
  
    const existingOrders = JSON.parse(localStorage.getItem("my-orders")) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem("my-orders", JSON.stringify(updatedOrders));
    setCartItems([]);
    toast.success("Order placed successfully!");
    router.push("/my-orders");
  };
  

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200">Order Summary</h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white dark:bg-black border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Promo Code</label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">Apply</button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
