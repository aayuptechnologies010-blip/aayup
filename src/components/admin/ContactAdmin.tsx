import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Mail,
  User,
  MessageSquare,
  Calendar,
  Phone,
  Building,
  CheckCircle,
  Eye,
  Trash2,
  HelpCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
}

interface EnquirySubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  project_description: string;
  status: string;
  notes?: string;
  created_at: string;
}

const ContactAdmin = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'enquiry'>('contact');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'contact' | 'enquiry' } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contactsResult, enquiriesResult] = await Promise.all([
        supabase
          .from("contact")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("enquiry")
          .select("*")
          .order("created_at", { ascending: false })
      ]);

      if (contactsResult.error) throw contactsResult.error;
      if (enquiriesResult.error) throw enquiriesResult.error;

      setContacts(contactsResult.data || []);
      setEnquiries(enquiriesResult.data || []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("contact")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setContacts(contacts.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      ));

      toast({
        title: "Status Updated",
        description: `Contact marked as ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const updateEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("enquiry")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setEnquiries(enquiries.map(e => 
        e.id === id ? { ...e, status: newStatus } : e
      ));

      toast({
        title: "Status Updated",
        description: `Enquiry marked as ${newStatus}`,
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
    if (!itemToDelete) return;

    try {
      const { error } = await supabase
        .from(itemToDelete.type)
        .delete()
        .eq("id", itemToDelete.id);

      if (error) throw error;

      if (itemToDelete.type === 'contact') {
        setContacts(contacts.filter(c => c.id !== itemToDelete.id));
      } else {
        setEnquiries(enquiries.filter(e => e.id !== itemToDelete.id));
      }

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-600';
      case 'in_progress': 
      case 'reviewing': return 'bg-yellow-500/20 text-yellow-600';
      case 'resolved': 
      case 'quoted': return 'bg-green-500/20 text-green-600';
      case 'closed': return 'bg-gray-500/20 text-gray-600';
      default: return 'bg-gray-500/20 text-gray-600';
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
        <h2 className="text-xl sm:text-2xl font-bold">Contact & Enquiries Management</h2>
        <div className="text-sm text-foreground/60 space-y-1">
          <div>Total Contacts: {contacts.length}</div>
          <div>Total Enquiries: {enquiries.length}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-muted/50 p-1 rounded-lg w-full sm:max-w-md">
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            activeTab === 'contact'
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Mail className="w-4 h-4" />
          Contacts ({contacts.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiry')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
            activeTab === 'enquiry'
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Queries ({enquiries.length})
        </button>
      </div>

      {/* Contact Messages Tab */}
      {activeTab === 'contact' && (
        <div className="grid gap-4">
          {contacts.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <p className="text-foreground/60">No contact messages yet</p>
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card key={contact.id} className="glass-card p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-base sm:text-lg">{contact.name}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="hover:text-primary">
                            {contact.email}
                          </a>
                        </div>

                        {contact.phone && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${contact.phone}`} className="hover:text-primary">
                              {contact.phone}
                            </a>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-foreground/60 text-xs">
                          <Calendar className="w-4 h-4" />
                          {new Date(contact.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setItemToDelete({ id: contact.id, type: 'contact' });
                        setIsDeleteDialogOpen(true);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{contact.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {contact.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'in_progress')}
                        className="bg-yellow-500/10 hover:bg-yellow-500/20"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Mark as Reviewed
                      </Button>
                    )}

                    {contact.status === 'in_progress' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'resolved')}
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as Solved
                      </Button>
                    )}

                    {contact.status === 'resolved' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateContactStatus(contact.id, 'closed')}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Service Queries Tab */}
      {activeTab === 'enquiry' && (
        <div className="grid gap-4">
          {enquiries.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <p className="text-foreground/60">No service enquiries yet</p>
            </Card>
          ) : (
            enquiries.map((enquiry) => (
              <Card key={enquiry.id} className="glass-card p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-semibold text-lg">{enquiry.name}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {enquiry.service_type}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${enquiry.email}`} className="hover:text-primary">
                            {enquiry.email}
                          </a>
                        </div>

                        {enquiry.phone && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${enquiry.phone}`} className="hover:text-primary">
                              {enquiry.phone}
                            </a>
                          </div>
                        )}

                        {enquiry.company && (
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Building className="w-4 h-4" />
                            <span>{enquiry.company}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-foreground/60 text-xs">
                          <Calendar className="w-4 h-4" />
                          {new Date(enquiry.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setItemToDelete({ id: enquiry.id, type: 'enquiry' });
                        setIsDeleteDialogOpen(true);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{enquiry.project_description}</p>
                    </div>
                  </div>

                  {enquiry.notes && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Admin Notes:</p>
                      <p className="text-sm text-foreground/80 italic">{enquiry.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {enquiry.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateEnquiryStatus(enquiry.id, 'reviewing')}
                        className="bg-yellow-500/10 hover:bg-yellow-500/20"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Mark as Reviewed
                      </Button>
                    )}

                    {enquiry.status === 'reviewing' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateEnquiryStatus(enquiry.id, 'quoted')}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
                        >
                          Mark as Quoted
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateEnquiryStatus(enquiry.id, 'accepted')}
                          className="bg-green-500/10 hover:bg-green-500/20 text-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark as Solved
                        </Button>
                      </>
                    )}

                    {(enquiry.status === 'quoted' || enquiry.status === 'accepted') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateEnquiryStatus(enquiry.id, 'closed')}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this submission? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactAdmin;
