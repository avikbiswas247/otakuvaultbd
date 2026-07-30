"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./components/Productcard";
import FilterSidebar from "./components/Filter";
import { getProducts } from "./services/product";
import { ProductWithImages } from "./types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [series, setSeries] = useState("All");
  const [type, setType] = useState("All");
  const [size, setSize] = useState("All");
  const [price, setPrice] = useState(100000);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productPrice = Number(product.price);

      return (
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (series === "All" || product.series === series) &&
        (type === "All" || product.type === type) &&
        (size === "All" || product.size === size) &&
        productPrice <= price
      );
    });
  }, [products, search, series, type, size, price]);

  const uniqueSeries = ["All", ...new Set(products.map((p) => p.series))];
  const uniqueTypes = ["All", ...new Set(products.map((p) => p.type))];
  const uniqueSizes = ["All", ...new Set(products.map((p) => p.size))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg font-semibold">
        Loading Products...
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-black dark:text-white py-8 sm:py-10 lg:py-14 relative top-[10vh]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div >
            <h1 className="text-3xl md:text-4xl font-bold">
              Products
            </h1>

            <p className="text-gray-500 mt-1">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

        </div>

        {/* Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}

          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 ">
              <FilterSidebar
                search={search}
                setSearch={setSearch}
                series={series}
                setSeries={setSeries}
                type={type}
                setType={setType}
                size={size}
                setSize={setSize}
                price={price}
                setPrice={setPrice}
                seriesList={uniqueSeries}
                typeList={uniqueTypes}
                sizeList={uniqueSizes}
              />
            </div>
          </aside>

          {/* Products */}

          <section className="lg:col-span-9">

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <h2 className="text-2xl font-semibold">
                  No Products Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing your filters.
                </p>
              </div>
            ) : (
              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-2
                  md:grid-cols-2
                  2xl:grid-cols-3
                  
                  gap-6
                "
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

          </section>

        </div>

      </div>

    </main>
  );
}
