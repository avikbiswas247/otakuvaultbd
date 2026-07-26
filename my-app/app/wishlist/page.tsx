"use client";

import { useEffect, useState } from "react";

import { Heart } from "lucide-react";

import WishlistGrid from "./component/WishlistGrid";
import WishlistSkeleton from "./component/WishlistSkeleton";
import EmptyWishlist from "./component/EmptyWishlist";

import { getWishlist } from "./service/wishlist";

export default function WishlistPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWishlist();
        setItems(data.items);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main
      className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-10
      relative
      top-[10vh]
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        mb-10
        "
      >
        <Heart
          className="
          h-8
          w-8
          text-red-500
          fill-red-500
          "
        />

        <div>
          <h1 className="text-3xl font-bold">
            My Wishlist
          </h1>

          <p className="text-muted-foreground">
            {items.length} saved products
          </p>
        </div>
      </div>

      {loading ? (
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-7
          "
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <WishlistSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <WishlistGrid items={items} />
      )}
    </main>
  );
}