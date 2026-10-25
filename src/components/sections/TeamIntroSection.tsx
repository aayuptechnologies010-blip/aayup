"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Code, Sparkles, Linkedin, Instagram, Facebook, ChevronLeft, ChevronRight, Globe, Twitter } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

import { useState, useEffect, useRef } from "react";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

const INITIAL_TEAM = [
  {
    name: "Vivek Chaurasiya",
    role: "Founder & CEO",
    badge: "Executive",
    bio: "Leads the vision and strategy to build innovative digital solutions.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=2400&auto=format&fit=crop&q=95",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://aayuptechnologies.com",
  },
  {
    name: "Priya Sharma",
    role: "Project Manager",
    badge: "Management",
    bio: "Ensures smooth execution and timely delivery of all projects.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=2400&auto=format&fit=crop&q=95",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://aayuptechnologies.com",
  },
  {
    name: "Rahul Verma",
    role: "Lead Developer",
    badge: "Engineering",
    bio: "Designs and develops scalable web and mobile solutions.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2400&auto=format&fit=crop&q=95",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://aayuptechnologies.com",
  },
  {
    name: "Neha Singh",
    role: "UI/UX Designer",
    badge: "Creative",
    bio: "Creates beautiful and user-friendly designs for better experiences.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=2400&auto=format&fit=crop&q=95",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://aayuptechnologies.com",
  },
];

export default function TeamIntroSection() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadTeam = () => {
      getDynamicData<any[]>(DYNAMIC_KEYS.TEAM, []).then((data) => {
        if (isMounted) {
          setIsLoaded(true);
          if (Array.isArray(data)) {
            const active = data.filter((m: any) => m.active !== false);
            setTeamMembers(active);
          }
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
    if (!container || teamMembers.length === 0) return;

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

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Duplicate items for infinite seamless scroll only if items exist
  const displayMembers =
    teamMembers.length === 0
      ? []
      : teamMembers.length < 5
      ? [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers]
      : [...teamMembers, ...teamMembers];

  return (
    <section id="team" className="scroll-mt-24 py-12 md:py-16 bg-white dark:bg-[#0B1220] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header Matching Mockup */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-10 h-[1.5px] bg-[#1769AA]" />
            <span className="text-xs sm:text-sm uppercase tracking-widest font-extrabold text-[#1769AA]">
              OUR TEAM
            </span>
            <span className="w-10 h-[1.5px] bg-[#1769AA]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white tracking-tight">
            Meet Our <span className="text-[#0256B2] dark:text-[#3B82F6]">Expert Team</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            A passionate team of professionals working together to deliver innovative solutions and create real value for our clients.
          </p>
        </div>

        {/* Team Members Display with side arrows and exact card styling */}
        {displayMembers.length > 0 ? (
          <div
            className="group/teamslider relative mb-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Floating Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Team Members"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white dark:bg-[#131F33] text-[#0256B2] dark:text-[#3B82F6] shadow-xl border border-slate-100 dark:border-white/10 flex items-center justify-center hover:bg-[#0256B2] hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Right Floating Arrow (Solid Blue like mockup) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Team Members"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#0256B2] text-white shadow-xl flex items-center justify-center hover:bg-[#0D4F85] transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Scrollable Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-hidden no-scrollbar py-4 px-2 select-none cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: "auto" }}
            >
              {displayMembers.map((member, index) => {
                let hdAvatar = member.avatar;
                if (hdAvatar && hdAvatar.includes("unsplash.com")) {
                  // Enhance to 4K studio quality resolution
                  hdAvatar = hdAvatar
                    .replace(/w=\d+/, "w=2000")
                    .replace(/q=\d+/, "q=95");
                  if (!hdAvatar.includes("w=")) {
                    hdAvatar += (hdAvatar.includes("?") ? "&" : "?") + "w=2000&q=95&auto=format";
                  }
                }

                return (
                  <div
                    key={`${member.name}-${index}`}
                    className="w-[285px] sm:w-[310px] flex-shrink-0 bg-white dark:bg-[#0E1626] rounded-3xl overflow-hidden shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-white/5 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-5px_rgba(2,86,178,0.18)] flex flex-col"
                  >
                    {/* Top Image Stage with Blue Circular Badge Background & Curved Wave */}
                    <div className="relative w-full h-72 bg-gradient-to-br from-[#EAF2FB] to-[#DCEAF8] dark:from-[#131F33] dark:to-[#0D1524] overflow-hidden flex items-end justify-center">
                      {/* Signature Blue Circular Accent Behind Person (as in reference) */}
                      <div className="absolute top-2 -right-10 w-44 h-44 rounded-full bg-[#0256B2] dark:bg-[#1E40AF] pointer-events-none opacity-90" />

                      {/* Person Portrait (4K Ultra-HD Studio Quality) */}
                      {hdAvatar ? (
                        <img
                          src={hdAvatar}
                          alt={member.name}
                          loading="lazy"
                          className="relative z-10 w-full h-full object-cover object-top filter contrast-[1.04] saturate-[1.05] brightness-[1.02]"
                          style={{ imageRendering: "auto" }}
                        />
                      ) : (
                        <div className="relative z-10 w-full h-full flex items-center justify-center text-4xl font-black text-[#0256B2]">
                          {member.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                        </div>
                      )}

                      {/* Smooth Organic Wave Divider on Bottom of Image */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none leading-none">
                        <svg
                          viewBox="0 0 500 80"
                          preserveAspectRatio="none"
                          className="w-full h-9 fill-white dark:fill-[#0E1626] translate-y-[2px]"
                        >
                          <path d="M0,35 C150,85 320,-10 500,45 L500,80 L0,80 Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Content Section Matching Mockup */}
                    <div className="px-6 pt-2 pb-6 flex-1 flex flex-col justify-between bg-white dark:bg-[#0E1626]">
                      <div>
                        {/* Member Name */}
                        <h3 className="text-xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
                          {member.name}
                        </h3>

                        {/* Member Role (Vibrant Blue) */}
                        <p className="text-sm font-bold text-[#0256B2] dark:text-[#3B82F6] mt-1">
                          {member.role}
                        </p>

                        {/* Bio Description */}
                        {member.bio && (
                          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      {/* Social Media Circular Buttons Exactly Like Reference (LinkedIn, Twitter/Insta, Web/Facebook) */}
                      <div className="flex items-center gap-2.5 pt-5 mt-4">
                        <a
                          href={member.linkedin || "https://linkedin.com"}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-[#0256B2] text-white flex items-center justify-center hover:bg-[#0D4F85] transition-all transform hover:scale-110 shadow-sm"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4 fill-white stroke-none" />
                        </a>
                        <a
                          href={member.twitter || member.instagram || "https://twitter.com"}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-[#00A6FF] text-white flex items-center justify-center hover:bg-[#0090DE] transition-all transform hover:scale-110 shadow-sm"
                          title="Twitter"
                        >
                          <Twitter className="w-4 h-4 fill-white stroke-none" />
                        </a>
                        <a
                          href={member.website || member.facebook || "https://aayuptechnologies.com"}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-[#0256B2] text-white flex items-center justify-center hover:bg-[#0D4F85] transition-all transform hover:scale-110 shadow-sm"
                          title="Website"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots at Bottom (As in Mockup) */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0256B2]" />
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
        ) : isLoaded ? (
          <div className="py-12 mb-16 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50/50 dark:bg-white/5">
            <Users className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              No team members to display currently.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add team members in the Admin Panel to display them here live.
            </p>
          </div>
        ) : null}

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
