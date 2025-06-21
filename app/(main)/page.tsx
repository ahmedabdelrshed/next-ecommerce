"use client";
import { getCatalogWithProducts } from '@/actions/catalog/getCatalogWithProducts';
import ProductCatalog from '@/components/ProductCatalog ';
import { Button } from '@/components/ui/button';
import { ICatalog } from '@/types/catalog';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [products, setProducts] = useState<ICatalog[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const catalogs = await getCatalogWithProducts();

      

      if (Array.isArray(catalogs)) {
        const validCatalogs: ICatalog[] = catalogs
          .filter(
            (catalog) =>
              catalog.catalogProducts &&
              'items' in catalog.catalogProducts &&
              Array.isArray(catalog.catalogProducts.items)
          )
          .map((catalog) => ({
            ...catalog,
            catalogProducts: {
              ...catalog.catalogProducts,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              items: (catalog.catalogProducts ).items.map((item: any) => ({
                ...item,
                id: String(item.id),
              })),
            },
          }));
        setProducts(validCatalogs);
      }

      setIsLoading(false);
    };

    getData();
  }, []);
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 ">
          <div className="relative overflow-hidden rounded-lg shadow-lg ">
            <div className="w-full h-[400px] relative">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent z-3">
                  Welcome to our Store!
                </h2>

                <p className="text-xl mb-8 text-gray-700 z-4">
                  Discover the latest trends and exclusive deals on your
                  favorite products. Shop now and enjoy a seamless shopping
                  experience!
                </p>

                <img
                  src="https://img.freepik.com/premium-photo/electronics-store-professional-consultant-shows-latest-tvs-young-man-they-talk-about-specifications-what-model-is-best-young-mans-home-store-is-bright-has-latest-models_861143-3324.jpg?semt=ais_hybrid&w=740"
                  alt="Hero Image"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 z-1"
                />

                <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white z-2 cursor-pointer">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
          </div>
        )}

        {products.map((catalog) => (
          <ProductCatalog
            key={catalog?.id}
            title={catalog?.localizeInfos?.title as string}
            products={catalog.catalogProducts.items}
          />
        ))}
      </main>
    </div>
  );
}

export default HomePage