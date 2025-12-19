import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FloatingLogo } from "@/components/ui/floating-logo";

const Blog = () => {
  const blogPosts = [
    {
      id: "ai-web-dev",
      title: "The Future of AI in Web Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build web applications and what it means for developers.",
      author: "Aayush Pandey",
      date: "2024-03-15",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      category: "AI & Technology",
    },
    {
      id: "mobile-best-practices",
      title: "Best Practices for Mobile App Development",
      excerpt: "Essential guidelines and strategies for creating high-performance mobile applications that users love.",
      author: "Sarthak Verma",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      category: "Mobile Development",
    },
    {
      id: "communication-skills-tech",
      title: "Communication Skills for Tech Professionals",
      excerpt: "Why soft skills matter in the tech industry and how to improve your communication abilities.",
      author: "Akanksha Pandey",
      date: "2024-03-05",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
      category: "Career Development",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-20 relative">
        <FloatingLogo />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
              Insights, tutorials, and updates from the Aayup Technologies team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden group hover:scale-105 transition-transform"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary px-3 py-1 rounded-full text-xs font-medium text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-foreground/60 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-foreground/70 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  
                  <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group/btn">
                    <Link to={`/blog/${post.id}`} className="flex items-center text-primary hover:underline">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
