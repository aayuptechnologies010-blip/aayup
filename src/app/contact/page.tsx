import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";
import TrustGuaranteesStrip from "@/components/sections/TrustGuaranteesStrip";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us - Aayup Technologies | Get in Touch",
  description:
    "Contact Aayup Technologies for inquiries, project discussions, custom software development, or technical consultation.",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <ContactHero />
      <div id="contact-form-section">
        <ContactSection />
      </div>
      <TrustGuaranteesStrip />
      <FAQSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
