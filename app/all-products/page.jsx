"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const AllProducts = () => {
  const { products } = useAppContext();
  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort") || "default";

  // Filter + Sort products based on query
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search)
      );
    }

    // Sort
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

export default AllProducts;
