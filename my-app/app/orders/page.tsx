// app/orders/page.tsx
import { getOrderHistory } from "@/lib/repositories/add_to_cart.repository";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/utils/Token";
import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight, Calendar, Hash, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  // 1. Authentication – same logic as your middleware
  const cookieStore = await cookies();
  const token =  cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  const decoded = verifyAccessToken(token);
  if (!decoded) redirect("/login");

  const userId = decoded.userId; // AccessTokenPayload already has userId as number
  if (!userId) redirect("/login");

  // 2. Fetch order history
  const orders = await getOrderHistory(userId);

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
            Order History
          </h1>
          <p className="mt-2 text-[#5F5F5F] dark:text-[#B0B0B0]">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-sm">
            <div className="p-6 rounded-full bg-[#F7F5FF] dark:bg-violet-900/20 mb-6">
              <Package className="h-12 w-12 text-[#8B5CF6]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#171717] dark:text-[#FAFAFA] mb-2">
              No orders yet
            </h2>
            <p className="text-center text-[#5F5F5F] dark:text-[#B0B0B0] mb-8 max-w-md">
              Start exploring our premium anime‑inspired streetwear and place your first order.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B5CF6] text-white font-semibold rounded-xl shadow-lg shadow-violet-200/30 dark:shadow-violet-900/20 hover:bg-[#7C3AED] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse Products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white dark:bg-[#18191D] border border-[#E6E3DE] dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Order header */}
                <div className="p-5 sm:p-6 border-b border-[#E6E3DE] dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-[#5F5F5F] dark:text-[#B0B0B0]">
                      <Hash className="w-4 h-4" />
                      <span className="font-semibold text-[#171717] dark:text-[#FAFAFA]">
                        #{order.order_id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5F5F5F] dark:text-[#B0B0B0]">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(order.order_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-[#171717] dark:text-[#FAFAFA]">
                      ৳{Number(order.total_amount).toFixed(2)}
                    </span>
                    
                  </div>
                </div>

                {/* Items preview */}
                <div className="p-5 sm:p-6 flex flex-wrap gap-4">
                  {order.items.slice(0, 3).map((item: any) => {
                    const price = Number(item.price_per_unit);
                    const discount = Number(item.discount) || 0;
                    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
                    return (
                      <div key={item.item_id} className="flex items-center gap-3 min-w-0 flex-1 sm:flex-none">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-gray-800 flex-shrink-0">
                          <Image
                            src={item.image_url || "/placeholder.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#171717] dark:text-[#FAFAFA] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#5F5F5F] dark:text-[#B0B0B0]">
                            Qty: {item.quantity} · ৳{discountedPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {order.items.length > 3 && (
                    <div className="flex items-center text-sm text-[#8B5CF6] font-medium">
                      +{order.items.length - 3} more item{order.items.length - 3 > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                {/* View details */}
                <Link
                  href={`/orders/${order.order_id}`}
                  className="block p-4 text-center text-sm font-medium text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 border-t border-[#E6E3DE] dark:border-gray-700 transition-colors"
                >
                  View Order Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}