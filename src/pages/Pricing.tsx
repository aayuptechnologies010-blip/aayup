"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingLogo } from "@/components/ui/floating-logo";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Star, Smartphone, Globe, Zap, Gift } from "lucide-react";
import ProjectCostCalculator from "@/components/sections/ProjectCostCalculator";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function openPlan(id: string) {
    console.log("openPlan called with", id);
    try {
      // expose for automated checks
      // @ts-ignore
      window.__lastOpenPlan = id;
    } catch (e) {}
    setSelectedPlan(id);
    setDialogOpen(true);
  }

  function closePlan() {
    setDialogOpen(false);
    setSelectedPlan(null);
  }

  const PLAN_DETAILS: Record<string, { title: string; price?: string; bullets: string[]; waText: string }> = {
    "basic-website": {
      title: "Basic Website",
      price: "₹10,000",
      bullets: ["Up to 5 Pages", "Fully Responsive", "SEO-ready structure", "Contact form", "6 months Technical Support"],
      waText: "Hello, I'm interested in the Basic Website plan (₹10,000). Please share next steps.",
    },
    "professional-website": {
      title: "Professional Website",
      price: "₹15,000",
      bullets: ["10+ Custom Pages", "Blog integration", "Advanced UI/UX", "Speed optimizations", "6 months Priority Support"],
      waText: "Hello, I'm interested in the Professional Website plan (₹15,000). Please share next steps.",
    },
    "ecommerce-website": {
      title: "E-commerce Website",
      price: "₹20,000",
      bullets: ["Product catalog", "Payment gateway", "Checkout", "Advanced admin", "1 Year Premium Support"],
      waText: "Hello, I'm interested in the E-commerce Website plan (₹20,000). Please share next steps.",
    },
    "starter-app": {
      title: "Starter App",
      price: "₹26,000",
      bullets: ["Hybrid app", "Secure auth", "Basic UI/UX", "Admin dashboard", "1 Year Technical Support"],
      waText: "Hello, I'm interested in the Starter App plan (₹26,000). Please share details.",
    },
    "business-app": {
      title: "Business App",
      price: "₹45,000",
      bullets: ["Custom UI/UX", "API integration", "Push notifications", "Advanced admin", "1 Year Priority Support"],
      waText: "Hello, I'm interested in the Business App plan (₹45,000). Please share next steps.",
    },
    "advanced-app": {
      title: "Advanced App",
      price: "₹80,000",
      bullets: ["Native Android & iOS", "Advanced dashboard", "Payment integration", "Store publishing", "1 Year Premium Support"],
      waText: "Hello, I'm interested in the Advanced App plan (₹80,000). Please share next steps.",
    },
    "dm-basic": {
      title: "Digital Marketing — Basic",
      price: "₹7,000",
      bullets: ["Campaign setup", "Basic creatives", "Weekly check-ins"],
      waText: "Hello, I'm interested in the Digital Marketing Basic package (₹7,000). Please share details.",
    },
    "dm-standard": {
      title: "Digital Marketing — Standard",
      price: "₹10,000",
      bullets: ["Strategy & creatives", "A/B testing", "Bi-weekly reports"],
      waText: "Hello, I'm interested in the Digital Marketing Standard package (₹10,000). Please share details.",
    },
    "dm-premium": {
      title: "Digital Marketing — Premium",
      price: "₹12,000",
      bullets: ["Full-funnel campaigns", "Advanced optimization", "Dedicated manager"],
      waText: "Hello, I'm interested in the Digital Marketing Premium package (₹12,000). Please share details.",
    },
    "sm-basic": {
      title: "Social Media — Basic",
      price: "₹8,000/mo",
      bullets: ["12 posts/month", "Basic graphics", "Community monitoring"],
      waText: "Hello, I'm interested in Social Media Management - Basic (₹8,000). Please share package details.",
    },
    "sm-growth": {
      title: "Social Media — Growth",
      price: "₹12,000/mo",
      bullets: ["20 posts/month", "Campaigns & analytics", "Monthly reporting"],
      waText: "Hello, I'm interested in Social Media Management - Growth (₹12,000). Please share package details.",
    },
    "sm-premium": {
      title: "Social Media — Premium",
      price: "₹15,000/mo",
      bullets: ["Full content + ads", "Weekly optimizations", "Dedicated manager"],
      waText: "Hello, I'm interested in Social Media Management - Premium (₹15,000). Please share package details.",
    },
    "additional-services": {
      title: "Additional Services",
      bullets: [


        
        "Digital Marketing Packages — Basic: ₹7,000 | Standard: ₹10,000 | Premium: ₹12,000",
        "Social Media Management — Basic: ₹8,000 | Growth: ₹12,000 | Premium: ₹15,000",
        "SEO Growth — Starting at ₹2,000",
        "NFC Digital Business Card — Starting at ₹3,000",
        "Business Advertisement — Paid ads, creatives, and optimization",
        "Consulting Services — Strategy, technical & business consulting",
        "Content Writing — Blogs, SEO copy, landing pages",
        "Communication Training — Team workshops & presentation skills",
      ],
      waText: "Hello, I'm interested in Additional Services (Business Advertisement, Consulting, Content Writing, Communication Training). Please share details and pricing.",
    },
  };
  function renderFormattedBullet(b: string) {
    // If line contains a '—' and '|' parts (packages), format with title + separate lines
    if (b.includes("—") && b.includes("|")) {
      const [titlePart, rest] = b.split("—").map((s) => s.trim());
      const segments = rest.split("|").map((s) => s.trim());
      return (
        <div>
          <div className="font-semibold mb-1">{titlePart}</div>
          <div className="space-y-1">
            {segments.map((seg, i) => (
              <div key={i} className="text-foreground/90">
                {seg}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return <span>{b}</span>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />

      <section className="pt-[180px] pb-12 sm:pt-[160px] md:pt-[164px] lg:pt-[172px] relative">
        <FloatingLogo />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h1>
            <p className="text-xl text-foreground/70">
              Simple, Transparent Pricing — Choose the plan that works best for your business. All plans include our quality guarantee.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("additional-services")}>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Modern Design</h3>
                  <p className="text-foreground/70">Clean, responsive designs that convert visitors into customers</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("additional-services")}>
              <div className="flex items-start gap-3">
                <Gift className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
                  <p className="text-foreground/70">Get help when you need it from our expert team</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 glass-card">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-foreground/70">Enterprise-grade security and 99.9% uptime guarantee</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Website Development Plans */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Website Development Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("basic-website")}>
                  <div>
                    <h3 className="text-xl font-semibold">Basic Website</h3>
                    <p className="text-foreground/70 text-sm">Perfect for small businesses starting their online journey</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹10,000</div>
                    <div className="text-sm text-foreground/70">One-time payment</div>
                  </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Up to 5 Pages</li>
                  <li>Fully Responsive Design</li>
                  <li>SEO-ready Structure</li>
                  <li>SSL Certificate</li>
                  <li>Contact Form Integration</li>
                  <li>WhatsApp Integration</li>
                  <li>6 months Technical Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Basic Website plan (₹10,000). Please share next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card border-2 border-primary relative cursor-pointer pt-9" onClick={() => openPlan("professional-website")}>
                <div className="absolute top-2.5 right-4 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                  Most Popular
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="pr-2">
                    <h3 className="text-xl font-semibold">Professional Website</h3>
                    <p className="text-foreground/70 text-sm mt-0.5">Comprehensive solution for established businesses</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-2xl font-bold">₹15,000</div>
                    <div className="text-xs text-foreground/70">One-time payment</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>10+ Custom Pages</li>
                  <li>Blog Integration</li>
                  <li>Advanced UI/UX Design</li>
                  <li>Speed Optimization</li>
                  <li>Basic Admin Panel</li>
                  <li>WhatsApp Business Integration</li>
                  <li>6 months Priority Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Professional Website plan (₹15,000). Please share next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("ecommerce-website")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">E-commerce Website</h3>
                    <p className="text-foreground/70 text-sm">Complete online store solution</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹20,000</div>
                    <div className="text-sm text-foreground/70">One-time payment</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Product Catalog Management</li>
                  <li>Shopping Cart & Checkout</li>
                  <li>Payment Gateway Integration</li>
                  <li>Advanced Admin Panel</li>
                  <li>WhatsApp Order Notifications</li>
                  <li>1 Year Premium Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the E-commerce Website plan (₹20,000). Please share next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>
            </div>
          </div>

          {/* Digital Marketing Packages */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Digital Marketing Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("dm-basic")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Basic</h3>
                    <p className="text-foreground/70 text-sm">Starter marketing to kick off campaigns</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹7,000</div>
                    <div className="text-sm text-foreground/70">Per package</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Campaign setup</li>
                  <li>Ad creatives (basic)</li>
                  <li>Weekly performance check-ins</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Digital Marketing Basic package (₹7,000). Please share details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("dm-standard")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Standard</h3>
                    <p className="text-foreground/70 text-sm">Expanded strategy and ad management</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹10,000</div>
                    <div className="text-sm text-foreground/70">Per package</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Campaign strategy & creatives</li>
                  <li>Audience targeting & A/B testing</li>
                  <li>Bi-weekly reports</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Digital Marketing Standard package (₹10,000). Please share details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("dm-premium")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Premium</h3>
                    <p className="text-foreground/70 text-sm">Full-service growth & ad scaling</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹12,000</div>
                    <div className="text-sm text-foreground/70">Per package</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Full-funnel campaigns & creatives</li>
                  <li>Advanced optimization & reporting</li>
                  <li>Dedicated account manager</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Digital Marketing Premium package (₹12,000). Please share details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>
            </div>
          </div>

          {/* Social Media Management Packages */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Social Media Management</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("sm-basic")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Basic</h3>
                    <p className="text-foreground/70 text-sm">Starter social presence</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹8,000</div>
                    <div className="text-sm text-foreground/70">Per month</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>12 posts/month</li>
                  <li>Basic graphics & captions</li>
                  <li>Community monitoring</li>
                </ul>
                <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Social Media Management - Basic (₹8,000). Please share package details.")}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card border-2 border-primary relative cursor-pointer pt-9" onClick={() => openPlan("sm-growth")}>
                <div className="absolute top-2.5 right-4 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                  Most Popular
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="pr-2">
                    <h3 className="text-xl font-semibold">Growth</h3>
                    <p className="text-foreground/70 text-sm mt-0.5">Faster growth with strategy</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-2xl font-bold">₹12,000</div>
                    <div className="text-xs text-foreground/70">Per month</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>20 posts/month</li>
                  <li>Campaigns & analytics</li>
                  <li>Monthly growth reporting</li>
                </ul>
                <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Social Media Management - Growth (₹12,000). Please share package details.")}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("sm-premium")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Premium</h3>
                    <p className="text-foreground/70 text-sm">Full service + ads management</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹15,000</div>
                    <div className="text-sm text-foreground/70">Per month</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Full content + ads management</li>
                  <li>Weekly optimizations</li>
                  <li>Dedicated community manager</li>
                </ul>
                <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Social Media Management - Premium (₹15,000). Please share package details.")}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>
            </div>
          </div>

          {/* App Development Plans */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">App Development Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("starter-app")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Starter App</h3>
                    <p className="text-foreground/70 text-sm">Cross-platform app for startups</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹26,000</div>
                    <div className="text-sm text-foreground/70">One-time payment</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Hybrid App Development</li>
                  <li>Secure Authentication</li>
                  <li>Basic UI/UX Design</li>
                  <li>Admin Dashboard</li>
                  <li>1 Year Technical Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Starter App plan (₹26,000). Please share details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card border-2 border-primary relative cursor-pointer pt-9" onClick={() => openPlan("business-app")}>
                <div className="absolute top-2.5 right-4 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                  Most Popular
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="pr-2">
                    <h3 className="text-xl font-semibold">Business App</h3>
                    <p className="text-foreground/70 text-sm mt-0.5">Feature-rich app for growing brands</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-2xl font-bold">₹45,000</div>
                    <div className="text-xs text-foreground/70">One-time payment</div>
                  </div>
                </div>

                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Custom UI/UX Design</li>
                  <li>API Integration</li>
                  <li>Push Notifications</li>
                  <li>Advanced Admin Panel</li>
                  <li>1 Year Priority Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Business App plan (₹45,000). Please share next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>

              <Card className="p-6 glass-card cursor-pointer" onClick={() => openPlan("advanced-app")}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Advanced App</h3>
                    <p className="text-foreground/70 text-sm">Native apps for enterprise needs</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹80,000</div>
                    <div className="text-sm text-foreground/70">One-time payment</div>
                  </div>
                </div>
                <ul className="mb-4 list-disc list-inside text-foreground/80 space-y-2">
                  <li>Native Android & iOS Apps</li>
                  <li>Advanced Dashboard</li>
                  <li>Payment Gateway Integration</li>
                  <li>App Store Publishing</li>
                  <li>1 Year Premium Support</li>
                </ul>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in the Advanced App plan (₹80,000). Please share next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Contact via WhatsApp</Button>
                </a>
              </Card>
            </div>
          </div>

          {/* Instant Interactive Project Cost Calculator */}
          <div className="mb-14">
            <ProjectCostCalculator />
          </div>

          {/* Enterprise & Additional services */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 glass-card">
              <h3 className="text-xl font-semibold mb-3">Enterprise Solutions</h3>
              <p className="text-foreground/70 mb-3">Enterprise All-in-One — Complete digital transformation package</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
                <li>Custom Quote for Website + App</li>
                <li>Digital Marketing Campaigns & Social Media Management</li>
                <li>Advanced SEO Strategy</li>
                <li>Dedicated Account Manager & Priority 24/7 Support</li>
                <li>Monthly Performance Reports</li>
              </ul>
              <a
                href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in an Enterprise All-in-One custom quote (including Business Advertisement, Consulting, Content Writing, Communication Training). Please get in touch.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full">Request Custom Quote</Button>
              </a>
            </Card>

            <Card className="p-6 glass-card pricing-additional">
              <h3 className="text-xl font-semibold pt-4 pb-2 mb-4 leading-relaxed">Additional Services</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-3 md:space-y-4 mb-4">
                <li>Digital Marketing Packages — Basic: ₹7,000 | Standard: ₹10,000 | Premium: ₹12,000</li>
                <li>Social Media Management — Basic: ₹8,000 | Growth: ₹12,000 | Premium: ₹15,000</li>
                <li>SEO Growth — Starting at ₹2,000</li>
                <li>NFC Digital Business Card — Starting at ₹3,000</li>
                <li>Business Advertisement — Paid ads, creatives, and optimization</li>
                <li>Consulting Services — Strategy, technical & business consulting</li>
                <li>Content Writing — Blogs, SEO copy, landing pages</li>
                <li>Communication Training — Team workshops & presentation skills</li>
              </ul>
              <div className="flex gap-3">
                <Button onClick={(e) => { e.stopPropagation(); openPlan("additional-services"); }}>View Details</Button>
                <a
                  href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I want to enquire about additional services (Business Advertisement, Consulting, Content Writing, Communication Training). Please connect.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="w-full">Enquire via WhatsApp</Button>
                </a>
              </div>
            </Card>
          </div>

          {/* Services Details Section (Accordion) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Services</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible>
                <AccordionItem value="ad">
                  <AccordionTrigger>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold">Business Advertisement</span>
                      <span className="text-sm text-foreground/70">Convert clicks into customers with ROI-driven ad campaigns</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-foreground/80">Our advertising strategies are built for ROI with campaigns that reach and motivate your audience.</p>
                      <h4 className="font-semibold">What We Deliver:</h4>
                      <ul className="list-disc list-inside text-foreground/80 space-y-1">
                        <li>Targeted campaigns across platforms</li>
                        <li>Ad creation optimized for conversion</li>
                        <li>Budget-driven media planning</li>
                        <li>Performance tracking and more</li>
                      </ul>
                      <h4 className="font-semibold">Results You Can Expect:</h4>
                      <ul className="list-disc list-inside text-foreground/80 space-y-1">
                        <li>Average 3.5x ROI on ad spend</li>
                        <li>25% lower customer acquisition cost</li>
                        <li>Real-time campaign adjustments</li>
                      </ul>
                      <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Business Advertisement services. Please share options and pricing.")}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Enquire via WhatsApp</Button>
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="social">
                  <AccordionTrigger>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold">Social Media Management</span>
                      <span className="text-sm text-foreground/70">Build your brand with consistent content and engagement</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-foreground/80">Forge stronger connections through curated, strategic social media content and engagement.</p>
                      <h4 className="font-semibold">Packages & Pricing</h4>
                      <ul className="list-disc list-inside text-foreground/80 space-y-1">
                        <li><strong>Basic:</strong> ₹8,000 — 12 posts/month, basic graphics, community monitoring</li>
                        <li><strong>Growth:</strong> ₹12,000 — 20 posts/month, campaign strategy, monthly analytics</li>
                        <li><strong>Premium:</strong> ₹15,000 — Full content + ads management, growth optimizations</li>
                      </ul>
                      <div>
                        <h4 className="font-semibold">Results You Can Expect:</h4>
                        <ul className="list-disc list-inside text-foreground/80 space-y-1">
                          <li>45% average engagement increase</li>
                          <li>2x faster audience growth</li>
                          <li>Dedicated community manager</li>
                        </ul>
                      </div>
                      <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Social Media Management (Basic/ Growth/ Premium). Please share package details and pricing.")}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Enquire via WhatsApp</Button>
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="seo">
                  <AccordionTrigger>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold">SEO Services</span>
                      <span className="text-sm text-foreground/70">Improve organic visibility and sustainable traffic</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-foreground/80">Our SEO delivers sustainable organic visibility with white-hat techniques and measurable progress.</p>
                      <h4 className="font-semibold">What We Deliver:</h4>
                      <ul className="list-disc list-inside text-foreground/80 space-y-1">
                        <li>In-depth keyword research</li>
                        <li>On-page and technical optimization</li>
                        <li>Off-page strategies and outreach</li>
                        <li>Monthly performance reports</li>
                      </ul>
                      <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in SEO Services. Please share scope and pricing.")}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Enquire via WhatsApp</Button>
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="card">
                  <AccordionTrigger>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold">Business Card Design</span>
                      <span className="text-sm text-foreground/70">Premium print and digital business card designs</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-foreground/80">We design premium, modern, and brand-focused business cards that reflect your identity.</p>
                      <h4 className="font-semibold">What We Deliver:</h4>
                      <ul className="list-disc list-inside text-foreground/80 space-y-1">
                        <li>Custom designs aligned with your brand identity</li>
                        <li>Print-ready CMYK files</li>
                        <li>Digital QR-enabled versions for sharing</li>
                      </ul>
                      <a href={`https://wa.me/918382984709?text=${encodeURIComponent("Hello, I'm interested in Business Card Design. Please share design options and pricing.")}`} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Enquire via WhatsApp</Button>
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* FAQ & CTA */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <Card className="p-6 glass-card">
              <div className="space-y-4 text-foreground/80">
                <div>
                  <h4 className="font-semibold">Do you offer custom plans?</h4>
                  <p>Yes — Mix and match services, scale as you grow, and work with our experts for a tailored solution.</p>
                </div>
                <div>
                  <h4 className="font-semibold">What payment methods do you accept?</h4>
                  <p>We accept bank transfers, UPI, and popular payment gateways depending on the package.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Do you provide maintenance?</h4>
                  <p>All plans include 1 year of support; maintenance packages can be extended for ongoing updates.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mb-20">
            <h3 className="text-xl font-semibold mb-3">Ready to launch your next big idea?</h3>
            <p className="text-foreground/70 mb-6">Let's discuss your ideas and create something amazing together. We're just a message away.</p>
            <a
              href={`https://wa.me/918382984709?text=${encodeURIComponent("Hi, I'd like to discuss a project. Please connect.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-8 py-3">Contact via WhatsApp</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Plan detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closePlan(); else setDialogOpen(open); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPlan ? PLAN_DETAILS[selectedPlan]?.title : "Plan Details"}</DialogTitle>
            <DialogDescription>{selectedPlan ? PLAN_DETAILS[selectedPlan]?.price : null}</DialogDescription>
          </DialogHeader>
          <div className="mt-6" />
          <div className="py-4">
            <ul className="list-disc list-inside mt-4 space-y-4">
              {selectedPlan && PLAN_DETAILS[selectedPlan]?.bullets.map((b, i) => (
                <li key={i} className="text-foreground/90">
                  {selectedPlan === "additional-services" ? renderFormattedBullet(b) : b}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            {selectedPlan && (
              <a href={`https://wa.me/918382984709?text=${encodeURIComponent(PLAN_DETAILS[selectedPlan].waText)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <Button>Contact via WhatsApp</Button>
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fallback modal for Additional Services (reliable click) */}
      {dialogOpen && selectedPlan === "additional-services" && (
        <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closePlan} />
          <div className="relative bg-background rounded-lg shadow-lg max-w-2xl w-full p-6 mx-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
              <div>
                <h3 className="text-lg font-semibold">{PLAN_DETAILS["additional-services"].title}</h3>
                <p className="text-sm text-foreground/70">Comprehensive add-on services and packages</p>
              </div>
              <button className="ml-4 text-foreground/70" onClick={closePlan} aria-label="Close">✕</button>
            </div>

            <div className="mt-4">
              <hr className="my-4 border-muted/50" />
              <ul className="list-disc list-inside mt-6 clear-both space-y-4 text-foreground/80">
                {PLAN_DETAILS["additional-services"].bullets.map((b, i) => (
                  <li key={i} className="text-foreground/90">{renderFormattedBullet(b)}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <a href={`https://wa.me/918382984709?text=${encodeURIComponent(PLAN_DETAILS["additional-services"].waText)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <Button>Contact via WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Pricing;
