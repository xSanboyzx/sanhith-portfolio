import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/design";
import { Dossier, ExpandAllControl } from "@/components/homepage-exploration";
import { SkillExplorer } from "@/components/skill-explorer";
import {
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

export function SelectedProjects({
  presentation = "standard",
}: {
  presentation?: "standard" | "dossier";
}) {
  const isDossier = presentation === "dossier";

  return (
    <div className="featured-projects">
      {projects.map((project, index) => (
        <article
          className="featured-project reveal"
          id={isDossier ? project.id : undefined}
          key={project.id}
        >
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
            <h3
              id={isDossier ? `${project.id}-heading` : undefined}
              tabIndex={isDossier ? -1 : undefined}
            >
              {project.title}
              <span className="purple">{project.titleAccent}</span>
            </h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="work-description">{project.description}</p>
            <div className="project-tech-row">
              {project.tools.map((tool) =>
                tool.icon ? (
                  <TechLogo name={tool.name} icon={tool.icon} key={tool.name} />
                ) : (
                  <span className="work-tech" key={tool.name}>
                    {tool.name}
                  </span>
                ),
              )}
            </div>
            {isDossier ? (
              <Dossier
                id={project.id}
                group="projects"
                openLabel="Explore this build"
                closeLabel="Close build details"
              >
                <DossierBullets items={project.highlights} />
              </Dossier>
            ) : (
              <details className="project-details">
                <summary>
                  Explore the engineering <span aria-hidden="true">+</span>
                </summary>
                <ul className="work-bullets">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
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
          <span className="work-highlight">EXPECTED JUNE 2027</span>
          <h3 id="education-heading" tabIndex={-1}>
            Ontario Tech University
          </h3>
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
      <SkillExplorer categories={skillCategories} />
    </section>
  );
}
