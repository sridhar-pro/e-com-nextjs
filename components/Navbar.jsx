"use client";
import React, { useState, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  // Handle theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Navigate on search or sort change
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.length > 0 || sortOrder !== "default") {
        router.push(
          `/all-products?search=${encodeURIComponent(searchTerm)}&sort=${sortOrder}`
        );
      }
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [searchTerm, sortOrder]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <span
        className="cursor-pointer text-2xl md:text-3xl font-bold hover:text-orange-700 uppercase italic"
        onClick={() => router.push("/")}
      >
        <span className="text-orange-600">E</span>-
        <span className="text-black dark:text-white">cart</span>
      </span>

      <div className="flex items-center ml-48 gap-4 lg:gap-8 max-md:hidden uppercase dark:text-white">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        {/* <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link> */}
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>
      </div>

      <button
        onClick={toggleDarkMode}
        className="flex items-center ml-60 mr-2 md:ml-12 md:mr-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-full transition-colors"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      <ul className="hidden md:flex items-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-xl px-6 py-2 w-full max-w-sm bg-white dark:bg-gray-900">
          <Image
            className="w-4 h-4 text-gray-500"
            src={assets.search_icon}
            alt="search icon"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="ml-2 w-full outline-none text-sm text-gray-700 placeholder-gray-400 dark:bg-gray-900 dark:text-white bg-transparent rounded-md"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-2 text-sm border border-gray-300 rounded-md px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="default">Sort</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon />}
                onClick={() => router.push("/home")}
              />
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<CartIcon />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BagIcon />}
                onClick={() => router.push("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
