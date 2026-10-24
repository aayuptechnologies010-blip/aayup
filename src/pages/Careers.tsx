"use client";

import Navigation from "@/components/Navigation";
import CareersPageContent from "@/components/sections/CareersPageContent";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navigation />
      <CareersPageContent />
      <Footer />
    </div>
  );
};

export default Careers;
