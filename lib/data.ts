/**
 * All site content lives here. Edit this file to update the portfolio.
 * Source: Mahlet Wondwosen Tegene's CV (Senior Frontend Engineer).
 */

export const profile = {
  name: "Mahlet Wondwosen Tegene",
  first: "Mahlet",
  last: "Wondwosen",
  title: "Senior Frontend Engineer",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  email: "mahlet.wondwosen01@gmail.com",
  phone: "+251 098 407 8086",
  linkedin: "https://www.linkedin.com/in/mahlet-wondwosen/",
  linkedinLabel: "linkedin.com/in/mahlet-wondwosen",
  github: "https://github.com/mahlet-wondwosen",
  intro:
    "I build bank and financial portals and mini-apps for Ethiopia's largest fintech, in React, Next.js and TypeScript.",
};

export const nav = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Thesis" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const facts = [
  { k: "Role", v: "Senior Frontend Developer at EagleLion Systems Technology" },
  { k: "Experience", v: "Four years in production web applications" },
  {
    k: "Education",
    v: "MSc, Computer Science (Software Engineering), Addis Ababa University",
  },
  { k: "Location", v: "Addis Ababa, open to fully remote work" },
];

export const skillGroups = [
  {
    title: "Frontend",
    note: "What users touch",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Angular",
      "React Native",
      "Material UI",
      "Ant Design",
    ],
  },
  {
    title: "Monorepo and architecture",
    note: "What keeps many apps in sync",
    items: [
      "Turborepo",
      "Shared component and package architecture",
      "Micro-frontend style mini-apps",
      "Event-driven architecture",
    ],
  },
  {
    title: "APIs and data",
    note: "Where the UI meets the backend",
    items: [
      "REST API integration",
      "Swagger / OpenAPI",
      "SQL",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Quality and delivery",
    note: "How it ships safely",
    items: [
      "QA and testing",
      "Root cause analysis",
      "Git",
      "CI/CD pipelines",
      "Docker",
      "GitOps",
      "Agile / Scrum",
    ],
  },
  {
    title: "AI-assisted development",
    note: "Faster, with review",
    items: [
      "ChatGPT for coding and review",
      "ALX AI Augmented Professional Development",
    ],
  },
];

/**
 * Add `image: "/projects/name.png"` (file in /public/projects) to show a real
 * screenshot. Add `url` for a live link. Without them, a styled UI sketch shows.
 */
export type Project = {
  title: string;
  blurb: string;
  role: string;
  tags: string[];
  url?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Ethio Direct",
    blurb:
      "An international remittance platform that enables Ethiopians abroad to send money to beneficiaries in Ethiopia through integrated banking and payment services.",
    role: "Frontend development and banking API integration",
    tags: ["React", "Next.js", "REST APIs", "Fintech"],
  },
  {
    title: "CBRS Ethiopia",
    blurb:
      "A Cross-Border Remittance System designed to facilitate international money transfers, connecting remittance partners with local banking and payment infrastructure in Ethiopia.",
    role: "Frontend development and remittance integration",
    tags: ["React", "TypeScript", "REST APIs", "Remittance"],
  },
  {
    title: "StarPayEvent",
    blurb:
      "An event and payment platform that brings together event-related services, registration, and digital payment processing.",
    role: "Frontend development and payment integration",
    tags: ["Next.js", "TypeScript", "Payment Gateway", "REST APIs"],
  },
  {
    title: "Dashen Branch Portal",
    blurb:
      "A banking operations portal that enables branch employees to manage merchant onboarding, QR code services, and branch-level workflows with approval processes.",
    role: "Frontend development and banking API integration",
    tags: ["React", "TypeScript", "Banking", "REST APIs"],
  },
  {
    title: "Dashen Central Portals",
    blurb:
      "Centralized banking administration portals for managing digital banking services, configurations, transaction rules, service settings, and operational approval workflows.",
    role: "Frontend development and system integration",
    tags: ["React", "Next.js", "TypeScript", "Banking"],
  },
  {
    title: "CBE Connect",
    blurb:
      "A digital financial services platform connecting customers with banking and cross-border financial services, including digital wallet and money transfer capabilities.",
    role: "Frontend development and financial API integration",
    tags: ["React", "Next.js", "REST APIs", "Fintech"],
  },
  {
    title: "Three Click E-commerce Mini App",
    blurb:
      "An integrated shopping experience within the Dashen Super App, enabling customers to discover products, browse merchant catalogs, place orders, and make digital payments.",
    role: "Mini-app frontend development and integration",
    tags: ["React", "Next.js", "Mini-app", "E-commerce"],
  },
  {
    title: "Three Click Event Mini App",
    blurb:
      "An event discovery and engagement mini app within the Dashen Super App, allowing customers to explore events, access event services, and complete related transactions.",
    role: "Mini-app frontend development and integration",
    tags: ["React", "Next.js", "Mini-app", "Event Management"],
  },
  {
    title: "Three Click Donation Mini App",
    blurb:
      "A digital donation mini app integrated into the Dashen Super App, connecting customers with fundraising campaigns and enabling convenient digital contributions.",
    role: "Mini-app frontend development and integration",
    tags: ["React", "Next.js", "Mini-app", "Digital Payments"],
  },
];

