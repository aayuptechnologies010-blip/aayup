"use client";

import NextLink from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { forwardRef, useState, useEffect } from "react";

// Track client-side location changes (e.g. pushState / replaceState)
if (typeof window !== "undefined") {
  const patchHistoryMethod = (type: "pushState" | "replaceState") => {
    const original = window.history[type];
    window.history[type] = function (...args: [any, string, (string | URL | null | undefined)?]) {
      const result = original.apply(this, args);
      // Defer event dispatch to avoid scheduling updates during React's insertion effect phase
      if (typeof queueMicrotask === "function") {
        queueMicrotask(() => {
          window.dispatchEvent(new Event("locationchange"));
        });
      } else {
        setTimeout(() => {
          window.dispatchEvent(new Event("locationchange"));
        }, 0);
      }
      return result;
    };
  };
  patchHistoryMethod("pushState");
  patchHistoryMethod("replaceState");
}

// Helper to perform smooth animated scroll to top
export const smoothScrollToTop = (callback?: () => void) => {
  if (typeof window === "undefined") {
    callback?.();
    return;
  }

  // If already at the top or near it, execute callback immediately
  if (window.scrollY <= 15) {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    callback?.();
    return;
  }

  // Animate smoothly to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (callback) {
    // Check when scroll reaches top or timeout fallback
    let checked = false;
    const checkTop = () => {
      if (checked) return;
      if (window.scrollY <= 10) {
        checked = true;
        window.removeEventListener("scroll", checkTop);
        callback();
      }
    };

    window.addEventListener("scroll", checkTop, { passive: true });

    // Fallback timer so navigation is never blocked
    setTimeout(() => {
      if (!checked) {
        checked = true;
        window.removeEventListener("scroll", checkTop);
        callback();
      }
    }, 280);
  }
};

// Drop-in Link replacement for components migrating to Next.js
export const Link = forwardRef<HTMLAnchorElement, any>(function Link(
  { to, href, onClick, children, ...props },
  ref
) {
  const target = href || to || "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's a hash link on the same page, let standard hash scroll handle it
    const isHashOnly = typeof target === "string" && target.startsWith("#");

    if (!isHashOnly && typeof window !== "undefined" && window.scrollY > 20) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    onClick?.(e);

    if (typeof window !== "undefined" && typeof target === "string" && target.includes("#")) {
      setTimeout(() => {
        window.dispatchEvent(new Event("hashchange"));
      }, 0);
    }
  };

  return (
    <NextLink ref={ref} href={target} onClick={handleClick} scroll={false} {...props}>
      {children}
    </NextLink>
  );
});

// Drop-in useNavigate hook
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, options?: any) => {
    if (typeof to === "number") {
      if (to === -1) router.back();
      return;
    }

    if (typeof window !== "undefined" && window.scrollY > 20) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (options?.replace) {
      router.replace(to, { scroll: false });
    } else {
      router.push(to, { scroll: false });
    }

    if (typeof window !== "undefined" && typeof to === "string" && to.includes("#")) {
      setTimeout(() => {
        window.dispatchEvent(new Event("hashchange"));
      }, 0);
    }
  };
}

// Drop-in useLocation hook
export function useLocation() {
  const pathname = usePathname() || "/";
  // Initial state is always empty string during SSR and initial hydration
  // to avoid SSR/client HTML mismatches when URL contains a hash or query
  const [hash, setHash] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    const updateLocation = () => {
      if (typeof window === "undefined" || !isMounted) return;
      const currentHash = window.location.hash || "";
      const currentSearch = window.location.search || "";
      setHash((prev) => (prev !== currentHash ? currentHash : prev));
      setSearch((prev) => (prev !== currentSearch ? currentSearch : prev));
    };

    // Run after commit phase to ensure React finishes insertions
    const timer = setTimeout(updateLocation, 0);

    window.addEventListener("hashchange", updateLocation);
    window.addEventListener("popstate", updateLocation);
    window.addEventListener("locationchange", updateLocation);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener("hashchange", updateLocation);
      window.removeEventListener("popstate", updateLocation);
      window.removeEventListener("locationchange", updateLocation);
    };
  }, [pathname]);

  return {
    pathname,
    search,
    hash,
    state: null,
    key: "default",
  };
}

// Drop-in useParams hook
export function useParams<T extends Record<string, string | string[] | undefined> = any>(): T {
  return {} as T;
}

