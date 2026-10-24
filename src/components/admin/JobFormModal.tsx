import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const JobFormModal: React.FC<{ open: boolean; onClose: () => void; job?: any; onSuccess: () => void }> = ({ 
  open, 
  onClose, 
  job,
  onSuccess 
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    employment_type: "Full-time",
    work_mode: "Hybrid",
    location: "",
    seniority_level: "Mid-level",
    salary_range: "",
    last_date: "",
    role_summary: "",
    responsibilities: [""],
    projects: "",
    required_qualifications: [""],
    required_technical_skills: [""],
    required_soft_skills: [""],
    required_experience: "",
    preferred_qualifications: [""],
    perks_benefits: [""],
    is_active: true,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        last_date: job.last_date?.split('T')[0] || "",
      });
    }
  }, [job]);

  if (!open) return null;

  const handleArrayInput = (field: string, index: number, value: string) => {
    const newArray = [...(formData as any)[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: string) => {
    setFormData({ ...formData, [field]: [...(formData as any)[field], ""] });
  };

  const removeArrayField = (field: string, index: number) => {
    const newArray = (formData as any)[field].filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        required_qualifications: formData.required_qualifications.filter(q => q.trim()),
        required_technical_skills: formData.required_technical_skills.filter(s => s.trim()),
        required_soft_skills: formData.required_soft_skills.filter(s => s.trim()),
        preferred_qualifications: formData.preferred_qualifications.filter(q => q.trim()),
        perks_benefits: formData.perks_benefits.filter(p => p.trim()),
      };

      if (job) {
        const { error } = await supabase
          .from("jobs")
          .update(cleanedData)
          .eq("id", job.id);
        
        if (error) throw error;
        
        toast({ title: "Success", description: "Job updated successfully" });
      } else {
        const { error } = await supabase
          .from("jobs")
          .insert([cleanedData]);
        
        if (error) throw error;
        
        toast({ title: "Success", description: "Job created successfully" });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-card rounded-xl shadow-lg my-4 sm:my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card rounded-t-xl">
          <h2 className="text-xl font-semibold">{job ? "Edit Job" : "Add New Job"}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted/20">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title *</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department *</label>
              <input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Employment Type *</label>
              <select
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="w-full p-2 bg-background border border-border rounded"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Mode *</label>
              <select
                value={formData.work_mode}
                onChange={(e) => setFormData({ ...formData, work_mode: e.target.value })}
                className="w-full p-2 bg-background border border-border rounded"
              >
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Seniority Level *</label>
              <select
                value={formData.seniority_level}
                onChange={(e) => setFormData({ ...formData, seniority_level: e.target.value })}
                className="w-full p-2 bg-background border border-border rounded"
              >
                <option>Intern</option>
                <option>Junior</option>
                <option>Mid-level</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="e.g., Mumbai, India"
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <input
                value={formData.salary_range}
                onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                placeholder="e.g., $50k - $70k"
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Date *</label>
              <input
                type="date"
                value={formData.last_date}
                onChange={(e) => setFormData({ ...formData, last_date: e.target.value })}
                required
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
          </div>

          {/* Role Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Role Summary *</label>
            <textarea
              value={formData.role_summary}
              onChange={(e) => setFormData({ ...formData, role_summary: e.target.value })}
              required
              rows={3}
              className="w-full p-2 bg-background border border-border rounded"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium mb-1">Responsibilities *</label>
            {formData.responsibilities.map((resp, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={resp}
                  onChange={(e) => handleArrayInput("responsibilities", i, e.target.value)}
                  className="flex-1 p-2 bg-background border border-border rounded"
                />
                {formData.responsibilities.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("responsibilities", i)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("responsibilities")}>
              Add Responsibility
            </Button>
          </div>

          {/* Projects */}
          <div>
            <label className="block text-sm font-medium mb-1">Projects/Products</label>
            <textarea
              value={formData.projects}
              onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
              rows={2}
              className="w-full p-2 bg-background border border-border rounded"
            />
          </div>

          {/* Required Qualifications */}
          <div>
            <label className="block text-sm font-medium mb-1">Required Qualifications *</label>
            {formData.required_qualifications.map((qual, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={qual}
                  onChange={(e) => handleArrayInput("required_qualifications", i, e.target.value)}
                  className="flex-1 p-2 bg-background border border-border rounded"
                />
                {formData.required_qualifications.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("required_qualifications", i)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("required_qualifications")}>
              Add Qualification
            </Button>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Required Technical Skills *</label>
              {formData.required_technical_skills.map((skill, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={skill}
                    onChange={(e) => handleArrayInput("required_technical_skills", i, e.target.value)}
                    className="flex-1 p-2 bg-background border border-border rounded"
                  />
                  {formData.required_technical_skills.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("required_technical_skills", i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("required_technical_skills")}>
                Add Skill
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Required Soft Skills *</label>
              {formData.required_soft_skills.map((skill, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={skill}
                    onChange={(e) => handleArrayInput("required_soft_skills", i, e.target.value)}
                    className="flex-1 p-2 bg-background border border-border rounded"
                  />
                  {formData.required_soft_skills.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("required_soft_skills", i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("required_soft_skills")}>
                Add Skill
              </Button>
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-1">Required Experience *</label>
            <input
              value={formData.required_experience}
              onChange={(e) => setFormData({ ...formData, required_experience: e.target.value })}
              required
              placeholder="e.g., 2-3 years"
              className="w-full p-2 bg-background border border-border rounded"
            />
          </div>

          {/* Preferred Qualifications */}
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Qualifications (Optional)</label>
            {formData.preferred_qualifications.map((qual, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={qual}
                  onChange={(e) => handleArrayInput("preferred_qualifications", i, e.target.value)}
                  className="flex-1 p-2 bg-background border border-border rounded"
                />
                <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("preferred_qualifications", i)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("preferred_qualifications")}>
              Add Preferred Qualification
            </Button>
          </div>

          {/* Perks & Benefits */}
          <div>
            <label className="block text-sm font-medium mb-1">Perks & Benefits *</label>
            {formData.perks_benefits.map((perk, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={perk}
                  onChange={(e) => handleArrayInput("perks_benefits", i, e.target.value)}
                  className="flex-1 p-2 bg-background border border-border rounded"
                />
                {formData.perks_benefits.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeArrayField("perks_benefits", i)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("perks_benefits")}>
              Add Benefit
            </Button>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Job is active</label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : job ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default JobFormModal;
