export interface ProjectItem {
  id: string;
  title: string;
  category: "Websites" | "Mobile Apps" | "CRM / ERP" | "AI & Automation";
  shortDescription: string;
  fullDescription: string;
  image: string;
  images: string[];
  tags: string[];
  problem: string;
  solution: string;
  features: string[];
  technologies: { name: string; role: string }[];
  duration: string;
  team: string;
  status: string;
  demoUrl?: string;
  demoType: "Live Demo" | "Case Study" | "Demo on request";
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "ecommerce",
    title: "Enterprise E-Commerce Platform",
    category: "Websites",
    shortDescription:
      "Modern full-stack commerce platform engineered with Next.js & Node.js featuring real-time inventory management.",
    fullDescription:
      "A comprehensive digital commerce solution built to deliver high-converting, fast shopping experiences. The platform features advanced catalogue management, secure payment gateway processing, automated inventory synchronization, and intuitive admin dashboards.",
    image: "/project-web-development.webp",
    images: ["/project-web-development.webp", "/project-crm-dashboard.webp"],
    tags: ["React / Next.js", "Node.js", "MongoDB", "Stripe API"],
    problem:
      "Legacy e-commerce store suffered from slow page loads, stock discrepancy during peak traffic, and high checkout drop-offs.",
    solution:
      "Engineered an API-first serverless architecture with real-time stock sync, localized payments, and sub-second page performance.",
    features: [
      "Real-time inventory and SKU management",
      "Secure multi-currency payment checkout",
      "Dynamic product search and filtering",
      "Order status tracking & instant notifications",
      "Role-based administrative operations portal",
    ],
    technologies: [
      { name: "Next.js / React", role: "Frontend UI" },
      { name: "Node.js & Express", role: "Backend API" },
      { name: "MongoDB Atlas", role: "Database" },
      { name: "Tailwind CSS", role: "Styling" },
    ],
    duration: "4 Months",
    team: "4 Engineers",
    status: "Completed",
    demoType: "Case Study",
  },
  {
    id: "bhoommetra",
    title: "Bhoommetra Mobile & IoT Solution",
    category: "Mobile Apps",
    shortDescription:
      "Agricultural intelligence platform with IoT soil monitoring sensors and mobile crop recommendations.",
    fullDescription:
      "Bhoommetra bridges hardware sensor telemetry with an intuitive mobile application for farm supervisors. Provides real-time soil moisture and nutrient readings, weather forecasts, and automated crop disease diagnostics.",
    image: "/project-mobile-app.webp",
    images: ["/project-mobile-app.webp", "/portfolio-hero-showcase.webp"],
    tags: ["Flutter", "IoT Telemetry", "AI Analytics", "Cloud Services"],
    problem:
      "Farmers lacked actionable soil insights, leading to over-fertilization and inefficient water consumption.",
    solution:
      "Developed a cross-platform mobile application connected via Bluetooth and Cloud IoT gateways to visualize real-time field diagnostics.",
    features: [
      "Live sensor data telemetry and alerts",
      "Offline-first mobile data synchronization",
      "Automated crop health & fertilizer guidelines",
      "Multilingual UI for regional users",
      "Weather integration with localized forecasting",
    ],
    technologies: [
      { name: "Flutter", role: "Mobile Application" },
      { name: "Python / FastAPI", role: "Telemetry Backend" },
      { name: "PostgreSQL", role: "Time-Series Data" },
      { name: "AWS IoT Core", role: "Device Gateway" },
    ],
    duration: "6 Months",
    team: "5 Engineers",
    status: "In Production",
    demoType: "Demo on request",
  },
  {
    id: "enterprise-crm",
    title: "SynergyFlow Enterprise CRM / ERP",
    category: "CRM / ERP",
    shortDescription:
      "Comprehensive business sales pipeline, customer management, and team activity analytics software.",
    fullDescription:
      "Custom internal CRM engineered for mid-market business operations. Replaces scattered spreadsheets with automated sales pipeline stages, client communication logs, invoice generation, and revenue forecasting.",
    image: "/project-crm-dashboard.webp",
    images: ["/project-crm-dashboard.webp", "/project-ai-analytics.webp"],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    problem:
      "Fragmented sales operations and manual reporting caused delayed client follow-ups and lost revenue visibility.",
    solution:
      "Created a centralized modular web platform with role permissions, automated reminders, and interactive executive reporting.",
    features: [
      "Customizable deal pipeline with drag-and-drop",
      "Client conversation timeline and document storage",
      "Automated PDF quotation & invoicing engine",
      "Granular team access & permission controls",
      "Revenue forecast reporting and exportable analytics",
    ],
    technologies: [
      { name: "React / TypeScript", role: "Frontend" },
      { name: "Node.js", role: "RESTful Backend" },
      { name: "PostgreSQL", role: "Relational Database" },
      { name: "Docker", role: "Containerization" },
    ],
    duration: "5 Months",
    team: "4 Engineers",
    status: "Deployed",
    demoType: "Case Study",
  },
  {
    id: "ai-dev-tools",
    title: "Aether AI Analytics & Automation",
    category: "AI & Automation",
    shortDescription:
      "Predictive machine learning models and intelligent automated workflows for data-intensive operations.",
    fullDescription:
      "Enterprise automation suite integrating large language models and machine learning classifiers to extract unstructured data, monitor operational anomalies, and generate predictive intelligence.",
    image: "/project-ai-analytics.webp",
    images: ["/project-ai-analytics.webp", "/aayup-hero-tech.webp"],
    tags: ["Python", "FastAPI", "Machine Learning", "React"],
    problem:
      "Client team spent hundreds of hours weekly manually categorizing high-volume support requests and monitoring anomalies.",
    solution:
      "Built custom classification models and automated routing pipelines that process tickets and telemetry in real time.",
    features: [
      "Automated document and query classification",
      "Real-time anomaly detection alerts",
      "Interactive model confidence dashboards",
      "FastAPI microservice endpoints for high throughput",
      "Audit trail and human-in-the-loop review workflow",
    ],
    technologies: [
      { name: "Python / PyTorch", role: "ML Models" },
      { name: "FastAPI", role: "API Microservices" },
      { name: "React", role: "Telemetry Dashboard" },
      { name: "Redis", role: "Message Queue" },
    ],
    duration: "5 Months",
    team: "3 Engineers",
    status: "Active",
    demoType: "Case Study",
  },
  {
    id: "evm-systems",
    title: "EVM Secure Electronic Verification",
    category: "Websites",
    shortDescription:
      "Secure digital voting and election verification web system engineered with cryptographic audit trails.",
    fullDescription:
      "High-integrity digital voting management system with end-to-end cryptographic verification, tamper-evident ballots, and administrative oversight consoles.",
    image: "/project-web-development.webp",
    images: ["/project-web-development.webp"],
    tags: ["React", "Security", "Node.js", "Cryptographic Hash"],
    problem:
      "Institutions required transparent, verifiable ballot management with zero risk of duplicated or altered entries.",
    solution:
      "Implemented a secure multi-step verification portal with immutable audit records and voter privacy guards.",
    features: [
      "Voter biometric & two-factor authorization",
      "Tamper-evident cryptographically signed records",
      "Real-time voter turnout and audit dashboards",
      "Air-gapped verification compliance",
    ],
    technologies: [
      { name: "React", role: "Client App" },
      { name: "Node.js", role: "Security Layer" },
      { name: "PostgreSQL", role: "Audit Storage" },
    ],
    duration: "6 Months",
    team: "5 Developers",
    status: "Completed",
    demoType: "Case Study",
  },
];
