import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoImage from "@/assets/logo.webp";

const stats = [
	{ label: "Projects Completed", value: 50, suffix: "+" },
	{ label: "Happy Clients", value: 30, suffix: "+" },
	{ label: "Years Experience", value: 3, suffix: "+" },
	{ label: "Team Members", value: 8, suffix: "" },
];

const CountUp = ({
	end,
	duration = 2,
	suffix = "",
}: {
	end: number;
	duration?: number;
	suffix?: string;
}) => {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (!isInView) return;

		let startTime: number | null = null;
		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const progress = Math.min(
				(currentTime - startTime) / (duration * 1000),
				1
			);
			setCount(Math.floor(progress * end));

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}, [end, duration, isInView]);

	return <span ref={ref}>{count}
		{suffix}</span>;
};

const HeroSection = () => {
	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
			{/* Animated Background */}
			<div className="absolute inset-0">
				<video 
					src="vid2.mov" 
					alt="Background Animation"
					className="w-full h-full object-cover dark:opacity-80"
					autoPlay
					loop
					muted
				/>
				<div className="absolute inset-0 dark:bg-background/20"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10 flex-1 flex items-center">
				<div className="max-w-5xl mx-auto text-center w-full">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-6"
					>
						<div className="flex items-center justify-center mb-4">
							<img
								src={logoImage}
								alt="Aayup Technologies"
								className="w-20 h-20 rounded-full shadow-md"
							/>
						</div>
						<div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
							<Sparkles className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-white">
								Innovating the Future
							</span>
						</div>
						<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
							<span className="gradient-text">Aayup Technologies</span>
							<br />
							<span className="text-white">Pvt. Ltd.</span>
						</h1>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
					>
						Innovating Tomorrow With Intelligent Digital Solutions
					</motion.p>

					{/* Floating Elements */}
					<div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-float"></div>
					<div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
				</div>
			</div>

			{/* Stats Section at Bottom */}
			<div className="container mx-auto px-4 relative z-10 w-full pb-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="glass-card/30 backdrop-blur-xl border border-border/30 rounded-2xl p-8 md:p-12 relative overflow-hidden"
				>
					{/* Logo in center background */}
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
						<img
							src={logoImage}
							alt="Aayup Technologies"
							className="w-60 h-60"
						/>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div className="text-3xl md:text-5xl font-bold gradient-text mb-2">
									<CountUp end={stat.value} suffix={stat.suffix} />
								</div>
								<div className="text-white/80 dark:text-foreground/60 font-medium text-sm md:text-base">
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
