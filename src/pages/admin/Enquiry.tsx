import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StudentEnquiryAdmin from "@/components/admin/StudentEnquiryAdmin";

const Enquiry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast({
        title: "Access Denied",
        description: "Please sign in to access the admin panel",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setLoading(false);
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
        <div className="container mx-auto px-4">
          <Card className="glass-card p-8">
            <StudentEnquiryAdmin />
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enquiry;
