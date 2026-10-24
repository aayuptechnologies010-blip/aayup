import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Calendar,
  User,
  CheckCircle,
  PhoneCall,
  Trash2,
  Briefcase,
  Users,
  Target,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StudentApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college_university: string;
  degree: string;
  year_of_study: string;
  program_type: string;
  status: string;
  notes?: string;
  created_at: string;
}

const StudentEnquiryAdmin = () => {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(
    null
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("student_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("student_applications")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

      toast({
        title: "Status Updated",
        description: `Application marked as ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!applicationToDelete) return;

    try {
      const { error } = await supabase
        .from("student_applications")
        .delete()
        .eq("id", applicationToDelete);

      if (error) throw error;

      setApplications(
        applications.filter((app) => app.id !== applicationToDelete)
      );

      toast({
        title: "Success",
        description: "Application deleted successfully",
      });

      setIsDeleteDialogOpen(false);
      setApplicationToDelete(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    }
  };

  const getProgramIcon = (programType: string) => {
    switch (programType) {
      case "internship":
        return Briefcase;
      case "training":
        return BookOpen;
      case "workshop":
        return Users;
      case "mentorship":
        return Target;
      default:
        return GraduationCap;
    }
  };

  const getProgramColor = (programType: string) => {
    switch (programType) {
      case "internship":
        return "from-blue-500 to-cyan-500";
      case "training":
        return "from-purple-500 to-pink-500";
      case "workshop":
        return "from-orange-500 to-red-500";
      case "mentorship":
        return "from-green-500 to-teal-500";
      default:
        return "from-primary to-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600";
      case "reviewing":
        return "bg-blue-500/20 text-blue-600";
      case "called":
        return "bg-purple-500/20 text-purple-600";
      case "shortlisted":
        return "bg-green-500/20 text-green-600";
      case "accepted":
        return "bg-green-600/20 text-green-700";
      case "rejected":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Student Program Applications</h2>
        <div className="text-sm text-foreground/60 space-y-1">
          <div>Total: {applications.length}</div>
          <div>
            Pending:{" "}
            {applications.filter((a) => a.status === "pending").length}
          </div>
          <div>
            Reviewed:{" "}
            {applications.filter((a) => a.status === "reviewing").length}
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <GraduationCap className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <p className="text-foreground/60">No applications yet</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => {
            const ProgramIcon = getProgramIcon(application.program_type);
            const programColor = getProgramColor(application.program_type);

            return (
              <Card
                key={application.id}
                className="glass-card p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${programColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <ProgramIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold">{application.full_name}</h3>
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </span>
                          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {application.program_type.charAt(0).toUpperCase() +
                              application.program_type.slice(1)}
                          </span>
                        </div>

                        <div className="text-sm text-foreground/70">
                          Applied{" "}
                          {new Date(application.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setApplicationToDelete(application.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">Email</p>
                          <a
                            href={`mailto:${application.email}`}
                            className="text-sm hover:text-primary transition-colors"
                          >
                            {application.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">Phone</p>
                          <a
                            href={`tel:${application.phone}`}
                            className="text-sm hover:text-primary transition-colors"
                          >
                            {application.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">
                            College/University
                          </p>
                          <p className="text-sm font-medium">
                            {application.college_university}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">Degree/Course</p>
                          <p className="text-sm font-medium">{application.degree}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">Year of Study</p>
                          <p className="text-sm font-medium">
                            {application.year_of_study}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-foreground/60">Program Type</p>
                          <p className="text-sm font-medium capitalize">
                            {application.program_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {application.notes && (
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs text-foreground/60 mb-2">Admin Notes</p>
                      <p className="text-sm text-foreground/80 italic">
                        {application.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    <Button
                      variant={
                        application.status === "reviewing" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => updateStatus(application.id, "reviewing")}
                      className={
                        application.status === "reviewing" ? "" : ""
                      }
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {application.status === "reviewing"
                        ? "Reviewed"
                        : "Mark as Reviewed"}
                    </Button>

                    <Button
                      variant={application.status === "called" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(application.id, "called")}
                      className={
                        application.status === "called"
                          ? "bg-purple-600 hover:bg-purple-700"
                          : ""
                      }
                    >
                      <PhoneCall className="w-4 h-4 mr-2" />
                      {application.status === "called" ? "Called" : "Mark as Called"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply (Coming Soon)
                    </Button>

                    {application.status === "reviewing" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(application.id, "shortlisted")}
                          className="text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200"
                        >
                          Shortlist
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(application.id, "rejected")}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {application.status === "shortlisted" && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => updateStatus(application.id, "accepted")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentEnquiryAdmin;
