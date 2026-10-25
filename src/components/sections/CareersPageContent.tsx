"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Calendar,
  Building2,
  Send,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import JobApplicationModal from "@/components/JobApplicationModal";

export default function CareersPageContent() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchTitle, setSearchTitle] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [salaryFilter, setSalaryFilter] = useState("all"); // 'all' | 'entry' | 'mid' | 'senior' | 'incentive'
  const [workModeFilter, setWorkModeFilter] = useState("all");

  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Fetch jobs from Supabase
  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (!error && data) {
          // Only show active jobs that have remaining open seats!
          const availableJobs = data.filter((j: any) => {
            const total = j.total_openings ?? 1;
            const filled = j.openings_filled ?? 0;
            return total - filled > 0;
          });
          setJobs(availableJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  // Compute Unique Departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) set.add(j.department.trim());
    });
    return Array.from(set);
  }, [jobs]);

  // Compute Unique Locations
  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.location) set.add(j.location.trim());
    });
    return Array.from(set);
  }, [jobs]);

  // Filter Jobs based on Title, Department, Location, and Salary
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Title / Keyword match
      const q = searchTitle.toLowerCase().trim();
      const matchesTitle =
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.department?.toLowerCase().includes(q) ||
        job.role_summary?.toLowerCase().includes(q) ||
        (job.required_technical_skills &&
          job.required_technical_skills.some((s: string) => s.toLowerCase().includes(q)));

      // 2. Department match
      const matchesDepartment =
        departmentFilter === "all" || job.department?.trim() === departmentFilter;

      // 3. Location match
      const matchesLocation =
        locationFilter === "all" || job.location?.trim() === locationFilter;

      // 4. Work Mode match
      const matchesMode =
        workModeFilter === "all" || job.work_mode?.toLowerCase() === workModeFilter.toLowerCase();

      // 5. Salary range filter match
      let matchesSalary = true;
      if (salaryFilter !== "all") {
        const sal = (job.salary_range || "").toLowerCase();
        if (salaryFilter === "incentive") {
          matchesSalary = sal.includes("incentive") || sal.includes("bonus") || sal.includes("target");
        } else if (salaryFilter === "entry") {
          matchesSalary =
            sal.includes("stipend") ||
            sal.includes("20k") ||
            sal.includes("30k") ||
            sal.includes("3 lpa") ||
            sal.includes("4 lpa") ||
            sal.includes("5 lpa");
        } else if (salaryFilter === "mid") {
          matchesSalary =
            sal.includes("6 lpa") ||
            sal.includes("7 lpa") ||
            sal.includes("8 lpa") ||
            sal.includes("10 lpa") ||
            sal.includes("12 lpa");
        } else if (salaryFilter === "senior") {
          matchesSalary =
            sal.includes("15 lpa") ||
            sal.includes("18 lpa") ||
            sal.includes("20 lpa") ||
            sal.includes("competitive") ||
            sal.includes("senior");
        }
      }

      return matchesTitle && matchesDepartment && matchesLocation && matchesMode && matchesSalary;
    });
  }, [jobs, searchTitle, departmentFilter, locationFilter, workModeFilter, salaryFilter]);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setApplicationModalOpen(true);
  };

  const handleGeneralApplication = () => {
    setSelectedJob({
      id: "general-talent-pool",
      title: "General Talent Pool / Open Resume Application",
      department: "All Departments",
      employment_type: "Full-time / Flexible",
      work_mode: "Remote / Hybrid",
      location: "India / Global Remote",
      role_summary:
        "Open application submitted to AAYUP Technologies' Talent Pool for upcoming engineering, design, or business opportunities.",
    });
    setApplicationModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTitle("");
    setDepartmentFilter("all");
    setLocationFilter("all");
    setSalaryFilter("all");
    setWorkModeFilter("all");
  };

  const isFiltered =
    searchTitle !== "" ||
    departmentFilter !== "all" ||
    locationFilter !== "all" ||
    salaryFilter !== "all" ||
    workModeFilter !== "all";

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B1220] min-h-screen">
      {/* COMPACT & MODERN HERO */}
      <section className="relative overflow-hidden pt-[140px] pb-12 sm:pt-[150px] sm:pb-16 bg-gradient-to-b from-white via-sky-50/40 to-[#F8FAFC] dark:from-[#0B1220] dark:via-[#0E1726] dark:to-[#0B1220] border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Engineering & Product Team</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Careers at <span className="text-[#1769AA]">AAYUP Technologies</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
            Discover active engineering, design, marketing, and internship roles. Work with modern tech stacks, high autonomy, and competitive incentives.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <a href="#job-openings">
              <Button className="rounded-xl px-6 py-2.5 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1769AA]/20">
                <Briefcase className="w-4 h-4 mr-2" />
                View Openings ({jobs.length})
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={handleGeneralApplication}
              className="rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold border-slate-300 dark:border-white/20 hover:border-[#1769AA] hover:text-[#1769AA]"
            >
              <Send className="w-4 h-4 mr-2" />
              Drop Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* FILTER & JOB BOARD SECTION */}
      <section id="job-openings" className="scroll-mt-20 py-10 sm:py-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          
          {/* SEARCH & FILTERS CONTAINER */}
          <div className="bg-white dark:bg-[#111A2E] rounded-2xl border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D4F85] dark:text-[#2D86C9]">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Search & Filter Open Roles</span>
              </div>
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* 1. Title / Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Job Title / Skill
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="e.g., Next.js, BDE, React..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30 focus:border-[#1769AA] font-medium"
                  />
                </div>
              </div>

              {/* 2. Department Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30"
                >
                  <option value="all">All Departments ({jobs.length})</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Location Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30"
                >
                  <option value="all">All Locations</option>
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Salary / Compensation Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Salary / Compensation
                </label>
                <select
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30"
                >
                  <option value="all">Any Salary</option>
                  <option value="incentive">Target / Performance Incentives</option>
                  <option value="entry">Stipend / ₹3 - ₹5 LPA</option>
                  <option value="mid">₹6 - ₹12 LPA</option>
                  <option value="senior">₹15+ LPA / High Seniority</option>
                </select>
              </div>
            </div>

            {/* Quick Department Filter Pills */}
            <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex-wrap text-xs">
              <span className="text-slate-400 font-semibold text-[11px] mr-1">Quick:</span>
              <button
                onClick={() => setDepartmentFilter("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  departmentFilter === "all"
                    ? "bg-[#1769AA] text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                All ({jobs.length})
              </button>
              {departments.map((dept, i) => (
                <button
                  key={i}
                  onClick={() => setDepartmentFilter(dept)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    departmentFilter === dept
                      ? "bg-[#1769AA] text-white"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE ROLES HEADER */}
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Open Roles</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0D4F85] font-black">
                {filteredJobs.length} Available
              </span>
            </h2>
            <span className="text-xs text-slate-500">
              Updated live from Aayup Engineering database
            </span>
          </div>

          {/* JOB CARDS LIST */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white dark:bg-[#111A2E] p-12 rounded-2xl border border-slate-200 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-[#1769AA] border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-500">Loading active job openings...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white dark:bg-[#111A2E] p-12 rounded-2xl border border-slate-200 dark:border-white/10 text-center space-y-3">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  No matching jobs found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your title, location or salary filter, or submit an open application to our general talent pool.
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters} className="text-xs">
                    Clear Filters
                  </Button>
                  <Button size="sm" onClick={handleGeneralApplication} className="bg-[#1769AA] text-xs">
                    Drop Resume Anyway
                  </Button>
                </div>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-[#111A2E] border border-slate-200/90 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all hover:border-[#1769AA]/40"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      <div className="flex-1 min-w-0">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sky-50 text-[#0D4F85] border border-sky-100">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {job.employment_type}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {job.work_mode}
                          </span>
                          {job.salary_range && (
                            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-amber-600" />
                              {job.salary_range}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                            {Math.max(0, (job.total_openings ?? 1) - (job.openings_filled ?? 0))}{" "}
                            {Math.max(0, (job.total_openings ?? 1) - (job.openings_filled ?? 0)) === 1 ? "Opening" : "Openings"} Left
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                          {job.title}
                        </h3>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
                            {job.location}
                          </span>
                          {job.required_experience && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              Exp: {job.required_experience}
                            </span>
                          )}
                          {job.last_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              Deadline:{" "}
                              {new Date(job.last_date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          )}
                        </div>

                        {/* Role Summary */}
                        {job.role_summary && (
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                            {job.role_summary}
                          </p>
                        )}

                        {/* Key Skills */}
                        {job.required_technical_skills && job.required_technical_skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {job.required_technical_skills.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right CTA Buttons */}
                      <div className="flex sm:flex-row lg:flex-col gap-2 shrink-0 lg:w-44">
                        <Button
                          onClick={() => handleApplyClick(job)}
                          className="flex-1 lg:w-full rounded-xl bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1769AA]/20"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          className="flex-1 lg:w-full rounded-xl border-slate-300 text-xs font-semibold hover:border-[#1769AA]"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5 mr-1" />
                              View Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* EXPANDABLE DETAILS */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-5 pt-5 border-t border-slate-200/80 dark:border-white/10 space-y-4 text-xs sm:text-sm"
                        >
                          {/* Responsibilities */}
                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2 text-[#0D4F85]">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-xs">
                                {job.responsibilities.map((resp: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-1.5 shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Qualifications & Experience */}
                          {job.required_qualifications && job.required_qualifications.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2 text-[#0D4F85]">
                                Required Qualifications
                              </h4>
                              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-xs">
                                {job.required_qualifications.map((qual: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                    <span>{qual}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Soft Skills */}
                          {job.required_soft_skills && job.required_soft_skills.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-1.5 text-[#0D4F85]">
                                Soft Skills & Team Culture
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {job.required_soft_skills.map((skill: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-slate-100 rounded-md text-xs text-slate-700"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Perks */}
                          {job.perks_benefits && job.perks_benefits.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-1.5 text-emerald-700">
                                Specific Perks & Benefits
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {job.perks_benefits.map((perk: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-medium"
                                  >
                                    ✓ {perk}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 flex gap-3">
                            <Button
                              onClick={() => handleApplyClick(job)}
                              className="rounded-xl px-6 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold text-xs shadow-md"
                            >
                              Apply for {job.title}
                              <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExpandedJobId(null)}
                              className="text-xs"
                            >
                              Close Details
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* SPONTANEOUS APPLICATION BANNER */}
          <div className="mt-12 bg-gradient-to-r from-[#0B1220] via-[#0D4F85] to-[#1769AA] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 border border-white/20 inline-block mb-2">
                Open Resume Submission
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Don't see your specific role listed?</h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                We are always hiring high-agency developers, UI/UX designers, and growth professionals. Submit your profile into our General Talent Pool.
              </p>
            </div>
            <Button
              onClick={handleGeneralApplication}
              className="rounded-xl px-6 py-3 bg-white text-[#0B1220] hover:bg-slate-100 font-bold text-xs sm:text-sm shrink-0 shadow-lg"
            >
              <Send className="w-4 h-4 mr-2 text-[#1769AA]" />
              Submit Open Resume
            </Button>
          </div>

        </div>
      </section>

      {/* JOB APPLICATION MODAL */}
      <JobApplicationModal
        open={applicationModalOpen}
        onClose={() => {
          setApplicationModalOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />
    </div>
  );
}
