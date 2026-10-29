"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/projectsData";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

const CATEGORIES = [
  "All Projects",
  "Website",
  "Mobile Apps",
  "CRM / ERP",
  "AI & Automation",
] as const;

export default function ProjectsPortfolioView() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PORTFOLIO_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    const loadDynamicProjects = () => {
      getDynamicData<ProjectItem[]>(DYNAMIC_KEYS.PROJECTS, PORTFOLIO_PROJECTS).then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      });
    };

    loadDynamicProjects();
    window.addEventListener("aayup_dynamic_data_updated", loadDynamicProjects);
    window.addEventListener("portfolio_projects_updated", loadDynamicProjects);
    window.addEventListener("storage", loadDynamicProjects);
    return () => {
      isMounted = false;
      window.removeEventListener("aayup_dynamic_data_updated", loadDynamicProjects);
      window.removeEventListener("portfolio_projects_updated", loadDynamicProjects);
      window.removeEventListener("storage", loadDynamicProjects);
    };
  }, []);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projectsList
      : projectsList.filter(
          (p) => p.category === activeCategory
        );

  return (
    <div className="bg-white text-[#0B1220]">
      {/* 3. PORTFOLIO HERO EXACTLY AS DESIGN REFERENCE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] pt-[180px] pb-16 sm:pt-[160px] md:pt-[164px] md:pb-24 lg:pt-[172px] border-b border-slate-200/50">
        {/* Subtle Decorative Flow Waves / Background Rings */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] border border-[#1769AA]/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[540px] h-[540px] border border-[#2D86C9]/10 rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-[-5%] w-[480px] h-[480px] bg-gradient-to-br from-[#1769AA]/10 via-[#2D86C9]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Breadcrumb, Pill, Bold Headline, Description, Capability Pills, CTAs */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
              
              {/* Breadcrumb: Home > Projects with home icon */}
              <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#1769AA] transition-colors">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#1769AA] font-bold">Projects</span>
              </nav>

              {/* Tag Pill: OUR WORK • PROJECTS • PORTFOLIO */}
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                  OUR WORK &nbsp;•&nbsp; PROJECTS &nbsp;•&nbsp; PORTFOLIO
                </span>
              </div>

              {/* Headline: Ideas Into Impactful Digital Experiences. */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.08] text-[#0B1220]">
                Ideas Into{" "}
                <span className="text-[#1769AA] block">Impactful</span>
                <span className="text-[#1769AA]">Digital Experiences.</span>
              </h1>

              {/* Supporting Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-normal">
                Explore how we transform business challenges into modern websites, mobile applications and intelligent software solutions.
              </p>

              {/* Category Capability Bar (Websites | Mobile Apps | CRM / ERP | AI & Automation) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
                    </svg>
                  </div>
                  <span>Websites</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
                    </svg>
                  </div>
                  <span>Mobile Apps</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" strokeWidth="2" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="2" />
                    </svg>
                  </div>
                  <span>CRM / ERP</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                      <rect x="9" y="9" width="6" height="6" strokeWidth="2" />
                      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeWidth="2" />
                    </svg>
                  </div>
                  <span>AI & Automation</span>
                </div>
              </div>

              {/* Action Buttons: View Our Projects -> | Get a Quote -> */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a href="#portfolio-grid">
                  <Button
                    size="lg"
                    className="rounded-full px-7 py-6 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 transition-all w-full sm:w-auto"
                  >
                    View Our Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-7 py-6 text-sm font-bold border-2 border-slate-300 hover:border-[#1769AA] text-[#0B1220] hover:bg-white hover:text-[#1769AA] transition-all w-full sm:w-auto bg-white/80"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: High-Impact Animated Portfolio & Project Showcase */}
            <div className="lg:col-span-7 xl:col-span-7 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[700px] lg:max-w-[760px]"
              >
                {/* Floating Ambient Glow Behind Showcase */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-[#2D86C9]/25 to-cyan-400/20 rounded-3xl blur-3xl -z-10 animate-pulse" />

                {/* Primary Mockup Graphic Image Container with subtle floating effect */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative transition-transform duration-500 hover:scale-[1.015] rounded-3xl p-2 bg-gradient-to-b from-white/95 via-white/70 to-blue-50/40 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(23,105,170,0.16)]"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-inner">
                    <img
                      src="/projects-hero-exact.png"
                      alt="AAYUP Technologies Projects Portfolio Showcase - Websites, Mobile Apps, CRM, ERP and E-Commerce Solutions"
                      className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Floating Micro-Card 1: Top Left - 50+ Projects Shipped */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute -top-4 -left-2 sm:-left-5 z-30 bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Shipped</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">50+ Live Projects</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 2: Top Right - 100% Client Satisfaction */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute -top-5 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-indigo-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                      <Layers className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Enterprise Ready</span>
                      <span className="text-xs font-extrabold text-slate-800">99.9% Uptime Stack</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 3: Bottom Left - Multi-Platform */}
                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute -bottom-5 -left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-xl border border-purple-100/90 shadow-2xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold">
                      <ExternalLink className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Cross-Platform</span>
                      <span className="text-xs font-extrabold text-slate-800">Web, Mobile & AI</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 4: Bottom Right - Clean Architecture */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="hidden sm:flex absolute -bottom-5 right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-cyan-100/90 shadow-2xl rounded-2xl px-3.5 py-2.5 items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-bold">
                      <Filter className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block">Modular Code</span>
                      <span className="text-xs font-extrabold text-slate-800">Production Tested</span>
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CATEGORY FILTERS & 5. FEATURED GALLERY */}
      <section id="portfolio-grid" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-[#1769AA]">
                Filter by Capability
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] mt-1">
                Selected Client Work
              </h2>
            </div>

            {/* Accessible Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isSelected
                        ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/25 scale-105"
                        : "bg-[#F3F7FB] text-slate-700 hover:bg-slate-200/80 border border-slate-200/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid: Desktop 3-col, Tablet 2-col, Mobile 1-col */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group bg-[#F3F7FB] border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1769AA]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e: any) => {
                          e.currentTarget.src = "/project-web-development.webp";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#0B1220]/85 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md font-medium">
                        {project.category}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#1769AA] transition-colors leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Footer Link / Action */}
                  <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-200/60 mt-4">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1769AA] hover:bg-[#0D4F85] text-white text-xs font-bold shadow-sm transition-all hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    ) : (
                      <Link
                        to={`/ProjectDetail?id=${project.id}`}
                        className="inline-flex items-center text-xs font-bold text-[#1769AA] hover:text-[#0D4F85] group-hover:translate-x-0.5 transition-transform"
                      >
                        View Project
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    )}

                    <Link
                      to={`/contact?subject=${encodeURIComponent("Enquiry for " + project.title)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#1769AA] transition-colors"
                    >
                      Enquiry
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 9. PORTFOLIO CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#0B1220] via-[#0D4F85] to-[#1769AA] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D86C9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide">
              Engineering Tailored To Your Goals
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Have a Similar Idea?
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Let's discuss your requirements and explore how we can turn your
              idea into a digital product.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold bg-white text-[#0B1220] hover:bg-slate-100 shadow-xl transition-all w-full sm:w-auto"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 py-6 text-base font-semibold border-2 border-white/40 text-black bg-white/15 hover:bg-white/25 transition-all w-full sm:w-auto"
                >
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
