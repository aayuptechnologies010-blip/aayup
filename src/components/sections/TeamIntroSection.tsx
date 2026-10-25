"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Code, Sparkles, Linkedin, Instagram, Facebook } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

import { useState, useEffect, useRef } from "react";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

const INITIAL_TEAM = [
  {
    name: "Aayush Pandey",
    role: "Lead Software Architect & Engineering Lead",
    badge: "Core Team",
    bio: "Guides full-stack engineering, cloud architecture, and technical innovation across client software engagements.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
  },
  {
    name: "Sarthak Verma",
    role: "Senior Full-Stack & Mobile Developer",
    badge: "Engineering",
    bio: "Specializes in modern React/Next.js platforms, cross-platform mobile architecture, and resilient API systems.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  },
  {
    name: "Product & Engineering Collective",
    role: "Cross-Functional Software Developers & Designers",
    badge: "Technical Specialists",
    bio: "Dedicated team of UI/UX designers, backend developers, and quality engineers building high-performance digital products.",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop",
  },
];

export default function TeamIntroSection() {
  const [teamMembers, setTeamMembers] = useState<any[]>(INITIAL_TEAM);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadTeam = () => {
      getDynamicData<any[]>(DYNAMIC_KEYS.TEAM, INITIAL_TEAM).then((data) => {
        if (isMounted && Array.isArray(data)) {
          const active = data.filter((m: any) => m.active !== false);
          if (active.length > 0) setTeamMembers(active);
        }
      });
    };

    loadTeam();
    window.addEventListener("aayup_dynamic_data_updated", loadTeam);
    window.addEventListener("team_members_updated", loadTeam);
    window.addEventListener("storage", loadTeam);
    return () => {
      isMounted = false;
      window.removeEventListener("aayup_dynamic_data_updated", loadTeam);
      window.removeEventListener("team_members_updated", loadTeam);
      window.removeEventListener("storage", loadTeam);
    };
  }, []);

  // Continuous Auto-Scroll Carousel with Hover-to-Pause
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.55; // Pixels per frame (~35px/sec)

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, teamMembers]);

  // Duplicate items for infinite seamless scroll
  const displayMembers = teamMembers.length < 5
    ? [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers]
    : [...teamMembers, ...teamMembers];

  return (
    <section id="team" className="scroll-mt-24 py-12 md:py-16 bg-white dark:bg-[#0B1220] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
                className="rounded-xl border-2 border-[#1769AA] text-[#1769AA] hover:bg-[#1769AA] hover:text-white font-semibold transition-all group"
              >
                Join Our Team
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Continuous Infinite Sliding Carousel (Pauses on Hover) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-hidden no-scrollbar py-4 mb-16 select-none cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }}
        >
          {displayMembers.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="w-[310px] sm:w-[350px] flex-shrink-0 bg-[#F3F7FB] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#1769AA]/40 transition-all transform hover:-translate-y-1.5 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1769AA] to-[#2D86C9] text-white flex items-center justify-center font-bold text-lg shadow-md overflow-hidden ring-2 ring-[#1769AA]/20">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")
                    )}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1769AA]/10 text-[#1769AA] dark:text-[#2D86C9]">
                    {member.badge || member.department || "Core Team"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1220] dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[#1769AA] dark:text-[#2D86C9] mt-1">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-3.5 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Links on card */}
                {(member.linkedin || member.instagram || member.facebook) && (
                  <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-pink-50 dark:bg-white/10 text-pink-700 dark:text-pink-400 hover:bg-pink-100 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-indigo-50 dark:bg-white/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Code className="w-3.5 h-3.5 text-[#1769AA]" />
                <span>Verified AAYUP Technologies Team</span>
              </div>
            </div>
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
