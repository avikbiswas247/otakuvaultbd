"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { ProductWithImages } from "../types/product";
import QuickView from "./Quickview";
import WishlistButton from "@/app/wishlist/component/WishlistButton";
import { addToCart } from "@/app/cart/service/cart";

interface Props {
  product: ProductWithImages;
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  const discountedPrice =
    Number(product.price) * (1 - Number(product.discount) / 100);

  const image =
    product.images.length > 0
      ? product.images[0].image_url
      : "/placeholder.png";

  return (
    <>
      <div
        className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-[#E6E3DE]
        bg-white
        shadow-sm
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-violet-300
        dark:border-[#272932]
        dark:bg-[#18191D]
        dark:hover:border-violet-500/40
      "
      >
        {/* IMAGE */}

        <Link href={`/products/${product.id}`}>
          <div className="relative h-80 overflow-hidden cursor-pointer">
            <Image
              src={image}
              alt={product.name}
              fill
              className="
              object-cover
              duration-700
              group-hover:scale-105
              "
            />

            {/* Gradient Overlay */}

            <div
              className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
            />

            {/* Discount Badge */}

            {Number(product.discount) > 0 && (
              <div
                className="
                absolute
                left-4
                top-4
                rounded-full
                bg-[#C1A68A]
                px-4
                py-1.5
                text-xs
                font-semibold
                tracking-wide
                text-white
                shadow-lg
              "
              >
                {product.discount}% OFF
              </div>
            )}

            {/* Wishlist */}

            <div className="absolute right-4 top-4 z-20">
              <WishlistButton productId={product.id} />
            </div>

            {/* Hover Buttons */}

            <div
              className="
              absolute
              bottom-6
              left-1/2
              flex
              -translate-x-1/2
              translate-y-5
              gap-3
              opacity-0
              duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
            >
              {/* Quick View */}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="
                rounded-full
                bg-white/90
                p-3
                shadow-xl
                backdrop-blur-md
                transition
                hover:scale-110
                dark:bg-zinc-900/90
                "
              >
                <Eye
                  size={18}
                  className="text-black dark:text-white"
                />
              </button>

              {/* Add To Cart */}

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  await addToCart(product.id);
                }}
                className="
                rounded-full
                bg-violet-500
                p-3
                shadow-xl
                transition
                hover:scale-110
                hover:bg-violet-600
                "
              >
                <ShoppingCart
                  size={18}
                  className="text-white"
                />
              </button>
            </div>
          </div>
        </Link>

        {/* CONTENT */}

        <div className="p-6">
          {/* PRODUCT NAME */}

          <Link href={`/products/${product.id}`}>
            <h2
              className="
              
              cursor-pointer
              text-xl
              font-semibold
              tracking-tight
              text-[#171717]
              duration-300
              hover:text-violet-500
              dark:text-white
              h-[4vh]
              relative
              overflow-hidden
              "
            >
              {product.name}
            </h2>
          </Link>

          {/* SERIES */}
<div>
 
          {/* PRICE */}

          <div className="mt-5">
            <span
              className="
              text-2xl
              font-bold
              text-[#171717]
              dark:text-[#FAFAFA]
              "
            >
              BDT {discountedPrice.toFixed(2)}
            </span>

            {Number(product.discount) > 0 && (
              <span
                className="
                ml-3
                text-sm
                text-gray-400
                line-through
                "
              >
                BDT {product.price}
              </span>
            )}
          </div>

          {/* RATING */}



          {/* TAGS */}

          

          {/* STOCK */}

          <div className="mt-5">
            {Number(product.stock) > 0 ? (
              <span
                className="
                text-sm
                font-medium
                text-green-600
                dark:text-green-400
                "
              >
                ● In Stock
              </span>
            ) : (
              <span
                className="
                text-sm
                font-medium
                text-red-600
                dark:text-red-400
                "
              >
                ● Out Of Stock
              </span>
            )}
          </div>

          {/* BUTTON */}

          <button
            onClick={async () => {
              const res = await addToCart(product.id);

              if (res.ok) {
                alert("Added to Cart");
              }
            }}
            className="
            mt-6
            h-12
            w-full
            rounded-2xl
            bg-violet-500
            font-semibold
            tracking-wide
            text-white
            shadow-lg
            duration-300
            hover:-translate-y-1
            hover:bg-violet-600
            hover:shadow-xl
            "
          >
            Add To Cart
          </button>
          </div>
        </div>
      </div>

      <QuickView
        product={open ? product : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
}