"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("my-orders")) || [];
    setOrders(saved.reverse()); // recent orders first
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 pb-24 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold mb-10 text-gray-800">
          My <span className="text-orange-600">Orders</span>
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition"
              >
                {/* Order Meta */}
                <div className="mb-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
                  <p>
                    <span className="font-medium text-gray-700">Order Date:</span>{" "}
                    {new Date(order.date).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Total:</span>{" "}
                    ₹{order.amount}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-5">
                  <p className="text-gray-700 font-medium mb-2">Order Summary</p>
                  <div className="space-y-2">
                    {Array.isArray(order.items) &&
                      order.items.map((item, idx) => {
                        if (!item || !item.name) return null;
                        return (
                          <div
                            key={idx}
                            className="flex justify-between text-sm bg-gray-100 px-4 py-2 rounded-md"
                          >
                            <span className="text-gray-800">{item.name} x {item.quantity}</span>
                            <span className="text-gray-700 font-medium">₹{item.total.toFixed(2)}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Address */}
                <div className="text-xs text-gray-500 leading-relaxed">
                  <p className="text-gray-700 font-medium mb-1">Shipping Info</p>
                  <p>
                    {order.address.fullName}, {order.address.area}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
