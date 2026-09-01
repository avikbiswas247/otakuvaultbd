// app/checkout/page.tsx
"use client";

import { useEffect, useState, type SubmitEvent } from "react";
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
  Smartphone,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { isLoggedIn } from "@/lib/auth/client-auth";

const BKASH_NUMBER = "01714546809";

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
      bkashNumber: "",
    },
  });

  /**
   * Shipping fee:
   * Dhaka -> BDT 80
   * Everything else -> BDT 130
   */
  const shippingFee =
    form.shipping.city.trim().toLowerCase() === "dhaka" ? 80 : 130;

  const grandTotal = total + shippingFee;

  useEffect(() => {
    // Guest checkout guard: if not logged in, bounce to login.
    async function guard() {
      const authed = await isLoggedIn();
      if (!authed) {
        router.replace("/login?redirect=/checkout");
        return;
      }
    }

    async function loadCart() {
      const authed = await isLoggedIn();
      if (!authed) return; // guard handles redirect

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

    guard();
    loadCart();
  }, []);

  const updateShipping = (
    field: keyof CheckoutRequest["shipping"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value,
      },
    }));
  };

  const copyBkashNumber = async () => {
    try {
      await navigator.clipboard.writeText(BKASH_NUMBER);
      toast.success("bKash number copied!");
    } catch {
      toast.error("Could not copy number.");
    }
  };

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!form.shipping.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }

    // Validate bKash number
    if (!form.shipping.bkashNumber.trim()) {
      toast.error("Please enter the bKash number you used for payment.");
      return;
    }

    // Bangladesh bKash number validation
    const bkashRegex = /^01[3-9]\d{8}$/;

    if (!bkashRegex.test(form.shipping.bkashNumber.trim())) {
      toast.error("Please enter a valid Bangladeshi mobile number.");
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

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* SHIPPING ADDRESS */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm p-6 sm:p-8">

              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5 text-[#8B5CF6]" />
                Shipping Address
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Full Name
                  </label>

                  <input
                    required
                    value={form.shipping.full_name}
                    onChange={(e) =>
                      updateShipping("full_name", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Phone
                  </label>

                  <input
                    required
                    value={form.shipping.phone}
                    onChange={(e) =>
                      updateShipping("phone", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Email (for receipt)
                  </label>

                  <input
                    type="email"
                    required
                    value={form.shipping.email}
                    onChange={(e) =>
                      updateShipping("email", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Address Line 1
                  </label>

                  <input
                    required
                    value={form.shipping.address_line1}
                    onChange={(e) =>
                      updateShipping(
                        "address_line1",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Address Line 2
                  </label>

                  <input
                    value={form.shipping.address_line2}
                    onChange={(e) =>
                      updateShipping(
                        "address_line2",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* CITY */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    City
                  </label>

                  <input
                    required
                    value={form.shipping.city}
                    onChange={(e) =>
                      updateShipping("city", e.target.value)
                    }
                    placeholder="e.g. Dhaka"
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />

                  {form.shipping.city.trim() && (
                    <p className="mt-2 text-xs text-[#8B5CF6]">
                      {form.shipping.city.trim().toLowerCase() === "dhaka"
                        ? "Dhaka delivery charge: BDT 80"
                        : "Outside Dhaka delivery charge: BDT 130"}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    State
                  </label>

                  <input
                    value={form.shipping.state}
                    onChange={(e) =>
                      updateShipping("state", e.target.value)
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Postal Code
                  </label>

                  <input
                    required
                    value={form.shipping.postal_code}
                    onChange={(e) =>
                      updateShipping(
                        "postal_code",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2">
                    Country
                  </label>

                  <input
                    required
                    value={form.shipping.country}
                    onChange={(e) =>
                      updateShipping(
                        "country",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-shadow"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm p-6 sm:p-8">

              <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-[#8B5CF6]" />
                Payment Method
              </h2>

              {/* COD */}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    paymentMethod: "COD",
                  }))
                }
                className={`w-full p-4 rounded-xl border-2 font-medium text-sm transition-all ${
                  form.paymentMethod === "COD"
                    ? "border-[#8B5CF6] bg-[#F7F5FF] dark:bg-violet-900/20 text-[#8B5CF6]"
                    : "border-[#E6E3DE] dark:border-gray-600 text-[#5F5F5F] dark:text-[#B0B0B0] hover:border-gray-400"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  Cash on Delivery
                </div>
              </button>

              {/* bKash Information */}
              {form.paymentMethod === "COD" && (
                <div className="mt-5 rounded-2xl border border-pink-200 dark:border-pink-900/50 bg-pink-50 dark:bg-pink-950/20 p-5">

                  <div className="flex items-start gap-3">

                    <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                      <Smartphone className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>

                    <div className="flex-1">

                      <h3 className="font-semibold text-[#171717] dark:text-[#FAFAFA]">
                        Pay Shipping Fee via bKash
                      </h3>

                      <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mt-1">
                        Send your shipping fee to the following bKash
                        number:
                      </p>

                      {/* Merchant bKash Number */}
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white dark:bg-black border border-pink-200 dark:border-pink-900/50 px-4 py-3">

                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Merchant bKash Number
                          </p>

                          <p className="text-lg font-bold text-[#171717] dark:text-[#FAFAFA] tracking-wide">
                            {BKASH_NUMBER}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={copyBkashNumber}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title="Copy bKash number"
                        >
                          <Copy className="w-4 h-4 text-[#8B5CF6]" />
                        </button>

                      </div>

                      {/* Shipping Fee */}
                      <div className="mt-4 text-sm">
                        <p className="text-[#5F5F5F] dark:text-[#B0B0B0]">
                          Shipping fee:
                          <span className="font-semibold text-[#171717] dark:text-white ml-1">
                            BDT {shippingFee.toFixed(2)}
                          </span>
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Please send exactly the shipping fee shown above.
                        </p>
                      </div>

                      {/* CUSTOMER BKASH NUMBER */}
                      <div className="mt-5">

                        <label
                          htmlFor="bkashNumber"
                          className="block text-sm font-medium text-[#171717] dark:text-[#FAFAFA] mb-2"
                        >
                          Your bKash Number
                        </label>

                        <input
                          id="bkashNumber"
                          type="tel"
                          inputMode="numeric"
                          required
                          maxLength={11}
                          value={form.shipping.bkashNumber}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 11);

                            updateShipping("bkashNumber", value);
                          }}
                          placeholder="01XXXXXXXXX"
                          className="w-full rounded-xl border border-pink-200 dark:border-pink-900/50 bg-white dark:bg-black px-4 py-3 text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                        />

                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Enter the bKash number from which you sent the
                          shipping fee.
                        </p>

                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT – ORDER SUMMARY */}
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
                  {/* Products */}
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2">

                    {cartItems.map((item) => {
                      const discountedPrice =
                        Number(item.price) *
                        (1 -
                          (Number(item.discount) || 0) / 100);

                      return (
                        <div
                          key={item.cart_item_id ?? item.id}
                          className="flex gap-3"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 dark:bg-gray-800 shrink-0">
                            <Image
                              src={
                                item.image_url ||
                                "/placeholder.jpg"
                              }
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
                            BDT{" "}
                            {(
                              discountedPrice *
                              item.quantity
                            ).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-[#E6E3DE] dark:border-gray-700 mt-6 pt-6 space-y-3">

                    {/* Subtotal */}
                    <div className="flex justify-between text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">
                      <span>Subtotal</span>
                      <span>
                        BDT {total.toFixed(2)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm text-[#5F5F5F] dark:text-[#B0B0B0]">

                      <div>
                        <span>Shipping</span>

                        {form.shipping.city.trim() && (
                          <span className="block text-xs text-gray-400 mt-0.5">
                            {form.shipping.city
                              .trim()
                              .toLowerCase() === "dhaka"
                              ? "Dhaka"
                              : "Outside Dhaka"}
                          </span>
                        )}
                      </div>

                      <span className="font-medium text-[#171717] dark:text-[#FAFAFA]">
                        BDT {shippingFee.toFixed(2)}
                      </span>

                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-xl font-bold text-[#171717] dark:text-[#FAFAFA] pt-3 border-t border-[#E6E3DE] dark:border-gray-700">

                      <span>Total</span>

                      <span>
                        BDT {grandTotal.toFixed(2)}
                      </span>

                    </div>
                  </div>

                  {/* Payment Notice */}
                  {form.paymentMethod === "COD" && (
                    <div className="mt-5 rounded-xl bg-pink-50 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/30 p-3">

                      <p className="text-xs text-pink-700 dark:text-pink-300">
                        <strong>Important:</strong> Only the shipping fee
                        of BDT {shippingFee.toFixed(2)} should be sent via
                        bKash.
                      </p>

                    </div>
                  )}

                  {/* Place Order */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-xl hover:shadow-violet-200/40 dark:hover:shadow-violet-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >

                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        Processing...
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