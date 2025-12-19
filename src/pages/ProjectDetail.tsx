import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Check, 
  Code, 
  Layers, 
  Target, 
  TrendingUp,
  Calendar,
  Users,
  Award,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FloatingLogo } from "@/components/ui/floating-logo";

const projects = [
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    shortDescription: "Modern online store with React & Node.js featuring real-time inventory management.",
    fullDescription: "A comprehensive e-commerce solution built with cutting-edge technologies to provide seamless shopping experiences. The platform features advanced product management, secure payment processing, real-time inventory tracking, and intelligent recommendation systems. Built with scalability in mind, it handles thousands of concurrent users while maintaining optimal performance.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    ],
    features: [
      "User authentication with JWT & OAuth2.0",
      "Real-time inventory management system",
      "Secure payment gateway integration (Stripe, PayPal)",
      "Advanced product search & filtering",
      "AI-powered product recommendations",
      "Order tracking & notifications",
      "Admin dashboard for analytics",
      "Multi-vendor support",
      "Responsive design for all devices",
      "Shopping cart with wishlist functionality"
    ],
    technologies: [
      { name: "React.js", icon: Code, color: "from-blue-500 to-cyan-500" },
      { name: "Node.js", icon: Layers, color: "from-green-500 to-emerald-500" },
      { name: "MongoDB", icon: Layers, color: "from-green-600 to-teal-600" },
      { name: "Express.js", icon: Code, color: "from-gray-600 to-gray-800" },
      { name: "Redux", icon: Code, color: "from-purple-500 to-pink-500" },
      { name: "Tailwind CSS", icon: Code, color: "from-cyan-500 to-blue-500" },
    ],
    outcome: {
      impact: "Increased online sales by 250% and reduced cart abandonment rate by 40%",
      metrics: [
        { label: "Active Users", value: "50K+", icon: Users },
        { label: "Conversion Rate", value: "8.5%", icon: TrendingUp },
        { label: "Page Load", value: "<1s", icon: Zap },
        { label: "Uptime", value: "99.9%", icon: Award },
      ]
    },
    tags: ["React", "Node.js", "MongoDB", "E-commerce", "Full-Stack"],
    duration: "6 months",
    team: "5 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "bhoommetra",
    title: "Bhoommetra - Smart Agriculture",
    shortDescription: "Agricultural land analysis system with AI-powered soil testing and crop recommendations.",
    fullDescription: "Bhoommetra is a revolutionary AgriTech platform that leverages IoT sensors, satellite imagery, and artificial intelligence to transform traditional farming practices. The system provides real-time soil health monitoring, weather predictions, and personalized crop recommendations to help farmers maximize yield while promoting sustainable farming practices. Our solution has helped thousands of farmers make data-driven decisions, reducing resource wastage and increasing profitability.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
    ],
    features: [
      "IoT-based soil moisture & pH monitoring",
      "AI-powered crop recommendation engine",
      "Real-time weather forecasting integration",
      "Satellite imagery analysis for land assessment",
      "Pest & disease detection using computer vision",
      "Irrigation scheduling optimization",
      "Market price tracking & alerts",
      "Multi-language support for farmers",
      "Mobile app for field data collection",
      "Expert consultation booking system"
    ],
    technologies: [
      { name: "Python", icon: Code, color: "from-yellow-500 to-blue-500" },
      { name: "TensorFlow", icon: Code, color: "from-orange-500 to-red-500" },
      { name: "IoT Sensors", icon: Layers, color: "from-blue-600 to-indigo-600" },
      { name: "React Native", icon: Code, color: "from-blue-400 to-cyan-400" },
      { name: "PostgreSQL", icon: Layers, color: "from-blue-700 to-indigo-700" },
      { name: "AWS", icon: Layers, color: "from-orange-400 to-yellow-400" },
    ],
    outcome: {
      impact: "Helped 10,000+ farmers increase crop yield by 35% while reducing water usage by 25%",
      metrics: [
        { label: "Farmers Onboarded", value: "10K+", icon: Users },
        { label: "Yield Increase", value: "35%", icon: TrendingUp },
        { label: "Water Saved", value: "25%", icon: Zap },
        { label: "ROI", value: "180%", icon: Award },
      ]
    },
    tags: ["IoT", "AI", "Agriculture", "Python", "Machine Learning"],
    duration: "12 months",
    team: "8 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Analytics Platform",
    shortDescription: "Create marketing advertisements and content strategies using social media analytics.",
    fullDescription: "A comprehensive social media analytics and marketing automation platform that helps businesses understand their audience, optimize content strategy, and maximize ROI. The platform aggregates data from multiple social media channels, provides AI-powered insights, and automates content scheduling. With advanced sentiment analysis, competitor tracking, and performance forecasting, businesses can make data-driven decisions to improve their social media presence and engagement.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
    ],
    features: [
      "Multi-platform analytics dashboard (Facebook, Instagram, Twitter, LinkedIn)",
      "AI-powered content recommendation engine",
      "Sentiment analysis for brand monitoring",
      "Automated post scheduling & publishing",
      "Competitor analysis & benchmarking",
      "Influencer identification & tracking",
      "ROI calculation & attribution modeling",
      "Custom report generation with Figma integration",
      "Real-time engagement tracking",
      "Hashtag performance analysis"
    ],
    technologies: [
      { name: "React.js", icon: Code, color: "from-blue-500 to-cyan-500" },
      { name: "Python", icon: Code, color: "from-yellow-500 to-blue-500" },
      { name: "Figma API", icon: Layers, color: "from-purple-500 to-pink-500" },
      { name: "D3.js", icon: Code, color: "from-orange-500 to-red-500" },
      { name: "MongoDB", icon: Layers, color: "from-green-600 to-teal-600" },
      { name: "Redis", icon: Layers, color: "from-red-600 to-pink-600" },
    ],
    outcome: {
      impact: "Increased social media engagement by 180% and reduced marketing costs by 40%",
      metrics: [
        { label: "Engagement Increase", value: "180%", icon: TrendingUp },
        { label: "Cost Reduction", value: "40%", icon: Zap },
        { label: "Time Saved", value: "30hrs/week", icon: Award },
        { label: "ROI", value: "320%", icon: Users },
      ]
    },
    tags: ["Analytics", "Marketing", "AI", "Python", "React"],
    duration: "8 months",
    team: "6 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "evm-systems",
    title: "EVM - Secure Voting System",
    shortDescription: "Secure electronic voting system with blockchain technology for transparency.",
    fullDescription: "A revolutionary electronic voting management system built on blockchain technology to ensure transparent, secure, and tamper-proof elections. The platform provides end-to-end encryption, biometric authentication, and immutable vote recording on the blockchain. With real-time vote counting and audit trails, EVM Systems brings trust and transparency to democratic processes while making voting more accessible and efficient.",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop",
    ],
    features: [
      "Blockchain-based vote recording (Ethereum/Hyperledger)",
      "End-to-end encryption for vote privacy",
      "Biometric authentication (fingerprint/face recognition)",
      "Multi-factor authentication system",
      "Real-time vote counting & results",
      "Immutable audit trail for transparency",
      "Remote voting capability",
      "Voter verification & eligibility checks",
      "Admin dashboard for election management",
      "Compliance with electoral regulations"
    ],
    technologies: [
      { name: "Solidity", icon: Code, color: "from-purple-600 to-indigo-600" },
      { name: "Ethereum", icon: Layers, color: "from-purple-500 to-pink-500" },
      { name: "React.js", icon: Code, color: "from-blue-500 to-cyan-500" },
      { name: "Node.js", icon: Layers, color: "from-green-500 to-emerald-500" },
      { name: "IPFS", icon: Layers, color: "from-blue-600 to-indigo-600" },
      { name: "Web3.js", icon: Code, color: "from-orange-500 to-yellow-500" },
    ],
    outcome: {
      impact: "Successfully conducted 50+ secure elections with 100% transparency and zero fraud incidents",
      metrics: [
        { label: "Elections Conducted", value: "50+", icon: Award },
        { label: "Voters Registered", value: "500K+", icon: Users },
        { label: "Fraud Incidents", value: "0", icon: Zap },
        { label: "Trust Score", value: "98%", icon: TrendingUp },
      ]
    },
    tags: ["Blockchain", "Security", "Web3", "Ethereum", "Voting"],
    duration: "10 months",
    team: "7 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "suspense-story",
    title: "StoryWeave - Interactive Fiction",
    shortDescription: "Interactive story writing platform with AI-assisted content generation.",
    fullDescription: "StoryWeave is an innovative platform that combines human creativity with artificial intelligence to create immersive, interactive fiction experiences. Writers can collaborate in real-time, leverage AI to generate plot suggestions, develop complex characters, and create branching narratives. The platform includes a built-in community where readers can choose their own adventure, influencing story outcomes through their decisions.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop",
    ],
    features: [
      "AI-powered plot generation & story suggestions",
      "Real-time collaborative writing environment",
      "Branching narrative creator with visual flowchart",
      "Character development toolkit with AI assistance",
      "Interactive reader experience with choice-based outcomes",
      "Community publishing & monetization",
      "Writing analytics & engagement metrics",
      "Version control for story iterations",
      "Integrated feedback & commenting system",
      "Export to multiple formats (PDF, ePub, Web)"
    ],
    technologies: [
      { name: "React.js", icon: Code, color: "from-blue-500 to-cyan-500" },
      { name: "GPT-4 API", icon: Code, color: "from-green-500 to-emerald-500" },
      { name: "WebSocket", icon: Layers, color: "from-orange-500 to-red-500" },
      { name: "PostgreSQL", icon: Layers, color: "from-blue-700 to-indigo-700" },
      { name: "Redis", icon: Layers, color: "from-red-600 to-pink-600" },
      { name: "AWS Lambda", icon: Layers, color: "from-orange-400 to-yellow-400" },
    ],
    outcome: {
      impact: "Enabled 15,000+ writers to publish interactive stories with 500K+ active readers",
      metrics: [
        { label: "Writers", value: "15K+", icon: Users },
        { label: "Published Stories", value: "5K+", icon: Award },
        { label: "Active Readers", value: "500K+", icon: TrendingUp },
        { label: "Engagement", value: "85%", icon: Zap },
      ]
    },
    tags: ["AI", "Content", "React", "GPT-4", "Interactive"],
    duration: "9 months",
    team: "5 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "ai-dev-tools",
    title: "DevAssist - AI Developer Tools",
    shortDescription: "Suite of AI-powered development tools for code generation and optimization.",
    fullDescription: "DevAssist is a comprehensive suite of AI-powered tools designed to supercharge developer productivity. From intelligent code completion and bug detection to automated documentation generation and code optimization, DevAssist leverages cutting-edge machine learning models to assist developers at every stage of the software development lifecycle. The platform integrates seamlessly with popular IDEs and supports multiple programming languages.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    ],
    features: [
      "AI-powered code completion & suggestions",
      "Automated bug detection & fixing",
      "Code optimization & refactoring suggestions",
      "Automatic documentation generation",
      "Test case generation & coverage analysis",
      "Code review automation with AI insights",
      "Multi-language support (Python, JavaScript, Java, Go, etc.)",
      "IDE plugins (VS Code, IntelliJ, Sublime)",
      "Team collaboration features",
      "Security vulnerability scanning"
    ],
    technologies: [
      { name: "Python", icon: Code, color: "from-yellow-500 to-blue-500" },
      { name: "TensorFlow", icon: Code, color: "from-orange-500 to-red-500" },
      { name: "GPT-4", icon: Code, color: "from-green-500 to-emerald-500" },
      { name: "TypeScript", icon: Code, color: "from-blue-600 to-indigo-600" },
      { name: "Docker", icon: Layers, color: "from-blue-500 to-cyan-600" },
      { name: "Kubernetes", icon: Layers, color: "from-blue-700 to-indigo-800" },
    ],
    outcome: {
      impact: "Reduced development time by 45% and improved code quality by 60% for 20,000+ developers",
      metrics: [
        { label: "Active Users", value: "20K+", icon: Users },
        { label: "Time Saved", value: "45%", icon: Zap },
        { label: "Code Quality", value: "+60%", icon: TrendingUp },
        { label: "Bugs Prevented", value: "80%", icon: Award },
      ]
    },
    tags: ["AI", "DevTools", "Python", "Machine Learning", "IDE"],
    duration: "11 months",
    team: "9 developers",
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Project not found</h2>
            <Link to="/#projects">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20 relative">
        <FloatingLogo />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/#projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {project.title}
                  </h1>
                  <p className="text-white/90 text-lg">{project.shortDescription}</p>
                </div>
              </div>
            </motion.div>

            {/* Project Images Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary" />
                  Project Gallery
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.images.map((img, idx) => (
                    <div key={idx} className="relative h-48 rounded-lg overflow-hidden group">
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  About This Project
                </h2>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {project.fullDescription}
                </p>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6 text-primary" />
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary" />
                  Technologies Used
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.technologies.map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover:scale-105"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Outcome & Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Outcome & Impact
                </h2>
                <p className="text-foreground/80 text-lg mb-6">{project.outcome.impact}</p>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {project.outcome.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold gradient-text mb-1">{metric.value}</div>
                        <div className="text-sm text-foreground/60">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Project Info</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-foreground/60">Duration</div>
                      <div className="font-semibold">{project.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-foreground/60">Team Size</div>
                      <div className="font-semibold">{project.team}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-foreground/60">Status</div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
