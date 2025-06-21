import React from "react";

import ProductCard from "./ProductCard";
import { IProductEntity } from "oneentry/dist/products/productsInterfaces";
import { IProduct } from "@/types/product";


const ProductCatalog = ({ title, products }: { title: string; products: IProductEntity[] | IProduct[] }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product: IProductEntity | IProduct) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default ProductCatalog;
