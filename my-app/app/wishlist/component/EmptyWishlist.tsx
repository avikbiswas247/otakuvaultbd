"use client";

import Link from "next/link";
import { HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-32
      text-center
      "
    >
      <HeartCrack
        className="
        h-20
        w-20
        text-muted-foreground
        "
      />

      <h2 className="mt-6 text-3xl font-bold">
        Your wishlist is empty
      </h2>

      <p className="mt-3 text-muted-foreground">
        Save your favourite anime collectibles here.
      </p>

      <Button
        
        className="mt-8"
      >
        <Link href="/products">
          Browse Products
        </Link>
      </Button>
    </div>
  );
}