"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

export default function FeaturedProjectsSection() {
  const projects = [
    {
      id: "ecommerce",
      title: "Enterprise E-Commerce Platform",
      category: "Web & Custom Software",
      description:
        "Full-stack digital commerce platform engineered with Next.js, Node.js, and MongoDB featuring real-time inventory synchronization, order management, and multi-tier payment gateways.",
      image: "/project-web-development.webp",
      tags: ["React / Next.js", "Node.js", "MongoDB", "Stripe API"],
    },
    {
      id: "bhoommetra",
      title: "Bhoommetra Mobile & IoT Solution",
      category: "Mobile Application & IoT",
      description:
        "Agricultural intelligence platform delivering automated soil parameter telemetry, mobile crop analytics, and predictive agronomy insights for farm operators.",
      image: "/project-mobile-app.webp",
      tags: ["Flutter", "IoT Telemetry", "AI Analytics", "Cloud Services"],
    },
    {
      id: "ai-dev-tools",
      title: "Intelligent Business Automation & AI Suite",
      category: "AI & Business Automation",
      description:
        "High-performance operational dashboard featuring automated code generation, machine learning telemetry, and workflow optimization modules for engineering teams.",
      image: "/project-ai-dashboard.webp",
      tags: ["Python", "Machine Learning", "FastAPI", "React"],
    },
  ];

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
          {projects.map((project, index) => (
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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B1220]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-[#1769AA] dark:group-hover:text-[#2D86C9] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2.5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/ProjectDetail?id=${project.id}`}
                  className="inline-flex items-center text-sm font-semibold text-[#1769AA] dark:text-[#2D86C9] hover:underline"
                >
                  View Project
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
