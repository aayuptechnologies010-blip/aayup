import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/sections/AboutSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import AgencyComparisonSection from "@/components/sections/AgencyComparisonSection";
import TechStackExplorer from "@/components/sections/TechStackExplorer";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About Us - Aayup Technologies | Vision, Mission & Innovation",
  description:
    "Learn about Aayup Technologies, our values, our expert software team, and our commitment to building intelligent digital solutions.",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220] relative selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      <Navigation />
      <AboutSection />
      <TrustGuaranteesStrip />
      <AgencyComparisonSection />
      <TechStackExplorer />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
      <Chatbot />
    </main>
  );
}

