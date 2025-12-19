import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import JobFormModal from "@/components/admin/JobFormModal";
import JobViewModal from "@/components/admin/JobViewModal";

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
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
    fetchJobs();
  };

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
      return;
    }

    setJobs(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Job deleted successfully",
    });
    fetchJobs();
  };

  const handleEdit = (job: any) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  const handleView = (job: any) => {
    setSelectedJob(job);
    setViewOpen(true);
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Jobs Management</h2>
              <Button onClick={() => { setSelectedJob(null); setFormOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Job
              </Button>
            </div>

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <p className="text-center text-foreground/70 py-8">No jobs posted yet</p>
              ) : (
                jobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-foreground/70">
                          <span className="px-2 py-1 bg-primary/10 rounded">{job.department}</span>
                          <span className="px-2 py-1 bg-secondary/10 rounded">{job.employment_type}</span>
                          <span className="px-2 py-1 bg-accent/10 rounded">{job.work_mode}</span>
                          <span className="px-2 py-1 bg-muted rounded">{job.location}</span>
                        </div>
                        <p className="mt-2 text-sm">Last Date: {new Date(job.last_date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(job)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(job)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>
      </section>

      <JobFormModal 
        open={formOpen} 
        onClose={() => { setFormOpen(false); setSelectedJob(null); }}
        job={selectedJob}
        onSuccess={fetchJobs}
      />

      <JobViewModal
        open={viewOpen}
        onClose={() => { setViewOpen(false); setSelectedJob(null); }}
        job={selectedJob}
      />

      <Footer />
    </div>
  );
};

export default Jobs;
