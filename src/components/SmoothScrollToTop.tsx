"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid re-scrolling on initial hydration if not needed
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Double-ensure smooth upward scroll animation when pathname changes
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
