"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToWishlist } from "../service/wishlist";

interface Props {
  productId: number;
  /** 
   * If true, the button will stretch to full width (like the main CTA). 
   * Default: false (auto width, compact).
   */
  fullWidth?: boolean;
}

export default function WishlistButton({
  productId,
  fullWidth = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  async function handleWishlist() {
    try {
      setLoading(true);
      await addToWishlist(productId);
      setLiked(true);
      // TODO: Replace with a proper toast notification
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
      disabled={loading}
      onClick={handleWishlist}
      className={`
        group relative
        h-12 sm:h-14 px-4 sm:px-6 rounded-xl
        border-2 border-neutral-200 dark:border-neutral-700
        bg-white dark:bg-neutral-900
        text-neutral-700 dark:text-neutral-300
        font-semibold text-sm sm:text-base
        shadow-sm transition-all duration-300
        hover:scale-[1.02] hover:shadow-lg
        hover:border-violet-400 dark:hover:border-violet-500
        hover:bg-violet-50 dark:hover:bg-violet-950/30
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
         sm:w-[100vh] md:w-[100vh] lg:w-[20vh]
      `}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-violet-600 dark:text-violet-400" />
          <span>Adding…</span>
        </>
      ) : (
        <>
          <Heart
            className={`
              mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300
              ${
                liked
                  ? "fill-rose-500 text-rose-500 scale-110"
                  : "text-neutral-400 dark:text-neutral-500 group-hover:text-violet-600 dark:group-hover:text-violet-400"
              }
            `}
          />
          <span>{liked ? "Wishlisted" : "Wishlist"}</span>
        </>
      )}
    </Button>
  );
}