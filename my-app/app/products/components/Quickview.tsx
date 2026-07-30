"use client";

import Image from "next/image";
import { ProductWithImages } from "../types/product";

interface Props {
  product: ProductWithImages | null;
  onClose: () => void;
}

export default function QuickView({
  product,
  onClose,
}: Props) {
  if (!product) return null;

  const discountedPrice =
    Number(product.price) *
    (1 - Number(product.discount) / 100);

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-black rounded-xl p-6 w-[90%] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px]">
            <Image
              src={product.images[0]?.image_url}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-white">
                BDT{discountedPrice.toFixed(2)}
              </span>

              <span className="line-through text-gray-400 ml-4">
                BDT{product.price}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <p>⭐ {product.rating}</p>
              <p>Series: {product.series}</p>
              <p>Type: {product.type}</p>
              <p>Size: {product.size}</p>
              <p>Stock: {product.stock}</p>
            </div>

            <button
              className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
            >
              Add To Cart
            </button>
          </div>
        </div>

        <button
          className="absolute top-4 right-4 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}