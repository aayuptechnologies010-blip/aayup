"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  CheckCircle,
  Rocket,
  RefreshCw,
} from "lucide-react";

export default function HowWeWorkSection() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discover Requirements",
      description:
        "We analyze your business context, user workflows, technical prerequisites, and success metrics to define clear project deliverables.",
    },
    {
      num: "02",
      icon: PenTool,
      title: "Plan and Design",
      description:
        "We build interactive UI/UX wireframes, database schemas, and architectural plans to validate usability and scope before engineering starts.",
    },
    {
      num: "03",
      icon: Code2,
      title: "Develop",
      description:
        "Our developers write modular, clean code using modern frameworks and best-practice patterns with regular sprint check-ins.",
    },
    {
      num: "04",
      icon: CheckCircle,
      title: "Test and Review",
      description:
        "Cross-browser testing, mobile responsiveness checks, load testing, and edge-case validation ensure stability and security.",
    },
    {
      num: "05",
      icon: Rocket,
      title: "Launch",
      description:
        "Seamless production deployment to cloud infrastructure, database migrations, domain setup, and initial performance verification.",
    },
    {
      num: "06",
      icon: RefreshCw,
      title: "Maintain and Improve",
      description:
        "Continuous monitoring, scheduled software upgrades, user feedback iterations, and proactive technical support as your system grows.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#F3F7FB] dark:bg-[#0F172A]/70">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
            Disciplined Delivery
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] dark:text-white mt-2 leading-tight">
            How We Work
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            A transparent 6-step engineering methodology that turns complex ideas into predictable, on-time digital products.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white dark:bg-[#0B1220] p-8 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all"
              >
                {/* Large Background Step Number */}
                <div className="absolute top-4 right-4 text-4xl font-black text-slate-100 dark:text-white/5 select-none pointer-events-none group-hover:text-[#1769AA]/10 transition-colors">
                  {step.num}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 dark:bg-[#1769AA]/20 flex items-center justify-center text-[#1769AA] dark:text-[#2D86C9] mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-[#1769AA] mb-1">
                  Step {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
