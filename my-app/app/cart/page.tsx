"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getCart, getCartTotal } from "./service/cart";
import { CartItem as CartItemType } from "./type/cart";
import CartItemCard from "./components/CartItem";

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);

  async function loadCart() {
    const products = await getCart();
    const totalData = await getCartTotal();
    setItems(products);
    setTotal(totalData.total);
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4] dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#171717] dark:text-[#FAFAFA]">
            Shopping Cart
          </h1>
          <p className="mt-2 text-[#5F5F5F] dark:text-[#B0B0B0]">
            {items.length} item{items.length !== 1 && "s"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty cart state */
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm">
            <div className="p-6 rounded-full bg-[#F7F5FF] dark:bg-violet-900/20 mb-6">
              <ShoppingBag className="h-12 w-12 text-[#8B5CF6]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-2">
              Your cart is empty
            </h2>
            <p className="text-center text-[#5F5F5F] dark:text-[#B0B0B0] mb-8 max-w-md">
              Looks like you haven&apos;t added anything yet. Start exploring our
              premium anime‑inspired streetwear.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:bg-[#7C3AED] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="space-y-5 lg:col-span-2">
              {items.map((item) => (
                <CartItemCard
                  key={item.cart_item_id}
                  item={item}
                  refresh={loadCart}
                />
              ))}
            </div>

            {/* Order summary – sticky on desktop */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#171717] dark:text-[#FAFAFA] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-[#5F5F5F] dark:text-[#B0B0B0]">
                    <span>Items</span>
                    <span>{items.length}</span>
                  </div>

                  <div className="flex justify-between text-[#5F5F5F] dark:text-[#B0B0B0]">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Free
                    </span>
                  </div>

                  <hr className="border-[#E6E3DE] dark:border-gray-700" />

                  <div className="flex justify-between text-xl font-bold text-[#171717] dark:text-[#FAFAFA]">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:bg-[#7C3AED] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products"
                  className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-[#E6E3DE] dark:border-gray-600 text-[#171717] dark:text-[#FAFAFA] font-medium rounded-xl hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}