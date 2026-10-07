import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/design";

const experience = [
  {
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
];

function ExperienceBullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="experience-bullets">
      {items.map((item, index) => (
        <li
          className="experience-bullet reveal"
          key={item}
          style={{ "--bullet-delay": `${index * 140}ms` } as CSSProperties}
        >
          <span className="experience-bullet-marker" aria-hidden="true" />
          <span className="experience-bullet-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="work-tags" aria-label="Technologies and skills">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function TechLogo({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="work-tech">
      <Image
        src={`/icons/portfolio/${icon}.svg`}
        width={20}
        height={20}
        alt=""
        unoptimized
      />
      {name}
    </span>
  );
}

export function Experience() {
  return (
    <section
      className="section shell work-experience"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading reveal">
        <div>
          <SectionLabel number="01">EXPERIENCE & IMPACT</SectionLabel>
          <h2 id="experience-heading">
            Real teams. Real outcomes<span className="purple">.</span>
          </h2>
        </div>
        <span className="work-aside">DATA / DEVELOPMENT / DELIVERY</span>
      </div>
      <p className="section-intro reveal">
        From enterprise analytics to a community of builders.
      </p>
      <div className="experience-list">
        {experience.map((job) => (
          <article className="experience-entry reveal" key={job.logo}>
            <div className="experience-identity">
              <div className={`company-logo company-logo-${job.logo}`}>
                <Image
                  src={`/icons/portfolio/${job.logo}.svg`}
                  width={180}
                  height={42}
                  alt={job.company}
                  unoptimized
                />
              </div>
              <p className="experience-date">{job.date}</p>
              <p className="experience-location">{job.location}</p>
            </div>
            <div className="experience-body">
              <span className="work-highlight">{job.focus}</span>
              <h3>{job.role}</h3>
              <p className="experience-company">{job.company}</p>
              <ExperienceBullets items={[job.description, ...job.highlights]} />
              <Tags items={job.tools} />
            </div>
          </article>
        ))}
      </div>
      <details className="earlier-experience reveal">
        <summary>
          Earlier experience <span>Legal administration · 2020–2022</span>
        </summary>
        <div>
          <h3>Part-Time Legal Administrative Assistant</h3>
          <p>Sanka Law Corporation · Scarborough, ON · Sep 2020 – Jun 2022</p>
          <ExperienceBullets
            items={[
              "Managed legal case files, compliance documentation, and client communications.",
              "Improved administrative response time and office efficiency by 20% through scheduling and coordination.",
            ]}
          />
        </div>
      </details>
    </section>
  );
}

export function SelectedProjects() {
  return (
    <div className="featured-projects">
      <article className="featured-project reveal">
        <div className="project-concept aurora-concept" aria-hidden="true">
          <span className="concept-label">01 / WELLNESS, BY DESIGN</span>
          <div className="aurora-halo" />
          <div className="aurora-symbol">
            a<span>✦</span>
          </div>
          <div className="concept-bottom">
            <span>REFLECT</span>
            <span>BUILD HABITS</span>
            <span>CHECK IN</span>
          </div>
        </div>
        <div className="featured-project-copy">
          <div className="project-meta">
            <span>MOBILE APP · AI-ASSISTED WELLNESS</span>
            <span>Oct 2025 — Present</span>
          </div>
          <h3>
            Aurora<span className="purple">.</span>
          </h3>
          <p className="project-subtitle">
            A little space to check in with yourself.
          </p>
          <p className="work-description">
            A cross-platform mental health and wellness app for self-care
            tracking, journaling, and emotional reflection, with AI-assisted
            personalized insights.
          </p>
          <div className="project-tech-row">
            <TechLogo name="Flutter" icon="flutter" />
            <TechLogo name="Firebase" icon="firebase" />
            <span className="work-tech">Dart</span>
          </div>
          <details className="project-details">
            <summary>
              Explore the engineering <span aria-hidden="true">+</span>
            </summary>
            <ul className="work-bullets">
              <li>Flutter and Dart power the cross-platform app experience.</li>
              <li>
                Firebase Authentication, Cloud Storage, and Firestore support
                accounts and real-time sync across devices.
              </li>
              <li>
                Push notifications deliver mood check-ins, habit reminders, and
                mindfulness prompts.
              </li>
              <li>
                Natural language tools provide personalized wellness insights
                and coping strategies from user inputs.
              </li>
            </ul>
          </details>
        </div>
      </article>
      <article className="featured-project reveal">
        <div className="project-concept metrics-concept" aria-hidden="true">
          <span className="concept-label">02 / PATTERNS INTO PREDICTIONS</span>
          <div className="model-visual">
            <div className="model-inputs">
              <span>LIFESTYLE</span>
              <span>BEHAVIOR</span>
              <span>DEVICE USE</span>
            </div>
            <span className="model-connector" />
            <div className="model-core">
              <span>MLP</span>
              <small>PyTorch</small>
            </div>
            <span className="model-connector" />
            <div className="model-output">
              QoL<small>PREDICTION</small>
            </div>
          </div>
          <div className="concept-bottom">
            <span>PREPROCESS</span>
            <span>TRAIN</span>
            <span>PREDICT</span>
          </div>
        </div>
        <div className="featured-project-copy">
          <div className="project-meta">
            <span>APPLIED MACHINE LEARNING</span>
            <span>Nov — Dec 2025</span>
          </div>
          <h3>
            MindMetrics<span className="purple">-ML.</span>
          </h3>
          <p className="project-subtitle">
            Connecting everyday patterns to quality of life.
          </p>
          <p className="work-description">
            An end-to-end regression pipeline that predicts quality-of-life
            outcomes from behavioral, lifestyle, mental-health, and device-usage
            data.
          </p>
          <div className="project-tech-row">
            <TechLogo name="PyTorch" icon="pytorch" />
            <TechLogo name="Streamlit" icon="streamlit" />
            <span className="work-tech">Python</span>
          </div>
          <details className="project-details">
            <summary>
              Explore the engineering <span aria-hidden="true">+</span>
            </summary>
            <ul className="work-bullets">
              <li>
                Preprocessed and standardized input data with pandas and
                scikit-learn.
              </li>
              <li>
                Trained a PyTorch multilayer perceptron using ReLU, dropout, and
                Adam optimization.
              </li>
              <li>
                Used validation-based checkpointing to select model weights.
              </li>
              <li>
                Deployed the model through Streamlit for real-time predictions
                from user-provided inputs.
              </li>
            </ul>
          </details>
        </div>
      </article>
    </div>
  );
}

export function EducationAndSkills() {
  return (
    <section
      className="section shell portfolio-foundations"
      aria-labelledby="foundations-heading"
    >
      <div className="reveal">
        <SectionLabel number="03">THE FOUNDATION</SectionLabel>
        <h2 id="foundations-heading">
          Always building.
          <br />
          <span className="muted">Always learning.</span>
        </h2>
        <div className="education-card">
          <span className="work-highlight">EXPECTED JUNE 2027</span>
          <h3>Ontario Tech University</h3>
          <p>
            Bachelor of Science (Co-Op)
            <br />
            Computer Science
          </p>
          <span className="experience-date">
            Sep 2022 — Jun 2027 · Oshawa, ON
          </span>
        </div>
      </div>
      <div className="skills-groups reveal">
        <div>
          <h3>Data & machine learning</h3>
          <p>
            Python, SQL, PyTorch, scikit-learn, pandas, NumPy, Matplotlib, Power
            BI
          </p>
        </div>
        <div>
          <h3>Apps & interfaces</h3>
          <p>Flutter, Dart, React, JavaScript, Streamlit</p>
        </div>
        <div>
          <h3>Cloud & integrations</h3>
          <p>
            Google Cloud Platform, BigQuery, Firebase, Genesys Cloud API, REST
            APIs
          </p>
        </div>
        <div>
          <h3>Engineering & delivery</h3>
          <p>Git, Java, C++, C, Go, Jira, Azure DevOps, Maven</p>
        </div>
      </div>
    </section>
  );
}
