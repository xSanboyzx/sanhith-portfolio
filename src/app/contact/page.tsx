import { TerminalHeading } from "@/components/terminal-heading";
import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/design";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="03">START A CONVERSATION</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["Good ideas.", "Better together."]} />
        <p>
          A question, a collaboration, or just a hello.
          <br />
          This will be the place to get in touch.
        </p>
      </div>
      <div className="contact-panel reveal">
        <div>
          <span className="contact-symbol" aria-hidden="true">
            ↗
          </span>
          <span className="eyebrow">LET’S MAKE A CONNECTION</span>
          <h2>
            The conversation
            <br />
            starts here.
          </h2>
          <p>
            Contact details and social links are on their way.
            <br />
            Check back soon for the best way to reach me.
          </p>
          <span className="contact-status">
            <span className="status-dot" /> CONTACT CHANNELS COMING SOON
          </span>
        </div>
        <div className="contact-orbits" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>
            say
            <br />
            <em>hello.</em>
          </span>
        </div>
      </div>
      <Link className="text-link contact-back" href="/">
        Back to exploring <Arrow />
      </Link>
    </div>
  );
}
