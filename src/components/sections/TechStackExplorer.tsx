"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Cpu,
  Sparkles,
  Server,
  Smartphone,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";

interface TechItem {
  name: string;
  role: string;
  category: "Frontend" | "Backend" | "Mobile" | "AI & Cloud";
  whyWeUseIt: string;
  benefit: string;
  iconText: string;
  color: string;
}

const TECH_STACK_DATA: TechItem[] = [
  // Frontend
  {
    name: "Next.js 15 & React",
    role: "Full-Stack Web Framework",
    category: "Frontend",
    whyWeUseIt: "Server Components, App Router & lightning-fast initial load times with static generation.",
    benefit: "Instant page loads, 90+ PageSpeed score & exceptional SEO ranking.",
    iconText: "NEXT",
    color: "from-slate-900 to-slate-700 text-white",
  },
  {
    name: "TypeScript",
    role: "Strict Type Safety",
    category: "Frontend",
    whyWeUseIt: "Prevents runtime bugs before shipping and enables clean, modular code architecture.",
    benefit: "Zero production crashes from type mismatches and painless feature additions.",
    iconText: "TS",
    color: "from-blue-600 to-blue-500 text-white",
  },
  {
    name: "Tailwind CSS",
    role: "Modern Utility Styling",
    category: "Frontend",
    whyWeUseIt: "Pixel-perfect bespoke design systems without heavy external CSS bloated bundles.",
    benefit: "Ultra-lean CSS bundles and 100% responsiveness across every phone & desktop.",
    iconText: "TW",
    color: "from-cyan-500 to-blue-500 text-white",
  },
  {
    name: "Framer Motion",
    role: "Dynamic Micro-Animations",
    category: "Frontend",
    whyWeUseIt: "High-performance spring physics and 60fps buttery-smooth web interactions.",
    benefit: "Premium agency feel that wows clients and keeps bounce rates minimal.",
    iconText: "FM",
    color: "from-purple-600 to-pink-500 text-white",
  },

  // Backend
  {
    name: "Node.js & Express",
    role: "Asynchronous Backend",
    category: "Backend",
    whyWeUseIt: "Non-blocking event-driven I/O engine capable of handling thousands of concurrent queries.",
    benefit: "Massive scalability with sub-100ms API response times.",
    iconText: "NODE",
    color: "from-emerald-600 to-green-500 text-white",
  },
  {
    name: "PostgreSQL & Supabase",
    role: "Relational Database & Auth",
    category: "Backend",
    whyWeUseIt: "Enterprise SQL integrity, Row-Level Security (RLS), and automated real-time subscriptions.",
    benefit: "Military-grade data protection, zero SQL injection risks, and reliable ACID transactions.",
    iconText: "SQL",
    color: "from-indigo-600 to-blue-600 text-white",
  },
  {
    name: "Python & FastAPI",
    role: "AI & Microservices",
    category: "Backend",
    whyWeUseIt: "High-speed modern Python framework tailored for machine learning and heavy data pipelines.",
    benefit: "Fast AI inference and seamless integration with custom enterprise algorithms.",
    iconText: "PY",
    color: "from-amber-500 to-blue-600 text-white",
  },

  // Mobile
  {
    name: "Flutter",
    role: "Native Multi-Platform",
    category: "Mobile",
    whyWeUseIt: "Google's UI toolkit that compiles directly into native ARM machine code for iOS & Android.",
    benefit: "One clean codebase saves 40% development cost while feeling completely native.",
    iconText: "FLUT",
    color: "from-cyan-500 to-sky-600 text-white",
  },
  {
    name: "React Native",
    role: "Cross-Platform Framework",
    category: "Mobile",
    whyWeUseIt: "Leverages React principles to deliver native iOS and Android apps with full device hardware access.",
    benefit: "Fast iteration, shared web logic, and rapid app store deployment.",
    iconText: "RN",
    color: "from-blue-500 to-indigo-600 text-white",
  },

  // AI & Cloud
  {
    name: "OpenAI & LangChain",
    role: "Generative AI & LLM Workflows",
    category: "AI & Cloud",
    whyWeUseIt: "Intelligent embeddings, automated semantic search, and custom trained conversational agents.",
    benefit: "Cuts customer support costs by 60% and unlocks automated smart operations.",
    iconText: "AI",
    color: "from-emerald-600 to-teal-600 text-white",
  },
  {
    name: "Docker & Kubernetes",
    role: "Containerization & Cloud Scale",
    category: "AI & Cloud",
    whyWeUseIt: "Guarantees identical execution across development, staging, and high-availability production clusters.",
    benefit: "Zero deployment downtime and effortless server autoscaling during traffic spikes.",
    iconText: "DOCK",
    color: "from-blue-600 to-cyan-600 text-white",
  },
  {
    name: "AWS & GCP Cloud",
    role: "Cloud Infrastructure",
    category: "AI & Cloud",
    whyWeUseIt: "Serverless lambda compute, S3 object storage, and globally distributed edge CDNs.",
    benefit: "99.99% system uptime and automated daily enterprise backups.",
    iconText: "AWS",
    color: "from-amber-600 to-orange-500 text-white",
  },
];

const CATEGORIES = ["All Technologies", "Frontend", "Backend", "Mobile", "AI & Cloud"] as const;

export default function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState<string>("All Technologies");
  const [activeTech, setActiveTech] = useState<TechItem>(TECH_STACK_DATA[0]);

  const filtered =
    activeCategory === "All Technologies"
      ? TECH_STACK_DATA
      : TECH_STACK_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Decorative subtle ambient rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-100 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs sm:text-sm font-semibold mb-3">
            <Cpu className="w-4 h-4" />
            <span>Modern Engineering Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight">
            Battle-Tested <span className="text-[#1769AA]">Technologies</span> We Trust.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            No obsolete legacy stacks. We build with modern, production-grade tools designed for speed, security, and long-term scale.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/25 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Interactive Grid + Spotlight Feature Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Grid: Tech Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((item) => {
              const isSelected = activeTech.name === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTech(item)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? "border-[#1769AA] bg-blue-50/60 shadow-lg shadow-blue-500/10 scale-[1.02]"
                      : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-black bg-gradient-to-r ${item.color} shadow-sm`}>
                      {item.iconText}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.category}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#1769AA] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{item.role}</p>

                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1769AA]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Spotlight Card: Why We Use It & Business Benefit */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1E38] via-[#102A4C] to-[#0B1E38] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden sticky top-28">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#1769AA]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Architecture Spotlight</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                  {activeTech.category}
                </span>
              </div>

              <div>
                <div className="inline-block px-2.5 py-1 rounded-lg text-xs font-black bg-gradient-to-r from-blue-500 to-cyan-400 text-white mb-2">
                  {activeTech.iconText}
                </div>
                <h3 className="text-2xl font-black text-white">{activeTech.name}</h3>
                <span className="text-xs text-slate-300 block">{activeTech.role}</span>
              </div>

              {/* Deep Dives */}
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">Why AAYUP Engineers Choose It:</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">{activeTech.whyWeUseIt}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">What Your Business Gains:</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">{activeTech.benefit}</p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link to="/contact">
                  <button className="w-full rounded-xl py-3.5 text-xs font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/30 transition-all flex items-center justify-center gap-2">
                    Build Your Next App with {activeTech.name}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
