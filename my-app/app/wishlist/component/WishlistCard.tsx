"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  item: any;
}

export default function WishlistCard({ item }: Props) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-2xl
      border
      bg-card
      text-card-foreground
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
          className="
          object-cover
          group-hover:scale-110
          transition-transform
          duration-500
          "
        />

        <Button
          size="icon"
          variant="secondary"
          className="
          absolute
          right-3
          top-3
          rounded-full
          "
        >
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
        </Button>
      </div>

      <div className="p-5 space-y-3">

        <h2 className="font-bold text-lg line-clamp-1">
          {item.name}
        </h2>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">

          <span className="font-bold text-xl">
            {Number(item.price).toFixed(2)}
          </span>

          <div className="flex items-center gap-1">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={18}
            />
            {item.rating}
          </div>

        </div>

        <div className="flex gap-3">

          <Button className="flex-1  bg-violet-500 text-white hover:bg-violet-600 ">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <Button
            
            variant="outline"
          >
            <Link href={`/products/${item.id}`}>
              View
            </Link>
          </Button>

        </div>

      </div>
    </div>
  );
}