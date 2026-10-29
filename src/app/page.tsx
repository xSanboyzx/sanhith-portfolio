import Link from "next/link";
import { contactDetails } from "@/lib/contact-details";
import { education } from "@/lib/portfolio-content";
import { LanguageRibbon } from "@/components/language-ribbon";
import { HomeHero } from "@/components/home-hero";
import { Arrow, SectionLabel } from "@/components/design";
import { MidnightCoder } from "@/components/midnight-coder";
import {
  ExpandAllControl,
  ExplorationLink,
  HomepageExploration,
} from "@/components/homepage-exploration";
import { SectionTracker } from "@/components/section-tracker";
import {
  createPageMetadata,
  homeDescription,
  homeTitle,
} from "@/lib/site-metadata";

import {
  EducationAndSkills,
  Experience,
  SelectedProjects,
} from "@/components/portfolio-work";

export const metadata = createPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

export default function Home() {
  return (
    <HomepageExploration>
      <HomeHero artwork={<MidnightCoder />} />
      <LanguageRibbon />
      <div className="impact-strip shell" aria-label="Career highlights">
        <ExplorationLink href="#experience-kochasoft" className="impact-link">
          <strong>
            25<span>%</span>
          </strong>
          <p>
            Less infrastructure downtime
            <span>Kochasoft · Server transitions</span>
          </p>
        </ExplorationLink>
        <ExplorationLink href="#experience-gdg" className="impact-link">
          <strong>
            50<span>+</span>
          </strong>
          <p>
            Students engaged<span>GDG · Technical workshops</span>
          </p>
        </ExplorationLink>
        <ExplorationLink href="#education" className="impact-link">
          <strong>{education.graduationYear}</strong>
          <p>
            Expected graduation<span>Ontario Tech · Computer Science</span>
          </p>
        </ExplorationLink>
      </div>
      <SectionTracker />
      <Experience />
      <section
        className="section shell"
        id="selected"
        aria-labelledby="selected-heading"
      >
        <div className="section-heading reveal">
          <div>
            <SectionLabel number="02">SELECTED BUILDS</SectionLabel>
            <h2 id="selected-heading" tabIndex={-1}>
              Built with purpose<span className="purple">.</span>
            </h2>
          </div>
          <div className="exploration-section-actions">
            <ExpandAllControl group="projects" />
            <Link href="/projects" className="text-link">
              All projects <Arrow />
            </Link>
          </div>
        </div>
        <p className="section-intro reveal">
          Thoughtful software, from a daily wellness companion to an applied ML
          pipeline.
        </p>
        <SelectedProjects presentation="dossier" />
      </section>
      <EducationAndSkills />
      <section className="shell" id="contact" aria-labelledby="contact-heading">
        <div className="contact-banner reveal">
          <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
          <h2 id="contact-heading" tabIndex={-1}>
            Let’s build something useful.
          </h2>
          <p className="home-contact-copy">
            Interested in my work? Let’s talk about software, data, or your next
            project.
          </p>
          <div className="button-row">
            <a
              className="button primary"
              href={contactDetails.emailHref}
            >
              Get in touch <Arrow />
            </a>
            <a
              className="text-link"
              href={contactDetails.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <Arrow />
            </a>
          </div>
          <span className="banner-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </HomepageExploration>
  );
}
