import Link from "next/link";
import { LanguageRibbon } from "@/components/language-ribbon";
import { TerminalHeading } from "@/components/terminal-heading";
import { Arrow, Orb, ProjectCard, SectionLabel } from "@/components/design";

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow hero-enter">
            <span className="status-dot" /> A PERSONAL SPACE ON THE INTERNET
          </div>
          <TerminalHeading />
          <p className="hero-description hero-enter delay-2">
            Hey, I’m Sanhith. Welcome to my corner of the web.
            <br className="desktop-break" /> A place for the things I build,
            explore, and imagine.
          </p>
          <div className="button-row hero-enter delay-3">
            <Link className="button primary" href="/projects">
              Explore my work <Arrow />
            </Link>
            <Link className="text-link" href="/about">
              A little about me <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-art hero-enter delay-2">
          <Orb />
          <div className="art-coordinate">FIG. 001 — IDEAS IN ORBIT</div>
        </div>
        <a href="#selected" className="scroll-cue">
          <span className="scroll-line" /> SCROLL TO EXPLORE
        </a>
        <span className="hero-index">
          INDEPENDENT MIND. ENDLESS POSSIBILITIES.
        </span>
      </section>
      <LanguageRibbon />
      <section className="section shell" id="selected">
        <div className="section-heading reveal">
          <div>
            <SectionLabel number="01">THE WORK</SectionLabel>
            <h2>
              Ideas, taking shape<span className="purple">.</span>
            </h2>
          </div>
          <Link href="/projects" className="text-link">
            All projects <Arrow />
          </Link>
        </div>
        <p className="section-intro reveal">
          A space for experiments, side quests, and things worth building.
          <br />
          The first projects will land here soon.
        </p>
        <div className="project-grid">
          <ProjectCard
            variant="orbit"
            number="01"
            title="Something from nothing"
            category="THE FIRST BUILD"
          />
          <ProjectCard
            variant="grid"
            number="02"
            title="Room to experiment"
            category="THE NEXT EXPLORATION"
          />
        </div>
      </section>
      <section className="about-strip shell section">
        <div className="reveal">
          <SectionLabel number="02">BEHIND THE SCREEN</SectionLabel>
          <h2>
            A work in progress.
            <br />
            <span className="muted">In the best way.</span>
          </h2>
        </div>
        <div className="about-strip-copy reveal">
          <p>
            This is a living collection of what catches my curiosity and what
            comes out of following it. Part portfolio, part playground. There’s
            plenty more to come.
          </p>
          <Link href="/about" className="text-link">
            Meet the person behind it <Arrow />
          </Link>
        </div>
      </section>
      <section className="shell">
        <div className="contact-banner reveal">
          <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
          <h2>Have a spark of an idea?</h2>
          <Link className="button primary" href="/contact">
            Let’s connect <Arrow />
          </Link>
          <span className="banner-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </>
  );
}
