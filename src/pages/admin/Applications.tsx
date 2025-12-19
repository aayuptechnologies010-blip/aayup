import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Eye, Download, Filter } from "lucide-react";
import ApplicationViewModal from "@/components/admin/ApplicationViewModal";
import { generateApplicationPDF } from "@/lib/pdfGenerator";

const Applications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

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
    fetchData();
  };

  const fetchData = async () => {
    // Fetch applications with job details
    const { data: appsData, error: appsError } = await supabase
      .from("applications")
      .select(`
        *,
        jobs (
          title,
          department,
          location
        )
      `)
      .order("created_at", { ascending: false });

    if (appsError) {
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
      return;
    }

    setApplications(appsData || []);

    // Fetch jobs for filter
    const { data: jobsData } = await supabase
      .from("jobs")
      .select("id, title")
      .order("title");

    setJobs(jobsData || []);
  };

  const handleView = (application: any) => {
    setSelectedApplication(application);
    setViewOpen(true);
  };

  const handleDownloadPDF = async (application: any) => {
    try {
      await generateApplicationPDF(application);
      toast({
        title: "Success",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Application status updated",
    });
    fetchData();
  };

  const filteredApplications = applications.filter((app) => {
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    if (jobFilter !== "all" && app.job_id !== jobFilter) return false;
    return true;
  });

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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Applications Management</h2>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded"
                >
                  <option value="all">All Jobs</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <p className="text-center text-foreground/70 py-8">
                  No applications found
                </p>
              ) : (
                filteredApplications.map((app) => (
                  <Card key={app.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{app.full_name}</h3>
                        <p className="text-sm text-foreground/70 mt-1">
                          Applied for:{" "}
                          <span className="font-medium">{app.jobs?.title}</span>
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm">
                          <span className="px-2 py-1 bg-primary/10 rounded">
                            {app.email}
                          </span>
                          <span className="px-2 py-1 bg-secondary/10 rounded">
                            {app.phone}
                          </span>
                          <span className="px-2 py-1 bg-muted rounded">
                            {app.current_location}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              app.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : app.status === "shortlisted"
                                ? "bg-green-100 text-green-800"
                                : app.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/60 mt-2">
                          Applied on{" "}
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(app)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadPDF(app)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                          className="px-2 py-1 text-sm bg-background border border-border rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>
      </section>

      <ApplicationViewModal
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
      />

      <Footer />
    </div>
  );
};

export default Applications;
