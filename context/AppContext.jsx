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
  const [isLoading, setIsLoading] = useState(true); // Add loader state
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const updatedData = data.map((item) => ({
        ...item,
        _id: item.id.toString(),
        offerPrice: item.price,
        name: item.title,
        description: item.description,
        image: [item.image],
        rating: {
          rate: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          count: Math.floor(Math.random() * 500) + 50,
        },
      }));

      setProducts(updatedData);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  // 🛑 Return a fallback while loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 ml-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 ml-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
        </div>
      </div>
    );
  }
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
