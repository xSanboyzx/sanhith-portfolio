import Link from "next/link";
import { LanguageRibbon } from "@/components/language-ribbon";
import { HomeHero } from "@/components/home-hero";
import { Arrow, SectionLabel } from "@/components/design";
import { MidnightCoder } from "@/components/midnight-coder";

import {
  EducationAndSkills,
  Experience,
  SelectedProjects,
} from "@/components/portfolio-work";

export default function Home() {
  return (
    <>
      <HomeHero artwork={<MidnightCoder />} />
      <LanguageRibbon />
      <div className="impact-strip shell" aria-label="Career highlights">
        <div>
          <strong>
            25<span>%</span>
          </strong>
          <p>
            Less infrastructure downtime
            <span>Kochasoft · Server transitions</span>
          </p>
        </div>
        <div>
          <strong>
            50<span>+</span>
          </strong>
          <p>
            Students engaged<span>GDG · Technical workshops</span>
          </p>
        </div>
        <div>
          <strong>2027</strong>
          <p>
            Expected graduation<span>Ontario Tech · Computer Science</span>
          </p>
        </div>
      </div>
      <Experience />
      <section className="section shell" id="selected">
        <div className="section-heading reveal">
          <div>
            <SectionLabel number="02">SELECTED BUILDS</SectionLabel>
            <h2>
              Built with purpose<span className="purple">.</span>
            </h2>
          </div>
          <Link href="/projects" className="text-link">
            All projects <Arrow />
          </Link>
        </div>
        <p className="section-intro reveal">
          Thoughtful software, from a daily wellness companion to an applied ML
          pipeline.
        </p>
        <SelectedProjects />
      </section>
      <EducationAndSkills />
      <section className="shell">
        <div className="contact-banner reveal">
          <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
          <h2>Let’s build something useful.</h2>
          <p className="home-contact-copy">
            Interested in my work? Let’s talk about software, data, or your next
            project.
          </p>
          <div className="button-row">
            <a
              className="button primary"
              href="mailto:sanhith.amarathunge@gmail.com"
            >
              Get in touch <Arrow />
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/sanhith-amarathunge"
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
    </>
  );
}
