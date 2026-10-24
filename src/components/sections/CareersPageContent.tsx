"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Laptop,
  Award,
  HeartHandshake,
  Rocket,
  Zap,
  CheckCircle2,
  ArrowRight,
  Users,
  ShieldCheck,
  Filter,
  DollarSign,
  GraduationCap,
  HelpCircle,
  Send,
  Building2,
  Calendar,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import JobApplicationModal from "@/components/JobApplicationModal";
import { Link } from "@/lib/router-bridge";

// High-quality realistic featured openings used when DB has 0 active jobs or loading
export const FEATURED_POSITIONS = [
  {
    id: "fe-sr-fullstack",
    title: "Senior Full-Stack Engineer (React, Next.js & Node.js)",
    department: "Engineering",
    employment_type: "Full-time",
    work_mode: "Remote",
    location: "Remote (India / Global)",
    salary_range: "₹10,00,000 - ₹18,00,000 / yr",
    last_date: "2026-12-31",
    role_summary:
      "Lead architecture, performance optimization, and scalable API design for enterprise web platforms and multi-tenant applications built with modern React and Next.js.",
    responsibilities: [
      "Architect and build high-performance web applications using Next.js (App Router), React, and TypeScript.",
      "Design resilient backend APIs, modular service layers, and schema migrations with PostgreSQL / Supabase.",
      "Enforce engineering best practices, component modularity, security, and Core Web Vitals optimization.",
      "Conduct thorough code reviews and mentor junior and mid-level developers.",
    ],
    required_qualifications: [
      "Bachelor's degree in Computer Science, Information Technology, or equivalent practical experience.",
      "Strong foundation in data structures, API design, database normalization, and web security.",
    ],
    required_technical_skills: [
      "React.js",
      "Next.js 14/15",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "REST & GraphQL",
      "Git / CI/CD",
    ],
    required_soft_skills: [
      "System design thinking",
      "Clear technical communication",
      "Autonomous problem solving",
      "Collaborative teamwork",
    ],
    required_experience: "3 - 6 Years",
    preferred_qualifications: [
      "Experience with Supabase / Firebase authentication & row-level security.",
      "Prior exposure to AWS, Docker, or Vercel edge deployment architectures.",
    ],
    perks_benefits: [
      "100% remote flexibility with home office stipend",
      "Annual technical upskilling and certification allowance",
      "Performance incentives and equity bonuses",
      "Comprehensive health wellness package",
    ],
    is_active: true,
  },
  {
    id: "fe-mobile-dev",
    title: "Mobile Application Developer (React Native / Flutter)",
    department: "Engineering",
    employment_type: "Full-time",
    work_mode: "Remote",
    location: "Remote (India)",
    salary_range: "₹8,00,000 - ₹15,00,000 / yr",
    last_date: "2026-12-31",
    role_summary:
      "Craft smooth, high-fidelity iOS and Android applications with offline-first capabilities, fluid 60fps micro-animations, and clean modular state management.",
    responsibilities: [
      "Develop cross-platform mobile applications from wireframe to Play Store and App Store deployment.",
      "Integrate RESTful APIs, push notifications, native device capabilities, and secure storage.",
      "Diagnose memory leaks, optimize bundle size, and ensure responsive rendering across tablet & phone form factors.",
      "Collaborate closely with UI/UX designers to translate Figma design systems into pixel-perfect mobile components.",
    ],
    required_qualifications: [
      "B.Tech / B.E. / MCA or proven portfolio of deployed mobile applications on iOS / Android stores.",
    ],
    required_technical_skills: [
      "React Native",
      "Flutter & Dart",
      "TypeScript",
      "Zustand / Redux Toolkit",
      "Native Android / iOS bridging",
      "App Store & Play Store publishing",
    ],
    required_soft_skills: [
      "Pixel-perfection mindset",
      "User-centric product intuition",
      "Adaptability to new tools",
    ],
    required_experience: "2 - 5 Years",
    preferred_qualifications: [
      "Experience with camera APIs, Bluetooth Low Energy, or biometric authentication in mobile apps.",
    ],
    perks_benefits: [
      "Top-tier laptop and testing device allowance",
      "Flexible working hours across time zones",
      "Project completion performance bonuses",
    ],
    is_active: true,
  },
  {
    id: "fe-ai-engineer",
    title: "AI & Full-Stack Solutions Engineer",
    department: "AI & Automation",
    employment_type: "Full-time",
    work_mode: "Hybrid",
    location: "Bengaluru / Remote",
    salary_range: "₹9,00,000 - ₹16,00,000 / yr",
    last_date: "2026-12-31",
    role_summary:
      "Design intelligent automated systems, Retrieval-Augmented Generation (RAG) pipelines, and LLM-powered enterprise workflows that convert complex business data into automated solutions.",
    responsibilities: [
      "Develop and deploy enterprise AI assistants, document intelligence pipelines, and automated multi-agent workflows.",
      "Implement vector databases (pgvector, Pinecone) and fine-tuned embeddings for real-time semantic retrieval.",
      "Integrate AI endpoints into client web applications and internal CRM / ERP systems.",
      "Monitor token usage, prompt security (prompt injection mitigation), and model latency.",
    ],
    required_qualifications: [
      "Computer Science or Data Science background with strong programming proficiency in Python and TypeScript.",
    ],
    required_technical_skills: [
      "Python",
      "LangChain / LlamaIndex",
      "OpenAI / Anthropic APIs",
      "Vector Databases (pgvector)",
      "FastAPI / Node.js",
      "Next.js Integration",
    ],
    required_soft_skills: [
      "Curiosity for cutting-edge AI breakthroughs",
      "Analytical problem breakdown",
      "Ethical AI awareness",
    ],
    required_experience: "2 - 4 Years",
    preferred_qualifications: [
      "Hands-on experience deploying open-source models with Ollama, vLLM, or Hugging Face.",
    ],
    perks_benefits: [
      "Unlimited GPU credits and AI research API budget",
      "Hybrid flexible attendance policy",
      "Conference sponsorship for AI / tech expos",
    ],
    is_active: true,
  },
  {
    id: "fe-uiux-designer",
    title: "Lead UI/UX Product Designer",
    department: "Design & Product",
    employment_type: "Full-time",
    work_mode: "Remote",
    location: "Remote (India / Global)",
    salary_range: "₹7,00,000 - ₹13,00,000 / yr",
    last_date: "2026-12-31",
    role_summary:
      "Own end-to-end product design across web and mobile experiences. Transform complex enterprise user journeys into intuitive, stunning, and conversion-focused design systems.",
    responsibilities: [
      "Produce comprehensive design systems, component libraries, high-fidelity prototypes, and design tokens in Figma.",
      "Conduct user testing, wireframing, heuristic evaluation, and competitive UX benchmarking.",
      "Collaborate directly with frontend engineers to guarantee 100% design fidelity in final production builds.",
      "Shape brand identities, custom iconography, and micro-interaction animations.",
    ],
    required_qualifications: [
      "Outstanding design portfolio showcasing shipped digital products with clear rationale behind UX decisions.",
    ],
    required_technical_skills: [
      "Figma (Auto-layout, Components, Variables)",
      "Design Systems & Token Architecture",
      "Interactive Prototyping",
      "Information Architecture",
      "Mobile & Web Responsiveness",
    ],
    required_soft_skills: [
      "Empathetic user advocacy",
      "Constructive design review communication",
      "Attention to micro-details",
    ],
    required_experience: "2 - 5 Years",
    preferred_qualifications: [
      "Basic understanding of Tailwind CSS, HTML/CSS box model, or Framer Motion animation principles.",
    ],
    perks_benefits: [
      "Figma Professional license & asset library budget",
      "Flexible schedule and asynchronous work style",
      "Continuous creative mentorship",
    ],
    is_active: true,
  },
  {
    id: "fe-devops-sre",
    title: "Cloud DevOps & Site Reliability Engineer",
    department: "Engineering",
    employment_type: "Full-time",
    work_mode: "Remote",
    location: "Remote (India)",
    salary_range: "₹8,00,000 - ₹15,00,000 / yr",
    last_date: "2026-12-31",
    role_summary:
      "Build, monitor, and automate cloud infrastructure, zero-downtime CI/CD deployment pipelines, containerization, and security compliance for mission-critical client software.",
    responsibilities: [
      "Design and maintain automated CI/CD pipelines using GitHub Actions, Docker, and Kubernetes.",
      "Manage cloud resources on AWS and GCP with Infrastructure as Code (Terraform).",
      "Implement comprehensive monitoring, alerting, and log aggregation (Prometheus, Grafana, Datadog).",
      "Ensure robust automated database backups, disaster recovery protocols, and HTTPS / SSL encryption.",
    ],
    required_qualifications: [
      "Degree in Computer Science / IT or certified cloud credentials (AWS / GCP Solutions Architect / CKA).",
    ],
    required_technical_skills: [
      "Docker & Kubernetes",
      "AWS / GCP",
      "GitHub Actions CI/CD",
      "Terraform",
      "Linux Administration",
      "Nginx & Reverse Proxies",
      "PostgreSQL Clustering",
    ],
    required_soft_skills: [
      "Calm troubleshooting under pressure",
      "Documentation excellence",
      "Proactive security mindset",
    ],
    required_experience: "2 - 5 Years",
    preferred_qualifications: [
      "Experience optimizing cloud hosting costs and setting up autoscaling serverless groups.",
    ],
    perks_benefits: [
      "Full cloud certification exam reimbursement",
      "Home fiber broadband reimbursement",
      "Annual equipment upgrade cycle",
    ],
    is_active: true,
  },
  {
    id: "fe-intern-fullstack",
    title: "Full-Stack Software Engineering Intern",
    department: "Internships",
    employment_type: "Internship",
    work_mode: "Remote",
    location: "Remote (India)",
    salary_range: "₹15,000 - ₹25,000 / mo (PPO Eligible)",
    last_date: "2026-12-31",
    role_summary:
      "A fast-paced 6-month hands-on engineering internship working on real client codebases alongside senior architects. Outstanding performers receive full-time Pre-Placement Offers (PPO).",
    responsibilities: [
      "Develop responsive UI components in React and Next.js under the guidance of senior mentors.",
      "Write unit tests, fix issues, and participate in daily agile standups and code reviews.",
      "Assist in REST API integrations, database queries, and bug resolution.",
    ],
    required_qualifications: [
      "Final-year B.Tech / B.E. / BCA / MCA student or recent graduate passionate about software engineering.",
      "Must have built at least 2 personal or academic projects in modern JavaScript / React.",
    ],
    required_technical_skills: [
      "JavaScript (ES6+)",
      "React.js basics",
      "HTML5 & Tailwind CSS",
      "Git & GitHub basics",
    ],
    required_soft_skills: [
      "High curiosity and eagerness to learn",
      "Humility and receptiveness to feedback",
      "Consistent punctuality",
    ],
    required_experience: "Fresher / Final Year Student",
    preferred_qualifications: [
      "Knowledge of Next.js, TypeScript, or Node.js is an added advantage.",
    ],
    perks_benefits: [
      "Direct 1-on-1 mentorship with Lead Architects",
      "PPO conversion opportunity based on merit",
      "Experience Certificate & Letter of Recommendation",
    ],
    is_active: true,
  },
];

