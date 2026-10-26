"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone, Clock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { Link } from "@/lib/router-bridge";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] pt-[180px] pb-14 sm:pt-[160px] md:pt-[164px] md:pb-20 lg:pt-[172px] border-b border-slate-200/50">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] border border-[#1769AA]/15 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[540px] h-[540px] border border-[#2D86C9]/10 rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-[-5%] w-[480px] h-[480px] bg-gradient-to-br from-[#1769AA]/15 via-[#2D86C9]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Highlights, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#1769AA] transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-[#1769AA] font-bold">Contact</span>
            </nav>

            {/* Tag Pill */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                WE ARE HERE TO HELP • 24/7 CONSULTATION
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-[#0B1220]">
              Let's Discuss Your Project &{" "}
              <span className="text-[#1769AA] block">Accelerate Your</span>
              <span className="text-[#1769AA]">Digital Growth.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Whether you need a cutting-edge web application, a full-stack mobile app, custom enterprise software, or an AI workflow, our technical architects are ready to guide you.
            </p>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                "100% Free Consultation",
                "Quote within 24 Hours",
                "Non-Disclosure Agreement (NDA)",
                "Direct Architect Access",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200/90 px-3 py-1.5 rounded-md shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a href="#contact-form-section">
                <button className="rounded-full px-7 py-3.5 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 hover:shadow-xl transition-all w-full sm:w-auto flex items-center justify-center gap-2 group">
                  Send a Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a
                href="https://wa.me/917030839883?text=Hello%20Aayup%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-full px-7 py-3.5 text-sm font-bold border-2 border-slate-300 hover:border-emerald-500 text-[#0B1220] hover:bg-emerald-50/50 hover:text-emerald-700 transition-all w-full sm:w-auto bg-white/80 flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Chat on WhatsApp
                </button>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Animated Connect Card Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[580px]"
            >
              {/* Dynamic Ambient Glow Behind Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-[#2D86C9]/25 to-emerald-400/20 rounded-3xl blur-3xl -z-10 animate-pulse" />

              {/* Central Floating Card Container */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/95 via-white/85 to-blue-50/40 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(23,105,170,0.16)] space-y-6"
              >
                {/* Header of Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1769AA] to-[#2D86C9] flex items-center justify-center text-white shadow-md shadow-[#1769AA]/30">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Quick Response Desk</h3>
                      <p className="text-xs text-slate-500 font-medium">Direct Engineering & Sales Consultation</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Active Now
                  </span>
                </div>

                {/* 3 Interactive Quick Stats */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-blue-50/40 transition-colors">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Reply Time</span>
                    <span className="text-xl sm:text-2xl font-black text-[#1769AA] block mt-0.5">&lt; 2 Hours</span>
                    <span className="text-[11px] text-slate-500 font-medium">Same-day inquiry review</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-blue-50/40 transition-colors">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Direct WhatsApp</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600 block mt-0.5">Instant</span>
                    <span className="text-[11px] text-slate-500 font-medium">+91 70308 39883</span>
                  </div>
                </div>

                {/* Direct Reach Strip */}
                <div className="space-y-2.5">
                  <a
                    href="mailto:info@aayuptechnologies.com"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#1769AA] shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1769AA] flex items-center justify-center font-bold">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block group-hover:text-[#1769AA] transition-colors">
                          info@aayuptechnologies.com
                        </span>
                        <span className="text-[10px] text-slate-400">Official inquiries & RFPs</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-[#1769AA] transition-all" />
                  </a>

                  <a
                    href="tel:+917030839883"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block group-hover:text-emerald-700 transition-colors">
                          +91 70308 39883
                        </span>
                        <span className="text-[10px] text-slate-400">Direct phone & WhatsApp call</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                  </a>
                </div>

                {/* Floating Micro-Card 1: Top Right - NDA Protected */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute -top-4 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-xl rounded-2xl px-3.5 py-2 flex items-center gap-2 hover:shadow-2xl transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">Privacy</span>
                    <span className="text-xs font-extrabold text-slate-800">100% NDA Protected</span>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 2: Bottom Left - Working Hours */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -bottom-4 -left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-xl border border-indigo-100/90 shadow-xl rounded-2xl px-3.5 py-2 flex items-center gap-2 hover:shadow-2xl transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider block">Availability</span>
                    <span className="text-xs font-extrabold text-slate-800">Mon - Sat (IST)</span>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
