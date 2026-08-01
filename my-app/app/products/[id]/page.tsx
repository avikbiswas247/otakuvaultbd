// app/products/[id]/page.tsx
import { getProductById, getRelatedProducts } from "@/lib/repositories/product.repository";
import { notFound } from "next/navigation";
import ProductGallery from "./components/ProductGalery";
import ProductInformation from "./components/ProductInformation";
import ProductDescription from "./components/ProductDescription";
import ProductReview from "./components/ProductReview";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) return notFound();

  const product = await getProductById(productId);
  if (!product) return notFound();

  let relatedProducts: any[] = [];
  try {
    relatedProducts = await getRelatedProducts(product.series, product.id);
  } catch {
    relatedProducts = [];
  }

  // Map reviews if your product has them
  const reviews = product.reviews?.map((r: any) => ({
    username: r.user?.name || "Anonymous",
    comment: r.comment,
    rating: r.rating,
  })) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20">
        <Link href="/products" className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-10 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} />
          <ProductInformation product={product} />
          
        </div>

        
        <ProductReview reviews={reviews} />

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-violet-500 after:rounded-full pb-4 mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} className="group block bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-200 dark:hover:border-violet-800/50">
                  <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
                    <img src={item.images?.[0]?.image_url || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-1 text-sm sm:text-base">{item.name}</h3>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">৳{(Number(item.price) * (1 - Number(item.discount) / 100)).toFixed(2)}</span>
                      {item.discount > 0 && <span className="text-xs line-through text-neutral-400 dark:text-neutral-500">৳{Number(item.price).toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}