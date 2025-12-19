import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Shield, Settings, Briefcase, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await Promise.race([
        supabase.auth.getSession(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 5000)
        )
      ]) as any;
      
      if (error || !session) {
        console.log("No session, redirecting to home");
        toast({
          title: "Access Denied",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setCurrentUser(session.user);
      setLoading(false);
    } catch (error) {
      console.error("Session check error:", error);
      setLoading(false);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Admin Profile</h1>

            {/* Current User Profile */}
            <Card className="glass-card p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">
                    {currentUser?.user_metadata?.full_name || "Admin User"}
                  </h2>
                  <div className="space-y-2 text-foreground/70">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Mail className="w-4 h-4" />
                      <span>{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(currentUser?.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Shield className="w-4 h-4" />
                      <span className="text-primary font-semibold">Administrator</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate("/admin/settings")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate("/admin")}>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dashboard</h3>
                <p className="text-foreground/70 text-sm">View analytics and overview</p>
              </Card>

              <Card className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate("/admin/settings")}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Settings</h3>
                <p className="text-foreground/70 text-sm">Manage account & security</p>
              </Card>

              <Card className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate("/admin/applications")}>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Applications</h3>
                <p className="text-foreground/70 text-sm">Review job applications</p>
              </Card>

              <Card className="glass-card p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate("/admin/contact")}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Messages</h3>
                <p className="text-foreground/70 text-sm">View contact submissions</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
