"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cpu,
  Bot,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Code2,
  Layers,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Database,
  Server,
  Layout,
  ShoppingCart,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

// 6 Core Service Categories required by specification
export const CORE_SERVICES = [
  {
    id: "website-development",
    title: "Website Development",
    tagline: "High-Performance Modern Web Platforms",
    description:
      "Modern, responsive web applications, corporate websites, and enterprise e-commerce portals built with Next.js, React, and TypeScript.",
    image: "/service-website-development.webp",
    icon: Globe,
    deliverables: [
      "Custom responsive design & clean code",
      "Next.js / React SSR & static generation",
      "Core Web Vitals optimization & SEO readiness",
      "CMS integration & secure API connections",
    ],
    details: {
      includes:
        "Full-stack web architecture, intuitive frontend components, responsive breakpoints, database connectivity, automated deployments, and security hardening.",
      typicalDeliverables: [
        "Interactive UI component system in Tailwind CSS",
        "Fast Next.js frontend with SSR/SSG capabilities",
        "Headless CMS or backend REST/GraphQL integration",
        "Performance audit report (90+ PageSpeed score)",
      ],
      problemsSolved:
        "Slow loading speeds, high bounce rates, non-responsive mobile rendering, rigid legacy website structures, and poor search engine crawlability.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    },
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Cross-Platform iOS & Android Engineering",
    description:
      "Native feel, high performance, and fluid user experiences on iOS and Android engineered with React Native and modern mobile architectures.",
    image: "/service-mobile-app.webp",
    icon: Smartphone,
    deliverables: [
      "Cross-platform iOS and Android builds",
      "Native device API integrations (Camera, GPS, Biometrics)",
      "Offline caching & state persistence",
      "App Store & Google Play launch assistance",
    ],
    details: {
      includes:
        "End-to-end mobile engineering from prototype to release, state management, push notification infrastructure, analytics tracking, and continuous testing across real devices.",
      typicalDeliverables: [
        "Production-ready iOS and Android binaries",
        "Cloud backend integration with secure JWT auth",
        "Push notification pipeline (FCM / APNs)",
        "Store submission compliance and publishing guide",
      ],
      problemsSolved:
        "High cost of maintaining dual native codebases, fragmented UX across devices, sluggish UI performance, and unreliable offline behaviors.",
      technologies: ["React Native", "Expo", "Flutter", "TypeScript", "Firebase", "REST APIs"],
    },
  },
  {
    id: "crm-erp-custom-software",
    title: "CRM / ERP & Custom Software",
    tagline: "Scalable Enterprise Management Systems",
    description:
      "Bespoke business software, customer relationship dashboards, inventory tracking, and ERP workflows tailored directly to company operations.",
    image: "/service-crm-erp.webp",
    icon: Cpu,
    deliverables: [
      "Custom role-based access control (RBAC)",
      "Automated lead and pipeline tracking",
      "Real-time analytics and financial reporting",
      "Third-party webhook & software integrations",
    ],
    details: {
      includes:
        "Centralized business operations software, multi-tenant databases, transactional record logging, audit trails, and modular business logic that grows with your team.",
      typicalDeliverables: [
        "Interactive administrative web dashboard",
        "Role-specific permission schemas & security logs",
        "Exportable analytics reports (CSV/PDF) & data viz",
        "Custom workflow automation triggers & webhooks",
      ],
      problemsSolved:
        "Disorganized spreadsheets, fragmented communication between departments, manual data entry bottlenecks, and costly subscription fees for bloated off-the-shelf software.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "Redis", "Docker"],
    },
  },
  {
    id: "ai-business-automation",
    title: "AI & Business Automation",
    tagline: "Intelligent Workflows & Automated Pipelines",
    description:
      "Harness artificial intelligence, LLM agents, smart document processing, and robotic automation to eliminate repetitive operational bottlenecks.",
    image: "/service-ai-automation.webp",
    icon: Bot,
    deliverables: [
      "Custom AI chatbots trained on business knowledge",
      "Automated data extraction and document parsing",
      "Workflow connectors across CRM, Email, and Slack",
      "Predictive analytics & intelligence triggers",
    ],
    details: {
      includes:
        "Designing AI integration layers, secure retrieval-augmented generation (RAG) pipelines, semantic search engines, and robotic workflow automations.",
      typicalDeliverables: [
        "Enterprise-grade AI chat assistant with guardrails",
        "Automated inbound inquiry triaging system",
        "Document ingestion and entity extraction pipeline",
        "Custom webhook automation scripts & monitoring",
      ],
      problemsSolved:
        "Slow response times to customer inquiries, hours lost on repetitive manual data entry, human error in document parsing, and underutilized company knowledge bases.",
      technologies: ["OpenAI / Claude APIs", "LangChain", "Python", "Vector Databases", "Node.js", "FastAPI"],
    },
  },
  {
    id: "ui-ux-graphic-design",
    title: "UI/UX & Graphic Design",
    tagline: "Conversion-Focused Interfaces & Design Systems",
    description:
      "User research, wireframing, interactive prototyping, and polished design systems that balance aesthetic delight with measurable business usability.",
    image: "/service-ui-ux-design.webp",
    icon: Palette,
    deliverables: [
      "End-to-end Figma UI/UX prototypes",
      "Design tokens & scalable component libraries",
      "User journey mapping & usability testing",
      "Brand identity kits, icons & marketing assets",
    ],
    details: {
      includes:
        "User flow architecture, interactive clickable prototypes, developer-ready component specs, responsive design documentation, and WCAG accessibility compliance audits.",
      typicalDeliverables: [
        "Comprehensive Figma file with auto-layout components",
        "Interactive high-fidelity clickable prototype",
        "Complete color token, typography, and icon set",
        "UX audit report with prioritized UX improvements",
      ],
      problemsSolved:
        "Confusing user navigation, low conversion rates on landing pages, inconsistent brand styling across platforms, and slow developer handoff without tokens.",
      technologies: ["Figma", "Design Systems", "Prototyping", "WCAG Accessibility", "Adobe Illustrator"],
    },
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    tagline: "Sustainable Organic Search & Growth Strategies",
    description:
      "Data-driven technical SEO, search engine ranking optimization, content structure audits, and targeted digital acquisition campaigns.",
    image: "/service-digital-marketing.webp",
    icon: TrendingUp,
    deliverables: [
      "Technical SEO auditing & schema markup implementation",
      "On-page optimization & keyword strategy",
      "Google Search Console & GA4 tracking setup",
      "Conversion rate optimization (CRO) audits",
    ],
    details: {
      includes:
        "Deep technical SEO audits, sitemap and robots optimizations, semantic heading and metadata structuring, site speed tuning, and localized search presence.",
      typicalDeliverables: [
        "Full technical SEO crawl audit with action items",
        "JSON-LD structured data schema implementation",
        "Keyword opportunity roadmap for business keywords",
        "Performance & indexing analytics dashboard in GA4",
      ],
      problemsSolved:
        "Invisible search ranking on primary business terms, indexing errors in search engines, lack of tracking attribution, and low organic inbound leads.",
      technologies: ["Google Analytics 4", "Search Console", "Technical Schema", "Ahrefs / SEMrush", "Lighthouse"],
    },
  },
];

// Section 4: Working Process Steps
const WORKING_PROCESS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your business objectives, target audience, technical constraints, and key success metrics.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "We outline system architecture, data models, sprint milestones, and an unambiguous project roadmap.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "We craft intuitive user journeys, wireframes, and interactive Figma prototypes aligned with your brand identity.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Our engineering team writes clean, modular, and scalable code with continuous progress updates.",
  },
  {
    number: "05",
    title: "Testing & Launch",
    description:
      "Rigorous quality assurance, cross-browser audits, security validation, and smooth deployment to production.",
  },
  {
    number: "06",
    title: "Maintenance & Support",
    description:
      "Continuous monitoring, performance tuning, security patches, and iterative improvements as your business scales.",
  },
];

