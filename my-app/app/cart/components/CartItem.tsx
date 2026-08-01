"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeCartItem, updateQuantity } from "../service/cart";

interface CartItemProps {
  item: any;
  refresh: () => void;
}

export default function CartItem({ item, refresh }: CartItemProps) {
  // Calculate discounted unit price
  const price = Number(item.price);
  const discount = Number(item.discount) || 0;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product image */}
      <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-neutral-100 dark:bg-gray-800 flex-shrink-0">
        <Image
          src={item.image_url || "/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 128px"
        />
      </div>

      {/* Info & controls */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-[#171717] dark:text-[#FAFAFA]">
            {item.name}
          </h3>

          {/* Price display */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-semibold text-[#171717] dark:text-[#FAFAFA]">
              ৳{discountedPrice.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm line-through text-[#9CA3AF] dark:text-[#6B7280]">
                BDT{price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mt-1">
            {item.size} · {item.type}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 sm:mt-0">
          {/* Quantity controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                if (item.quantity > 1) {
                  await updateQuantity(item.cart_item_id, item.quantity - 1);
                  refresh();
                }
              }}
              disabled={item.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E6E3DE] dark:border-gray-600 text-[#171717] dark:text-[#FAFAFA] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="w-8 text-center font-semibold text-[#171717] dark:text-[#FAFAFA]">
              {item.quantity}
            </span>

            <button
              onClick={async () => {
                await updateQuantity(item.cart_item_id, item.quantity + 1);
                refresh();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E6E3DE] dark:border-gray-600 text-[#171717] dark:text-[#FAFAFA] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove button */}
          <button
            onClick={async () => {
              await removeCartItem(item.cart_item_id);
              refresh();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-500/80 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}