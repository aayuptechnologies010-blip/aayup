import { motion } from "framer-motion";
import { Star, Quote, Upload, X, User, CheckCircle, Award, Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { optimizeSupabaseImage } from "@/lib/utils";
import { FloatingLogo } from "@/components/ui/floating-logo";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company?: string;
  avatar_url?: string;
  testimonial: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedTestimonials();
  }, []);

  const fetchApprovedTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, position, company, avatar_url, testimonial, rating")
        .eq("approved", true)
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Split testimonials into two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, midPoint);
  const row2 = testimonials.slice(midPoint);

  // Duplicate testimonials for infinite scroll effect
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="clients" className="py-20 overflow-hidden relative">
      <FloatingLogo />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            What our clients say about us
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-foreground/60">
            <p>No testimonials available yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Row 1 - Scroll Left to Right */}
            <div className="testimonial-scroll-container group">
              <div className="testimonial-scroll testimonial-scroll-ltr">
                {duplicatedRow1.map((testimonial, index) => (
                  <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Row 2 - Scroll Right to Left */}
            {row2.length > 0 && (
              <div className="testimonial-scroll-container group">
                <div className="testimonial-scroll testimonial-scroll-rtl">
                  {duplicatedRow2.map((testimonial, index) => (
                    <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Feedback Section - Redesigned with Split Layout */}
      <div className="container mx-auto px-4 mt-20">
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Engaging Content */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">Share Your Experience</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">
                  Your Feedback <span className="gradient-text">Matters!</span>
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  We value your opinion and would love to hear about your experience working with us. 
                  Your feedback helps us improve and serve you better.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Quick & Easy</h4>
                    <p className="text-foreground/70 text-sm">
                      Takes less than 2 minutes to share your thoughts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Build Trust</h4>
                    <p className="text-foreground/70 text-sm">
                      Help others make informed decisions by sharing your experience
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Get Featured</h4>
                    <p className="text-foreground/70 text-sm">
                      Selected testimonials will be featured on our website
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-foreground/60 italic">
                  "We review all feedback within 24-48 hours and personally respond to each submission."
                </p>
                <p className="text-sm text-primary font-semibold mt-2">
                  — Aayup Technologies Team
                </p>
              </div>
            </div>

            {/* Right Side - Feedback Form */}
            <div>
              <QueriesForm onSubmitSuccess={fetchApprovedTestimonials} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component with optimized images
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Optimize for 56x56 display size
  const optimizedAvatarUrl = optimizeSupabaseImage(testimonial.avatar_url, 112, 85);
  
  return (
    <Card className="glass-card p-4 sm:p-6 min-w-[280px] sm:min-w-[350px] max-w-[280px] sm:max-w-[350px] mx-2 sm:mx-3 hover:scale-105 transition-transform will-change-transform">
      <div className="flex items-center mb-3 sm:mb-4">
        {optimizedAvatarUrl ? (
          <img
            src={optimizedAvatarUrl}
            alt={testimonial.name}
            loading="lazy"
            width="48"
            height="48"
            decoding="async"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 object-cover border-2 border-primary/20"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm sm:text-base truncate">{testimonial.name}</h4>
          <p className="text-xs sm:text-sm text-foreground/60 truncate">
            {testimonial.position}
            {testimonial.company && ` • ${testimonial.company}`}
          </p>
        </div>
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/30 flex-shrink-0" />
      </div>
      <div className="flex mb-2 sm:mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed line-clamp-4">
        "{testimonial.testimonial}"
      </p>
    </Card>
  );
};

// Queries Form Component with improved styling
function QueriesForm({ onSubmitSuccess }: { onSubmitSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, GIF)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB",
          variant: "destructive",
        });
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile) return null;

    setUploading(true);
    try {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `avtar/${fileName}`;

      const { data, error } = await supabase.storage
        .from('Aayup')
        .upload(filePath, avatarFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('Aayup')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let avatarUrl = "";

      // Upload avatar if selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar();
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        avatarUrl = uploadedUrl;
      }

      const testimonialData = {
        name: name,
        email: email,
        position: role || "Customer",
        testimonial: query,
        rating: rating,
        avatar_url: avatarUrl || null,
        approved: false,
        is_active: false,
      };

      // Save to Supabase
      const { error: dbError } = await supabase
        .from("testimonials")
        .insert(testimonialData);

      if (dbError) throw dbError;

      // Send emails with avatar
      const emailFormData = new FormData();
      if (avatarFile) {
        emailFormData.append('avatar', avatarFile);
      }
      emailFormData.append('data', JSON.stringify(testimonialData));

      const emailResponse = await fetch(`${import.meta.env.VITE_API_URL}/send-testimonial-email`, {
        method: 'POST',
        body: emailFormData
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed, but testimonial saved');
      }

      toast({
        title: "Feedback submitted successfully!",
        description: "Thank you for your feedback. We'll review it soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setRole("");
      setQuery("");
      setRating(5);
      removeAvatar();
      
      // Refresh testimonials if callback provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-muted/30 p-6 rounded-xl border border-border/50">
      <div className="text-center mb-6">
        <h4 className="text-2xl font-bold mb-2">Submit Your Feedback</h4>
        <p className="text-sm text-foreground/60">We'd love to hear from you!</p>
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Profile Picture (Optional)</label>
        <div className="flex items-center gap-4">
          {avatarPreview ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
              <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute top-0 right-0 bg-destructive text-white p-1 rounded-full hover:bg-destructive/90 transition-colors"
                disabled={isSubmitting || uploading}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary/30">
              <User className="w-8 h-8 text-primary" />
            </div>
          )}
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={uploading || isSubmitting}
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <Upload className="w-4 h-4" />
              <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
            </div>
          </label>
        </div>
        <p className="text-xs text-foreground/50 mt-1">Max 2MB • JPG, PNG, GIF</p>
      </div>

      <input
        type="text"
        placeholder="Your Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
        disabled={isSubmitting}
      />

      <input
        type="email"
        placeholder="Your Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
        disabled={isSubmitting}
      />

      <input
        type="text"
        placeholder="Your Role (e.g., CEO, Developer) *"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="block w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        required
        disabled={isSubmitting}
      />
      
      {/* Rating selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Rate Your Experience *</label>
        <div className="flex gap-2 justify-center p-3 bg-background rounded-lg border border-border">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-125"
              disabled={isSubmitting}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= rating ? "fill-primary text-primary" : "text-gray-300 hover:text-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Share your experience with us... *"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
        rows={5}
        required
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 rounded-lg hover:opacity-90 transition-all text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </span>
        ) : uploading ? (
          <span className="flex items-center justify-center gap-2">
            <Upload className="w-5 h-5 animate-pulse" />
            Uploading...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Submit Feedback
            <Sparkles className="w-5 h-5" />
          </span>
        )}
      </button>

      <p className="text-xs text-center text-foreground/50">
        By submitting, you agree to our review and publication policy
      </p>
    </form>
  );
}

export default TestimonialsSection;
