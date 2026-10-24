"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Globe,
  Smartphone,
  Database,
  TrendingUp,
  Search,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  icon: any;
  desc: string;
}

const SERVICES: ServiceOption[] = [
  { id: "web", name: "Custom Website", basePrice: 12000, icon: Globe, desc: "Next.js / React high-speed portal" },
  { id: "mobile", name: "Mobile App (iOS/Android)", basePrice: 28000, icon: Smartphone, desc: "Cross-platform Flutter / React Native" },
  { id: "crm", name: "Custom CRM & ERP", basePrice: 35000, icon: Database, desc: "Lead, inventory, billing & admin software" },
  { id: "marketing", name: "Digital Marketing", basePrice: 10000, icon: TrendingUp, desc: "Meta/Google Ads & ROAS scale" },
  { id: "seo", name: "Technical SEO Audit & Growth", basePrice: 8000, icon: Search, desc: "Rank #1 on Google searches" },
];

const PAGES_OPTIONS = [
  { label: "1 - 5 Pages / Screens", multiplier: 1.0 },
  { label: "6 - 12 Pages / Screens", multiplier: 1.35 },
  { label: "15+ Enterprise Pages", multiplier: 1.75 },
];

const ADDONS = [
  { id: "auth", name: "User Authentication & Roles", price: 4000 },
  { id: "payment", name: "Payment Gateway Integration", price: 5000 },
  { id: "ai", name: "AI Chatbot / Automation Integration", price: 8000 },
  { id: "seo_pack", name: "High-Domain SEO Setup", price: 3500 },
  { id: "speed", name: "Ultra-Fast 95+ PageSpeed Optimization", price: 3000 },
];

const TIMELINE_OPTIONS = [
  { label: "Standard (3-4 Weeks)", factor: 1.0 },
  { label: "Express Priority (10-14 Days)", factor: 1.25 },
];

export default function ProjectCostCalculator() {
  const [selectedService, setSelectedService] = useState<string>("web");
  const [selectedPageOption, setSelectedPageOption] = useState<number>(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["payment"]);
  const [selectedTimeline, setSelectedTimeline] = useState<number>(0);

  const currentService = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];

  // Calculation logic
  const base = currentService.basePrice * PAGES_OPTIONS[selectedPageOption].multiplier;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const calculatedEstimate = Math.round((base + addonsTotal) * TIMELINE_OPTIONS[selectedTimeline].factor);

  const minRange = Math.round(calculatedEstimate * 0.95);
  const maxRange = Math.round(calculatedEstimate * 1.15);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Aayup Technologies! I used your Project Cost Calculator on your website:\n` +
      `• Project Type: ${currentService.name}\n` +
      `• Scope: ${PAGES_OPTIONS[selectedPageOption].label}\n` +
      `• Addons: ${selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"}\n` +
      `• Timeline: ${TIMELINE_OPTIONS[selectedTimeline].label}\n` +
      `• Estimated Budget: ₹${minRange.toLocaleString()} - ₹${maxRange.toLocaleString()}\n` +
      `Please connect with me to finalize details.`
  );

  return (
    <section id="cost-calculator" className="py-20 bg-gradient-to-b from-white via-[#F8FBFE] to-white relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1769AA]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2D86C9]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs sm:text-sm font-semibold mb-3">
            <Calculator className="w-4 h-4" />
            <span>Instant & Transparent Estimation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight">
            Calculate Your <span className="text-[#1769AA]">Project Cost</span> in 30 Seconds.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Select your requirements below to see an instant realistic cost estimate with zero hidden fees.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-7">
            
            {/* Step 1: Service Type */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => {
                  const isSelected = selectedService === s.id;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-[#1769AA] bg-blue-50/50 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-[#1769AA] text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{s.name}</span>
                        <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">{s.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale / Size */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                2. Project Scale & Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PAGES_OPTIONS.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedPageOption(idx)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedPageOption === idx
                        ? "bg-[#1769AA] text-white border-[#1769AA] shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Features */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                3. Optional Features & Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-50/50 text-slate-900"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300"
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">+₹{addon.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Speed / Timeline */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                4. Delivery Velocity
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {TIMELINE_OPTIONS.map((time, idx) => (
                  <button
                    key={time.label}
                    onClick={() => setSelectedTimeline(idx)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedTimeline === idx
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Card & Direct CTAs */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1E38] via-[#102A4C] to-[#0B1E38] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden sticky top-28">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#1769AA]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Estimated Project Budget</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Transparent Pricing
                </span>
              </div>

              {/* Price Range Display */}
              <div>
                <span className="text-xs text-slate-300 block">Approximate Range (INR)</span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  ₹{minRange.toLocaleString()}{" "}
                  <span className="text-slate-400 text-2xl font-normal">–</span>{" "}
                  ₹{maxRange.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-300 font-medium block mt-1">
                  *Includes source code ownership, design, deployment & warranty support.
                </span>
              </div>

              {/* Scope Breakdown */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Service:</span>
                  <span className="font-bold text-white">{currentService.name}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Scope:</span>
                  <span className="font-bold text-white">{PAGES_OPTIONS[selectedPageOption].label}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Active Addons:</span>
                  <span className="font-bold text-emerald-400">{selectedAddons.length} Selected</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Velocity:</span>
                  <span className="font-bold text-white">{TIMELINE_OPTIONS[selectedTimeline].label}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/918382984709?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-xl py-6 text-sm sm:text-base font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Lock Estimate via WhatsApp
                  </Button>
                </a>

                <a href="/contact" className="w-full inline-block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-xl py-6 text-sm font-semibold border-white/20 hover:bg-white/10 text-black transition-all flex items-center justify-center gap-2"
                  >
                    Request Custom Proposal
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  100% NDA Protected
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Zero Hidden Fees
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
