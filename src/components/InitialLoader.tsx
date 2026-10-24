"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";

export default function InitialLoader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasLoaded = sessionStorage.getItem("aayup_has_loaded");
    if (!hasLoaded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("aayup_has_loaded", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {loading && <LoadingScreen key="site-loader" />}
    </AnimatePresence>
  );
}
