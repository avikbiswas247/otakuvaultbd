"use client";

interface CartSummaryProps {
  total: number;
  itemCount: number;
}

export default function CartSummary({
  total,
  itemCount,
}: CartSummaryProps) {
  return (
    <div
      className="
        bg-white
        dark:bg-zinc-900
        border
        dark:border-zinc-800
        rounded-2xl
        p-6
        shadow-lg
        sticky
        top-24
      "
    >
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Items
          </span>

          <span className="font-semibold">
            {itemCount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Shipping
          </span>

          <span className="font-semibold text-green-600">
            Free
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>

      </div>

      <button
        className="
          mt-8
          w-full
          rounded-xl
          bg-black
          text-white
          dark:bg-white
          dark:text-black
          py-3
          font-semibold
          hover:scale-[1.02]
          transition
        "
      >
        Proceed to Checkout
      </button>
    </div>
  );
}