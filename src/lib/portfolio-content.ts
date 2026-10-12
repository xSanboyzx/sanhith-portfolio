export type ExperienceRecord = {
  id: string;
  company: string;
  logo: string | null;
  role: string;
  date: string;
  location: string;
  focus: string;
  description: string;
  highlights: readonly string[];
  tools: readonly string[];
  earlier?: boolean;
};

export type ProjectRecord = {
  id: string;
  artwork: "aurora" | "metrics";
  name: string;
  title: string;
  titleAccent: string;
  category: string;
  date: string;
  subtitle: string;
  description: string;
  tools: readonly { name: string; icon?: string }[];
  highlights: readonly string[];
};

export type SkillCategory = {
  id: string;
  label: string;
  tools: readonly string[];
  examples: readonly { id: string; label: string }[];
};

export const experience: readonly ExperienceRecord[] = [
  {
    id: "experience-scotiabank",
    company: "Scotiabank",
    logo: "scotiabank",
    role: "Data Strategy & Analytics Intern",
    date: "Jan — Aug 2026",
    location: "Toronto, ON",
    focus: "DATA INTO DECISIONS",
    description:
      "Built the workflows and reporting that turned operational data into actionable insights for business teams.",
    highlights: [
      "Developed Python, SQL, and Google Cloud ingestion and transformation workflows to process and validate operational datasets.",
      "Designed Power BI dashboards and executive views for KPIs and operational trends; automated recurring analysis and reporting.",
      "Integrated the Genesys API for contact-centre analytics, resolving authentication and data-quality issues with cross-functional stakeholders.",
    ],
    tools: ["Python", "SQL", "Google Cloud", "Power BI", "Genesys API"],
  },
  {
    id: "experience-gdg",
    company: "Google Developer Group · Ontario Tech",
    logo: "gdg",
    role: "Technical Director",
    date: "Feb — Dec 2025",
    location: "Oshawa, ON · Campus community",
    focus: "50+ STUDENTS ENGAGED",
    description:
      "Helped students turn technical curiosity into working projects through workshops, mentorship, and practical roadmaps.",
    highlights: [
      "Hosted React, Firebase, and full-stack development workshops engaging more than 50 students.",
      "Mentored hands-on projects and led AI, resume, and portfolio workshops to strengthen technical skills and professional readiness.",
    ],
    tools: ["React", "Firebase", "Full-stack development", "Mentorship"],
  },
  {
    id: "experience-kochasoft",
    company: "Kochasoft Inc.",
    logo: "kochasoft",
    role: "Project Manager Intern",
    date: "Apr — Dec 2024",
    location: "Toronto, ON",
    focus: "25% LESS DOWNTIME",
    description:
      "Connected engineering execution with client priorities across large-scale infrastructure transitions.",
    highlights: [
      "Directed server transition plans across WebSphere, VMware, Windows, and AWS environments, reducing downtime by 25%.",
      "Managed sprints in Azure DevOps and Jira; aligned developers and architects with client requirements and met 100% of SOW timelines and quality standards.",
    ],
    tools: ["AWS", "VMware", "Azure DevOps", "Jira", "WebSphere"],
  },
  {
    id: "experience-sanka-law",
    company: "Sanka Law Corporation",
    logo: null,
    role: "Part-Time Legal Administrative Assistant",
    date: "Sep 2020 — Jun 2022",
    location: "Scarborough, ON",
    focus: "20% MORE EFFICIENT ADMINISTRATION",
    description:
      "Supported legal administration through case-file management, client communication, and scheduling.",
    highlights: [
      "Managed legal case files, compliance documentation, and client communications.",
      "Improved administrative response time and office efficiency by 20% through scheduling and coordination.",
    ],
    tools: ["Case files", "Compliance documentation", "Client communication"],
    earlier: true,
  },
];

export const projects: readonly ProjectRecord[] = [
  {
    id: "project-aurora",
    artwork: "aurora",
    name: "Aurora",
    title: "Aurora",
    titleAccent: ".",
    category: "MOBILE APP · AI-ASSISTED WELLNESS",
    date: "Oct 2025 — Present",
    subtitle: "A little space to check in with yourself.",
    description:
      "A cross-platform mental health and wellness app for self-care tracking, journaling, and emotional reflection, with AI-assisted personalized insights.",
    tools: [
      { name: "Flutter", icon: "flutter" },
      { name: "Firebase", icon: "firebase" },
      { name: "Dart" },
    ],
    highlights: [
      "Flutter and Dart power the cross-platform app experience.",
      "Firebase Authentication, Cloud Storage, and Firestore support accounts and real-time sync across devices.",
      "Push notifications deliver mood check-ins, habit reminders, and mindfulness prompts.",
      "Natural language tools provide personalized wellness insights and coping strategies from user inputs.",
    ],
  },
  {
    id: "project-mindmetrics",
    artwork: "metrics",
    name: "MindMetrics-ML",
    title: "MindMetrics",
    titleAccent: "-ML.",
    category: "APPLIED MACHINE LEARNING",
    date: "Nov — Dec 2025",
    subtitle: "Connecting everyday patterns to quality of life.",
    description:
      "An end-to-end regression pipeline that predicts quality-of-life outcomes from behavioral, lifestyle, mental-health, and device-usage data.",
    tools: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "Streamlit", icon: "streamlit" },
      { name: "Python" },
    ],
    highlights: [
      "Preprocessed and standardized input data with pandas and scikit-learn.",
      "Trained a PyTorch multilayer perceptron using ReLU, dropout, and Adam optimization.",
      "Used validation-based checkpointing to select model weights.",
      "Deployed the model through Streamlit for real-time predictions from user-provided inputs.",
    ],
  },
];

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "data",
    label: "Data & ML",
    tools: [
      "Python",
      "SQL",
      "PyTorch",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Power BI",
    ],
    examples: [
      { id: "experience-scotiabank", label: "Scotiabank" },
      { id: "project-mindmetrics", label: "MindMetrics-ML" },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    tools: ["Flutter", "Dart", "React", "JavaScript", "Streamlit"],
    examples: [
      { id: "project-aurora", label: "Aurora" },
      { id: "experience-gdg", label: "GDG" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    tools: [
      "Google Cloud Platform",
      "BigQuery",
      "Firebase",
      "Genesys Cloud API",
      "REST APIs",
    ],
    examples: [
      { id: "experience-scotiabank", label: "Scotiabank" },
      { id: "project-aurora", label: "Aurora" },
    ],
  },
  {
    id: "delivery",
    label: "Delivery",
    tools: ["Git", "Java", "C++", "C", "Go", "Jira", "Azure DevOps", "Maven"],
    examples: [
      { id: "experience-kochasoft", label: "Kochasoft" },
      { id: "experience-gdg", label: "GDG" },
    ],
  },
];
