'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddAddress = () => {
  const router = useRouter();

  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("user-addresses")) || [];
    const updated = [...existing, address];

    localStorage.setItem("user-addresses", JSON.stringify(updated));
    localStorage.setItem("selected-address", JSON.stringify(address)); // 🔥 auto-select logic here

    router.push("/cart"); // or "/checkout" if that’s where OrderSummary is
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping <span className="font-semibold text-orange-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <input
              className="input-style"
              type="text"
              placeholder="Full name"
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              value={address.fullName}
              required
            />
            <input
              className="input-style"
              type="text"
              placeholder="Phone number"
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
              value={address.phoneNumber}
              required
            />
            <input
              className="input-style"
              type="text"
              placeholder="Pin code"
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              value={address.pincode}
              required
            />
            <textarea
              className="input-style resize-none"
              rows={4}
              placeholder="Address (Area and Street)"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
              required
            ></textarea>
            <div className="flex space-x-3">
              <input
                className="input-style"
                type="text"
                placeholder="City/District/Town"
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                value={address.city}
                required
              />
              <input
                className="input-style"
                type="text"
                placeholder="State"
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                value={address.state}
                required
              />
            </div>
          </div>
          <button type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase">
            Save address
          </button>
        </form>
        <Image className="md:mr-16 mt-16 md:mt-0" src={assets.my_location_image} alt="my_location_image" />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
