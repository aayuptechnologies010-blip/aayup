import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FloatingLogo } from "@/components/ui/floating-logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative pt-20">
        <FloatingLogo />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* 404 Number with glitch effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-[80px] sm:text-[120px] md:text-[180px] font-black leading-none mb-0 relative">
              <span className="gradient-text animate-glitch">404</span>
            </h1>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Oops! <span className="gradient-text">Page Not Found</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-2">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
            <p className="text-sm text-foreground/50">
              Error Path: <code className="text-destructive">{location.pathname}</code>
            </p>
          </motion.div>

          {/* Animated illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative w-64 h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-secondary rounded-full -translate-x-1/2"></div>
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-accent rounded-full -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full -translate-y-1/2"></div>
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 border-4 border-dashed border-primary/30 rounded-full"
              ></motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center"
              >
                <Search className="w-16 h-16 text-primary/50" />
              </motion.div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4"
          >
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>

            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover:bg-muted/50 transition-all w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }

          @keyframes glitch {
            0%, 100% { 
              text-shadow: 
                2px 2px 0px rgba(99, 102, 241, 0.3),
                -2px -2px 0px rgba(139, 92, 246, 0.3);
            }
            25% { 
              text-shadow: 
                -2px 2px 0px rgba(99, 102, 241, 0.3),
                2px -2px 0px rgba(139, 92, 246, 0.3);
            }
            50% { 
              text-shadow: 
                2px -2px 0px rgba(99, 102, 241, 0.3),
                -2px 2px 0px rgba(139, 92, 246, 0.3);
            }
            75% { 
              text-shadow: 
                -2px -2px 0px rgba(99, 102, 241, 0.3),
                2px 2px 0px rgba(139, 92, 246, 0.3);
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-glitch {
            animation: glitch 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
