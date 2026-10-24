"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Sparkles, Clock, Code2, Headphones, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-bridge";

const COMPARISON_ROWS = [
  {
    feature: "Technology Stack",
    aayup: "Modern Next.js 15, React, TypeScript, Flutter & Supabase",
    others: "Outdated WordPress templates or slow PHP builders",
  },
  {
    feature: "Speed & Performance",
    aayup: "95+ Google PageSpeed Score & sub-second loading",
    others: "Bloated 40-60 PageSpeed score with high bounce rate",
  },
  {
    feature: "Code Ownership",
    aayup: "100% Full Source Code, Git repo & IP Rights transferred",
    others: "Vendor lock-in with monthly hostage charges",
  },
  {
    feature: "Direct Team Communication",
    aayup: "Direct WhatsApp & Slack access to dedicated Lead Engineers",
    others: "Slow middlemen support tickets & confusing runarounds",
  },
  {
    feature: "SEO & Google Indexing",
    aayup: "Built-in technical JSON-LD schema, sitemaps & Core Web Vitals",
    others: "Basic plugin checklist with zero indexing guarantees",
  },
  {
    feature: "Post-Launch Warranty",
    aayup: "6 to 12 Months dedicated free technical support & monitoring",
    others: "Extra hidden hourly charges for even minor bug fixes",
  },
];

export default function AgencyComparisonSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>The AAYUP Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight">
            Why Businesses Pick Us Over{" "}
            <span className="text-[#1769AA]">Traditional Agencies.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            See the honest technical difference between a typical low-cost freelancer or legacy agency and AAYUP Technologies' dedicated engineering standards.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 sm:p-6 text-xs sm:text-sm font-bold text-slate-700">
            <div className="col-span-5 sm:col-span-4 font-extrabold text-slate-900">Deliverable / Standard</div>
            <div className="col-span-4 sm:col-span-4 text-[#1769AA] font-black flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1769AA]" />
              AAYUP Technologies
            </div>
            <div className="col-span-3 sm:col-span-4 text-slate-400 font-semibold">Typical Other Agencies</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                } hover:bg-blue-50/30`}
              >
                {/* Feature Title */}
                <div className="col-span-5 sm:col-span-4 font-bold text-slate-800 pr-2">
                  {row.feature}
                </div>

                {/* AAYUP Col */}
                <div className="col-span-4 sm:col-span-4 flex items-start gap-2 pr-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-slate-900">{row.aayup}</span>
                </div>

                {/* Others Col */}
                <div className="col-span-3 sm:col-span-4 flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-500 line-through sm:no-underline">{row.others}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout in Table */}
          <div className="p-6 bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-sm font-black text-slate-900 block">
                Ready to experience disciplined software engineering?
              </span>
              <span className="text-xs text-slate-500">
                100% Free architecture review & detailed scope breakdown.
              </span>
            </div>
            <Link to="/contact">
              <button className="rounded-xl px-6 py-3 text-xs sm:text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/25 transition-all flex items-center gap-2">
                Start With AAYUP
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
