"use client";

import { motion } from "framer-motion";
import {
  Code2,
  ShieldCheck,
  Headphones,
  FileCheck2,
  Zap,
  CheckCircle2,
} from "lucide-react";

const GUARANTEES = [
  {
    icon: Code2,
    title: "100% Source Code Ownership",
    description: "Full IP transfer with clean Git repository upon completion. No vendor lock-in.",
  },
  {
    icon: ShieldCheck,
    title: "Non-Disclosure Agreement (NDA)",
    description: "Strict confidentiality and IP protection signed before starting any project.",
  },
  {
    icon: Headphones,
    title: "30-Day Free Post-Launch Support",
    description: "Dedicated bug-fixing, security monitoring, and minor tweaks after going live.",
  },
  {
    icon: FileCheck2,
    title: "Milestone-Based Escrow Payments",
    description: "Pay progressively as each sprint/module is demonstrated and approved by you.",
  },
  {
    icon: Zap,
    title: "Speed & Performance Guarantee",
    description: "Guaranteed 90+ Google PageSpeed score and ultra-fast sub-second loading speeds.",
  },
];

export default function TrustGuaranteesStrip() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-[#F4F9FD] to-white text-[#0B1220] border-y border-slate-200/80 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-1/4 w-80 h-40 bg-[#1769AA]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-[#2D86C9]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold tracking-widest uppercase mb-2.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>AAYUP Client Assurance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1220]">
              Our 5-Point Client <span className="text-[#1769AA]">Protection Guarantee</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            We operate with complete commercial transparency. Every contract is backed by strict delivery standards, IP security, and dedicated post-launch warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {GUARANTEES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-[#1769AA]/40 hover:shadow-lg hover:shadow-[#1769AA]/5 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#E8F2FA] group-hover:bg-[#1769AA] border border-[#CDE1F3] group-hover:border-[#1769AA] flex items-center justify-center text-[#1769AA] group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
                    <Icon className="w-5 h-5 transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2 leading-snug group-hover:text-[#1769AA] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
