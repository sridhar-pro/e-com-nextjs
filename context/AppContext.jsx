'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();
  const { user } = useUser();

  const [products, setProducts] = useState([]);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});

  // Fetch product data from Fake Store API
  const fetchProductData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const updatedData = data.map((item) => ({
        ...item,
        _id: item.id.toString(), // Matching your routing logic
        offerPrice: item.price,
        name: item.title,
        description: item.description,
        image: [item.image], // Matching product.image[0] structure
      }));

      setProducts(updatedData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Cart functions
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const updateCartQuantity = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      if (itemInfo && cartItems[item] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const value = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
