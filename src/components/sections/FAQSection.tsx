"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  PhoneCall,
  Clock,
  ShieldCheck,
  CreditCard,
  Code,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@/lib/router-bridge";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
  category: "Timeline & Delivery" | "Pricing & Payment" | "Code & Ownership" | "Support & Tech";
  icon: any;
}

const FAQS: FAQItem[] = [
  {
    category: "Timeline & Delivery",
    icon: Clock,
    question: "How long does it take to design and launch a website or application?",
    answer:
      "A standard corporate or business landing website typically takes 7 to 14 working days. Complex custom eCommerce or web portals usually take 3 to 6 weeks, while enterprise custom CRM/ERP platforms take 6 to 12 weeks depending on modular scope. We provide an exact sprint timeline before beginning.",
  },
  {
    category: "Code & Ownership",
    icon: Code,
    question: "Do I get 100% full ownership of the source code and designs?",
    answer:
      "Yes, absolutely. Once final delivery and milestone clearance take place, 100% intellectual property (IP), source code (GitHub/GitLab repository), database access, and Figma/design assets are transferred directly to your organization. There are zero hidden locks or vendor lock-in.",
  },
  {
    category: "Pricing & Payment",
    icon: CreditCard,
    question: "What are your payment terms and milestones?",
    answer:
      "We operate strictly on milestone-based transparent phases: typically 30% advance on project kickoff, 40% after prototype/staging approval, and the final 30% upon final launch and code handover. For large enterprise builds, we structure bi-weekly sprint deliverables.",
  },
  {
    category: "Support & Tech",
    icon: Wrench,
    question: "What post-launch support and maintenance do you provide?",
    answer:
      "Every project delivered by AAYUP Technologies includes 30 days of complimentary technical warranty and bug-fixing support. After 30 days, we offer affordable Monthly Retainer Maintenance (AMC) plans covering security updates, server monitoring, backups, and feature iterations.",
  },
  {
    category: "Timeline & Delivery",
    icon: ShieldCheck,
    question: "Can we sign a Non-Disclosure Agreement (NDA) before discussing details?",
    answer:
      "Yes. Client confidentiality and project secrecy are strictly respected. We can sign a standard mutual NDA before you share your proprietary project briefs, wireframes, or business logic.",
  },
  {
    category: "Support & Tech",
    icon: CheckCircle2,
    question: "Will my website/app be mobile-friendly, secure, and fast?",
    answer:
      "Yes. Every build undergoes rigorous responsive testing across iPhones, Androids, tablets, and desktops. We use modern Next.js 15, TailwindCSS, SSL encryption, CDN caching, and database sanitation to ensure 90+ PageSpeed scores and bank-grade data security.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [faqsList, setFaqsList] = useState<FAQItem[]>(FAQS);

  useEffect(() => {
    const loadFaqs = () => {
      try {
        const stored = localStorage.getItem("aayup_dynamic_faqs");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mapped = parsed
              .filter((f: any) => f.active !== false)
              .map((f: any) => {
                let icon = Clock;
                if (f.category === "Code & Ownership") icon = Code;
                else if (f.category === "Pricing & Payment") icon = CreditCard;
                else if (f.category === "Support & Tech") icon = Wrench;
                return {
                  category: f.category,
                  icon,
                  question: f.question,
                  answer: f.answer,
                };
              });
            if (mapped.length > 0) setFaqsList(mapped);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadFaqs();
    window.addEventListener("faqs_updated", loadFaqs);
    window.addEventListener("storage", loadFaqs);
    return () => {
      window.removeEventListener("faqs_updated", loadFaqs);
      window.removeEventListener("storage", loadFaqs);
    };
  }, []);

  const categories = ["All", "Timeline & Delivery", "Pricing & Payment", "Code & Ownership", "Support & Tech"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqsList
      : faqsList.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FBFE] text-[#0B1220] relative overflow-hidden border-t border-slate-200/80">
      {/* Background Decors */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#1769AA]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2D86C9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EEF8] border border-[#C5DCF0] text-[#1769AA] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#1769AA]" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1220]">
            Frequently Asked <span className="text-[#1769AA]">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about working with AAYUP Technologies — from pricing models and timelines to IP transfer and support.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#1769AA]/40 shadow-lg shadow-[#1769AA]/5"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#1769AA] text-white"
                          : "bg-slate-100 text-[#1769AA]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-base sm:text-lg text-[#0B1220]">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#1769AA]/10 text-[#1769AA]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pl-16">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions? Mini CTA */}
        <div className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-[#EBF4FA] to-[#E2EFF8] border border-[#C5DCF0] rounded-2xl p-6 sm:p-8 text-center">
          <h4 className="text-lg font-bold text-[#0B1220] mb-2">
            Have a custom question not covered here?
          </h4>
          <p className="text-sm text-slate-600 mb-5">
            Our engineering managers are available for a direct phone or WhatsApp consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/918382984709?text=Hi%20AAYUP%20Team!%20I%20have%20a%20specific%20project%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <Link to="/contact">
              <Button variant="outline" className="rounded-xl border-slate-300 font-semibold text-sm">
                Send Direct Message
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
