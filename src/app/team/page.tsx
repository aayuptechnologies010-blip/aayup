import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import TeamHero from "@/components/sections/TeamHero";
import DirectorsSection from "@/components/sections/DirectorsSection";
import TeamIntroSection from "@/components/sections/TeamIntroSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Our Team & Directors - Aayup Technologies | Leadership & Engineers",
  description:
    "Meet our Board of Directors, software architects, and engineering team powering scalable digital solutions at Aayup Technologies.",
});

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1220] relative selection:bg-[#1769AA]/20 selection:text-[#1769AA]">
      {/* 1. Header Navigation */}
      <Navigation />

      {/* 2. Team Dedicated Hero */}
      <TeamHero />

      {/* 3. Directors Section (Dynamic Zig-Zag Showcase with Full Photo) */}
      <DirectorsSection />

      {/* 4. Core Team Showcase (Dynamic Carousel & Profiles) */}
      <TeamIntroSection />

      {/* 5. Trust Guarantee Strip */}
      <TrustGuaranteesStrip />

      {/* 6. Final Call to Action */}
      <FinalCTASection />

      {/* 7. Footer */}
      <Footer />

      {/* 8. Live Support */}
      <Chatbot />
    </main>
  );
}
