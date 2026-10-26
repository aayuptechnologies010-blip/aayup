"use client";

import { motion } from "framer-motion";
import { Users, Award, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

export default function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] pt-[170px] pb-14 sm:pt-[160px] md:pt-[168px] md:pb-16 border-b border-slate-200/60">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#1769AA]/10 via-[#0066FF]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
        {/* Breadcrumb */}
        <nav className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-4">
          <Link to="/" className="hover:text-[#1769AA] transition-colors">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#1769AA] font-bold">Our Team</span>
        </nav>

        {/* Tag Pill */}
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>LEADERSHIP & ENGINEERING COLLECTIVE</span>
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0B1220] leading-tight">
          Meet The Minds Behind{" "}
          <span className="text-[#1769AA] block sm:inline">AAYUP Technologies</span>
        </h1>

        {/* Short Crisp Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
          Our board of directors, software architects, full-stack engineers, and product designers dedicated to high-performance digital products.
        </p>

        {/* Quick Anchor Jump Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a href="#directors">
            <Button
              size="sm"
              className="rounded-full px-5 py-2 text-xs font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/20"
            >
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Board of Directors
            </Button>
          </a>
          <a href="#team">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full px-5 py-2 text-xs font-bold border-slate-300 text-slate-700 hover:text-[#1769AA] hover:border-[#1769AA] bg-white"
            >
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Core Team Members
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
