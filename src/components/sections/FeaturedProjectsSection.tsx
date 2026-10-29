"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/projectsData";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

export default function FeaturedProjectsSection() {
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

  // Display top 3-6 featured projects
  const displayProjects = projects.slice(0, 6);

  return (
    <section id="projects" className="py-12 md:py-16 bg-white dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              Portfolio Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] dark:text-white mt-2 leading-tight">
              Featured Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              Explore real-world software applications, enterprise platforms, and digital systems engineered by AAYUP Technologies.
            </p>
          </div>
          <div>
            <Link to="/projects">
              <Button
                variant="outline"
                className="rounded-xl border-2 border-[#1769AA] text-[#1769AA] hover:bg-[#1769AA] hover:text-white font-semibold transition-all"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#F3F7FB] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1769AA]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={project.image || "/project-web-development.webp"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e: any) => {
                      e.currentTarget.src = "/project-web-development.webp";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1220]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-[#1769AA] dark:group-hover:text-[#2D86C9] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Link / Action */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-200/60 dark:border-white/10 mt-4">
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
                    className="inline-flex items-center text-xs font-bold text-[#1769AA] dark:text-[#2D86C9] hover:underline"
                  >
                    View Project
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                )}

                <Link
                  to={`/contact?subject=${encodeURIComponent("Enquiry for " + project.title)}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1769AA] transition-colors"
                >
                  Enquiry
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
