import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, User, Star, Calendar, CheckCircle, XCircle, Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  position: string;
  company?: string;
  avatar_url?: string;
  testimonial: string;
  rating: number;
  approved: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

const TestimonalAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ 
          approved: !currentStatus,
          is_active: !currentStatus // Also set active when approving
        })
        .eq("id", id);

      if (error) throw error;

      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, approved: !currentStatus, is_active: !currentStatus } : t
      ));

      toast({
        title: "Success",
        description: `Testimonial ${!currentStatus ? "approved" : "unapproved"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ is_featured: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, is_featured: !currentStatus } : t
      ));

      toast({
        title: "Success",
        description: `Testimonial ${!currentStatus ? "featured" : "unfeatured"}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingTestimonial) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: editingTestimonial.name,
          email: editingTestimonial.email,
          position: editingTestimonial.position,
          company: editingTestimonial.company,
          testimonial: editingTestimonial.testimonial,
          rating: editingTestimonial.rating,
        })
        .eq("id", editingTestimonial.id);

      if (error) throw error;

      setTestimonials(testimonials.map(t => 
        t.id === editingTestimonial.id ? editingTestimonial : t
      ));

      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });

      setIsEditDialogOpen(false);
      setEditingTestimonial(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", testimonialToDelete);

      if (error) throw error;

      setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete));

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });

      setIsDeleteDialogOpen(false);
      setTestimonialToDelete(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
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
        <h2 className="text-xl sm:text-2xl font-bold">Testimonials Management</h2>
        <div className="text-sm text-foreground/60 space-y-1">
          <div>Total: {testimonials.length}</div>
          <div>Approved: {testimonials.filter(f => f.approved).length}</div>
          <div>Featured: {testimonials.filter(f => f.is_featured).length}</div>
        </div>
      </div>

      {testimonials.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <p className="text-foreground/60">No testimonials yet</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="glass-card p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    {testimonial.avatar_url ? (
                      <img 
                        src={testimonial.avatar_url} 
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                    )}
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="font-semibold text-base sm:text-lg">{testimonial.name}</span>
                        {testimonial.approved && (
                          <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </span>
                        )}
                        {testimonial.is_featured && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-foreground/70 space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{testimonial.position}</span>
                          {testimonial.company && <span>• {testimonial.company}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${testimonial.email}`} className="hover:text-primary">
                            {testimonial.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? "fill-primary text-primary" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-foreground/60">
                          {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                      className="hover:bg-primary/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTestimonialToDelete(testimonial.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm text-foreground/80 italic">"{testimonial.testimonial}"</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant={testimonial.approved ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleApproval(testimonial.id, testimonial.approved)}
                    className={testimonial.approved ? "" : "bg-green-600 hover:bg-green-700"}
                  >
                    {testimonial.approved ? (
                      <>
                        <XCircle className="w-4 h-4 mr-1" />
                        Unapprove
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(testimonial.id, testimonial.is_featured)}
                    className={testimonial.is_featured ? "bg-yellow-500/10" : ""}
                  >
                    <Star className={`w-4 h-4 mr-1 ${testimonial.is_featured ? 'fill-current' : ''}`} />
                    {testimonial.is_featured ? "Unfeature" : "Feature"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>Make changes to the testimonial details</DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingTestimonial.email}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={editingTestimonial.position}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, position: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={editingTestimonial.company || ""}
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingTestimonial({...editingTestimonial, rating: star})}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= editingTestimonial.rating ? "fill-primary text-primary" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial">Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={editingTestimonial.testimonial}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, testimonial: e.target.value})}
                  rows={5}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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

export default TestimonalAdmin;
