import { TerminalHeading } from "@/components/terminal-heading";
import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/design";
import { SelectedProjects } from "@/components/portfolio-work";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="02">EXPERIMENTS & EXPLORATIONS</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["From a small idea.", "To something real."]} />
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
        <span>MOBILE DEVELOPMENT / APPLIED ML</span>
      </div>
      <SelectedProjects />
      <div className="project-note reveal">
        <span className="purple" aria-hidden="true">
          ✳
        </span>
        <div>
          <h2>From curiosity to implementation.</h2>
          <p>
            My work brings together thoughtful interfaces, cloud-backed apps,
            and practical machine learning. Explore the engineering details
            above for the decisions and tools behind each build.
          </p>
        </div>
        <Link href="/about" className="text-link">
          More about me <Arrow />
        </Link>
      </div>
    </div>
  );
}
