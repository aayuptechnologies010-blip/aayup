"use client";

import { Link } from "@/lib/router-bridge";
import { Instagram, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1220] text-white border-t border-white/10 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center group">
              <img
                src="/footer.png"
                alt="AAYUP Technologies"
                className="h-10 md:h-14 w-auto object-contain bg-  rounded-lg px-2 py-1 group-hover:scale-105 transition-transform shadow-md"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              AAYUP Technologies Pvt. Ltd. is a full-service software development company building modern web applications, scalable mobile apps, custom enterprise software, and AI solutions.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              CIN / Reg. Registered Software Engineering Agency
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#2D86C9] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers at AAYUP
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Insights & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#2D86C9] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Custom Software & CRM
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#2D86C9] mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center space-x-3 mb-5">
              <a
                href="https://www.linkedin.com/in/aayup-technology-a030a5372"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-[#1769AA] border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/aayup.technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-pink-600 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="mailto:aayup.technologies.010@gmail.com"
                className="w-9 h-9 bg-white/5 hover:bg-[#1769AA] border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
              <a
                href="https://wa.me/918382984709"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-emerald-600 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </a>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <a
                  href="mailto:aayup.technologies.010@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  aayup.technologies.010@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+918382984709"
                  className="hover:text-white transition-colors"
                >
                  +91 83829 84709
                </a>
              </p>
              <div className="pt-2 text-slate-400 border-t border-white/10 leading-relaxed">
                <span className="font-semibold text-white block mb-0.5">Office Address:</span>
                Room No. A/302, Gajanan Apartment, Near Pathak School, Sahakar Nagar, Virar East, Vasai, Thane, Palghar, Maharashtra — 401305, India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} AAYUP Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
