"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { ProductWithImages } from "../types/product";
import QuickView from "./Quickview";
import{addToCart} from "@/app/cart/service/cart"
import WishlistButton from "@/app/wishlist/component/WishlistButton";
interface Props {
  product: ProductWithImages;
}

export default function ProductCard({ product }: Props) {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);

  const discountedPrice =
    Number(product.price) *
    (1 - Number(product.discount) / 100);

  const image =
    product.images.length > 0
      ? product.images[0].image_url
      : "/placeholder.png";

  return (
    <>
      <div
        className="
        group
        rounded-2xl
        overflow-hidden
        border
        border-gray-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-950
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        
      "
      >
        {/* IMAGE */}

        <Link href={`/products/${product.id}`}>
          <div className="relative h-72 overflow-hidden cursor-pointer">

            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Discount */}

            {Number(product.discount) > 0 && (
              <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
                -{product.discount}%
              </div>
            )}

            {/* Wishlist */}
            <div>
            <WishlistButton productId={product.id}/>
            </div>
            {/* Hover Buttons */}

            <div
              className="
              absolute
              bottom-4
              left-1/2
              -translate-x-1/2
              flex
              gap-3
              opacity-0
              group-hover:opacity-100
              transition
            "
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="
                rounded-full
                bg-white
                dark:bg-zinc-900
                p-3
                shadow
                hover:bg-gray-100
                dark:hover:bg-zinc-800
                transition
              "
              >
                <Eye
                  size={18}
                  className="text-black dark:text-white"
                />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  console.log("Add to cart");
                }}
                className="
                rounded-full
                bg-black
                
                p-3
                shadow
                hover:scale-105
                transition
              "
              >
                <ShoppingCart
                  size={18}
                  className="text-white "
                />
              </button>
            </div>
          </div>
        </Link>

        {/* CONTENT */}

        <div className="p-5">

          <Link href={`/products/${product.id}`}>
            <h2
              className="
              line-clamp-1
              cursor-pointer
              text-lg
              font-semibold
              transition
              hover:text-red-600
              dark:text-white
            "
            >
              {product.name}
            </h2>
          </Link>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {product.series}
          </p>

          {/* PRICE */}

          <div className="mt-4 flex items-center justify-between">

            <div>

              <span className="text-lg font-bold text-red-600">
                BDT{discountedPrice.toFixed(2)}
              </span>

              {Number(product.discount) > 0 && (
                <span className="ml-2 text-gray-400 line-through">
                  BDT{product.price}
                </span>
              )}

            </div>

            

          </div>
<div>          
<span className="font-medium text-yellow-500">
              ⭐ {product.rating}
            </span>
            </div>
          {/* TAGS */}

          <div className="mt-4 flex flex-wrap gap-2">

            <span
              className="
              rounded-full
              bg-gray-100
              dark:bg-zinc-800
              px-3
              py-1
              text-xs
              dark:text-gray-200
            "
            >
              {product.type}
            </span>

            <span
              className="
              rounded-full
              bg-gray-100
              dark:bg-zinc-800
              px-3
              py-1
              text-xs
              dark:text-gray-200
            "
            >
              {product.size} cm
            </span>

          </div>

          {/* STOCK */}

          <div className="mt-5">

            {Number(product.stock) > 0 ? (
              <span
                className="
                inline-flex
                rounded-full
                bg-green-100
                dark:bg-green-900/40
                px-3
                py-1
                text-sm
                font-medium
                text-green-700
                dark:text-green-400
              "
              >
                ✔ In Stock
              </span>
            ) : (
              <span
                className="
                inline-flex
                rounded-full
                bg-red-100
                dark:bg-red-900/40
                px-3
                py-1
                text-sm
                font-medium
                text-red-700
                dark:text-red-400
              "
              >
                ✖ Out of Stock
              </span>
            )}

          </div>

          {/* CART */}

          <button
            onClick={async () => {
    const res = await addToCart(product.id);

    if (res.ok) {
      alert("Added to cart");
    }
  }}
            className="
            mt-6
            w-full
            rounded-xl
            bg-orange-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-zinc-800
            
            
            dark:hover:bg-orange-700
          "
          >
            Add To Cart
          </button>

        </div>
      </div>

      <QuickView
        product={open ? product : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}