export default function CareersPageContent() {
  const [jobs, setJobs] = useState<any[]>(FEATURED_POSITIONS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Fetch jobs from Supabase on mount
  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setJobs(data);
        } else {
          // If no active jobs in DB, keep the curated positions
          setJobs(FEATURED_POSITIONS);
        }
      } catch (err) {
        console.error("Error fetching jobs from Supabase:", err);
        setJobs(FEATURED_POSITIONS);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  // Compute departments from available jobs
  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.department) set.add(j.department);
    });
    return Array.from(set);
  }, [jobs]);

  // Compute employment types
  const employmentTypes = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.employment_type) set.add(j.employment_type);
    });
    return Array.from(set);
  }, [jobs]);

  // Compute work modes
  const workModes = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.work_mode) set.add(j.work_mode);
    });
    return Array.from(set);
  }, [jobs]);

  // Filter jobs dynamically
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.required_technical_skills &&
          job.required_technical_skills.some((s: string) =>
            s.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesDepartment =
        departmentFilter === "all" || job.department === departmentFilter;

      const matchesType =
        typeFilter === "all" || job.employment_type === typeFilter;

      const matchesMode =
        modeFilter === "all" || job.work_mode === modeFilter;

      return matchesSearch && matchesDepartment && matchesType && matchesMode;
    });
  }, [jobs, searchTerm, departmentFilter, typeFilter, modeFilter]);

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setApplicationModalOpen(true);
  };

  const handleGeneralApplication = () => {
    setSelectedJob({
      id: "general-talent-pool",
      title: "General Talent Pool / Spontaneous Application",
      department: "All Departments",
      employment_type: "Full-time / Flexible",
      work_mode: "Remote / Hybrid",
      location: "India / Global Remote",
      role_summary:
        "Spontaneous application submitted to AAYUP Technologies' General Talent Pool for future engineering, design, and management opportunities.",
    });
    setApplicationModalOpen(true);
  };

  const culturePillars = [
    {
      icon: Rocket,
      title: "Autonomous Ownership",
      description:
        "We empower every engineer and designer with end-to-end project responsibility. No micromanagement—just clear objectives, trust, and real creative freedom.",
    },
    {
      icon: Zap,
      title: "High-Velocity Engineering",
      description:
        "We ship real features to real users every single week. You'll build across modern technology stacks (Next.js, TypeScript, AI APIs, Supabase) and see your work make an instant impact.",
    },
    {
      icon: HeartHandshake,
      title: "Work-Life Harmony",
      description:
        "Results matter, not clock-in surveillance. Enjoy flexible remote and hybrid arrangements with deep respect for personal rest, family time, and mental well-being.",
    },
    {
      icon: Award,
      title: "Merit-Driven Growth",
      description:
        "No bureaucratic tenure hurdles. At AAYUP Technologies, rapid compensation raises, promotions, and leadership roles follow your contributions and technical brilliance.",
    },
  ];

  const perks = [
    {
      icon: Laptop,
      title: "Top-Tier Workstations",
      detail: "High-spec hardware allowances and dual-monitor accessories for maximum developer productivity.",
    },
    {
      icon: MapPin,
      title: "Work From Anywhere",
      detail: "100% remote flexibility with optional hub access in modern collaborative workspaces.",
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning Fund",
      detail: "Dedicated budget for industry certifications, online courses, technical books, and conference passes.",
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      detail: "Transparent compensation packages, performance-linked milestone bonuses, and regular bi-annual reviews.",
    },
    {
      icon: Calendar,
      title: "Generous Leave Policy",
      detail: "Paid time off, flexible holidays, recharge days, and paid parental leave for family milestones.",
    },
    {
      icon: Users,
      title: "Direct Leadership Access",
      detail: "Collaborate directly with Lead Architects and Founders—no multi-layered corporate hierarchy.",
    },
  ];

  const hiringSteps = [
    {
      step: "01",
      title: "Application & Portfolio Review",
      description:
        "Submit your resume or GitHub/Figma profile. Our engineering leads review every submission within 48 business hours.",
    },
    {
      step: "02",
      title: "Discovery & Alignment Call",
      description:
        "A 30-minute casual conversation to understand your career aspirations, projects you're proud of, and how we can support your growth.",
    },
    {
      step: "03",
      title: "Practical Technical Dialogue",
      description:
        "No useless whiteboard puzzles. We discuss real-world system architecture, review recent code you've built, and explore practical problem-solving.",
    },
    {
      step: "04",
      title: "Offer & Smooth Onboarding",
      description:
        "Transparent compensation terms, clear role scope, and an immediate welcome pack with a structured 30-day onboarding path.",
    },
  ];

  const faqs = [
    {
      q: "Can I work 100% remotely for AAYUP Technologies?",
      a: "Yes! Most of our engineering, design, and product roles are remote-first across India. We coordinate via Slack, GitHub, and Google Meet with flexible working hours.",
    },
    {
      q: "How fast is the recruitment and hiring timeline?",
      a: "We respect your time. Our hiring cycle typically concludes within 5 to 7 business days from your first interview to the official offer letter.",
    },
    {
      q: "Are engineering internships eligible for full-time conversion (PPO)?",
      a: "Absolutely. Our internship program is specifically designed as a talent pipeline. High-performing interns routinely receive Pre-Placement Offers (PPOs) into full-time Software Engineer positions.",
    },
    {
      q: "What tech stack will I be working with daily?",
      a: "Our core stack includes Next.js (App Router), React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, Python, LangChain, Flutter, React Native, and Docker.",
    },
    {
      q: "What if there is no current open role that matches my profile?",
      a: "You can submit an open application through our General Talent Pool. When an exciting opportunity aligning with your skillset opens, our team contacts you first.",
    },
  ];

  return (
    <div>
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-[180px] pb-20 sm:pt-[160px] md:pt-[164px] md:pb-28 lg:pt-[172px] bg-gradient-to-b from-[#F3F7FB] via-white to-white dark:from-[#0B1220] dark:via-[#0E1726] dark:to-[#0B1220]">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#1769AA]/15 to-[#2D86C9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-[#1769AA]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/25 text-[#1769AA] dark:text-[#2D86C9] text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#1769AA]" />
              <span>We're Hiring — Grow Your Career at AAYUP</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1220] dark:text-white tracking-tight leading-[1.15]"
            >
              Build Meaningful Software.{" "}
              <span className="bg-gradient-to-r from-[#1769AA] via-[#2D86C9] to-[#0D4F85] bg-clip-text text-transparent">
                Accelerate Your Growth.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl mx-auto"
            >
              Join a dedicated team of engineers, designers, and problem solvers delivering high-impact web, mobile, and AI solutions. Transparent culture, remote flexibility, and zero corporate bureaucracy.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              <a href="#open-positions">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-xl px-8 py-6 text-base font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Explore Open Roles ({jobs.length})
                </Button>
              </a>

              <Button
                size="lg"
                variant="outline"
                onClick={handleGeneralApplication}
                className="w-full sm:w-auto rounded-xl px-7 py-6 text-base font-semibold border-2 border-slate-300 dark:border-white/20 hover:border-[#1769AA] hover:text-[#1769AA] transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Open Resume
              </Button>
            </motion.div>

            {/* Interactive 3D Animated Culture & Team Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 relative max-w-4xl mx-auto"
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-[#2D86C9]/25 to-purple-500/20 rounded-3xl blur-3xl -z-10 animate-pulse" />

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-white/95 via-white/70 to-blue-50/40 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(23,105,170,0.18)]"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-100 dark:bg-slate-900 shadow-inner">
                  <img
                    src="/join-team-banner.png"
                    alt="AAYUP Technologies Engineering Team Culture & Remote Collaboration"
                    className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* Floating Micro-Card 1: Top Left - Remote Flexibility */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute -top-4 -left-2 sm:-left-5 z-30 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-xl border border-blue-100/90 dark:border-white/20 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                    <Laptop className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Culture</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">100% Remote / Hybrid</span>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 2: Top Right - Merit Driven */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute -top-5 -right-2 sm:-right-4 z-30 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-xl border border-indigo-100/90 dark:border-white/20 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Growth</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">Merit-Based Hikes</span>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 3: Bottom Left - Fast 48h Hiring */}
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="hidden sm:flex absolute -bottom-5 -left-3 z-30 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-xl border border-purple-100/90 dark:border-white/20 shadow-2xl rounded-2xl px-3.5 py-2.5 items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Hiring Velocity</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">48h Fast Response</span>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 4: Bottom Right - Modern Tech Stacks */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="hidden sm:flex absolute -bottom-5 -right-3 z-30 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-xl border border-cyan-100/90 dark:border-white/20 shadow-2xl rounded-2xl px-3.5 py-2.5 items-center gap-2.5 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-bold">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block">Tech Stack</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-white">Next.js, TS & AI</span>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>

            {/* Key Metrics / Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-200/80 dark:border-white/10"
            >
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 dark:border-white/10 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1769AA] dark:text-[#2D86C9]">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Remote & Hybrid Options
                </div>
              </div>

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 dark:border-white/10 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1769AA] dark:text-[#2D86C9]">
                  48 Hrs
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Fast Application Feedback
                </div>
              </div>

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 dark:border-white/10 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1769AA] dark:text-[#2D86C9]">
                  15+
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Engineers & Designers
                </div>
              </div>

              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 dark:border-white/10 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1769AA] dark:text-[#2D86C9]">
                  Merit
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
                  Fast-Track Progression
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY WORK WITH US (CULTURE PILLARS) */}
      <section className="py-20 bg-white dark:bg-[#0B1220] border-y border-slate-200/70 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              Our Culture & Values
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white mt-2">
              Why Engineers & Designers Love Working Here
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              We focus on building an environment where craftsmanship is recognized, learning is sponsored, and your voice actively shapes software architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturePillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#F8FAFC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-[#1769AA]/40 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 dark:bg-[#1769AA]/20 text-[#1769AA] dark:text-[#2D86C9] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#1769AA] group-hover:text-white transition-all">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PERKS & BENEFITS */}
      <section className="py-20 bg-[#F3F7FB] dark:bg-[#0E1726]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              Employee Well-Being
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white mt-2">
              Comprehensive Perks & Benefits
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              We take care of the details so you can focus on building your best work and living a fulfilling life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1769AA] to-[#2D86C9] text-white flex-shrink-0 flex items-center justify-center shadow-md">
                  <perk.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1220] dark:text-white">
                    {perk.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {perk.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LIVE OPEN POSITIONS (JOB BOARD) */}
      <section id="open-positions" className="scroll-mt-24 py-24 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              Current Openings
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white mt-2">
              Find Your Next Role
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              Explore our current vacancies across engineering, product design, AI solutions, and internships.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-5xl mx-auto mb-10">
            <Card className="p-4 sm:p-6 bg-[#F8FAFC] dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
                {/* Search input */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by role, skill, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-foreground"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Department filter */}
                <div className="md:col-span-3">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-foreground"
                  >
                    <option value="all">All Departments ({jobs.length})</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Employment Type filter */}
                <div className="md:col-span-2">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-foreground"
                  >
                    <option value="all">All Types</option>
                    {employmentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Work Mode filter */}
                <div className="md:col-span-2">
                  <select
                    value={modeFilter}
                    onChange={(e) => setModeFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA] text-foreground"
                  >
                    <option value="all">All Modes</option>
                    {workModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Department Pills Quick Filter */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200/60 dark:border-white/10 flex-wrap text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Department:
                </span>
                <button
                  onClick={() => setDepartmentFilter("all")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    departmentFilter === "all"
                      ? "bg-[#1769AA] text-white shadow-sm"
                      : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70"
                  }`}
                >
                  All ({jobs.length})
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setDepartmentFilter(dept)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      departmentFilter === dept
                        ? "bg-[#1769AA] text-white shadow-sm"
                        : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Results Summary */}
          <div className="max-w-5xl mx-auto flex items-center justify-between mb-6 px-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-[#0B1220] dark:text-white">{filteredJobs.length}</span> open position{filteredJobs.length !== 1 ? "s" : ""}
            </p>
            {(searchTerm || departmentFilter !== "all" || typeFilter !== "all" || modeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDepartmentFilter("all");
                  setTypeFilter("all");
                  setModeFilter("all");
                }}
                className="text-xs text-[#1769AA] dark:text-[#2D86C9] font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Jobs Listing Grid */}
          <div className="max-w-5xl mx-auto space-y-5">
            {filteredJobs.length === 0 ? (
              <Card className="p-12 text-center bg-[#F8FAFC] dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/15 rounded-2xl">
                <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#0B1220] dark:text-white">
                  No positions match your filters
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-md mx-auto">
                  Try clearing your search terms or submit an open application so we can reach out when a suitable position opens.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setDepartmentFilter("all");
                      setTypeFilter("all");
                      setModeFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button onClick={handleGeneralApplication}>
                    Submit Spontaneous Application
                  </Button>
                </div>
              </Card>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all hover:border-[#1769AA]/40 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        {/* Badges Bar */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#1769AA]/10 text-[#1769AA] dark:text-[#2D86C9] border border-[#1769AA]/20">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                            {job.employment_type}
                          </span>
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.work_mode}
                          </span>
                          {job.salary_range && (
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.salary_range}
                            </span>
                          )}
                        </div>

                        {/* Job Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white group-hover:text-[#1769AA] transition-colors">
                          {job.title}
                        </h3>

                        {/* Location and Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-[#1769AA]" />
                            {job.location}
                          </span>
                          {job.required_experience && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#1769AA]" />
                              Experience: {job.required_experience}
                            </span>
                          )}
                          {job.last_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              Apply by {new Date(job.last_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {/* Role summary */}
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                          {job.role_summary}
                        </p>

                        {/* Top Skills Tags */}
                        {job.required_technical_skills && job.required_technical_skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3.5">
                            {job.required_technical_skills.slice(0, 6).map((skill: string) => (
                              <span
                                key={skill}
                                className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.required_technical_skills.length > 6 && (
                              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500">
                                +{job.required_technical_skills.length - 6} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex sm:flex-row lg:flex-col gap-2.5 sm:w-full lg:w-44 flex-shrink-0">
                        <Button
                          onClick={() => handleApplyClick(job)}
                          className="flex-1 lg:w-full rounded-xl bg-[#1769AA] hover:bg-[#0D4F85] text-white font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          className="flex-1 lg:w-full rounded-xl border-slate-300 dark:border-white/20 font-medium hover:border-[#1769AA] transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              View Details
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Deep Dive */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-slate-200/80 dark:border-white/10 space-y-6"
                        >
                          {/* Responsibilities */}
                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div>
                              <h4 className="text-base font-bold text-[#0B1220] dark:text-white mb-2.5 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                {job.responsibilities.map((resp: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA] mt-2 flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Requirements & Skills Grid */}
                          <div className="grid md:grid-cols-2 gap-6 bg-[#F8FAFC] dark:bg-white/5 p-5 rounded-xl border border-slate-200/60 dark:border-white/5">
                            {/* Required Technical Skills */}
                            {job.required_technical_skills && job.required_technical_skills.length > 0 && (
                              <div>
                                <h4 className="text-sm font-bold text-[#0B1220] dark:text-white mb-2">
                                  Technical Proficiencies
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {job.required_technical_skills.map((skill: string) => (
                                    <span
                                      key={skill}
                                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-slate-200/70 dark:border-white/10 text-[#1769AA] dark:text-[#2D86C9]"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Soft Skills */}
                            {job.required_soft_skills && job.required_soft_skills.length > 0 && (
                              <div>
                                <h4 className="text-sm font-bold text-[#0B1220] dark:text-white mb-2">
                                  Soft Skills & Values
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {job.required_soft_skills.map((skill: string) => (
                                    <span
                                      key={skill}
                                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Qualifications & Preferred */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {job.required_qualifications && job.required_qualifications.length > 0 && (
                              <div>
                                <h4 className="text-sm font-bold text-[#0B1220] dark:text-white mb-2">
                                  Must-Have Qualifications
                                </h4>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                  {job.required_qualifications.map((q: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                                      <span>{q}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {job.preferred_qualifications && job.preferred_qualifications.length > 0 && (
                              <div>
                                <h4 className="text-sm font-bold text-[#0B1220] dark:text-white mb-2">
                                  Nice-to-Have
                                </h4>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                  {job.preferred_qualifications.map((pq: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                      <span>{pq}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Perks & Apply CTA bottom */}
                          {job.perks_benefits && job.perks_benefits.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-[#0B1220] dark:text-white mb-2">
                                Specific Perks for this Role
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.perks_benefits.map((p: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                                  >
                                    ✓ {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <Button
                              onClick={() => handleApplyClick(job)}
                              size="lg"
                              className="rounded-xl px-8 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold shadow-md"
                            >
                              Apply for this Position
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setExpandedJobId(null)}
                              className="rounded-xl"
                            >
                              Close Details
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSPARENT 4-STEP HIRING PROCESS */}
      <section className="py-20 bg-[#F3F7FB] dark:bg-[#0E1726] border-y border-slate-200/70 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              How We Hire
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white mt-2">
              A Transparent, 4-Step Process
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              We respect your preparation and time. No grueling leetcode rounds—we evaluate practical thinking and genuine craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {hiringSteps.map((step, i) => (
              <div
                key={step.step}
                className="bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 relative shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl font-black text-[#1769AA]/20 dark:text-[#2D86C9]/20 mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: GENERAL TALENT POOL / RESUME DROP */}
      <section className="py-20 bg-white dark:bg-[#0B1220]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0B1220] via-[#102A43] to-[#1769AA] text-white shadow-2xl relative overflow-hidden">
            {/* Ambient pattern */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20 inline-block mb-4">
                  Spontaneous Application
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  Don't see your exact role listed?
                </h2>
                <p className="text-slate-200 text-base sm:text-lg mt-3 leading-relaxed">
                  We are always eager to meet high-agency builders, backend architects, full-stack engineers, and UI/UX designers. Drop your resume into our General Talent Pool and let's talk.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button
                  size="lg"
                  onClick={handleGeneralApplication}
                  className="rounded-2xl px-8 py-7 bg-white text-[#0B1220] hover:bg-slate-100 font-bold text-base shadow-xl hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5 mr-2 text-[#1769AA]" />
                  Submit Open Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CANDIDATE FAQS */}
      <section className="py-20 bg-[#F3F7FB] dark:bg-[#0E1726] border-t border-slate-200/70 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1220] dark:text-white mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
              Answers to common queries about our interview stages, work modes, and career paths.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="p-6 bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-bold text-[#0B1220] dark:text-white flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#1769AA] flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL APPLICATION */}
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
