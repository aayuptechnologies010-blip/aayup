import { useState, useEffect } from "react";
import { useParams, Link } from "@/lib/router-bridge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FloatingLogo } from "@/components/ui/floating-logo";
import { supabase } from "@/integrations/supabase/client";

const INITIAL_POSTS = [
	{
		id: "ai-web-dev",
		title: "The Future of AI in Web Development",
		summary: `How AI is changing developer workflows and the web user experience. Practical uses, tooling, and what to watch next.`,
		readingTime: "6 min read",
		tags: ["AI", "Web", "Tools"],
		keyPoints: [
			"AI accelerates repetitive tasks like testing and formatting",
			"Personalization at scale improves UX",
			"Developers should learn to integrate AI assistants into workflows",
		],
		content: `Artificial intelligence is revolutionizing web development by automating repetitive tasks, improving developer productivity, and enabling smarter, personalized user experiences.

In this expanded article we look at concrete areas where AI is making an impact: automated testing and code generation, intelligent content personalization, accessibility improvements, and enhanced analytics. For example, AI-assisted testing can generate unit tests and find regressions faster, while code assistants speed up scaffolding and refactors.

Practical integration tips:
- Start small: use AI to automate linting, formatting, and test coverage generation.
- Use personalization cautiously: combine ML-driven suggestions with human review to avoid incorrect content.
- Monitor and log: add observability to AI-powered features so you can detect regressions and bias.

Tooling examples include LLM-based code helpers, anomaly-detection libraries for analytics, and personalization services that deliver tailored content to logged-in users. As these tools mature, developers who learn to orchestrate them will move faster and ship higher-quality experiences.`,
		author: "Aayush Pandey",
		date: "2026-06-01",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
		category: "AI & Technology",
		related: ["mobile-best-practices", "communication-skills-tech"],
	},
	{
		id: "mobile-best-practices",
		title: "Best Practices for Mobile App Development",
		summary: `Guidelines and practical tips to build performant and user-friendly mobile apps.`,
		readingTime: "5 min read",
		tags: ["Mobile", "Performance", "UX"],
		keyPoints: [
			"Prioritize performance and perceived speed",
			"Design for intermittent connectivity and offline usage",
			"Measure and iterate with real user metrics",
		],
		content: `Creating high-performance mobile applications requires careful planning, efficient coding, and a focus on user experience.

This post dives deeper into measurable strategies: use performance budgets, prioritize time-to-interactive, and use synthetic + real user monitoring (RUM) to identify bottlenecks. Implement graceful offline behavior using service workers or local caching patterns and design sync strategies to avoid data conflicts.

Testing recommendations: run automated UI tests, integrate crash reporting, and collect real user metrics like LCP and TTFB. Finally, iterate frequently — small UX improvements compound over time to increase retention and satisfaction.`,
		author: "Sarthak Verma",
		date: "2026-06-05",
		image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
		category: "Mobile Development",
		related: ["ai-web-dev"],
	},
	{
		id: "communication-skills-tech",
		title: "Communication Skills for Tech Professionals",
		summary: `Soft skills that help engineers and tech professionals collaborate and advance their careers.`,
		readingTime: "4 min read",
		tags: ["Career", "Communication", "Soft Skills"],
		keyPoints: [
			"Practice active listening and empathy",
			"Write clear documentation and status updates",
			"Present ideas with structure and purpose",
		],
		content: `Technical skills are essential, but communication often determines career trajectory and team efficiency.

This article provides practical exercises: run weekly 'show-and-tell' demos to improve presentation practice, adopt a template for technical documents (context, problem, solution, impact), and schedule feedback sessions focused on listening skills. Use collaborative tools like shared notes and decision logs to reduce misunderstandings.

Case study: a cross-functional team reduced release rollbacks by 30% after introducing a lightweight pre-release checklist and short demo sessions that improved shared understanding of new features. These small process changes compound into more predictable, higher-quality deliveries.`,
		author: "Akanksha Pandey",
		date: "2026-06-10",
		image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
		category: "Career Development",
		related: ["ai-web-dev"],
	},
];

const BlogDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [allPosts, setAllPosts] = useState<any[]>(INITIAL_POSTS);

	useEffect(() => {
		let isMounted = true;
		import("@/lib/dynamicDataService").then(({ getDynamicData, DYNAMIC_KEYS }) => {
			getDynamicData<any[]>(DYNAMIC_KEYS.BLOGS, INITIAL_POSTS).then((data) => {
				if (isMounted && Array.isArray(data) && data.length > 0) {
					setAllPosts(
						data.map((b: any) => ({
							id: b.id,
							title: b.title,
							summary: b.excerpt || b.summary,
							content: b.content,
							readingTime: b.readingTime || "5 min read",
							author: b.author || "Aayup Team",
							date: b.date || b.created_at || new Date().toISOString(),
							image: b.image_url || b.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
							category: b.category,
							tags: b.tags || [b.category],
							keyPoints: b.keyPoints || (b.excerpt ? [b.excerpt] : []),
						}))
					);
				}
			});
		});
		return () => {
			isMounted = false;
		};
	}, []);

	const post = allPosts.find((b) => b.id === id);

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
						{post.readingTime && (
							<span className="ml-2">• {post.readingTime}</span>
						)}
					</div>
					{post.summary && (
						<p className="text-base text-foreground/70 italic mb-6">{post.summary}</p>
					)}
					{post.tags && (
						<div className="flex flex-wrap gap-2 mb-6">
							{post.tags.map((t) => (
								<span key={t} className="text-xs bg-muted px-2 py-1 rounded-full">
									{t}
								</span>
							))}
						</div>
					)}
					<div className="text-lg text-foreground/80 whitespace-pre-line mb-8">
						{post.content}
					</div>
					{post.keyPoints && (
						<div className="mb-8">
							<h3 className="text-lg font-semibold mb-3">Key Takeaways</h3>
							<ul className="list-disc pl-5 space-y-2 text-foreground/80">
								{post.keyPoints.map((kp) => (
									<li key={kp}>{kp}</li>
								))}
							</ul>
						</div>
					)}
					{post.related && post.related.length > 0 && (
						<div className="mt-6">
							<h4 className="font-medium mb-2">Related posts</h4>
							<ul className="space-y-2">
								{post.related.map((rid: string) => {
									const related = allPosts.find((b) => b.id === rid);
									if (!related) return null;
									return (
										<li key={rid}>
											<Link to={`/blog/${related.id}`} className="text-primary underline">
												{related.title}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					)}
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
