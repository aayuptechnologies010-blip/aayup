import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const JobApplicationModal: React.FC<{ open: boolean; onClose: () => void; job?: any }> = ({
  open,
  onClose,
  job,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_location: "",
    willing_to_relocate: false,
    current_job_title: "",
    total_experience: "",
    relevant_skills: "",
    linkedin_url: "",
    portfolio_url: "",
    cover_letter: "",
    project_links: "",
    highest_degree: "",
    university: "",
    graduation_year: "",
    how_did_you_hear: "",
    additional_info: "",
    terms_agreed: false,
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  if (!open || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.terms_agreed) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and privacy policy",
        variant: "destructive",
      });
      return;
    }

    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload resume to Supabase Storage
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("applications")
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("applications")
        .getPublicUrl(filePath);

      // Parse skills and project links
      const skillsArray = formData.relevant_skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const projectLinksArray = formData.project_links
        ? formData.project_links
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => s)
        : [];

      const applicationData = {
        job_id: job.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        current_location: formData.current_location,
        willing_to_relocate: formData.willing_to_relocate,
        current_job_title: formData.current_job_title,
        total_experience: formData.total_experience,
        relevant_skills: skillsArray,
        linkedin_url: formData.linkedin_url || null,
        portfolio_url: formData.portfolio_url || null,
        resume_url: publicUrl,
        cover_letter: formData.cover_letter || null,
        project_links: projectLinksArray,
        highest_degree: formData.highest_degree,
        university: formData.university,
        graduation_year: formData.graduation_year,
        how_did_you_hear: formData.how_did_you_hear || null,
        additional_info: formData.additional_info || null,
        status: "pending",
      };

      // Insert application
      const { error: insertError } = await supabase.from("applications").insert([applicationData]);

      if (insertError) throw insertError;

      // Send emails with resume
      const emailFormData = new FormData();
      emailFormData.append('resume', resumeFile);
      emailFormData.append('data', JSON.stringify({
        ...applicationData,
        job_title: job.title,
        relevant_skills: formData.relevant_skills
      }));

      const emailResponse = await fetch(`${import.meta.env.VITE_API_URL}/send-job-application-email`, {
        method: 'POST',
        body: emailFormData
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed, but application saved');
      }

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      onClose();
    } catch (error: any) {
      console.error("Application error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-card rounded-xl shadow-lg my-4 sm:my-8">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border sticky top-0 bg-card rounded-t-xl z-10">
          <div>
            <h2 className="text-xl font-semibold">Apply for {job.title}</h2>
            <p className="text-sm text-foreground/70 mt-1">{job.department} • {job.location}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted/20">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Location *</label>
                <input
                  value={formData.current_location}
                  onChange={(e) => setFormData({ ...formData, current_location: e.target.value })}
                  required
                  placeholder="City, Country"
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.willing_to_relocate}
                onChange={(e) => setFormData({ ...formData, willing_to_relocate: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm">Willing to relocate</label>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Professional Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Job Title / Student Status *</label>
                <input
                  value={formData.current_job_title}
                  onChange={(e) => setFormData({ ...formData, current_job_title: e.target.value })}
                  required
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Experience *</label>
                <input
                  value={formData.total_experience}
                  onChange={(e) => setFormData({ ...formData, total_experience: e.target.value })}
                  required
                  placeholder="e.g., 2 years 3 months"
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Relevant Skills *</label>
              <input
                value={formData.relevant_skills}
                onChange={(e) => setFormData({ ...formData, relevant_skills: e.target.value })}
                required
                placeholder="Comma-separated (e.g., React, Node.js, Python)"
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Portfolio / GitHub</label>
                <input
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
            </div>
          </div>

          {/* Resume & Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resume & Documents</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Resume (PDF) *</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  required
                  className="w-full p-2 bg-background border border-border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground"
                />
              </div>
              {resumeFile && (
                <p className="text-sm text-foreground/70 mt-1">Selected: {resumeFile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cover Letter (Optional)</label>
              <textarea
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                rows={4}
                placeholder="Tell us why you're interested in this position..."
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Project Links (Optional)</label>
              <textarea
                value={formData.project_links}
                onChange={(e) => setFormData({ ...formData, project_links: e.target.value })}
                rows={3}
                placeholder="One URL per line"
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Education</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Highest Degree *</label>
                <input
                  value={formData.highest_degree}
                  onChange={(e) => setFormData({ ...formData, highest_degree: e.target.value })}
                  required
                  placeholder="e.g., Bachelor's"
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">University *</label>
                <input
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Graduation Year *</label>
                <input
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                  required
                  placeholder="2020"
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div>
              <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
              <input
                value={formData.how_did_you_hear}
                onChange={(e) => setFormData({ ...formData, how_did_you_hear: e.target.value })}
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Anything else you'd like to share?</label>
              <textarea
                value={formData.additional_info}
                onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                rows={3}
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={formData.terms_agreed}
                onChange={(e) => setFormData({ ...formData, terms_agreed: e.target.checked })}
                className="w-4 h-4 mt-1"
                required
              />
              <label className="text-sm">
                I agree to the terms and privacy policy. I consent to the processing of my personal data for recruitment purposes.
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-card pb-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default JobApplicationModal;
