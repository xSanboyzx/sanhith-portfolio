import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/design";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Sanhith Amarathunge" },
  description: "This page could not be found. Head home or explore my projects.",
};

export default function NotFound() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="404">A WRONG TURN</SectionLabel>
      <div className="page-heading">
        <h1>
          Page not found<span className="purple">.</span>
        </h1>
        <p>
          This page may have moved, or the address might be incorrect.
          <br />
          There’s still plenty to explore.
        </p>
      </div>
      <div className="button-row not-found-actions">
        <Link className="button primary" href="/">
          Back to home <Arrow />
        </Link>
        <Link className="text-link" href="/projects">
          Explore projects <Arrow />
        </Link>
      </div>
    </div>
  );
}
