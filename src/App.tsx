import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminJobs from "./pages/admin/Jobs";
import AdminApplications from "./pages/admin/Applications";
import AdminEnquiry from "./pages/admin/Enquiry";
import AdminTestimonals from "./pages/admin/testimonals";
import AdminContact from "./pages/admin/Contact";
import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [showLoading, setShowLoading] = useState(() => {
    // Check if loading has already been shown in this session
    const hasShownLoading = sessionStorage.getItem("hasShownLoading");
    return !hasShownLoading;
  });

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        // Mark that loading has been shown in this session
        sessionStorage.setItem("hasShownLoading", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showLoading && <LoadingScreen />}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/enquiry" element={<AdminEnquiry />} />
            <Route path="/admin/testimonals" element={<AdminTestimonals />} />
            <Route path="/admin/contact" element={<AdminContact />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
