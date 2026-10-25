"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Users,
  Code2,
  Layers,
  Sparkles,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-bridge";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/projectsData";

export default function ProjectDetail() {
  const router = useRouter();
  const routeQueryId =
    typeof router.query.id === "string" ? router.query.id : undefined;
  const [projectId, setProjectId] = useState<string | undefined>(routeQueryId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get("id");
      if (urlId) {
        setProjectId(urlId);
      } else if (routeQueryId) {
        setProjectId(routeQueryId);
      }
    }
  }, [routeQueryId]);

  const [allProjects, setAllProjects] = useState<ProjectItem[]>(PORTFOLIO_PROJECTS);

  useEffect(() => {
    let isMounted = true;
    import("@/lib/dynamicDataService").then(({ getDynamicData, DYNAMIC_KEYS }) => {
      getDynamicData<ProjectItem[]>(DYNAMIC_KEYS.PROJECTS, PORTFOLIO_PROJECTS).then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setAllProjects(data);
        }
      });
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const project: ProjectItem | undefined = allProjects.find(
    (p) => p.id === (projectId || routeQueryId)
  );

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-28 pb-16">
          <div className="text-center p-8 bg-[#F3F7FB] rounded-2xl border border-slate-200 max-w-md mx-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-3 text-[#0B1220]">
              Project Not Found
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              The project case study you requested could not be located in our portfolio.
            </p>
            <Link to="/projects">
              <Button className="bg-[#1769AA] hover:bg-[#0D4F85] text-white rounded-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Related projects in the same or other categories
  const relatedProjects = PORTFOLIO_PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-[#0B1220] selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 pt-[180px] pb-20 sm:pt-[160px] md:pt-[164px] lg:pt-[172px]">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-[#1769AA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Projects
          </Link>
        </div>

        {/* 1. PROJECT OVERVIEW HERO */}
        <div className="bg-[#F3F7FB] border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-xs font-semibold tracking-wide">
                <span>{project.category}</span>
                <span>•</span>
                <span>{project.demoType}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1220] tracking-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {project.fullDescription}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. BUSINESS PROBLEM & 3. PROPOSED SOLUTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Business Problem */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1220] mb-3">
                The Business Problem
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Diagnostic & Research
            </div>
          </div>

          {/* Proposed Solution */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#0B1220] mb-3">
                The Implemented Solution
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Engineering Architecture
            </div>
          </div>
        </div>

        {/* 4. IMPLEMENTED FEATURES & 5. TECHNOLOGY STACK */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Features */}
          <div className="lg:col-span-7 bg-[#F3F7FB] p-8 rounded-2xl border border-slate-200/90 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1220] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1769AA]" />
              Implemented Product Features
            </h2>
            <div className="space-y-3.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1769AA] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1220] mb-5 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#1769AA]" />
                Technology Stack
              </h2>
              <div className="space-y-3">
                {project.technologies.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F3F7FB] border border-slate-200/60"
                  >
                    <span className="text-sm font-bold text-[#0B1220]">
                      {t.name}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {t.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Delivery Time
                </p>
                <p className="text-lg font-bold text-[#0B1220] mt-1">
                  {project.duration}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Team Allocation
                </p>
                <p className="text-lg font-bold text-[#0B1220] mt-1">
                  {project.team}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. SCREENSHOTS / PRODUCT GALLERY */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-[#0B1220] mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#1769AA]" />
            Product Gallery
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-video"
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 8. RELATED PROJECTS */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0B1220] mb-6">
            Related Case Studies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                className="bg-[#F3F7FB] p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs font-semibold text-[#1769AA]">
                    {rel.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1220] group-hover:text-[#1769AA] transition-colors mt-0.5">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm line-clamp-1">
                    {rel.shortDescription}
                  </p>
                </div>
                <Link to={`/ProjectDetail?id=${rel.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-[#1769AA] text-[#1769AA] hover:bg-[#1769AA] hover:text-white"
                  >
                    View
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 9. START A SIMILAR PROJECT CTA */}
        <div className="bg-gradient-to-br from-[#0B1220] via-[#0D4F85] to-[#1769AA] text-white p-10 sm:p-14 rounded-3xl text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Interested in Building a Similar System?
          </h2>
          <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Let’s discuss your technical requirements and review an architectural plan tailored to your timeline.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-[#0B1220] hover:bg-slate-100 font-semibold rounded-xl px-8 py-6 shadow-lg"
              >
                Start a Similar Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
