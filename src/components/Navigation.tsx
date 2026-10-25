"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "@/lib/router-bridge";
import { Menu, X, ChevronDown, User, Settings, LogOut, Phone, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/aayup-logo.webp";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getDynamicData, DYNAMIC_KEYS } from "@/lib/dynamicDataService";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [navHeight, setNavHeight] = useState(80);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Cache nav height on mount and resize
    const updateNavHeight = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        setNavHeight(nav.getBoundingClientRect().height);
      }
    };
    
    updateNavHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateNavHeight, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const offset = navHeight + 8;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 200);
      }
    }
  }, [navHeight]);


  useEffect(() => {
    // Check for current user session
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setCurrentUser(session?.user || null);
  };

  const handleSignOut = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear local state
      setCurrentUser(null);
      setAdminDropdownOpen(false);
      
      // Clear session storage
      sessionStorage.clear();
      localStorage.clear();
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
      
      // Navigate to home
      navigate("/", { replace: true });
      
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Signed Out",
        description: "You have been signed out",
      });
      
      // Force clear and redirect even on error
      setCurrentUser(null);
      navigate("/", { replace: true });
    }
  };

  const publicNavItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  // Website always renders client-facing public navigation
  const navItems = publicNavItems;

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/" && (!location.hash || location.hash === "#");
    }
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.substring(1);
    }
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      return location.pathname === path && location.hash === `#${hash}`;
    }
    // If the current route has an active hash matching another navigation item,
    // prevent the parent route from showing active simultaneously.
    if (location.hash && location.pathname === href) {
      const hasSpecificHashItem = navItems.some(
        (item) => item.href === `${href}${location.hash}`
      );
      if (hasSpecificHashItem) {
        return false;
      }
    }
    return location.pathname === href || (href !== "/" && location.pathname.startsWith(`${href}/`));
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";
      const targetId = hash;

      // If user is already on the target page, scroll smoothly with nav offset
      if (location.pathname === targetPath) {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          const offset = navHeight + 8;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
          window.history.pushState(null, "", href);
          window.dispatchEvent(new Event("hashchange"));
        }
      }
    }

    setIsMobileMenuOpen(false);
  };


  const getUserDisplayName = () => {
    if (!currentUser) return "Admin";
    return currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || "User";
  };

  useEffect(() => {
    // Handle outside clicks
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const [announcement, setAnnouncement] = useState<{
    badge: string;
    text: string;
    linkText?: string;
    linkUrl?: string;
    active: boolean;
  }>({
    badge: "📢 Announcement",
    text: "Currently we are not hiring! Follow us for future job updates & opportunities:",
    linkText: "Follow on LinkedIn",
    linkUrl: "https://www.linkedin.com/in/aayup-technologies-a030a5372/",
    active: true,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchLiveAnnouncement = () => {
      getDynamicData(DYNAMIC_KEYS.ANNOUNCEMENT, {
        badge: "📢 Announcement",
        text: "Currently we are not hiring! Follow us for future job updates & opportunities:",
        linkText: "Follow on LinkedIn",
        linkUrl: "https://www.linkedin.com/in/aayup-technologies-a030a5372/",
        active: true,
      }).then((data) => {
        if (isMounted && data) {
          setAnnouncement(data as any);
        }
      });
    };

    fetchLiveAnnouncement();
    window.addEventListener("aayup_dynamic_data_updated", fetchLiveAnnouncement);
    window.addEventListener("storage", fetchLiveAnnouncement);
    return () => {
      isMounted = false;
      window.removeEventListener("aayup_dynamic_data_updated", fetchLiveAnnouncement);
      window.removeEventListener("storage", fetchLiveAnnouncement);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Thin Notification & Contact Bar */}
      {announcement.active !== false && (
        <div className="bg-[#0B1E38] text-white text-xs border-b border-white/10 transition-all duration-300">
          <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Dynamic Quick Notice Banner */}
            <div className="flex items-center gap-2 font-medium">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#1769AA]/30 text-cyan-300 border border-[#1769AA]/40 text-[10px] font-semibold uppercase tracking-wider">
                {announcement.badge || "Announcement"}
              </span>
              <span className="text-slate-200 hidden sm:inline">
                {announcement.text}
              </span>
              {announcement.linkUrl && announcement.linkText && (
                <a
                  href={announcement.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-semibold underline underline-offset-2 transition-colors ml-1"
                >
                  {announcement.linkText} <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Right: Phone, WhatsApp, Instagram, LinkedIn */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/918382984709?text=Hello%20Aayup%20Technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition-colors font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5" />
                </span>
                <span className="hidden md:inline font-mono">+91 8382984709</span>
              </a>

              <div className="w-[1px] h-3.5 bg-white/20 hidden sm:block" />

            {/* Social Circle Icons */}
            <div className="flex items-center gap-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918382984709?text=Hello%20Aayup%20Technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-emerald-500 text-slate-200 hover:text-white border border-white/10 hover:border-emerald-500 transition-all flex items-center justify-center"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/aayup.technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 text-slate-200 hover:text-white border border-white/10 hover:border-pink-500 transition-all flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/aayup-technologies-a030a5372/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#0077B5] text-slate-200 hover:text-white border border-white/10 hover:border-[#0077B5] transition-all flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-200/70" 
            : isMobileMenuOpen 
              ? "bg-white/95 shadow-md border-b border-slate-200/70" 
              : "bg-white/60 backdrop-blur-md border-b border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group py-1">
            <img
              src="/footer.png"
              alt="AAYUP Technologies"
              className="h-10 sm:h-15 w-auto object-contain group-hover:scale-[1.02] transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              const hasHash = item.href.includes("#");
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e: React.MouseEvent) => {
                    if (hasHash) {
                      handleNavClick(e, item.href);
                    }
                  }}
                  className={`relative px-4 py-2 font-semibold transition-all rounded-lg text-sm ${
                    active
                      ? "text-[#1769AA] bg-[#1769AA]/10 shadow-sm"
                      : "text-slate-700 hover:text-[#1769AA] hover:bg-slate-100/70"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#1769AA]" />
                  )}
                </Link>
              );
            })}


            {/* CTA Button */}
            <Link to="/contact" className="ml-2">
              <Button
                size="sm"
                className="rounded-full px-5 py-2 shadow-md hover:shadow-lg transform transition-all hover:scale-105 bg-[#1769AA] hover:bg-[#0D4F85] text-white font-semibold text-sm"
              >
                Discuss Your Project
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with Premium Framer-Motion Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-xl rounded-b-2xl"
            >
              <div className="py-5 px-3 space-y-1.5">
                {navItems.map((item, index) => {
                  const active = isLinkActive(item.href);
                  const hasHash = item.href.includes("#");
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
                          active
                            ? "text-white bg-[#1769AA] shadow-md shadow-[#1769AA]/25 font-bold"
                            : "text-slate-700 hover:text-[#1769AA] hover:bg-slate-100/80"
                        }`}
                        onClick={(e: React.MouseEvent) => {
                          if (hasHash) {
                            handleNavClick(e, item.href);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        <span>{item.name}</span>
                        {active ? (
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Bottom Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.04 + 0.05 }}
                  className="pt-3 mt-2 border-t border-slate-200/80 space-y-2.5"
                >

                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button className="w-full py-5 rounded-xl bg-[#1769AA] hover:bg-[#0D4F85] text-white font-bold text-sm shadow-md shadow-[#1769AA]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Discuss Your Project
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </nav>
  </header>
  );
};

export default Navigation;