// Section 5: Why Choose AAYUP
const WHY_CHOOSE_ITEMS = [
  {
    title: "Business-Focused Development",
    description:
      "We write code that directly serves business goals—prioritizing conversion rates, operational efficiency, and user retention over vanity features.",
    icon: Zap,
  },
  {
    title: "Responsive & Modern Design",
    description:
      "Every screen is engineered with fluid responsiveness, fast load times, and adherence to modern accessibility standards.",
    icon: Globe,
  },
  {
    title: "Transparent Communication",
    description:
      "You receive regular sprint demos, direct access to the development team, and clear documentation with zero hidden surprises.",
    icon: MessageSquare,
  },
  {
    title: "Quality Assurance & Security",
    description:
      "Comprehensive manual and automated testing, strict linting, secure API communication, and defensive data practices.",
    icon: ShieldCheck,
  },
  {
    title: "Ongoing Support & Longevity",
    description:
      "We stand behind what we ship with dedicated post-launch support, proactive dependency updates, and feature iteration.",
    icon: Code2,
  },
];

// Section 6: Frequently Asked Questions
const FAQS = [
  {
    question: "How do you scope and determine project timelines?",
    answer:
      "During our discovery phase, we break down your requirements into concrete user stories and functional deliverables. Timelines depend directly on technical complexity, integrations, and design fidelity, which we detail in a transparent project roadmap before development commences.",
  },
  {
    question: "What technologies does AAYUP Technologies work with?",
    answer:
      "We focus on robust, battle-tested modern stacks: React, Next.js, and TypeScript for web applications; React Native and Flutter for mobile; Node.js, Python, and PostgreSQL for backend services; and Figma for UI/UX design.",
  },
  {
    question: "Do you provide post-launch maintenance and support?",
    answer:
      "Yes. Every production deployment comes with a post-launch warranty window. We also offer monthly maintenance and retainer agreements covering security updates, server monitoring, bug fixes, and continuous feature enhancements.",
  },
  {
    question: "How do quotations and pricing work?",
    answer:
      "We provide tailored quotations based on the specific scope, complexity, and resource requirements of your project. We don't believe in hidden fees or generic pricing matrices—you receive a comprehensive breakdown tailored to your exact deliverables.",
  },
  {
    question: "How do we get started on a project?",
    answer:
      "Getting started is simple. Reach out through our contact form or schedule an initial consultation. We'll discuss your goals, review existing assets, and prepare an actionable proposal within 24–48 hours.",
  },
];

