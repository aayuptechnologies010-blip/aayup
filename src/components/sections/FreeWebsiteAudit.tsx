"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FreeWebsiteAudit() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [auditType, setAuditType] = useState<"speed" | "seo" | "redesign">("speed");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl || !whatsappNumber) return;

    setStatus("loading");

    // Format WhatsApp message to AAYUP team
    setTimeout(() => {
      setStatus("success");
      const msg = encodeURIComponent(
        `Hi AAYUP Team! I would like a Free 2026 Website Audit for my website:\n🌐 URL: ${websiteUrl}\n📱 WhatsApp: ${whatsappNumber}\n🎯 Primary Focus: ${
          auditType === "speed"
            ? "Speed & Performance"
            : auditType === "seo"
            ? "Google Ranking & Technical SEO"
            : "Complete Modern Redesign"
        }`
      );
      window.open(`https://wa.me/918382984709?text=${msg}`, "_blank");
    }, 1200);
  };

  return (
    <section className="py-16 md:py-20 bg-white text-[#0B1220] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-br from-[#0B1220] via-[#0E2038] to-[#1769AA] text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D86C9]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Heading and value propositions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free • No Obligation • Delivered in 24 Hours</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Is Your Current Website Costing You Paying Clients?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Slow loading speed, outdated mobile design, or poor SEO rankings kill conversion. Get a comprehensive, expert engineer-reviewed audit report with actionable steps to boost your leads.
              </p>

              {/* Checklist items */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Google PageSpeed & Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Technical SEO & Indexing Gaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Mobile UX & Touch Target Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Security & SSL Vulnerability Check</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Lead Capture Card */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#0B1220] rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Audit Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto">
                      Our lead technical architect is reviewing <span className="font-semibold text-slate-800">{websiteUrl}</span>. We will share your custom performance breakdown on WhatsApp shortly.
                    </p>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setWebsiteUrl("");
                      }}
                      className="text-xs font-semibold text-[#1769AA] hover:underline pt-2"
                    >
                      Audit another website →
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        Claim Your Free 2026 Audit Report
                      </h3>
                      <p className="text-xs text-slate-500">
                        Enter your existing website link or competitor domain:
                      </p>
                    </div>

                    {/* Audit Type Selector */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "speed", label: "Speed / Vitals", icon: Gauge },
                        { id: "seo", label: "SEO Rankings", icon: Search },
                        { id: "redesign", label: "Redesign UX", icon: Sparkles },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = auditType === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setAuditType(item.id as any)}
                            className={`p-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all border ${
                              isSelected
                                ? "bg-[#1769AA]/10 border-[#1769AA] text-[#1769AA]"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Website URL Input */}
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-slate-700">
                        Website URL / Domain *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. yourcompany.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    {/* WhatsApp / Phone Input */}
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-bold text-slate-700">
                        Your WhatsApp Number (to receive report) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-5 rounded-xl bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating Audit Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Free Audit Report Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <div className="text-[11px] text-center text-slate-400">
                      🔒 Your details are never spammed. 100% confidential.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
