"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page mount (InitialLoader handles first mount)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Trigger on route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 dark:bg-[#173B57]/85 backdrop-blur-md pointer-events-none"
        >
          {/* Logo animation with orbital rings */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              
              {/* Outer Navy/Black Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#173B57]/50 dark:border-black/50"
              />

              {/* Middle Blue/Light-Blue Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-t-[#2D86C9] border-r-transparent border-b-[#1769AA] border-l-transparent shadow-[0_0_15px_rgba(45,134,201,0.5)]"
              />

              {/* Logo in center: Zoom In / Zoom Out (NO Rotate) */}
              <motion.div
                animate={{
                  scale: [0.9, 1.12, 0.9],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-16 h-16 rounded-full bg-white dark:bg-[#0D4F85] shadow-lg flex items-center justify-center p-2 border border-[#2D86C9]/40"
              >
                <img
                  src="/logo.webp"
                  alt="Aayup Technologies"
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
            </div>

            {/* Glowing Brand Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 90, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 h-1 rounded-full bg-[#F3F7FA] dark:bg-white/10 overflow-hidden border border-[#2D86C9]/20"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1/2 h-full bg-gradient-to-r from-[#0D4F85] via-[#1769AA] to-[#2D86C9]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
