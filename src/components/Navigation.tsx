import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, Settings, LogOut } from "lucide-react";
import logoImage from "@/assets/aayup-logo.webp";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Clients", href: "/#clients" },
    { name: "Blogs", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/#contact" },
  ];

  const adminNavItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Jobs", href: "/admin/jobs" },
    { name: "Applications", href: "/admin/applications" },
    { name: "Enquiry", href: "/admin/enquiry" },
    { name: "Testimonals ", href: "/admin/testimonals" },
    { name: "Contact", href: "/admin/contact" },
  ];

  const navItems = currentUser ? adminNavItems : publicNavItems;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (href.startsWith("/#")) {
      const hash = href.substring(1); // Remove the leading /

      // If we're not on the home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const el = document.querySelector(hash) as HTMLElement | null;
          if (el) {
            const offset = navHeight + 8;
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) {
          const offset = navHeight + 8;
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "glass-nav shadow-lg" 
          : isMobileMenuOpen 
            ? "md:bg-transparent glass-nav shadow-lg" 
            : "bg-background dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logoImage}
              alt="Aayup Technologies"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-xl font-bold gradient-text">
              Aayup Technologies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                >
                  {item.name}
                </Link>
              )
            )}

            {/* User/Admin Dropdown */}
            <div
              ref={dropdownRef}
              className="relative ml-2"
              onMouseEnter={() => setIsDropdownHovered(true)}
              onMouseLeave={() => setIsDropdownHovered(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:bg-transparent"
                onClick={handleDropdownToggle}
              >
                {getUserDisplayName()}
                <ChevronDown className={`w-4 h-4 transition-transform ${adminDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {(adminDropdownOpen || isDropdownHovered) && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-20"
                  onMouseEnter={() => setIsDropdownHovered(true)}
                  onMouseLeave={() => setIsDropdownHovered(false)}
                >
                  {currentUser ? (
                    <>
                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          navigate("/admin/profile");
                        }}
                        className="w-full px-4 py-2 text-left text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors flex items-center gap-2"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          navigate("/admin/settings");
                        }}
                        className="w-full px-4 py-2 text-left text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <div className="border-t border-border my-1"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setAdminDropdownOpen(false);
                        setAuthOpen(true);
                      }}
                      className="w-full px-4 py-2 text-left text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/50">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-2 pl-2 space-y-2">
              {currentUser ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/admin/profile");
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/admin/settings");
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="block mb-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthOpen(true);
                  }}
                >
                  Admin Sign In
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        )}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </nav>
  );
};

export default Navigation;
