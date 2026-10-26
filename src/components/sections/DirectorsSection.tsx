"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Facebook,
  Sparkles,
  Award,
  Globe,
  Quote,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

interface DirectorMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  badge?: string;
  bio?: string;
  avatar?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  active?: boolean;
  isDirector?: boolean;
  directorField?: string;
  directorMessage?: string;
}

const FALLBACK_DIRECTORS: DirectorMember[] = [
  {
    id: "dir-default-1",
    name: "Aayush Pandey",
    role: "Managing Director & Chief Technology Officer",
    badge: "Director",
    department: "Leadership",
    directorField: "Technology & Software Engineering",
    directorMessage:
      "At AAYUP Technologies, our vision is to engineer resilient, high-speed digital architectures and modern web/cloud systems that empower high-growth global enterprises to scale without friction.",
    bio: "Pioneering technological architecture and enterprise transformations with over 7+ years of deep expertise in cloud systems, microservices, mobile ecosystems, and agile development execution.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=95",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    active: true,
    isDirector: true,
  },
];

export default function DirectorsSection() {
  const [directors, setDirectors] = useState<DirectorMember[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadDirectors = () => {
      getDynamicData<DirectorMember[]>(DYNAMIC_KEYS.TEAM, []).then((data) => {
        if (isMounted) {
          setIsLoaded(true);
          if (Array.isArray(data) && data.length > 0) {
            const activeDirectors = data.filter(
              (m) => m.active !== false && (m.isDirector === true || m.badge?.toLowerCase().includes("director") || m.role?.toLowerCase().includes("director") || m.role?.toLowerCase().includes("founder") || m.role?.toLowerCase().includes("ceo"))
            );
            setDirectors(activeDirectors.length > 0 ? activeDirectors : FALLBACK_DIRECTORS);
          } else {
            setDirectors(FALLBACK_DIRECTORS);
          }
        }
      });
    };

    loadDirectors();
    window.addEventListener("aayup_dynamic_data_updated", loadDirectors);
    window.addEventListener("team_members_updated", loadDirectors);
    window.addEventListener("storage", loadDirectors);

    return () => {
      isMounted = false;
      window.removeEventListener("aayup_dynamic_data_updated", loadDirectors);
      window.removeEventListener("team_members_updated", loadDirectors);
      window.removeEventListener("storage", loadDirectors);
    };
  }, []);

  if (!isLoaded && directors.length === 0) {
    return null;
  }

  if (directors.length === 0) {
    return null;
  }

  return (
    <section id="directors" className="scroll-mt-24 py-16 md:py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F6FC] dark:from-[#080D1A] dark:via-[#0B1220] dark:to-[#090F1E] relative overflow-hidden">
      {/* Dynamic Background Glow & Architectural Grid Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-[#1769AA]/10 via-[#0066FF]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-[-10%] w-[600px] h-[600px] bg-[#1769AA]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading Badge & Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/25 text-[#1769AA] dark:text-[#3B82F6] text-xs font-black tracking-widest uppercase mb-4 shadow-sm"
          >
            <Award className="w-3.5 h-3.5" />
            <span>BOARD OF DIRECTORS & EXECUTIVE LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white tracking-tight leading-tight"
          >
            Guiding Vision, Strategy &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#1769AA] to-[#0284C7] dark:from-[#38BDF8] dark:to-[#3B82F6]">
              Industry Leadership
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
          >
            Meet our esteemed directors heading specialized fields of digital innovation, engineering excellence, and client transformation at AAYUP Technologies.
          </motion.p>
        </div>

        {/* Dynamic Zig-Zag Showcase of Directors */}
        <div className="space-y-16 md:space-y-24">
          {directors.map((director, index) => {
            // Zig-Zag alternating layout: even index = picture left, odd index = picture right
            const isReverse = index % 2 === 1;

            let hdAvatar = director.avatar;
            if (hdAvatar && hdAvatar.includes("unsplash.com")) {
              hdAvatar = hdAvatar
                .replace(/w=\d+/, "w=1600")
                .replace(/q=\d+/, "q=95");
              if (!hdAvatar.includes("w=")) {
                hdAvatar += (hdAvatar.includes("?") ? "&" : "?") + "w=1600&q=95&auto=format";
              }
            }

            return (
              <motion.div
                key={director.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl p-6 sm:p-8 md:p-12 bg-white/90 dark:bg-[#0E1626]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(23,105,170,0.12)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all hover:border-[#1769AA]/40`}
              >
                {/* Decorative Subtle Corner Accent Ring */}
                <div className={`absolute top-0 ${isReverse ? "left-0" : "right-0"} w-48 h-48 bg-gradient-to-br from-[#1769AA]/10 to-transparent rounded-full blur-2xl pointer-events-none`} />

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-center ${isReverse ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* FULL SIZE BADA SA PICTURE COLUMN */}
                  <div
                    className={`lg:col-span-5 ${isReverse ? "lg:order-2" : "lg:order-1"
                      } relative flex justify-center`}
                  >
                    <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group border-4 border-white dark:border-slate-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                      {/* Gradient Backdrop behind photo */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-transparent to-cyan-400/10 pointer-events-none z-10" />

                      {hdAvatar ? (
                        <img
                          src={hdAvatar}
                          alt={director.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.03] saturate-[1.05]"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#0D4F85] to-[#1769AA] text-white p-6 text-center">
                          <span className="text-6xl font-black mb-2 opacity-80">
                            {director.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                          <span className="text-sm font-bold tracking-wide uppercase text-sky-200">
                            {director.role}
                          </span>
                        </div>
                      )}

                      {/* Floating Director Pill On Picture Bottom Left */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-2xl bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#1769AA] text-white flex items-center justify-center font-bold text-xs shadow-md">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#1769AA] dark:text-[#38BDF8] block">
                              Director in Charge
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                              {director.directorField || director.department || "Executive Leadership"}
                            </span>
                          </div>
                        </div>

                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* DIRECTOR DETAILS & ABOUT US COLUMN */}
                  <div
                    className={`lg:col-span-7 ${isReverse ? "lg:order-1" : "lg:order-2"
                      } flex flex-col justify-center space-y-6 text-left`}
                  >
                    {/* Badge Pill for Field of Direction */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0066FF]/10 text-[#0066FF] dark:text-[#38BDF8] border border-[#0066FF]/25 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Director &bull; {director.directorField || director.department || "Strategic Leadership"}</span>
                      </span>
                      {director.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                          {director.badge}
                        </span>
                      )}
                    </div>

                    {/* Full Name & Designation */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
                        {director.name}
                      </h3>
                      <p className="text-base sm:text-lg font-bold text-[#1769AA] dark:text-[#3B82F6] mt-1.5 flex items-center gap-2">
                        <span>{director.role}</span>
                      </p>
                    </div>

                    {/* Director Vision Statement / Quote */}
                    {director.directorMessage ? (
                      <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1769AA]/5 to-transparent border-l-4 border-[#1769AA] dark:border-[#38BDF8] bg-slate-50/70 dark:bg-white/5">
                        <Quote className="w-8 h-8 text-[#1769AA]/30 dark:text-[#38BDF8]/40 mb-2" />
                        <p className="text-sm sm:text-base font-medium italic text-slate-800 dark:text-slate-200 leading-relaxed">
                          "{director.directorMessage}"
                        </p>
                        <span className="block mt-2.5 text-xs font-bold uppercase tracking-wider text-[#1769AA] dark:text-[#38BDF8]">
                          — Leadership Vision &amp; Directorial Focus
                        </span>
                      </div>
                    ) : null}

                    {/* Full Bio / About Us */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                        About the Director &amp; Domain Expertise
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                        {director.bio ||
                          "Leads domain innovation, strategic roadmap planning, architecture excellence, and high-impact software execution across global enterprise client engagements."}
                      </p>
                    </div>

                    {/* Social Media & Action Channels */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-1">
                        Connect with {director.name.split(" ")[0]}:
                      </span>

                      {director.linkedin && (
                        <a
                          href={director.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900 flex items-center justify-center hover:bg-[#1769AA] hover:text-white dark:hover:bg-[#1769AA] dark:hover:text-white transition-all transform hover:scale-110 shadow-sm"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}

                      {director.instagram && (
                        <a
                          href={director.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 border border-pink-200 dark:border-pink-900 flex items-center justify-center hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white transition-all transform hover:scale-110 shadow-sm"
                          title="Instagram Handle"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}

                      {director.facebook && (
                        <a
                          href={director.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all transform hover:scale-110 shadow-sm"
                          title="Facebook Profile"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}

                      <a
                        href="/contact"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1769AA] dark:text-[#38BDF8] hover:underline"
                      >
                        <span>Schedule Leadership Consultation</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
