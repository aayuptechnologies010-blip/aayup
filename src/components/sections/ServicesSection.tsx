import { Code2, Smartphone, Palette, Database, Cloud, FileText, Lightbulb, MessageSquare, Info, GraduationCap, X, Briefcase, BookOpen, Users, Target, CheckCircle, Sparkles, TrendingUp, Award } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FloatingLogo } from "@/components/ui/floating-logo";

const ServicesSection = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love",
    },
    {
      icon: Cloud,
      title: "API Integration",
      description: "Seamless integration with third-party services and APIs",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Efficient database design and optimization",
    },
    {
      icon: Lightbulb,
      title: "Consulting",
      description: "Expert guidance for your digital transformation journey",
    },
    {
      icon: FileText,
      title: "Content Writing",
      description: "Engaging content that tells your brand story",
    },
    {
      icon: MessageSquare,
      title: "Communication Training",
      description: "Professional communication and leadership skills for students",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30 relative">
      <FloatingLogo />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* For Students Section */}
        <div className="mt-20 glass-card p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary px-4 py-2 rounded-full mb-4">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium">Build Your Future With Us</span>
            </div>
            <h3 className="text-4xl font-bold mb-3">
              Student <span className="gradient-text">Programs</span>
            </h3>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Kickstart your tech career with hands-on experience, expert mentorship, and real-world projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4" />
              <span>100% Practical</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm">
              <Award className="w-4 h-4" />
              <span>Industry Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Career Support</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-primary/5 to-transparent p-4 sm:p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Internship Program</h4>
              </div>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>3-6 months hands-on experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Work on live projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Performance-based stipend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Certificate & LOR</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-secondary/5 to-transparent p-4 sm:p-6 rounded-xl border border-secondary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Technical Training</h4>
              </div>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Industry-relevant curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Project-based learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Industry certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Placement assistance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-500/5 to-transparent p-4 sm:p-6 rounded-xl border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Workshops & Bootcamps</h4>
              </div>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Weekend & flexible batches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Interactive sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Build portfolio projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Networking opportunities</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/5 to-transparent p-4 sm:p-6 rounded-xl border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">Mentorship Program</h4>
              </div>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Personalized career guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Weekly mentoring sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Code review & feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Industry insights</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <StudentProgramButton />
          </div>
        </div>
      </div>
    </section>
  );
};

// Student Program Button with Enhanced Modal
function StudentProgramButton() {
  const [show, setShow] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    college_university: "",
    degree: "",
    year_of_study: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const programs = [
    { id: "internship", label: "Internship", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
    { id: "training", label: "Training", icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { id: "workshop", label: "Workshop", icon: Users, color: "from-orange-500 to-red-500" },
    { id: "mentorship", label: "Mentorship", icon: Target, color: "from-green-500 to-teal-500" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedProgram) {
      toast({
        title: "Select a program",
        description: "Please select a program type before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData = {
        ...formData,
        program_type: selectedProgram,
        status: 'pending',
      };

      // Save to Supabase
      const { error: dbError } = await supabase
        .from("student_applications")
        .insert(applicationData);

      if (dbError) throw dbError;

      // Send emails
      const emailResponse = await fetch(`${import.meta.env.VITE_API_URL}/send-student-application-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });

      if (!emailResponse.ok) {
        console.error('Email sending failed, but data saved');
      }

      toast({
        title: "🎉 Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        college_university: "",
        degree: "",
        year_of_study: "",
      });
      setSelectedProgram("");
      setShow(false);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all text-lg font-semibold flex items-center gap-2 hover:scale-105"
        onClick={() => setShow(true)}
      >
        <GraduationCap className="w-6 h-6" />
        Apply Now - Start Your Journey
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={() => setShow(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Student Programs</h3>
                  <p className="text-white/90">Build Your Future With Us</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  <span>100% Practical</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span>Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span>Career Support</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Program Selection */}
              <div>
                <label className="block text-lg font-bold mb-4">Select Your Program *</label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {programs.map((program) => {
                    const Icon = program.icon;
                    return (
                      <div
                        key={program.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                          selectedProgram === program.id
                            ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedProgram(program.id)}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${program.color} flex items-center justify-center mb-2`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="font-semibold">{program.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 98765 43210"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">College/University *</label>
                  <input
                    type="text"
                    value={formData.college_university}
                    onChange={(e) => setFormData({ ...formData, college_university: e.target.value })}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., MIT, IIT Delhi, Stanford"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Degree/Course *</label>
                    <input
                      type="text"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., B.Tech CSE, BCA, MCA"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Year of Study *</label>
                    <select
                      value={formData.year_of_study}
                      onChange={(e) => setFormData({ ...formData, year_of_study: e.target.value })}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Graduated">Graduated</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedProgram}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl hover:opacity-90 transition-opacity text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application 🚀"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ServiceCard with move effect on hover
function ServiceCard({ service, index }) {
  return (
    <div className="glass-card p-6 transition-transform duration-300 group cursor-pointer hover:-translate-y-2">
      <div className="w-14 h-14 mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
        <service.icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-foreground/70 text-sm">{service.description}</p>
    </div>
  );
}

export default ServicesSection;
