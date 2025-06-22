"use client";

import {  useEffect } from "react";


import { ShoppingCart, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import ProductCatalog from "@/components/ProductCatalog ";
import useProduct from "@/hooks/useProduct";

export default function ProductDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ productId: string }>;
    }) {
    const {handleAddToCart,isLoading,product,relatedProducts,router,setProductId} = useProduct();
    useEffect(() => {
      const unwrapParams = async () => {
        const { productId } = await paramsPromise;

        setProductId(productId);
      };

      unwrapParams();
    }, [paramsPromise, setProductId]);


  if (isLoading) {
    return (
      <div className=" flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <button
          className="mb-8 flex items-center text-purple-500 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>

        {/* Product details */}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg ">
            <img
              src={product?.attributeValues.p_image.value.downloadLink}
              alt={product?.attributeValues.p_title.value || "Product Image"}
              className="object-contain w-full max-h-[400px] transition-transform duration-300 transform hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {product?.attributeValues.p_title.value}
            </h1>

            <p className="text-xl font-semibold text-gray-700">
              ${product?.attributeValues.p_price.value.toFixed(2)}
            </p>

            <div
              className="text-gray-500"
              dangerouslySetInnerHTML={{
                __html:
                  product?.attributeValues.p_description.value[0].htmlValue,
              }}
            />

            <div className="flex space-x-4">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related products */}

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <ProductCatalog
              title="Related Products"
              products={relatedProducts}
            />
          </section>
        )}
      </main>
    </div>
  );
}
