import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase, Clock, ChevronDown, ChevronUp } from "lucide-react";
import JobApplicationModal from "@/components/JobApplicationModal";
import { FloatingLogo } from "@/components/ui/floating-logo";

const Careers = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const resumeFormRef = useRef(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, departmentFilter, typeFilter, modeFilter, jobs]);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .gte("last_date", new Date().toISOString().split("T")[0])
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
      setFilteredJobs(data);
    }
    setLoading(false);
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((job) => job.department === departmentFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((job) => job.employment_type === typeFilter);
    }

    if (modeFilter !== "all") {
      filtered = filtered.filter((job) => job.work_mode === modeFilter);
    }

    setFilteredJobs(filtered);
  };

  const departments = Array.from(new Set(jobs.map((j) => j.department)));
  const employmentTypes = Array.from(new Set(jobs.map((j) => j.employment_type)));
  const workModes = Array.from(new Set(jobs.map((j) => j.work_mode)));

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setApplicationOpen(true);
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

      <section className="pt-32 pb-20 relative">
        <FloatingLogo />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Build your career with innovative projects and a talented team
            </p>
          </div>

          {/* Search & Filters */}
          <Card className="glass-card p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg"
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg"
              >
                <option value="all">All Types</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg"
              >
                <option value="all">All Modes</option>
                {workModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card className="glass-card p-12 text-center">
                <p className="text-foreground/70 text-lg">No jobs found matching your criteria</p>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="glass-card p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                          {job.employment_type}
                        </span>
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                          {job.work_mode}
                        </span>
                        <span className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-muted rounded-full text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Apply by {new Date(job.last_date).toLocaleDateString()}
                        </span>
                      </div>
                      {job.salary_range && (
                        <p className="text-foreground/70 mb-3">Salary: {job.salary_range}</p>
                      )}
                      <p className="text-foreground/80 mb-4 text-sm md:text-base">{job.role_summary}</p>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 md:ml-4 w-full md:w-auto">
                      <Button onClick={() => handleApply(job)} className="flex-1 md:flex-none">Apply Now</Button>
                      <Button
                        variant="outline"
                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                        className="flex-1 md:flex-none"
                      >
                        {expandedJob === job.id ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            More
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <div className="mt-6 pt-6 border-t border-border space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Responsibilities</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          {job.responsibilities?.map((resp: string, i: number) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      {job.projects && (
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Projects You'll Work On</h4>
                          <p className="text-foreground/80">{job.projects}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Must-Have Qualifications</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          {job.required_qualifications?.map((qual: string, i: number) => (
                            <li key={i}>{qual}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Technical Skills</h4>
                          <ul className="list-disc list-inside space-y-2 text-foreground/80">
                            {job.required_technical_skills?.map((skill: string, i: number) => (
                              <li key={i}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Soft Skills</h4>
                          <ul className="list-disc list-inside space-y-2 text-foreground/80">
                            {job.required_soft_skills?.map((skill: string, i: number) => (
                              <li key={i}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Experience</h4>
                        <p className="text-foreground/80">{job.required_experience}</p>
                      </div>

                      {job.preferred_qualifications && job.preferred_qualifications.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Nice to Have</h4>
                          <ul className="list-disc list-inside space-y-2 text-foreground/80">
                            {job.preferred_qualifications.map((qual: string, i: number) => (
                              <li key={i}>{qual}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Perks & Benefits</h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          {job.perks_benefits?.map((perk: string, i: number) => (
                            <li key={i}>{perk}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4">
                        <Button size="lg" onClick={() => handleApply(job)} className="w-full md:w-auto">
                          Apply for this Position
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <JobApplicationModal
        open={applicationOpen}
        onClose={() => {
          setApplicationOpen(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />

      <Footer />
    </div>
  );
};

export default Careers;

// Resume Upload Form Component
function ResumeUploadForm() {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("name", name);
    formData.append("email", email);
    setStatus("Uploading...");
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Resume sent successfully!");
        setName("");
        setEmail("");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus(data.error || "Failed to send resume.");
      }
    } catch (err) {
      setStatus("Failed to send resume.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="block w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={e => setFile(e.target.files[0])}
        className="block w-full p-3 bg-background border border-border rounded-lg text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground hover:file:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <Button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
        Upload Resume
      </Button>
      {status && <div className="mt-2 text-sm text-foreground/80">{status}</div>}
    </form>
  );
}
