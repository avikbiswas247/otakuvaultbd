"use client";

import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    width,
    lessThan: (size: number) => width < size,
    greaterThan: (size: number) => width > size,
  };
}