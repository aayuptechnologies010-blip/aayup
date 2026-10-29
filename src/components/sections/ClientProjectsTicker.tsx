"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/projectsData";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

export default function ClientProjectsTicker() {
  const [projects, setProjects] = useState<ProjectItem[]>(PORTFOLIO_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    const loadDynamicProjects = () => {
      getDynamicData<ProjectItem[]>(DYNAMIC_KEYS.PROJECTS, PORTFOLIO_PROJECTS).then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjects(data);
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

  if (!projects || projects.length === 0) return null;

  // Duplicate list to achieve continuous seamless marquee loop
  const marqueeItems = [...projects, ...projects, ...projects];

  return (
    <section className="relative w-full py-4 bg-[#0B1220] border-y border-slate-800 overflow-hidden select-none">
      <div className="flex items-center">
        {/* Left static label */}
        <div className="shrink-0 z-10 pl-4 sm:pl-8 pr-4 bg-gradient-to-r from-[#0B1220] via-[#0B1220] to-transparent flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#2D86C9]">
            Client Projects:
          </span>
        </div>

        {/* Continuous ticker track */}
        <div className="relative overflow-hidden w-full group">
          <div className="flex items-center gap-8 sm:gap-12 w-max animate-ticker group-hover:[animation-play-state:paused]">
            {marqueeItems.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.demoUrl || `/ProjectDetail?id=${item.id}`}
                target={item.demoUrl ? "_blank" : "_self"}
                rel={item.demoUrl ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#1769AA]/50 transition-all cursor-pointer shrink-0"
              >
                {/* Project / Client Thumbnail Logo */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-white/15">
                  <img
                    src={item.image || "/project-web-development.webp"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.currentTarget.src = "/project-web-development.webp";
                    }}
                  />
                </div>

                {/* Project / Client Name & Category */}
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-ticker {
          animation: ticker 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

