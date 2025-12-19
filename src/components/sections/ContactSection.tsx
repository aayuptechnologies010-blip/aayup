import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Instagram, Linkedin, Phone, MapPin, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FloatingLogo } from "@/components/ui/floating-logo";

const ContactSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'contact' | 'query'>('contact');
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [queryFormData, setQueryFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error: dbError } = await supabase
        .from("contact")
        .insert({
          name: contactFormData.name,
          email: contactFormData.email,
          phone: contactFormData.phone || null,
          message: contactFormData.message,
          status: 'new',
        });

      if (dbError) throw dbError;

      // Try to send emails (non-blocking)
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          await fetch(`${apiUrl}/send-contact-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactFormData)
          });
        } else {
          console.warn('VITE_API_URL not configured - emails will not be sent');
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue anyway - data is saved
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setContactFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error: dbError } = await supabase
        .from("enquiry")
        .insert({
          name: queryFormData.name,
          email: queryFormData.email,
          phone: queryFormData.phone || null,
          company: queryFormData.company || null,
          service_type: queryFormData.subject,
          project_description: queryFormData.query,
          status: 'new',
        });

      if (dbError) throw dbError;

      // Try to send emails (non-blocking)
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          await fetch(`${apiUrl}/send-enquiry-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queryFormData)
          });
        } else {
          console.warn('VITE_API_URL not configured - emails will not be sent');
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue anyway - data is saved
      }

      toast({
        title: "Query Submitted!",
        description: "We've received your query and will respond within 24-48 hours.",
      });

      setQueryFormData({ name: "", email: "", phone: "", company: "", subject: "", query: "" });
    } catch (error: any) {
      console.error("Error submitting query form:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background relative">
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Let's discuss how we can help transform your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">Let's Talk</h3>
                <p className="text-foreground/70">We're here to help and answer any question you might have</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <a href="mailto:aayup.technologies.010@gmail.com" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                      aayup.technologies.010@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp</h4>
                    <a href="https://wa.me/917030839883" className="text-foreground/70 hover:text-primary transition-colors text-sm" target="_blank" rel="noopener noreferrer">
                      Chat with us instantly
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-foreground/70 text-sm">
                      Mumbai, Maharastra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Working Hours</h4>
                    <p className="text-foreground/70 text-sm">
                      Mon - Sat: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/in/aayup-technology-a030a5372" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/20 hover:bg-primary rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                  >
                    <Linkedin className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://www.instagram.com/aayup.technologies" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary/20 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                  >
                    <Instagram className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Forms with Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 md:p-8">
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    activeTab === 'contact'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </button>
                <button
                  onClick={() => setActiveTab('query')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    activeTab === 'query'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  Send Query
                </button>
              </div>

              {/* Contact Form */}
              {activeTab === 'contact' && (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                    <p className="text-sm text-foreground/60">Fill out the form and we'll be in touch soon</p>
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 7030839883"
                        value={contactFormData.phone}
                        onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      value={contactFormData.message}
                      onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white py-6 text-lg font-semibold shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}

              {/* Query Form */}
              {activeTab === 'query' && (
                <form onSubmit={handleQuerySubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Have a Question?</h3>
                    <p className="text-sm text-foreground/60">Ask us anything about our services</p>
                  </div>

                  <div>
                    <label htmlFor="query-name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="query-name"
                      type="text"
                      placeholder="John Doe"
                      value={queryFormData.name}
                      onChange={(e) => setQueryFormData({ ...queryFormData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="query-email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="query-email"
                        type="email"
                        placeholder="john@example.com"
                        value={queryFormData.email}
                        onChange={(e) => setQueryFormData({ ...queryFormData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="query-phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="query-phone"
                        type="tel"
                        placeholder="+91 7030839883"
                        value={queryFormData.phone}
                        onChange={(e) => setQueryFormData({ ...queryFormData, phone: e.target.value })}
                        disabled={isSubmitting}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="query-company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      id="query-company"
                      type="text"
                      placeholder="Your Company"
                      value={queryFormData.company}
                      onChange={(e) => setQueryFormData({ ...queryFormData, company: e.target.value })}
                      disabled={isSubmitting}
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="query-subject" className="block text-sm font-medium mb-2">
                      Service Interest *
                    </label>
                    <select
                      id="query-subject"
                      value={queryFormData.subject}
                      onChange={(e) => setQueryFormData({ ...queryFormData, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="w-full p-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Student Programs">Student Programs</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="query-message" className="block text-sm font-medium mb-2">
                      Your Query *
                    </label>
                    <Textarea
                      id="query-message"
                      placeholder="Describe your query in detail..."
                      rows={5}
                      value={queryFormData.query}
                      onChange={(e) => setQueryFormData({ ...queryFormData, query: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white py-6 text-lg font-semibold shadow-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Query"}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
