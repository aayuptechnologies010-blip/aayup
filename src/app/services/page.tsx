import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ServicesPageContent from "@/components/sections/ServicesPageContent";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import ProjectCostCalculator from "@/components/sections/ProjectCostCalculator";
import WebsiteCostGuide from "@/components/sections/WebsiteCostGuide";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Services & IT Solutions — AAYUP Technologies",
  description:
    "Technology solutions built around your business. Web development, mobile apps, CRM / ERP custom software, AI workflows, UI/UX design, and SEO services.",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <ServicesPageContent />
      <TrustGuaranteesStrip />
      <ProjectCostCalculator />
      <WebsiteCostGuide />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <Chatbot />
    </main>
  );
}

