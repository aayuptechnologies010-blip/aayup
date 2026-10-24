import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CareersPageContent from "@/components/sections/CareersPageContent";
import TechStackExplorer from "@/components/sections/TechStackExplorer";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Careers — Join Our Team at AAYUP Technologies",
  description:
    "Explore open roles at Aayup Technologies. Join our engineering, design, and AI teams. Remote-first culture, high-impact software, competitive pay, and rapid career progression.",
});

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <CareersPageContent />
      <div className="py-6 bg-slate-50 border-t border-slate-200">
        <TechStackExplorer />
      </div>
      <Footer />
      <Chatbot />
    </main>
  );
}
