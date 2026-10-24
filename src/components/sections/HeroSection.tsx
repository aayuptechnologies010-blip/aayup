"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Smartphone,
  TrendingUp,
  Search,
  Layout,
  Database,
  Code2,
  Bot,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-bridge";

// 5 Core High-Converting Hero Slider Slides
const HERO_SLIDES = [
  {
    id: "web-dev",
    badge: "Next-Gen Web Engineering",
    title: "High-Performance Modern",
    titleHighlight: "Websites & Portals.",
    description:
      "Engineered with Next.js, React & TypeScript for lightning-fast speeds, responsive UI, 90+ PageSpeed scores, and superior conversion rates.",
    highlights: ["Next.js & React SSR", "Mobile-First Design", "SEO-Engineered", "Custom Admin & CMS"],
    image: "/service-website-development.webp",
    ctaPrimaryText: "Build Your Website",
    ctaPrimaryLink: "/contact",
    ctaSecondaryText: "View Web Projects",
    ctaSecondaryLink: "/projects",
    category: "Website Development",
    accentColor: "from-blue-600 to-cyan-500",
    badgeIcon: Globe,
    metrics: { value: "99+", label: "Performance Score" },
    tag: "WEB DEV",
  },
  {
    id: "app-dev",
    badge: "Cross-Platform Mobile Apps",
    title: "Intuitive & Scalable",
    titleHighlight: "iOS & Android Apps.",
    description:
      "Delivering seamless native experiences using Flutter & React Native. Scalable architectures, offline-first sync, and frictionless user flows.",
    highlights: ["iOS & Android Deployments", "Clean Architecture", "Push Notifications", "Payment & APIs"],
    image: "/service-mobile-app.webp",
    ctaPrimaryText: "Launch Your Mobile App",
    ctaPrimaryLink: "/contact",
    ctaSecondaryText: "Explore App Work",
    ctaSecondaryLink: "/projects",
    category: "Mobile Application",
    accentColor: "from-purple-600 to-indigo-600",
    badgeIcon: Smartphone,
    metrics: { value: "100%", label: "Native Feel" },
    tag: "APP DEV",
  },
  {
    id: "marketing",
    badge: "Performance Digital Marketing",
    title: "Data-Driven ROI &",
    titleHighlight: "Targeted Growth.",
    description:
      "Transform clicks into loyal paying customers with targeted social media campaigns, Google Ads PPC, conversion rate optimization, and brand scaling.",
    highlights: ["Meta & Google Ads", "Conversion Funnels", "High-ROI ROAS", "Audience Retargeting"],
    image: "/service-digital-marketing.webp",
    ctaPrimaryText: "Scale Your Business",
    ctaPrimaryLink: "/contact",
    ctaSecondaryText: "Marketing Plans",
    ctaSecondaryLink: "/pricing",
    category: "Digital Marketing",
    accentColor: "from-rose-500 to-orange-500",
    badgeIcon: TrendingUp,
    metrics: { value: "3.5x+", label: "Average ROAS" },
    tag: "MARKETING",
  },
  {
    id: "seo",
    badge: "Search Engine Authority",
    title: "Dominate Google with",
    titleHighlight: "Organic Technical SEO.",
    description:
      "First-page visibility with deep technical SEO audits, schema markup, keyword architecture, Google Search Console optimization, and quality link growth.",
    highlights: ["Rank #1 on Google", "Technical SEO Audits", "JSON-LD Rich Schema", "Local Search Dominance"],
    image: "/service-ai-automation.webp",
    ctaPrimaryText: "Boost Organic Rankings",
    ctaPrimaryLink: "/contact",
    ctaSecondaryText: "Explore SEO Strategy",
    ctaSecondaryLink: "/services",
    category: "SEO Handling",
    accentColor: "from-emerald-600 to-teal-500",
    badgeIcon: Search,
    metrics: { value: "#1", label: "Rank Targets" },
    tag: "SEO MASTERY",
  },
  {
    id: "crm-erp",
    badge: "Enterprise Automation",
    title: "Custom CRM & ERP",
    titleHighlight: "Software Solutions.",
    description:
      "Automate manual business bottlenecks, manage inventory, leads, invoices, and workflows with tailored custom software built around your exact business logic.",
    highlights: ["Custom Lead Funnels", "Role-Based Access", "Automated Billing", "Secure Cloud DB"],
    image: "/service-crm-erp.webp",
    ctaPrimaryText: "Automate Your Business",
    ctaPrimaryLink: "/contact",
    ctaSecondaryText: "Explore Software",
    ctaSecondaryLink: "/services",
    category: "CRM & ERP Software",
    accentColor: "from-amber-500 to-orange-600",
    badgeIcon: Database,
    metrics: { value: "70%", label: "Manual Effort Saved" },
    tag: "CRM & ERP",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 4.5 seconds smoothly and continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F7FB] via-white to-white pt-[180px] pb-12 sm:pt-[160px] md:pt-[164px] md:pb-16 lg:pt-[172px] lg:pb-20 transition-colors">
      {/* Dynamic Background Ambient Glow based on active slide */}
      <div className="absolute top-2 left-1/4 w-[550px] h-[550px] bg-[#1769AA]/8 rounded-full blur-3xl pointer-events-none transition-all duration-1000" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#2D86C9]/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* MAIN SLIDE CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[460px]">
          
          {/* Left Column: Animated Text, Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs sm:text-sm font-semibold tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-[#0B1220] leading-[1.12]">
                  {slide.title}{" "}
                  <span className="text-[#1769AA] block">
                    {slide.titleHighlight}
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Feature Highlights Pills */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {slide.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200/90 px-3 py-1.5 rounded-md shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                  <Link to={slide.ctaPrimaryLink}>
                    <Button
                      size="lg"
                      className="rounded-xl px-8 py-6 text-base font-semibold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg hover:shadow-xl hover:shadow-[#1769AA]/25 transition-all group w-full sm:w-auto"
                    >
                      {slide.ctaPrimaryText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to={slide.ctaSecondaryLink}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl px-8 py-6 text-base font-semibold border-2 border-slate-300 hover:border-[#1769AA] text-[#0B1220] hover:bg-[#1769AA]/5 transition-all w-full sm:w-auto"
                    >
                      {slide.ctaSecondaryText}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: High-Impact 3D Animated Showcase with Floating Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-2">
            
            {/* Ambient Lighting Gradients */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[620px]">
              {/* Main Visual Composition Container */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl p-2.5 bg-gradient-to-b from-white/95 via-white/75 to-blue-50/40 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(23,105,170,0.16)] overflow-visible"
              >
                {/* 3D Render Image Base with Animated Slide Transition */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-inner bg-slate-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.category}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.55 }}
                      className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle inner top glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-white/10 pointer-events-none" />

                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider text-[#1769AA] uppercase border border-white/50 shadow-sm">
                    {slide.tag}
                  </div>
                </div>

                {/* Floating Animated Card 1: Top Right - Live Metric */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute -top-4 -right-2 sm:-right-5 z-30 bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{slide.metrics.label}</span>
                    <span className="text-xs font-black text-slate-800">{slide.metrics.value}</span>
                  </div>
                </motion.div>

                {/* Floating Animated Card 2: Bottom Left - Dedicated Support */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-2 sm:-left-5 z-30 bg-white/95 backdrop-blur-xl border border-indigo-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">AAYUP Quality</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">100% Guaranteed</span>
                  </div>
                </motion.div>

              </motion.div>

              {/* Slider Controls: Arrows and Dots */}
              <div className="flex items-center justify-between mt-5 px-2">
                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? "w-8 bg-[#1769AA]" : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#1769AA] hover:text-white transition-all flex items-center justify-center shadow-sm"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#1769AA] hover:text-white transition-all flex items-center justify-center shadow-sm"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
