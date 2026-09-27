import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ProjectCard, SectionLabel } from "@/components/design";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="02">EXPERIMENTS & EXPLORATIONS</SectionLabel>
      <div className="page-heading hero-enter">
        <h1>
          From a small idea.
          <br />
          <span className="gradient-text">To something real.</span>
        </h1>
        <p>
          A growing collection of things made with intention.
          <br />
          The work starts here.
        </p>
      </div>
      <div className="collection-bar">
        <span>
          <span className="status-dot" /> THE COLLECTION
        </span>
        <span>FIRST PROJECTS COMING SOON</span>
      </div>
      <div className="project-grid">
        <ProjectCard
          variant="orbit"
          number="01"
          title="Something from nothing"
          category="FUTURE PROJECT / 01"
        />
        <ProjectCard
          variant="grid"
          number="02"
          title="Room to experiment"
          category="FUTURE PROJECT / 02"
        />
      </div>
      <div className="project-note reveal">
        <span className="purple" aria-hidden="true">
          ✳
        </span>
        <div>
          <h2>Every project has a first commit.</h2>
          <p>
            These are placeholders for upcoming work. Real projects, case
            studies, and source links will take their place as the collection
            grows.
          </p>
        </div>
        <Link href="/about" className="text-link">
          More about me <Arrow />
        </Link>
      </div>
    </div>
  );
}
