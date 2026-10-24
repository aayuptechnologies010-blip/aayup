"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cpu,
  Bot,
  Palette,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

export default function ServicesOverviewSection() {
  const services = [
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Fast, responsive, and SEO-optimized web applications built with modern frontend frameworks and scalable serverless or cloud architectures.",
      link: "/services",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "High-performance native and cross-platform iOS and Android mobile solutions focused on intuitive interfaces and smooth user journeys.",
      link: "/services",
    },
    {
      icon: Cpu,
      title: "Custom Software & CRM/ERP",
      description:
        "Tailored enterprise platforms, internal business management dashboards, and robust API backends designed for operational efficiency.",
      link: "/services",
    },
    {
      icon: Bot,
      title: "AI & Business Automation",
      description:
        "Automating repetitive workflows, customer interactions, and data intelligence through cutting-edge AI integrations and machine learning pipelines.",
      link: "/services",
    },
    {
      icon: Palette,
      title: "UI/UX & Graphic Design",
      description:
        "Human-centered digital product interfaces, modern design systems, wireframes, and branding assets engineered to maximize user engagement.",
      link: "/services",
    },
    {
      icon: TrendingUp,
      title: "SEO & Digital Marketing",
      description:
        "Data-driven technical SEO, search engine visibility strategies, and ROI-focused digital campaigns that generate qualified business opportunities.",
      link: "/services",
    },
  ];

  return (
    <section id="services" className="py-12 md:py-16 bg-[#F3F7FB] dark:bg-[#0F172A]/70">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#1769AA] dark:text-[#2D86C9]">
            Capabilities & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] dark:text-white mt-2 leading-tight">
            Our Software Development Services
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-3">
            We deliver end-to-end digital engineering services that empower modern enterprises to scale, automate, and lead in their markets.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white dark:bg-[#0B1220] p-8 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#1769AA]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#1769AA]/10 dark:bg-[#1769AA]/20 flex items-center justify-center text-[#1769AA] dark:text-[#2D86C9] mb-6 group-hover:bg-[#1769AA] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-sm font-semibold text-[#1769AA] dark:text-[#2D86C9] group-hover:translate-x-1 transition-transform"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Bottom */}
        <div className="mt-14 text-center">
          <Link to="/services">
            <Button
              size="lg"
              className="rounded-xl px-8 py-6 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-semibold shadow-md transition-all"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
