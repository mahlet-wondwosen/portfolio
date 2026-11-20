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
  { k: "Education", v: "MSc, Computer Science (Software Engineering), Addis Ababa University" },
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
    items: ["ChatGPT for coding and review", "ALX AI Augmented Professional Development"],
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
      "A financial portal built with React and Next.js, wired to banking REST APIs and released from the shared monorepo.",
    role: "Frontend and integration layer",
    tags: ["Next.js", "REST APIs", "Tailwind CSS"],
  },
  {
    title: "CBRS Ethiopia",
    blurb:
      "A bank portal developed alongside the other apps in the monorepo, kept stable across concurrent releases.",
    role: "Frontend and integration layer",
    tags: ["React", "Turborepo", "CI/CD"],
  },
  {
    title: "StarPayEvent",
    blurb:
      "A financial product built on the shared component and package architecture used across the fintech's apps.",
    role: "Frontend and integration layer",
    tags: ["Next.js", "TypeScript", "Shared packages"],
  },
  {
    title: "Dashen Branch",
    blurb:
      "A branch-facing portal, built with backend, QA and platform teams and troubleshot for integration and performance issues.",
    role: "Frontend and integration layer",
    tags: ["React", "QA", "REST APIs"],
  },
  {
    title: "Central Portals",
    blurb:
      "Central banking portal work across interconnected products in a multi-stakeholder production environment.",
    role: "Frontend and integration layer",
    tags: ["Next.js", "Performance", "Integration"],
  },
  {
    title: "Connect Ethiopia",
    blurb:
      "A mini-app that runs inside the Dashen Super App, sharing the same monorepo, components and release process.",
    role: "Frontend and integration layer",
    tags: ["Mini-app", "React", "Tailwind CSS"],
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
      "Thesis: a framework to optimize communication in distributed Scrum teams. Designed and evaluated an event-driven middleware layer with latency SLOs, exactly-once delivery, retry and dead-letter recovery, and full observability (tracing, metrics, structured logs). Validated across two distributed teams with statistically significant reliability and delivery-time gains.",
  },
  {
    period: "Jan 2019 to Jul 2023",
    degree: "BSc, Electrical and Computer Engineering",
    school: "Dire Dawa University",
    detail: "Computer Engineering.",
  },
];

export const certs = [
  { name: "AI Augmented Professional Development Skills, ALX", when: "2024" },
  { name: "Cloud Computing Primer: SaaS, Coursera / Codio", when: "Feb 2025" },
  { name: "React.js: The Complete Course for Beginners, Udemy", when: "2022" },
  { name: "Docker Course for Beginners, Udemy", when: "2022" },
  { name: "Swagger API Documentation with Node.js, Udemy", when: "2022" },
];
