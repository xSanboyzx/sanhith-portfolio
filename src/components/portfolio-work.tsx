import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Arrow, SectionLabel } from "@/components/design";
import { Dossier, ExpandAllControl } from "@/components/homepage-exploration";
import { SkillExplorer } from "@/components/skill-explorer";
import {
  education,
  experience,
  projects,
  skillCategories,
  type ProjectRecord,
} from "@/lib/portfolio-content";

function DossierBullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="experience-bullets">
      {items.map((item, index) => (
        <li
          className="experience-bullet dossier-bullet"
          key={item}
          style={
            {
              "--dossier-marker-delay": `${index * 40}ms`,
            } as CSSProperties
          }
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

function TechLogo({ name, iconSrc }: { name: string; iconSrc: string }) {
  return (
    <span className="work-tech">
      <Image
        src={iconSrc}
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
          <h2 id="experience-heading" tabIndex={-1}>
            Real teams. Real outcomes<span className="purple">.</span>
          </h2>
        </div>
        <div className="exploration-section-actions">
          <span className="work-aside">DATA / DEVELOPMENT / DELIVERY</span>
          <ExpandAllControl group="experience" />
        </div>
      </div>
      <p className="section-intro reveal">
        From enterprise analytics to a community of builders.
      </p>
      <div className="experience-list">
        {experience.map((job, index) => (
          <article
            className={`experience-entry reveal${job.earlier ? " experience-entry-earlier" : ""}`}
            id={job.id}
            key={job.id}
          >
            <div className="experience-identity">
              <div
                className={`company-logo company-logo-${job.logo ?? "legal"}`}
              >
                {job.logo ? (
                  <Image
                    src={`/icons/portfolio/${job.logo}.svg`}
                    width={180}
                    height={42}
                    alt={job.company}
                    unoptimized
                  />
                ) : (
                  <span className="company-wordmark">{job.company}</span>
                )}
              </div>
              {job.earlier && (
                <p className="experience-era">EARLIER EXPERIENCE</p>
              )}
              <p className="experience-date">{job.date}</p>
              <p className="experience-location">{job.location}</p>
            </div>
            <div className="experience-body">
              <span className="dossier-file-label" aria-hidden="true">
                EXPERIENCE FILE / {String(index + 1).padStart(2, "0")}
              </span>
              <span className="work-highlight">{job.focus}</span>
              <h3 id={`${job.id}-heading`} tabIndex={-1}>
                {job.role}
              </h3>
              <p className="experience-company">{job.company}</p>
              <p className="work-description experience-summary">
                {job.description}
              </p>
              <Tags items={job.tools} />
              <Dossier
                id={job.id}
                group="experience"
                openLabel="View achievements"
                closeLabel="Hide achievements"
              >
                <DossierBullets items={job.highlights} />
              </Dossier>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectArtwork({ artwork }: { artwork: ProjectRecord["artwork"] }) {
  if (artwork === "aurora") {
    return (
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
    );
  }

  return (
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
  );
}

function ProjectActions({
  project,
  isDossier,
}: {
  project: ProjectRecord;
  isDossier: boolean;
}) {
  return (
    <div className="project-actions">
      <a
        className="text-link project-source-link"
        href={project.repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} source on GitHub (opens in a new tab)`}
      >
        <Image
          className="project-github-icon"
          src="/icons/portfolio/github.svg"
          width={18}
          height={18}
          alt=""
          unoptimized
        />
        View source on GitHub <span aria-hidden="true">↗</span>
      </a>
      {isDossier ? (
        <Link
          className="text-link"
          href={`/projects#${project.id}`}
          aria-label={`Read the ${project.name} case study`}
        >
          Read case study <Arrow />
        </Link>
      ) : (
        project.resources.map((resource) => (
          <a
            className="text-link"
            href={resource.href}
            key={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name}: ${resource.label} (opens in a new tab)`}
          >
            {resource.label} <span aria-hidden="true">↗</span>
          </a>
        ))
      )}
    </div>
  );
}

function ProjectOverview({
  project,
  index,
  isDossier,
}: {
  project: ProjectRecord;
  index: number;
  isDossier: boolean;
}) {
  const Heading = isDossier ? "h3" : "h2";

  return (
    <div className="project-overview">
      <ProjectArtwork artwork={project.artwork} />
      <div className="featured-project-copy">
        {isDossier && (
          <span className="dossier-file-label" aria-hidden="true">
            BUILD FILE / {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>
        <Heading
          className="featured-project-title"
          id={`${project.id}-heading`}
          tabIndex={-1}
        >
          {project.title}
          <span className="purple">{project.titleAccent}</span>
        </Heading>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="work-description">{project.description}</p>
        <p className="project-role">
          <span>My role: </span>
          {project.role}
        </p>
        <div className="project-context">
          <span>{project.team}</span>
          <span>{project.status}</span>
        </div>
        <div className="project-tech-row">
          {project.tools.map((tool) =>
            tool.iconSrc ? (
              <TechLogo
                name={tool.name}
                iconSrc={tool.iconSrc}
                key={tool.name}
              />
            ) : (
              <span className="work-tech" key={tool.name}>
                {tool.name}
              </span>
            ),
          )}
        </div>
        <ProjectActions project={project} isDossier={isDossier} />
        {isDossier && (
          <Dossier
            id={project.id}
            group="projects"
            openLabel="Explore this build"
            closeLabel="Close build details"
          >
            <DossierBullets items={project.highlights} />
          </Dossier>
        )}
      </div>
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: ProjectRecord }) {
  return (
    <div className="project-case-study-content">
      <section
        className="project-case-study-section project-case-study-problem"
        aria-labelledby={`${project.id}-problem`}
      >
        <h3 id={`${project.id}-problem`}>The problem</h3>
        <p>{project.caseStudy.problem}</p>
      </section>
      <section
        className="project-case-study-section"
        aria-labelledby={`${project.id}-approach`}
      >
        <h3 id={`${project.id}-approach`}>How it works</h3>
        <ul>
          {project.caseStudy.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section
        className="project-case-study-section"
        aria-labelledby={`${project.id}-contribution`}
      >
        <h3 id={`${project.id}-contribution`}>My contribution</h3>
        <ul>
          {project.caseStudy.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {project.caseStudy.note && (
        <p className="project-case-study-note">{project.caseStudy.note}</p>
      )}
    </div>
  );
}

export function SelectedProjects({
  presentation = "standard",
}: {
  presentation?: "standard" | "dossier";
}) {
  const isDossier = presentation === "dossier";

  return (
    <div className={`featured-projects${isDossier ? "" : " project-case-studies"}`}>
      {projects.map((project, index) => (
        <article
          className={`featured-project reveal${isDossier ? "" : " project-case-study"}`}
          id={project.id}
          aria-labelledby={`${project.id}-heading`}
          tabIndex={isDossier ? undefined : -1}
          key={project.id}
        >
          <ProjectOverview
            project={project}
            index={index}
            isDossier={isDossier}
          />
          {!isDossier && <ProjectCaseStudy project={project} />}
        </article>
      ))}
    </div>
  );
}

export function EducationAndSkills() {
  return (
    <section
      className="section shell portfolio-foundations"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className="reveal">
        <SectionLabel number="03">THE FOUNDATION</SectionLabel>
        <h2 id="skills-heading" tabIndex={-1}>
          Always building.
          <br />
          <span className="muted">Always learning.</span>
        </h2>
        <div className="education-card" id="education">
          <span className="work-highlight">
            EXPECTED {education.expectedGraduation.toUpperCase()}
          </span>
          <h3 id="education-heading" tabIndex={-1}>
            {education.university}
          </h3>
          <p>
            {education.degree}
            <br />
            {education.specialization} specialization
          </p>
          <span className="experience-date">
            {education.dateRange} · {education.location}
          </span>
        </div>
      </div>
      <SkillExplorer categories={skillCategories} />
    </section>
  );
}
