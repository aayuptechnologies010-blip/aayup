import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Briefcase, FileText, Mail, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    contact: 0,
    feedback: 0,
    studentEnquiry: 0,
    jobs: 0,
    applications: 0
  });

  useEffect(() => {
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        await fetchCounts();
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session error:", error);
        setUser(null);
        setLoading(false);
        return;
      }

      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(session.user);
      await fetchCounts();
    } catch (error) {
      console.error("Check user error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const { count: contactCount } = await supabase
        .from("contact")
        .select("*", { count: "exact", head: true });

      const { count: feedbackCount } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true });

      const { count: studentCount } = await supabase
        .from("student_applications")
        .select("*", { count: "exact", head: true });

      const { count: jobsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });

      const { count: applicationsCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      setCounts({
        contact: contactCount || 0,
        feedback: feedbackCount || 0,
        studentEnquiry: studentCount || 0,
        jobs: jobsCount || 0,
        applications: applicationsCount || 0
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show access denied message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
              <p className="text-foreground/70 mb-8">
                You need to be signed in to access the admin panel.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const stats = [
    { icon: Mail, label: "Contact Submissions", value: counts.contact.toString(), color: "from-blue-500 to-cyan-500", href: "/admin/contact" },
    { icon: MessageSquare, label: "Testimonials", value: counts.feedback.toString(), color: "from-purple-500 to-pink-500", href: "/admin/testimonals" },
    { icon: GraduationCap, label: "Student Enquiries", value: counts.studentEnquiry.toString(), color: "from-orange-500 to-red-500", href: "/admin/enquiry" },
    { icon: Briefcase, label: "Job Applications", value: counts.applications.toString(), color: "from-green-500 to-emerald-500", href: "/admin/applications" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.user_metadata?.full_name || 'Admin'}!
              </h1>
              <p className="text-foreground/70">Here's what's happening with your platform</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate(stat.href)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-foreground/70 text-sm">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/contact")}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Contact Submissions
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/testimonals")}>
                    <Users className="w-4 h-4 mr-2" />
                    Manage Testimonials
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/applications")}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Review Applications
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/jobs")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Jobs
                  </Button>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b border-border/50">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New contact submission</p>
                      <p className="text-xs text-foreground/60">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-border/50">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Testimonial approved</p>
                      <p className="text-xs text-foreground/60">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New job application</p>
                      <p className="text-xs text-foreground/60">1 day ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
