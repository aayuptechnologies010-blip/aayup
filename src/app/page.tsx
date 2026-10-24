import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";
import TechStackExplorer from "@/components/sections/TechStackExplorer";
import ProjectCostCalculator from "@/components/sections/ProjectCostCalculator";
import WebsiteCostGuide from "@/components/sections/WebsiteCostGuide";
import AgencyComparisonSection from "@/components/sections/AgencyComparisonSection";
import FreeWebsiteAudit from "@/components/sections/FreeWebsiteAudit";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import TeamIntroSection from "@/components/sections/TeamIntroSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220] relative selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      {/* SECTION 1 — Responsive Navigation */}
      <Navigation />

      {/* SECTION 2 — Hero with Animated Banner Slider */}
      <HeroSection />

      {/* SECTION 3 — 5-Point Client Protection Guarantee Strip */}
      <TrustGuaranteesStrip />

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
