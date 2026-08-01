"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/cart/service/cart";
import WishlistButton from "@/app/wishlist/component/WishlistButton";

type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  series: string;
  type: string;
  size: string;
  stock: number;
  description: string;
};

type Props = {
  product: Product;
};

export default function ProductInformation({ product }: Props) {
  return (
    <div className="space-y-6">
                  <div className="flex flex-col justify-center">
            {/* Series badge */}
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-[#C1A68A]/10 text-white dark:bg-[#C1A68A]/20 dark:text-white mb-4 w-fit">
              {product.series}
            </span></div>
      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Rating */}

      {/* Price */}
      <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
        BDT{product.price}
      </h2>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-neutral-300 dark:text-neutral-700"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          ({product.rating})
        </span>
      </div>

      {/* Category & Stock */}
      
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

      {/* Action Buttons */}
     <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
  {/* Add to Cart – Primary CTA */}
  <Button
    onClick={async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await addToCart(product.id);
    }}
    className="
      group relative flex-1 min-w-[160px] h-12 sm:h-14 px-6 sm:px-8 rounded-xl
      bg-gradient-to-br from-violet-600 to-violet-700
      hover:from-violet-700 hover:to-violet-800
      text-white font-semibold text-sm sm:text-base
      shadow-lg shadow-violet-200/50 dark:shadow-violet-900/40
      transition-all duration-300 ease-out
      hover:shadow-xl hover:shadow-violet-300/60 dark:hover:shadow-violet-900/50
      hover:-translate-y-1 active:translate-y-0 active:shadow-md
      disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
      flex items-center justify-center gap-2
      overflow-hidden
    "
  >
    {/* Animated shimmer overlay */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    
    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
    <span>Add to Cart</span>
  </Button>

  {/* Wishlist – Secondary */}
  <WishlistButton productId={product.id} />
</div>
    </div>
  );
}