export const experience = [
  {
    period: "Mar 2025 to present",
    role: "Senior Frontend Developer",
    company: "EagleLion Systems Technology",
    place: "Addis Ababa",
    points: [
      "Build and maintain React and Next.js frontend and integration layers for bank and financial portals and mini-apps at Ethiopia's largest fintech, including Ethio Direct, CBRS Ethiopia, StarPayEvent, Dashen Branch, Central Portals and Connect Ethiopia.",
      "Work in a shared multi-app Turborepo monorepo, coordinating with backend, QA and platform teams to keep shared packages and architecture stable across concurrent releases.",
      "Style interfaces with Tailwind CSS and ship through CI/CD pipelines. Integrate REST APIs for financial workflows and troubleshoot integration and performance issues across interconnected products.",
    ],
  },
  {
    period: "Jul 2024 to Mar 2025",
    role: "Intermediate Software Developer",
    company: "Binget Group",
    place: "Addis Ababa",
    points: [
      "Developed and tested web and mobile applications, owning performance, usability and quality assurance across the delivery cycle.",
      "Built UIs with Tailwind CSS and used CI/CD pipelines for builds and releases. Planned releases and managed handoffs with cross-functional teams.",
    ],
  },
  {
    period: "Nov 2023 to Dec 2024",
    role: "Software Developer",
    company: "Charis Technologies",
    place: "Addis Ababa",
    points: [
      "Delivered multiple client web applications as a full-stack developer, from design through build, testing and production maintenance.",
      "Owned technical decisions affecting functionality and stability.",
    ],
  },
  {
    period: "Jun to Sep 2022 and Aug 2023 to Aug 2024",
    role: "Junior Software Developer",
    company: "CREAVERS Service PLC",
    place: "Addis Ababa",
    points: [
      "Built backend services and API integrations for an Angular-based hospital management system handling clinical data.",
      "Adapted to changing client requirements while collaborating across teams.",
    ],
  },
];

export const education = [
  {
    period: "Sep 2023 to Jul 2026",
    degree: "MSc, Computer Science (Software Engineering)",
    school: "Addis Ababa University",
    detail:
      "Thesis: A Framework for Optimizing Communication Practices and Tool Usage in Distributed Scrum Teams. Designed and evaluated an event-driven middleware architecture using Node.js, Express, MongoDB, and NATS JetStream, focusing on reliable message delivery, fault recovery, performance monitoring, and communication efficiency. Evaluated the framework across distributed Scrum teams through a multi-sprint empirical study.",
  },
  {
    period: "Jan 2019 to Jul 2023",
    degree: "BSc, Electrical and Computer Engineering",
    school: "Dire Dawa University",
    detail:
      "Specialized in Computer Engineering, developing a strong foundation in software development, computer systems, networking, database management, and hardware-software integration. Actively participated in the university's ICT Club, engaging in technology-related activities, collaborative learning, knowledge sharing, and practical technical projects. Graduated with a CGPA of 3.43/4.00.",
  },
];

export const certs = [
  { name: "AI Augmented Professional Development Skills, ALX", when: "2024" },
  {
    name: "Project Management Certificate, Addis Ababa University",
    when: "Sep 20, 2026",
  },
  { name: "Cloud Computing Primer: SaaS, Coursera / Codio", when: "Feb 2025" },
  { name: "React.js: The Complete Course for Beginners, Udemy", when: "2022" },
  { name: "Docker Course for Beginners, Udemy", when: "2022" },
  { name: "Swagger API Documentation with Node.js, Udemy", when: "2022" },
];

