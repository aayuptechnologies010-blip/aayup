import React from "react";
import ReactDOM from "react-dom";
import { X, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApplicationViewModal: React.FC<{ open: boolean; onClose: () => void; application?: any }> = ({
  open,
  onClose,
  application: app,
}) => {
  if (!open || !app) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-card rounded-xl shadow-lg my-4 sm:my-8">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border sticky top-0 bg-card rounded-t-xl">
          <h2 className="text-xl font-semibold">Application Details</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted/20">
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground/70">Full Name</p>
                <p className="font-medium">{app.full_name}</p>
              </div>
              <div>
                <p className="text-foreground/70">Email</p>
                <p className="font-medium">{app.email}</p>
              </div>
              <div>
                <p className="text-foreground/70">Phone</p>
                <p className="font-medium">{app.phone}</p>
              </div>
              <div>
                <p className="text-foreground/70">Location</p>
                <p className="font-medium">
                  {app.current_location}
                  {app.willing_to_relocate && " (Willing to relocate)"}
                </p>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Professional Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-foreground/70">Current Position</p>
                <p className="font-medium">{app.current_job_title}</p>
              </div>
              <div>
                <p className="text-foreground/70">Total Experience</p>
                <p className="font-medium">{app.total_experience}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-foreground/70 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {app.relevant_skills?.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {app.linkedin_url && (
              <div className="mt-4">
                <p className="text-foreground/70">LinkedIn</p>
                <a
                  href={app.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {app.linkedin_url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            {app.portfolio_url && (
              <div className="mt-4">
                <p className="text-foreground/70">Portfolio</p>
                <a
                  href={app.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {app.portfolio_url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Documents</h3>
            <div className="space-y-2">
              <a
                href={app.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
            {app.cover_letter && (
              <div className="mt-4">
                <p className="text-foreground/70 mb-2">Cover Letter</p>
                <div className="p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap">
                  {app.cover_letter}
                </div>
              </div>
            )}
            {app.project_links && app.project_links.length > 0 && (
              <div className="mt-4">
                <p className="text-foreground/70 mb-2">Project Links</p>
                <div className="space-y-1">
                  {app.project_links.map((link: string, i: number) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:underline text-sm flex items-center gap-1"
                    >
                      {link}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-foreground/70">Degree</p>
                <p className="font-medium">{app.highest_degree}</p>
              </div>
              <div>
                <p className="text-foreground/70">University</p>
                <p className="font-medium">{app.university}</p>
              </div>
              <div>
                <p className="text-foreground/70">Graduation Year</p>
                <p className="font-medium">{app.graduation_year}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(app.how_did_you_hear || app.additional_info) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
              {app.how_did_you_hear && (
                <div className="mb-3">
                  <p className="text-foreground/70">How they heard about us</p>
                  <p className="text-sm">{app.how_did_you_hear}</p>
                </div>
              )}
              {app.additional_info && (
                <div>
                  <p className="text-foreground/70 mb-2">Additional Comments</p>
                  <div className="p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap">
                    {app.additional_info}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Application Info */}
          <div className="pt-4 border-t text-sm text-foreground/70">
            <p>Applied on {new Date(app.created_at).toLocaleString()}</p>
            <p className="mt-1">
              Status:{" "}
              <span
                className={`font-medium ${
                  app.status === "pending"
                    ? "text-yellow-600"
                    : app.status === "shortlisted"
                    ? "text-green-600"
                    : app.status === "rejected"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {app.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ApplicationViewModal;
