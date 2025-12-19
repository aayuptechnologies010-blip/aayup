import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FloatingLogo } from "@/components/ui/floating-logo";

const blogPosts = [
	{
		id: "ai-web-dev",
		title: "The Future of AI in Web Development",
		content: `Artificial intelligence is revolutionizing web development by automating tasks, enhancing user experience, and enabling smarter applications. In this article, we explore the latest trends and how developers can leverage AI tools for better productivity and innovation.\n\nAI-powered code assistants, chatbots, and personalized content delivery are just a few examples of how AI is shaping the future of the web.`,
		author: "Aayush Pandey",
		date: "2024-03-15",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
		category: "AI & Technology",
	},
	{
		id: "mobile-best-practices",
		title: "Best Practices for Mobile App Development",
		content: `Creating high-performance mobile applications requires careful planning, efficient coding, and a focus on user experience. This post covers essential guidelines for building apps that users love.\n\nFrom responsive design to offline support and performance optimization, discover the best practices that set successful apps apart.`,
		author: "Sarthak Verma",
		date: "2024-03-10",
		image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
		category: "Mobile Development",
	},
	{
		id: "communication-skills-tech",
		title: "Communication Skills for Tech Professionals",
		content: `Technical skills are important, but communication is key to success in the tech industry. Learn why soft skills matter and how to improve your communication abilities for better teamwork and career growth.\n\nTips include active listening, clear documentation, and effective presentation skills.`,
		author: "Akanksha Pandey",
		date: "2024-03-05",
		image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
		category: "Career Development",
	},
];

const BlogDetail = () => {
	const { id } = useParams();
	const post = blogPosts.find((b) => b.id === id);

	if (!post) {
		return (
			<div className="min-h-screen flex flex-col">
				<Navigation />
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
						<Link to="/blog" className="text-primary underline">
							Back to Blog
						</Link>
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/30">
			<Navigation />
			<main className="flex-1 container mx-auto px-4 py-20 relative">
				<FloatingLogo />
				<div className="max-w-3xl mx-auto">
					<img
						src={post.image}
						alt={post.title}
						className="w-full h-64 object-cover rounded-xl mb-8"
					/>
					<span className="bg-primary px-3 py-1 rounded-full text-xs font-medium text-white mb-4 inline-block">
						{post.category}
					</span>
					<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
					<div className="flex items-center space-x-4 text-sm text-foreground/60 mb-6">
						<span>{new Date(post.date).toLocaleDateString()}</span>
						<span>By {post.author}</span>
					</div>
					<div className="text-lg text-foreground/80 whitespace-pre-line mb-8">
						{post.content}
					</div>
					<Link to="/blog" className="text-primary underline">
						← Back to Blog
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default BlogDetail;
