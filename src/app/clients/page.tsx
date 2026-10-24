import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ClientsHero from "@/components/sections/ClientsHero";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import FreeWebsiteAudit from "@/components/sections/FreeWebsiteAudit";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Client Reviews & Testimonials - Aayup Technologies",
  description:
    "See what clients and partners say about working with Aayup Technologies. Real reviews, ratings, and feedback on our software services.",
});

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <ClientsHero />
      <div id="reviews-scroll">
        <TestimonialsSection />
      </div>
      <TrustGuaranteesStrip />
      <FreeWebsiteAudit />
      <FinalCTASection />
      <Footer />
      <Chatbot />
    </main>
  );
}
