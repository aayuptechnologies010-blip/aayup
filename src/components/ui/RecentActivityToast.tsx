"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Star, CheckCircle2, X } from "lucide-react";

interface ActivityItem {
  id: string;
  name: string;
  location: string;
  action: string;
  timeAgo: string;
  type: "inquiry" | "review" | "shipped";
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    name: "FinTech Enterprise",
    location: "Mumbai",
    action: "Requested consultation for Custom Web & ERP Platform",
    timeAgo: "3 mins ago",
    type: "inquiry",
  },
  {
    id: "2",
    name: "Dr. Ananya Deshmukh",
    location: "Pune",
    action: "Rated 5-Stars for Mobile Healthcare App launch",
    timeAgo: "12 mins ago",
    type: "review",
  },
  {
    id: "3",
    name: "Retail Brand Client",
    location: "Delhi NCR",
    action: "Shipped Next.js E-Commerce Portal to Production",
    timeAgo: "25 mins ago",
    type: "shipped",
  },
  {
    id: "4",
    name: "Logistics SaaS",
    location: "Bengaluru",
    action: "Locked quote for AI Workflow & WhatsApp Automation",
    timeAgo: "41 mins ago",
    type: "inquiry",
  },
];

export default function RecentActivityToast() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Initial delay before first toast appears
    const initialTimer = setTimeout(() => {
      if (!dismissed) setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!isVisible || dismissed) return;

    // Toast visible for 5.5s, then hides for 8s, then shows next
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
        if (!dismissed) setIsVisible(true);
      }, 7000);
      return () => clearTimeout(nextTimer);
    }, 5500);

    return () => clearTimeout(hideTimer);
  }, [isVisible, dismissed]);

  if (dismissed) return null;

  const current = ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-24 left-6 z-40 max-w-sm pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_15px_35px_rgba(23,105,170,0.15)] rounded-2xl p-3.5 flex items-start gap-3 relative"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[#1769AA] flex items-center justify-center shrink-0 font-bold mt-0.5">
              {current.type === "review" ? (
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              ) : current.type === "shipped" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <MessageSquare className="w-4 h-4 text-[#1769AA]" />
              )}
            </div>

            {/* Content */}
            <div className="pr-4 text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  {current.name} • <span className="text-slate-500">{current.location}</span>
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-snug mt-0.5">
                {current.action}
              </p>
              <span className="text-[10px] text-slate-400 font-medium block mt-1">
                Verified activity • {current.timeAgo}
              </span>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
