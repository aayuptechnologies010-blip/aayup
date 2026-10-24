import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ProjectsPortfolioView from "@/components/sections/ProjectsPortfolioView";
import FreeWebsiteAudit from "@/components/sections/FreeWebsiteAudit";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Projects & Portfolio — AAYUP Technologies",
  description:
    "Explore how AAYUP Technologies transforms business challenges into modern websites, mobile applications, CRM software and intelligent AI solutions.",
});

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220] relative selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      <Navigation />
      <ProjectsPortfolioView />
      <FreeWebsiteAudit />
      <TrustGuaranteesStrip />
      <FinalCTASection />
      <Footer />
      <Chatbot />
    </main>
  );
}
