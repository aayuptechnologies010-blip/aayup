import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import DirectorsSection from "@/components/sections/DirectorsSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";

// Lazy-load heavy below-the-fold interactive components to boost Initial Load & TTI
const TechStackExplorer = dynamic(() => import("@/components/sections/TechStackExplorer"), {
  loading: () => <div className="min-h-[300px]" />,
});
const ProjectCostCalculator = dynamic(() => import("@/components/sections/ProjectCostCalculator"), {
  loading: () => <div className="min-h-[300px]" />,
});
const WebsiteCostGuide = dynamic(() => import("@/components/sections/WebsiteCostGuide"), {
  loading: () => <div className="min-h-[200px]" />,
});
const AgencyComparisonSection = dynamic(() => import("@/components/sections/AgencyComparisonSection"), {
  loading: () => <div className="min-h-[250px]" />,
});
const FreeWebsiteAudit = dynamic(() => import("@/components/sections/FreeWebsiteAudit"), {
  loading: () => <div className="min-h-[200px]" />,
});
const WhyChooseSection = dynamic(() => import("@/components/sections/WhyChooseSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const HowWeWorkSection = dynamic(() => import("@/components/sections/HowWeWorkSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const TeamIntroSection = dynamic(() => import("@/components/sections/TeamIntroSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="min-h-[200px]" />,
});
const FinalCTASection = dynamic(() => import("@/components/sections/FinalCTASection"), {
  loading: () => <div className="min-h-[150px]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[200px]" />,
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220] relative selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      {/* SECTION 1 — Responsive Navigation */}
      <Navigation />

      {/* SECTION 2 — Hero with Animated Banner Slider */}
      <HeroSection />

      {/* SECTION 3 — 5-Point Client Protection Guarantee Strip */}
      <TrustGuaranteesStrip />

      {/* SECTION 3.5 — Board of Directors (Dynamic Zig-Zag Showcase) */}
      <DirectorsSection />

      {/* SECTION 4 — Featured Projects */}
      <FeaturedProjectsSection />

      {/* SECTION 5 — Services */}
      <ServicesOverviewSection />

      {/* SECTION 6 — Modern Interactive Tech Stack Architecture */}
      <TechStackExplorer />

      {/* SECTION 7 — Instant Transparent Project Cost Calculator */}
      <ProjectCostCalculator />

      {/* SECTION 8 — 2026 Website Development Cost Guide & Price Transparency */}
      <WebsiteCostGuide />

      {/* SECTION 9 — AAYUP vs Other Agencies Comparison Table */}
      <AgencyComparisonSection />

      {/* SECTION 10 — Free 2026 Website & SEO Audit Lead Magnet */}
      <FreeWebsiteAudit />

      {/* SECTION 11 — Why Choose AAYUP */}
      <WhyChooseSection />

      {/* SECTION 12 — How We Work */}
      <HowWeWorkSection />

      {/* SECTION 13 — Team & Company Introduction */}
      <TeamIntroSection />

      {/* SECTION 14 — Genuine Client Testimonials */}
      <TestimonialsSection />

      {/* SECTION 15 — Frequently Asked Questions (FAQ Accordion) */}
      <FAQSection />

      {/* SECTION 16 — Final Call to Action */}
      <FinalCTASection />

      {/* SECTION 17 — Footer */}
      <Footer />
    </main>
  );
}
