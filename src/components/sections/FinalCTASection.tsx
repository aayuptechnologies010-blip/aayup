"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

export default function FinalCTASection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#0B1220] via-[#0D4F85] to-[#1769AA] text-white relative overflow-hidden">
      {/* Subtle Light Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D86C9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide">
            <MessageSquare className="w-4 h-4 text-[#2D86C9]" />
            <span>Ready to scale your software?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Have an Idea? Let’s Build It Together.
          </h2>

          <p className="text-base sm:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
            Tell us about your project and our team can discuss the next steps with you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-xl px-8 py-6 text-base font-semibold bg-white text-[#0B1220] hover:bg-slate-100 shadow-xl transition-all w-full sm:w-auto"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 py-6 text-base font-semibold border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white transition-all w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="pt-6 text-xs text-white/70 font-medium">
            No obligation initial consultation • Transparent scoping & estimates
          </div>
        </motion.div>
      </div>
    </section>
  );
}
