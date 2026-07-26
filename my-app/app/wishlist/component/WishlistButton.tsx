"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToWishlist } from "../service/wishlist";

interface Props {
  productId: number;
}

export default function WishlistButton({
  productId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  async function handleWishlist() {
    try {
      setLoading(true);

      await addToWishlist(productId);

      setLiked(true);

      alert("Added to wishlist!");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={loading}
      onClick={handleWishlist}
      className="
        h-11
        w-11
        rounded-full
        border-border
        bg-background
        text-black
        shadow-sm
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-lg
        hover:border-red-500
        hover:bg-red-500/10
        active:scale-95
        disabled:opacity-60
        absolute
        z-50
        left-[10vw]"
        
      
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Heart
          className={`
            h-5
            w-5
            transition-all
            duration-300
            ${
              liked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-black hover:text-red-500"
            }
          `}
        />
      )}
    </Button>
  );
}