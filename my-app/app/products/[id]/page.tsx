import { getProductById, getRelatedProducts } from "@/lib/repositories/product.repository";
import ProductGallery from "./components/ProductGalery";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Fetch related products (e.g., same series or type)
  // Adjust the function name / parameters to match your repository
  let relatedProducts: any[] = [];
  try {
    relatedProducts = await getRelatedProducts(product.series, product.id);
  } catch (e) {
    // If the function doesn't exist yet, this silently falls back to an empty array
    relatedProducts = [];
  }

  const discounted =
    Number(product.price) * (1 - Number(product.discount) / 100);

  return (
    <>
      {/* Back button + page wrapper that clears the navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 md:pt-28 md:pb-16">
        {/* Back to products link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#5F5F5F] dark:text-[#B0B0B0] hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors mb-8 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to products
        </Link>

        {/* Main product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} />

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Series badge */}
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-[#C1A68A]/10 text-[#C1A68A] dark:bg-[#C1A68A]/20 dark:text-[#C1A68A] mb-4 w-fit">
              {product.series}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#FAFAFA] leading-tight">
              {product.name}
            </h1>

            {/* Price Block */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold text-[#171717] dark:text-[#FAFAFA]">
                BDT{discounted.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-lg sm:text-xl line-through text-[#9CA3AF] dark:text-[#6B7280]">
                  ৳{product.price}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] ml-1">
                ({product.rating})
              </span>
            </div>

            {/* Details */}
            <div className="mt-8 space-y-2 text-sm sm:text-base text-[#171717] dark:text-[#FAFAFA]">
              <p>
                <span className="font-semibold">Series:</span> {product.series}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {product.type}
              </p>
              <p>
                <span className="font-semibold">Size:</span> {product.size}
              </p>
              <p>
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
            </div>

            {/* Description */}
            <p className="mt-8 leading-relaxed text-[#5F5F5F] dark:text-[#B0B0B0] text-sm sm:text-base max-w-prose">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="group relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#8B5CF6] text-white font-semibold text-sm sm:text-base shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 transition-all duration-300 hover:bg-[#7C3AED] hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                Add to Cart
              </button>

              <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-[#E6E3DE] dark:border-gray-600 text-[#171717] dark:text-[#FAFAFA] font-medium text-sm sm:text-base transition-all duration-300 hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 active:scale-95">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#FAFAFA] relative after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-[#8B5CF6] after:rounded-full pb-3 mb-10">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item: any) => {
                const itemDiscounted =
                  Number(item.price) * (1 - Number(item.discount) / 100);
                return (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    className="group block bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] bg-neutral-100 dark:bg-gray-800 relative overflow-hidden">
                      <img
                        src={item.images?.[0] || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#171717] dark:text-[#FAFAFA] line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#171717] dark:text-[#FAFAFA]">
                          ৳{itemDiscounted.toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-xs line-through text-[#9CA3AF] dark:text-[#6B7280]">
                            ৳{item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}