export default function ServicesPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white text-[#0B1220]">
      {/* SECTION 1: SERVICES HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F6FC] via-[#F8FBFE] to-[#EEF5FB] pt-[180px] pb-16 sm:pt-[160px] md:pt-[164px] md:pb-24 lg:pt-[172px] border-b border-slate-200/50">
        {/* Subtle Decorative Flow Waves */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] border border-[#1769AA]/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[540px] h-[540px] border border-[#2D86C9]/10 rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-[-5%] w-[480px] h-[480px] bg-gradient-to-br from-[#1769AA]/10 via-[#2D86C9]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#1769AA] transition-colors">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#1769AA] font-bold">Services</span>
              </nav>

              {/* Tag Pill */}
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                  ENTERPRISE IT SOLUTIONS & ENGINEERING
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08] text-[#0B1220]">
                Technology Solutions{" "}
                <span className="text-[#1769AA] block">Built Around Your</span>
                <span className="text-[#1769AA]">Business.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-normal">
                From websites and mobile apps to AI-powered automation, we build digital solutions that help
                businesses work smarter and grow faster.
              </p>

              {/* Buttons: Explore Our Services | Discuss Your Project */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a href="#services-list">
                  <Button
                    size="lg"
                    className="rounded-full px-7 py-6 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-lg shadow-[#1769AA]/25 transition-all w-full sm:w-auto"
                  >
                    Explore Our Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-7 py-6 text-sm font-bold border-2 border-slate-300 hover:border-[#1769AA] text-[#0B1220] hover:bg-white hover:text-[#1769AA] transition-all w-full sm:w-auto bg-white/80"
                  >
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Mockup: 3D Comprehensive Services & Development Suite */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[640px]"
              >
                {/* Dynamic Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1769AA]/20 via-[#2D86C9]/20 to-cyan-400/15 rounded-3xl blur-3xl -z-10 animate-pulse" />

                {/* Main 3D Floating Showcase Container */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-3xl p-2 bg-gradient-to-b from-white/95 via-white/70 to-blue-50/40 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(23,105,170,0.16)] overflow-visible"
                >
                  {/* 3D Illustration Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-inner">
                    <img
                      src="/services-development-suite.jpg"
                      alt="Aayup Technologies Full Spectrum Development Suite - Web, Mobile App, CRM, ERP & Cloud"
                      className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/15 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Floating Micro-Card 1: Top Left - Website & Apps */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute -top-4 -left-3 sm:-left-5 z-30 bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2 hover:shadow-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">Development</span>
                      <span className="text-xs font-extrabold text-slate-800">Web & Mobile Apps</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 2: Top Right - CRM & ERP Software */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute -top-5 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-indigo-100/90 shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2 hover:shadow-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                      <Database className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider block">Automation</span>
                      <span className="text-xs font-extrabold text-slate-800">CRM & ERP Systems</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 3: Bottom Left - Cloud & DevOps */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute -bottom-5 -left-2 sm:-left-4 z-30 bg-white/95 backdrop-blur-xl border border-cyan-100/90 shadow-2xl rounded-2xl px-3 py-2 flex items-center gap-2 hover:shadow-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-bold">
                      <Server className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-cyan-600 uppercase tracking-wider">Cloud Engine</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">DevOps & Scalability</span>
                    </div>
                  </motion.div>

                  {/* Floating Micro-Card 4: Bottom Right - Custom Software */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="hidden sm:flex absolute -bottom-4 -right-2 sm:-right-4 z-30 bg-white/95 backdrop-blur-xl border border-purple-100/90 shadow-2xl rounded-2xl px-3 py-2 items-center gap-2 hover:shadow-2xl transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold">
                      <Code2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wider block">Custom Solutions</span>
                      <span className="text-xs font-extrabold text-slate-800">E-Commerce & SaaS</span>
                    </div>
                  </motion.div>

                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICE CATEGORIES (Responsive Grid) */}
      <section id="services-list" className="py-20 md:py-28 bg-[#F3F7FB]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1769AA]">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2">
              Comprehensive Technology Capabilities
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              End-to-end digital engineering services tailored for startups, growing businesses, and enterprise
              organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#1769AA]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#1769AA] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1.5">
                        {srv.deliverables.slice(0, 3).map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] mt-0.5 flex-shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Functional Link */}
                    <div className="pt-2">
                      <a
                        href={`#details-${srv.id}`}
                        className="inline-flex items-center text-sm font-bold text-[#1769AA] hover:text-[#0D4F85] transition-colors"
                      >
                        Explore Service
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: INDIVIDUAL SERVICE DETAILS */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1769AA]">
              IN-DEPTH CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2">
              Explore Our Service Specifications
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Everything included, deliverables you receive, problems we solve, and our verified technical stacks.
            </p>
          </div>

          {CORE_SERVICES.map((srv, idx) => {
            const isReversed = idx % 2 === 1;
            const Icon = srv.icon;

            return (
              <div
                key={srv.id}
                id={`details-${srv.id}`}
                className="scroll-mt-28 p-8 sm:p-10 lg:p-12 rounded-3xl bg-[#F8FBFE] border border-slate-200/80 shadow-sm"
              >
                <div className={`grid lg:grid-cols-12 gap-10 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>

                  {/* Left Column: Details */}
                  <div className={`lg:col-span-7 space-y-6 ${isReversed ? "lg:order-2" : ""}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-xs font-bold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{srv.tagline}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220]">
                      {srv.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {srv.details.includes}
                    </p>

                    {/* What It Addresses */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#1769AA] mb-1">
                        Business Problems It Solves
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {srv.details.problemsSolved}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
                        Typical Deliverables
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {srv.details.typicalDeliverables.map((td, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#1769AA] mt-0.5 flex-shrink-0" />
                            <span>{td}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Supported Technologies */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">
                        Supported Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {srv.details.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Clear Enquiry CTA */}
                    <div className="pt-2">
                      <Link to="/contact">
                        <Button className="rounded-full px-6 py-5 text-sm font-bold bg-[#1769AA] hover:bg-[#0D4F85] text-white shadow-md shadow-[#1769AA]/20">
                          Request Enquiry for {srv.title}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Mockup */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="relative rounded-2xl overflow-hidden bg-white p-2 border border-slate-200/90 shadow-xl group">
                      <img
                        src={srv.image}
                        alt={`${srv.title} Detailed Engineering Visual`}
                        className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: OUR WORKING PROCESS */}
      <section className="py-20 md:py-28 bg-[#F3F7FB]/50 border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1769AA]">
              HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2">
              Our Structured 6-Step Process
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              A transparent, engineering-driven methodology to take your idea from inception to robust production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKING_PROCESS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#1769AA] font-heading">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E3EEF8] flex items-center justify-center text-[#1769AA] text-xs font-bold">
                    ✓
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] mb-2 group-hover:text-[#1769AA] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE AAYUP */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1769AA]">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2">
              Why Partner with AAYUP Technologies
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Clear, verifiable engineering practices and grounded business execution with zero fabricated metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#F8FBFE] border border-slate-200/80 shadow-sm flex flex-col space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E3EEF8] text-[#1769AA] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1220]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 bg-[#F3F7FB]/50 border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1769AA]">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Real clarity on scoping, timelines, technology stacks, and maintenance agreements.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-base sm:text-lg text-[#0B1220] hover:text-[#1769AA] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#1769AA]" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#1769AA] via-[#0D4F85] to-[#173B57] text-white text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2D86C9]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase border border-white/20">
            START YOUR TRANSFORMATION
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Ready to Build Something Great?
          </h2>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Share your requirements with our team and let's discuss the right solution for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-bold bg-white text-[#1769AA] hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-bold border-2 border-white/40 hover:border-white text-blue-900 hover:bg-blue-900 hover:text-white transition-all w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
