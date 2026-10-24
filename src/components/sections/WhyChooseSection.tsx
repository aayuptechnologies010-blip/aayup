"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Smartphone,
  MessageSquare,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function WhyChooseSection() {
  const points = [
    {
      icon: Briefcase,
      title: "Business-Focused Solutions",
      description:
        "We align every technical decision with your business objectives, ensuring tangible ROI, operational scalability, and practical value.",
    },
    {
      icon: Smartphone,
      title: "Responsive & User-Friendly Experiences",
      description:
        "Every application is rigorously crafted for fluid usability across devices, fast page speed, and seamless customer interactions.",
    },
    {
      icon: MessageSquare,
      title: "Transparent Communication",
      description:
        "Direct access to engineering leads, consistent progress updates, clear milestones, and realistic timelines throughout the development lifecycle.",
    },
    {
      icon: ShieldCheck,
      title: "Quality-Focused Development",
      description:
        "Clean, maintainable source code, automated testing pipelines, and robust security protocols built into the software architecture.",
    },
    {
      icon: Headphones,
      title: "Ongoing Maintenance & Support",
      description:
        "Post-launch infrastructure monitoring, feature updates, bug fixes, and continuous technical advisory as your company expands.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-[#0B1220]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
            Our Engineering Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] dark:text-white mt-2 leading-tight">
            Why Choose AAYUP Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            A reliable technology partnership built on disciplined execution, clear communication, and dependable digital craftsmanship.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#F3F7FB] dark:bg-white/5 p-8 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 dark:bg-[#1769AA]/20 flex items-center justify-center text-[#1769AA] dark:text-[#2D86C9] mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-2.5">
                  {point.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}

          {/* Highlight Callout Box as 6th item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-[#1769AA] to-[#0D4F85] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
                Commitment to Clients
              </span>
              <h3 className="text-xl font-bold mt-2">
                Real Technology, No Gimmicks.
              </h3>
              <p className="text-white/85 text-sm mt-3 leading-relaxed">
                We believe in straightforward engineering without fabricated claims. Every project is scoped transparently and built to deliver long-term value.
              </p>
            </div>
            <div className="pt-4 font-semibold text-xs tracking-wide text-white/90">
              AAYUP Technologies Pvt. Ltd.
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
