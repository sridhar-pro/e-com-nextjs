import { Suspense } from "react";
import AllProductsClient from "./AllProductsClient";

const AllProductsPage = () => {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <AllProductsClient />
    </Suspense>
  );
};

export default AllProductsPage;
