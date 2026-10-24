import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

const JobViewModal: React.FC<{ open: boolean; onClose: () => void; job?: any }> = ({ open, onClose, job }) => {
  if (!open || !job) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-card rounded-xl shadow-lg my-4 sm:my-8">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border sticky top-0 bg-card rounded-t-xl">
          <h2 className="text-xl font-semibold">Job Details</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted/20">
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-2xl font-bold">{job.title}</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{job.department}</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">{job.employment_type}</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">{job.work_mode}</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">{job.location}</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">{job.seniority_level}</span>
            </div>
            {job.salary_range && (
              <p className="mt-2 text-foreground/70">Salary: {job.salary_range}</p>
            )}
            <p className="mt-1 text-sm text-foreground/70">Last Date: {new Date(job.last_date).toLocaleDateString()}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Role Summary</h4>
            <p className="text-foreground/80">{job.role_summary}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Responsibilities</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              {job.responsibilities?.map((resp: string, i: number) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>

          {job.projects && (
            <div>
              <h4 className="font-semibold mb-2">Projects/Products</h4>
              <p className="text-foreground/80">{job.projects}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Required Qualifications</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              {job.required_qualifications?.map((qual: string, i: number) => (
                <li key={i}>{qual}</li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Technical Skills</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {job.required_technical_skills?.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Soft Skills</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {job.required_soft_skills?.map((skill: string, i: number) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Experience Required</h4>
            <p className="text-foreground/80">{job.required_experience}</p>
          </div>

          {job.preferred_qualifications && job.preferred_qualifications.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Preferred Qualifications</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {job.preferred_qualifications.map((qual: string, i: number) => (
                  <li key={i}>{qual}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Perks & Benefits</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground/80">
              {job.perks_benefits?.map((perk: string, i: number) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default JobViewModal;
