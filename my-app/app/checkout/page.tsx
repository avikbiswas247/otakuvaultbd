// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { checkout } from "./service/checkout";
import type { CheckoutRequest } from "./type/checkout";
import { getCart, getCartTotal } from "@/app/cart/service/cart";
import { CartItem } from "@/app/cart/type/cart";
import {
  Loader2,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [fetchingCart, setFetchingCart] = useState(true);

  const [form, setForm] = useState<CheckoutRequest>({
    paymentMethod: "COD",
    shipping: {
      full_name: "",
      phone: "",
      email: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Bangladesh",
    },
  });

  useEffect(() => {
    async function loadCart() {
      try {
        const [items, tot] = await Promise.all([getCart(), getCartTotal()]);
        setCartItems(items);
        setTotal(tot.total);
      } catch {
        toast.error("Could not load cart.");
      } finally {
        setFetchingCart(false);
      }
    }
    loadCart();
  }, []);

  const updateShipping = (
    field: keyof CheckoutRequest["shipping"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value },
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    try {
      setLoading(true);
      const result = await checkout(form);
      toast.success(result.message);
      router.push("/orders");
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (fetchingCart) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] dark:bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-[#8B5CF6] h-8 w-8" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] dark:bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#5F5F5F] dark:text-[#B0B0B0] hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight mb-10">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left – Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5 text-[#8B5CF6]" />
                Shipping Address
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.shipping.full_name}
                    onChange={(e) => updateShipping("full_name", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Phone
                  </label>
                  <input
                    required
                    value={form.shipping.phone}
                    onChange={(e) => updateShipping("phone", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Email (for receipt)
                  </label>
                  <input
                    type="email"
                    required
                    value={form.shipping.email}
                    onChange={(e) => updateShipping("email", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Address Line 1
                  </label>
                  <input
                    required
                    value={form.shipping.address_line1}
                    onChange={(e) => updateShipping("address_line1", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Address Line 2
                  </label>
                  <input
                    value={form.shipping.address_line2}
                    onChange={(e) => updateShipping("address_line2", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    City
                  </label>
                  <input
                    required
                    value={form.shipping.city}
                    onChange={(e) => updateShipping("city", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    State
                  </label>
                  <input
                    value={form.shipping.state}
                    onChange={(e) => updateShipping("state", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Postal Code
                  </label>
                  <input
                    required
                    value={form.shipping.postal_code}
                    onChange={(e) => updateShipping("postal_code", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Country
                  </label>
                  <input
                    required
                    value={form.shipping.country}
                    onChange={(e) => updateShipping("country", e.target.value)}
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
                Payment Method
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["COD"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        paymentMethod: method as CheckoutRequest["paymentMethod"],
                      }))
                    }
                    className={`p-4 rounded-xl border-2 font-medium text-sm transition-all ${
                      form.paymentMethod === method
                        ? "border-[#8B5CF6] bg-[#F7F5FF] dark:bg-violet-900/20 text-[#8B5CF6]"
                        : "border-[#E6E3DE] dark:border-gray-600 text-[#5F5F5F] dark:text-[#B0B0B0] hover:border-gray-400"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8B5CF6]" />
                Your Order
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-sm text-[#9CA3AF] dark:text-[#6B7280]">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map((item) => {
                      const discountedPrice =
                        Number(item.price) *
                        (1 - (Number(item.discount) || 0) / 100);
                      return (
                        <div key={item.cart_item_id} className="flex gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 dark:bg-gray-800 flex-shrink-0">
                            <Image
                              src={item.image_url || "/placeholder.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-[#171717] dark:text-[#FAFAFA] truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#5F5F5F] dark:text-[#B0B0B0]">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-[#171717] dark:text-[#FAFAFA]">
                            BDT{(discountedPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#E6E3DE] dark:border-gray-700 mt-6 pt-6 space-y-2">
                    <div className="flex justify-between text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
                      <span>Subtotal</span>
                      <span>BDT{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
                      <span>Shipping</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-[#171717] dark:text-[#FAFAFA] pt-2">
                      <span>Total</span>
                      <span>{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" /> Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}