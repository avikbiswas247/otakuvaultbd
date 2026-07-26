"use client";

import { useEffect, useState } from "react";

import { getCartCount } from "@/app/cart/service/cart";

export default function CartBadge() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    getCartCount().then(data => {
      setCount(data.count);
    });

  }, []);

  return (

    <div className="relative">

      🛒

      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">

        {count}

      </span>

    </div>

  );

}