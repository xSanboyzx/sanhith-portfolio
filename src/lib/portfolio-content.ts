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
  repositoryUrl: string;
  status: string;
  team: string;
  role: string;
  tools: readonly { name: string; iconSrc?: string }[];
  highlights: readonly string[];
  caseStudy: {
    problem: string;
    approach: readonly string[];
    contributions: readonly string[];
    note?: string;
  };
  resources: readonly { label: string; href: string }[];
};

export type SkillCategory = {
  id: string;
  label: string;
  tools: readonly string[];
  examples: readonly { id: string; label: string }[];
};

export const education = {
  university: "Ontario Tech University",
  degree: "Bachelor of Science in Computer Science (Co-op)",
  specialization: "Data Science",
  expectedGraduation: "October 2027",
  graduationYear: 2027,
  dateRange: "Sep 2022–Oct 2027",
  location: "Oshawa, ON",
} as const;

export const experience: readonly ExperienceRecord[] = [
  {
    id: "experience-scotiabank",
    company: "Scotiabank",
    logo: "scotiabank",
    role: "Data Strategy & Analytics Intern",
    date: "Jan–Aug 2026",
    location: "Toronto, ON",
    focus: "DATA INTO DECISIONS",
    description:
      "Built the workflows and reporting that turned operational data into actionable insights for business teams.",
    highlights: [
      "Developed ingestion and transformation workflows with Python, SQL, and Google Cloud Platform to process, validate, and analyze large operational datasets.",
      "Designed interactive Power BI dashboards and executive views for KPIs, operational trends, and actionable business insights.",
      "Integrated the Genesys API for contact-centre analytics, troubleshooting authentication and data-quality issues.",
      "Automated recurring data processing and reporting with Python, improving workflow consistency and reducing manual analysis.",
      "Worked with managers and cross-functional stakeholders to gather requirements, resolve technical blockers, and apply data governance and development best practices.",
    ],
    tools: ["Python", "SQL", "Google Cloud Platform", "Power BI", "Genesys API"],
  },
  {
    id: "experience-gdg",
    company: "Google Developer Group · Ontario Tech",
    logo: "gdg",
    role: "Technical Director",
    date: "Feb–Dec 2025",
    location: "Oshawa, ON · Campus community",
    focus: "50+ STUDENTS ENGAGED",
    description:
      "Helped students turn technical curiosity into working projects through workshops, mentorship, and practical roadmaps.",
    highlights: [
      "Hosted React, Firebase, and full-stack development workshops engaging more than 50 students.",
      "Mentored students through hands-on projects and semester roadmap planning to support stronger project outcomes.",
      "Organized and led AI, résumé, and portfolio workshops alongside tech events to strengthen professional readiness and technical literacy.",
    ],
    tools: ["React", "Firebase", "Full-stack development", "Mentorship"],
  },
  {
    id: "experience-kochasoft",
    company: "Kochasoft Inc.",
    logo: "kochasoft",
    role: "Project Manager Intern",
    date: "Apr–Dec 2024",
    location: "Toronto, ON",
    focus: "25% LESS DOWNTIME",
    description:
      "Connected engineering execution with client priorities across large-scale infrastructure transitions.",
    highlights: [
      "Directed server transition plans across WebSphere, VMware, Windows, and AWS environments, reducing downtime by 25%.",
      "Managed sprints through Azure DevOps and Jira Kanban boards, improving delivery efficiency and task visibility across teams.",
      "Presented executive project updates supported by flowcharts, wireframes, and use-case documentation to streamline stakeholder communication.",
      "Partnered with developers and system architects to align deliverables with client requirements, meeting 100% of SOW timelines and quality standards.",
    ],
    tools: ["AWS", "VMware", "Azure DevOps", "Jira", "WebSphere"],
  },
  {
    id: "experience-sanka-law",
    company: "Sanka Law Corporation",
    logo: null,
    role: "Part-Time Legal Administrative Assistant",
    date: "Sep 2020–Jun 2022",
    location: "Scarborough, ON",
    focus: "20% MORE EFFICIENT ADMINISTRATION",
    description:
      "Supported legal administration through case-file management, client communication, and scheduling.",
    highlights: [
      "Maintained legal case files, processed client accounts, and kept compliance documentation aligned with provincial standards.",
      "Used Microsoft Office to draft legal documents, track case timelines, and prepare correspondence for attorneys and clients.",
      "Coordinated client communications and appointment scheduling, improving administrative response time and office efficiency by 20%.",
    ],
    tools: [
      "Case files",
      "Compliance documentation",
      "Client communication",
      "Microsoft Office",
    ],
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
    date: "2025",
    subtitle: "A little space to check in with yourself.",
    description:
      "A Flutter wellness app bringing together journaling, mood analytics, practical support tools, and AI-assisted reflection.",
    repositoryUrl: "https://github.com/sunnypatell/csci4100u-aurora",
    status: "Not actively developed",
    team: "5-person course project",
    role: "Flutter developer · Support tools & mood analytics",
    tools: [
      { name: "Flutter", iconSrc: "/icons/portfolio/flutter.svg" },
      { name: "Dart", iconSrc: "/icons/languages/dart.svg" },
      { name: "Firebase / Firestore", iconSrc: "/icons/portfolio/firebase.svg" },
      { name: "fl_chart" },
      { name: "Gemini API" },
    ],
    highlights: [
      "Firestore-backed journals with mood and date filters.",
      "7- and 30-day mood trends, statistics, and heatmaps built with fl_chart.",
      "Focus timers, task breakdowns, and practical wellness support tools.",
      "Gemini-assisted journal reflection and contextual chat.",
    ],
    caseStudy: {
      problem:
        "Reflection is easier to keep up with when journaling, mood patterns, and practical support live in one place. Aurora brings those experiences together in a student-focused wellness companion.",
      approach: [
        "Flutter and Dart provide the app interface, with Firebase Authentication and Firestore supporting accounts and per-user journal entries.",
        "Journal entries feed 7- and 30-day mood charts, summary statistics, and heatmaps. Mood and date filters help users revisit their reflections.",
        "Support pages combine focus and meal-support timers, task breakdowns, routines, affirmations, and journaling prompts. Local notifications provide daily journal reminders.",
        "A shared Gemini service supports journal insights and contextual chat, with readable fallback messages when requests fail or configuration is missing.",
      ],
      contributions: [
        "Developed the ADHD support page, including a body-doubling focus timer, task breakdown wizard, routine builder, and quick notes.",
        "Worked on eating-disorder support features, including affirmations, journaling prompts, and a meal-support timer. Improved Help Near Me and resolved Flutter errors and warnings.",
        "Revamped the journal and timeline screens with mood visualization, 7- and 30-day trends, statistics, heatmaps, and journal filtering using Flutter, Firestore, and fl_chart.",
        "Built responsive interfaces and reusable components with animations, gradients, glass effects, and interactive image galleries supporting zooming, panning, and error handling.",
        "Helped integrate AI-related changes across the dashboard, journal, navigation shell, and main application entry point as part of the team.",
      ],
    },
    resources: [
      {
        label: "Setup & README",
        href: "https://github.com/sunnypatell/csci4100u-aurora/blob/main/README.md",
      },
    ],
  },
  {
    id: "project-mindmetrics",
    artwork: "metrics",
    name: "MindMetrics-ML",
    title: "MindMetrics",
    titleAccent: "-ML.",
    category: "APPLIED MACHINE LEARNING",
    date: "Nov–Dec 2025",
    subtitle: "Connecting everyday patterns to quality of life.",
    description:
      "An academic ML pipeline that estimates a quality-of-life score from 15 lifestyle, mental-health, and device-use features using synthetic data.",
    repositoryUrl: "https://github.com/xSanboyzx/MindMetrics-ML",
    status: "Academic demonstration",
    team: "2-person course project",
    role: "Primary developer",
    tools: [
      { name: "Python", iconSrc: "/icons/languages/python.svg" },
      { name: "PyTorch", iconSrc: "/icons/portfolio/pytorch.svg" },
      { name: "scikit-learn", iconSrc: "/icons/portfolio/scikitlearn.svg" },
      { name: "Streamlit", iconSrc: "/icons/portfolio/streamlit.svg" },
    ],
    highlights: [
      "Explored 3,500 synthetic samples across 15 input features.",
      "Separated training, validation, and test data, fitting the scaler on training data only.",
      "Trained a PyTorch regression network and evaluated MAE, RMSE, and R².",
      "Built a Streamlit interface for entering features and displaying model predictions.",
    ],
    caseStudy: {
      problem:
        "Lifestyle habits, digital behavior, and wellbeing can interact in nonlinear ways. MindMetrics explores how a neural network can learn those patterns and estimate a quality-of-life score within a synthetic dataset.",
      approach: [
        "Prepared 3,500 synthetic participant records with 15 input features, including sleep, physical activity, device use, and self-reported mental-health indicators.",
        "Split the data into 70% training, 15% validation, and 15% test sets. Fitted StandardScaler on the training split only, then applied the same transformation to validation and test data.",
        "Trained a PyTorch regression network with residual blocks, batch normalization, dropout, and Adam optimization. Used validation loss to track training and evaluated held-out predictions with MAE, RMSE, and R².",
        "Implemented a Streamlit interface that orders and scales user inputs before passing them to a model and displaying an estimated score. The repository includes the interface and training notebook.",
      ],
      contributions: [
        "Handled most of the implementation in a two-person academic team, bringing together data preparation, model training, evaluation, and the Streamlit interface.",
      ],
      note:
        "The model was trained on synthetic data for an academic demonstration; its predictions illustrate learned patterns within that dataset.",
    },
    resources: [
      {
        label: "Setup & README",
        href: "https://github.com/xSanboyzx/MindMetrics-ML/blob/main/README.md",
      },
      {
        label: "Training notebook",
        href: "https://github.com/xSanboyzx/MindMetrics-ML/blob/main/project/notebooks/02_model_training.ipynb",
      },
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
    tools: ["Git", "Jira", "Azure DevOps", "Maven", "VS Code", "Visual Studio"],
    examples: [
      { id: "experience-kochasoft", label: "Kochasoft" },
      { id: "experience-gdg", label: "GDG" },
    ],
  },
];
