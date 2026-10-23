import { TerminalHeading } from "@/components/terminal-heading";
import { createPageMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/design";
import { SelectedProjects } from "@/components/portfolio-work";

export const metadata = createPageMetadata({
  title: "Projects | Sanhith Amarathunge",
  description:
    "Explore Sanhith Amarathunge's software and machine learning projects, from a wellness companion to an applied ML pipeline.",
  path: "/projects",
});

export default function Projects() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="02">EXPERIMENTS & EXPLORATIONS</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["From a small idea.", "To something real."]} />
        <p>
          Two academic builds, from a wellness app to a machine learning pipeline.
          <br />
          The problems, the engineering, and the work I contributed.
        </p>
      </div>
      <div className="collection-bar">
        <span>
          <span className="status-dot" /> TWO PROJECTS / TWO CASE STUDIES
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
            Explore the repositories for code, setup instructions, and the
            implementation behind each case study.
          </p>
        </div>
        <Link href="/contact" className="text-link">
          Talk about a project <Arrow />
        </Link>
      </div>
    </div>
  );
}
