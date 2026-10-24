"use client";

import { motion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Building2,
  FileCode2,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";

interface WebsiteTier {
  id: string;
  type: string;
  badge: string;
  priceRange: string;
  idealFor: string;
  timeline: string;
  deliverables: string[];
  techStack: string;
  popular?: boolean;
}

const WEBSITE_COST_GUIDE: WebsiteTier[] = [
  {
    id: "basic",
    type: "Basic / Startup Business Website",
    badge: "Startup Entry",
    priceRange: "₹8,000 – ₹15,000",
    idealFor: "Local shops, consultants, personal branding, doctors, law firms & startups.",
    timeline: "5 – 7 Days",
    deliverables: [
      "Up to 5 Responsive Pages (Home, About, Services, Gallery, Contact)",
      "Mobile & Tablet 100% Adaptive Design",
      "Lead Capture Form & Instant WhatsApp Integration",
      "Google Maps & Free SSL Certificate Setup",
      "SEO-Friendly Meta & Speed Optimization",
      "6 Months Free Technical Support",
    ],
    techStack: "React / HTML5 / Tailwind CSS",
  },
  {
    id: "corporate",
    type: "Corporate & Professional Portal",
    badge: "Most Popular",
    priceRange: "₹15,000 – ₹35,000",
    idealFor: "SMEs, established firms, real estate, manufacturing & enterprise service agencies.",
    timeline: "10 – 14 Days",
    deliverables: [
      "10+ Bespoke Pages with High-Conversion Layout",
      "Custom Dynamic CMS & Admin Dashboard",
      "Interactive Blog & News Engine",
      "Technical On-Page SEO & Schema Architecture",
      "Sub-second Load Times (PageSpeed 90+ Score)",
      "Analytics Dashboard (GA4 & Search Console)",
      "1 Year Priority Maintenance",
    ],
    techStack: "Next.js 15, TypeScript, Tailwind, Supabase",
    popular: true,
  },
  {
    id: "ecommerce",
    type: "Full E-Commerce Online Store",
    badge: "High ROI",
    priceRange: "₹25,000 – ₹60,000+",
    idealFor: "D2C brands, apparel, electronics, multi-category catalogs & digital stores.",
    timeline: "15 – 21 Days",
    deliverables: [
      "Unlimited Products & Category Management",
      "Shopping Cart, Wishlist & Smart Search Filters",
      "Multi-Payment Gateways (Razorpay, UPI, Cards, COD)",
      "Automated WhatsApp & Email Order Confirmations",
      "Inventory, Coupon Codes & Shipping Integration",
      "Customer Account Dashboard & Order Tracking",
      "1 Year Dedicated Technical Support",
    ],
    techStack: "Next.js, Node.js, PostgreSQL / Shopify Hybrid",
  },
  {
    id: "custom-saas",
    type: "Custom Web App / CRM & ERP",
    badge: "Enterprise Scale",
    priceRange: "₹45,000 – ₹1,20,000+",
    idealFor: "Healthcare, Logistics, Education, FinTech, multi-vendor marketplaces & booking platforms.",
    timeline: "3 – 6 Weeks",
    deliverables: [
      "Complex Custom Business Logic & Multi-Role Auth",
      "Scalable REST / GraphQL API Architecture",
      "Interactive Real-Time Analytics & Financial Reports",
      "Automated Invoicing & Staff Management",
      "Enterprise Database Security & Automated Daily Backups",
      "Dedicated Solution Architect & SLA Warranty",
    ],
    techStack: "React, Next.js, Python/Node, PostgreSQL, AWS/Docker",
  },
];

const COST_FACTORS = [
  {
    title: "Domain & Cloud Hosting",
    range: "₹2,000 – ₹6,000 / yr",
    description: "Fast cloud servers (AWS, Vercel, VPS) with automated SSL and 99.9% uptime.",
    icon: Globe,
  },
  {
    title: "UI/UX & Design Fidelity",
    range: "Included in Package",
    description: "Tailored Figma design matching your brand identity—zero cookie-cutter cheap templates.",
    icon: Layers,
  },
  {
    title: "Payment & API Integrations",
    range: "₹3,000 – ₹8,000",
    description: "Razorpay, Stripe, SMS gateways, WhatsApp Business API and custom CRM pipelines.",
    icon: Zap,
  },
  {
    title: "Post-Launch Maintenance",
    range: "6 - 12 Months Free",
    description: "Security patching, regular dependency upgrades, and server monitoring included.",
    icon: ShieldCheck,
  },
];

export default function WebsiteCostGuide() {
  return (
    <section id="cost-guide" className="py-20 bg-[#F8FBFE] border-y border-slate-200/80 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1769AA]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#2D86C9]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Complete 2026 Price Transparency Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight">
            How Much Does Website Development{" "}
            <span className="text-[#1769AA]">Cost in India (2026)?</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            No confusion or hidden charges. Here is an honest, itemized breakdown of what high-quality websites cost based on scale, technology, and business objectives.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WEBSITE_COST_GUIDE.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                tier.popular
                  ? "bg-white border-2 border-[#1769AA] shadow-2xl shadow-[#1769AA]/15 scale-[1.02] z-20"
                  : "bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-slate-300"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1769AA] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  ⭐ Recommended for Businesses
                </div>
              )}

              <div>
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#1769AA] bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                  {tier.badge}
                </span>

                <h3 className="text-lg font-black text-slate-900 leading-snug">{tier.type}</h3>

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Estimated Investment:</span>
                  <div className="text-2xl font-black text-[#1769AA] tracking-tight mt-0.5">
                    {tier.priceRange}
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
                    ⚡ Typical Delivery: <strong className="text-slate-800">{tier.timeline}</strong>
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Ideal For:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{tier.idealFor}</p>
                </div>

                {/* Deliverables List */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                    What's Included:
                  </span>
                  <ul className="space-y-2">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent(
                    `Hello Aayup Technologies! I am interested in the ${tier.type} (${tier.priceRange}). Please share a detailed quote and roadmap.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block"
                >
                  <button
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      tier.popular
                        ? "bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/25"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    Get Free Quotation
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown Factors Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-slate-900">
              What Factors Influence Website Development Cost?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Transparent cost components every business owner should know before hiring an agency.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COST_FACTORS.map((factor) => {
              const Icon = factor.icon;
              return (
                <div key={factor.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1769AA] flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{factor.title}</h4>
                  <span className="text-xs font-black text-[#1769AA] block">{factor.range}</span>
                  <p className="text-[11px] text-slate-500 leading-snug">{factor.description}</p>
                </div>
              );
            })}
          </div>

          {/* Advice Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-bold text-blue-900 block">
                💡 Need an exact custom scope or have a specific budget in mind?
              </span>
              <p className="text-xs text-slate-600">
                Our lead software architects will review your project and prepare a tailored roadmap within 24 hours.
              </p>
            </div>
            <Link to="/contact">
              <button className="px-5 py-2.5 rounded-xl bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold whitespace-nowrap shadow-md shadow-[#1769AA]/20 transition-all flex items-center gap-1.5">
                Talk to an Architect
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
