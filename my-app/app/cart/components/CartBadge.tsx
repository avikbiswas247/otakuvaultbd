"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCartCount } from "../service/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCartCount().then((data) => setCount(data.count));
  }, []);

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-full hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-colors"
    >
      <ShoppingBag className="w-6 h-6 text-[#171717] dark:text-[#FAFAFA]" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#8B5CF6] rounded-full shadow-sm shadow-violet-200/30">
          {count}
        </span>
      )}
    </Link>
  );
}