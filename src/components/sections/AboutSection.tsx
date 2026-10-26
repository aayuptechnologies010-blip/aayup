"use client";

import { motion } from "framer-motion";
import { Target, Eye, Code2, Users, Sparkles, ShieldCheck, Award } from "lucide-react";
import { FloatingLogo } from "@/components/ui/floating-logo";

const AboutSection = () => {
  const values = [
    { icon: Code2, title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
    { icon: Target, title: "Integrity", description: "Building trust through transparency" },
    { icon: Users, title: "Collaboration", description: "Achieving more together" },
    { icon: Eye, title: "Excellence", description: "Delivering nothing but the best" },
  ];

  return (
    <section id="about" className="relative">
      <FloatingLogo />
      {/* ABOUT PAGE HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] pt-[180px] pb-16 sm:pt-[160px] md:pt-[164px] md:pb-20 lg:pt-[172px] border-b border-slate-200/50 mb-16">
        {/* Decorative Ambient Background Rings */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] border border-[#1769AA]/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[540px] h-[540px] border border-[#2D86C9]/10 rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-[-5%] w-[480px] h-[480px] bg-gradient-to-br from-[#1769AA]/10 via-[#2D86C9]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <a href="/" className="inline-flex items-center gap-1.5 hover:text-[#1769AA] transition-colors">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </a>
                <span className="text-slate-400">/</span>
                <span className="text-[#1769AA] font-bold">About Us</span>
              </nav>

              {/* Tag Pill */}
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                  INNOVATION • INTEGRITY • EXCELLENCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-[#0B1220]">
                We Engineer Digital Solutions That{" "}
                <span className="text-[#1769AA] block">Empower Modern</span>
                <span className="text-[#1769AA]">Enterprises.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                At AAYUP Technologies, we are an experienced team of software architects, full-stack engineers, and product designers dedicated to high-impact software, mobile apps, and enterprise transformation.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a href="/contact">
                  <button className="rounded-full px-7 py-3.5 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                    Let's Connect
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </a>
                <a href="/projects">
                  <button className="rounded-full px-7 py-3.5 text-sm font-bold border-2 border-slate-300 hover:border-[#1769AA] text-[#0B1220] hover:bg-white hover:text-[#1769AA] transition-all w-full sm:w-auto bg-white/80">
                    Explore Our Work
                  </button>
                </a>
              </div>
            </div>

            {/* Right Visual Banner Showcase */}
            <div className="lg:col-span-7 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[720px] lg:max-w-[780px]"
              >
                {/* Floating Glow Behind Showcase */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-[#2D86C9]/25 to-cyan-400/20 rounded-3xl blur-3xl -z-10 animate-pulse" />

                {/* Primary Mockup Graphic Image Container with subtle floating animation */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative transition-transform duration-500 hover:scale-[1.015] rounded-3xl p-2 bg-gradient-to-b from-white/95 via-white/70 to-blue-50/40 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(23,105,170,0.16)]"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-inner">
                    <img
                      src="/about-hero-team.png"
                      alt="AAYUP Technologies Team and Company Showcase - Experienced Team, Innovative Solutions, Quality Development, Long-Term Partnership"
                      className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Floating Micro-Card 1: Top Left - 15+ Core Team Members */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute -top-4 -left-2 sm:-left-5 z-30 bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Expert Team</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">15+ Engineers & Designers</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 2: Top Right - Enterprise Trust */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute -top-5 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-emerald-100/90 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Enterprise Grade</span>
                      <span className="text-xs font-extrabold text-slate-800">100% Quality Code</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 3: Bottom Left - Innovation */}
                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute -bottom-5 -left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-xl border border-purple-100/90 shadow-2xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Philosophy</span>
                      <span className="text-xs font-extrabold text-slate-800">Innovation & Integrity</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 4: Bottom Right - Recognition */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="hidden sm:flex absolute -bottom-5 right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-amber-100/90 shadow-2xl rounded-2xl px-3.5 py-2.5 items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-left pr-1">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Partnership</span>
                      <span className="text-xs font-extrabold text-slate-800">Long-term Client Trust</span>
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">Who We Are</h3>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              A high-impact software engineering agency delivering custom web platforms, cloud architecture, and mobile applications for forward-thinking enterprises.
            </p>
            <div className="mt-5 flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Specialized Team</p>
                <p className="text-foreground/70 text-xs">Architects, engineers & UI designers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 gradient-text">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              To empower modern businesses with resilient, scalable code and intuitive digital experiences that accelerate real growth and operational efficiency.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="glass-card p-6 text-center transition-transform duration-300 hover:-translate-y-3 hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-foreground/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
