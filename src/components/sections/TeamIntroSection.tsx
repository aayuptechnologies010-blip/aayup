"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Code, Sparkles } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

export default function TeamIntroSection() {
  const teamMembers = [
    {
      name: "Aayush Pandey",
      role: "Lead Software Architect & Engineering Lead",
      badge: "Core Team",
      bio: "Guides full-stack engineering, cloud architecture, and technical innovation across client software engagements.",
    },
    {
      name: "Sarthak Verma",
      role: "Senior Full-Stack & Mobile Developer",
      badge: "Engineering",
      bio: "Specializes in modern React/Next.js platforms, cross-platform mobile architecture, and resilient API systems.",
    },
    {
      name: "Product & Engineering Collective",
      role: "Cross-Functional Software Developers & Designers",
      badge: "Technical Specialists",
      bio: "Dedicated team of UI/UX designers, backend developers, and quality engineers building high-performance digital products.",
    },
  ];

  return (
    <section id="team" className="scroll-mt-24 py-12 md:py-16 bg-white dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              The People Behind The Code
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] dark:text-white mt-2 leading-tight">
              Company & Team Introduction
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              AAYUP Technologies is driven by skilled engineers and designers passionate about building high-quality, transparent, and scalable digital systems.
            </p>
          </div>
          <div>
            <Link to="/careers">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-[#1769AA] text-[#1769AA] hover:bg-[#1769AA] hover:text-white font-semibold transition-all"
              >
                Join Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F3F7FB] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#1769AA] to-[#2D86C9] text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {member.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1769AA]/10 text-[#1769AA] dark:text-[#2D86C9]">
                    {member.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1220] dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#1769AA] dark:text-[#2D86C9] mt-1">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-3.5 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Code className="w-3.5 h-3.5 text-[#1769AA]" />
                <span>Verified AAYUP Technologies Team</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ATTRACTIVE JOIN OUR TEAM SHOWCASE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] dark:from-[#0E1726] dark:via-[#131F33] dark:to-[#0B1220] border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 shadow-xl"
        >
          {/* Subtle Ambient Glowing Backgrounds */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1769AA]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2D86C9]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] dark:text-[#2D86C9] text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CULTURE & OPPORTUNITIES</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              Work With Passionate People.{" "}
              <span className="text-[#1769AA] dark:text-[#2D86C9]">Grow Your Career.</span>
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mt-3 mb-8">
              Learn new skills, enjoy continuous growth, work on real client projects, and experience a supportive and collaborative environment at AAYUP Technologies.
            </p>

            {/* Banner Mockup with Floating Animation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 transition-transform duration-500 hover:scale-[1.01]"
            >
              <img
                src="/join-team-banner.png"
                alt="Join Our Team at AAYUP Technologies - Learn New Skills, Career Growth, Collaborative Culture, Work on Real Projects, Work-Life Balance"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Action CTA under banner */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/careers">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Open Roles & Apply
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
