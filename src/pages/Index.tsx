import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ClientProjectsTicker from "@/components/sections/ClientProjectsTicker";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import ServicesOverviewSection from "@/components/sections/ServicesOverviewSection";
import TechStackExplorer from "@/components/sections/TechStackExplorer";
import ProjectCostCalculator from "@/components/sections/ProjectCostCalculator";
import WebsiteCostGuide from "@/components/sections/WebsiteCostGuide";
import AgencyComparisonSection from "@/components/sections/AgencyComparisonSection";
import FreeWebsiteAudit from "@/components/sections/FreeWebsiteAudit";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      <HeroSection />
      <ClientProjectsTicker />
      <TrustGuaranteesStrip />
      <ProjectCostCalculator />
      <WebsiteCostGuide />
      <TechStackExplorer />
      <AgencyComparisonSection />
      <FreeWebsiteAudit />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
