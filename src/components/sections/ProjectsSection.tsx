import { motion } from "framer-motion";
import { ExternalLink, Github, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FloatingLogo } from "@/components/ui/floating-logo";

const ProjectsSection = () => {
  const { toast } = useToast();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: "ecommerce",
      title: "E-commerce Website",
      description: "Modern online store with React & Node.js featuring real-time inventory management",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "bhoommetra",
      title: "Bhoommetra Project",
      description: "Agricultural land analysis system with AI-powered soil testing and crop recommendations",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop",
      tags: ["IoT", "AI", "Analytics"],
    },
    {
      id: "social-media-marketing",
      title: " social media marketing analyatics",
      description: "To Create marketing advertisments and content strategies for our enterprise by using social media anaalystics.the goal is to analyze performance data from various platforms identify what works best and optimize future campaignm with data-driven insights ",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      tags: ["figma", "Analytics", "Python"],
    },
    {
      id: "evm-systems",
      title: "EVM Systems",
      description: "Secure electronic voting system with blockchain technology for transparency",
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop",
      tags: ["Blockchain", "Security", "Web3"],
    },
    {
      id: "suspense-story",
      title: "Suspense Story Project",
      description: "Interactive story writing platform with AI-assisted content generation",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
      tags: ["AI", "Content", "React"],
    },
    {
      id: "ai-dev-tools",
      title: "AI Developer Tools",
      description: "Suite of AI-powered development tools for code generation and optimization",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      tags: ["AI", "DevTools", "Python"],
    },
  ];

  const handleShare = (e: React.MouseEvent, projectId: string, projectTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const projectUrl = `${window.location.origin}/projects/${projectId}`;
    
    // Try native Web Share API first (mobile-friendly)
    if (navigator.share) {
      navigator.share({
        title: projectTitle,
        text: `Check out this project: ${projectTitle}`,
        url: projectUrl,
      }).catch(() => {
        // Fallback to clipboard if share fails
        copyToClipboard(projectUrl, projectTitle);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(projectUrl, projectTitle);
    }
  };

  const copyToClipboard = (url: string, title: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: `${title} project link copied to clipboard`,
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    });
  };

  return (
    <section id="projects" className="py-20 bg-muted/30 relative">
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
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Innovative solutions delivered with excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <Link 
              to={`/projects/${project.id}`} 
              key={project.id} 
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group cursor-pointer hover:scale-105 transition-transform relative"
              >
                {/* Share Button - Appears on Hover */}
                <div className={`absolute top-4 right-4 z-10 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <button
                    onClick={(e) => handleShare(e, project.id, project.title)}
                    className="w-10 h-10 rounded-full bg-primary/90 hover:bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
                    title="Share project"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover for better share button visibility */}
                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
