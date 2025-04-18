"use client";

import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const AllProductsClient = () => {
  const { products, router } = useAppContext();
  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort") || "default";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

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

const filteredProducts = useMemo(() => {
    let filtered = [...products];
  
    // Inject random ratings if not present
    filtered = filtered.map((product) => ({
      ...product,
      rating: product.rating || { rate: Math.random() * 2 + 3 },
    }));
  
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search)
      );
    }
  
    if (sort === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filtered.sort((a, b) => b.rating?.rate - a.rating?.rate);
    }
  
    return filtered;
  }, [products, search, sort]);
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All Products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-xl px-6 py-2 w-full max-w-sm bg-white dark:bg-gray-900 mt-4">
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

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-12">No products found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllProductsClient;
