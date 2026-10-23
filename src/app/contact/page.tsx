import { TerminalHeading } from "@/components/terminal-heading";
import { createPageMetadata } from "@/lib/site-metadata";
import { contactDetails } from "@/lib/contact-details";
import Link from "next/link";
import { Arrow, SectionLabel } from "@/components/design";

export const metadata = createPageMetadata({
  title: "Contact | Sanhith Amarathunge",
  description:
    "Get in touch with Sanhith Amarathunge about software, data, collaborations, and opportunities.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="03">START A CONVERSATION</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["Good ideas.", "Better together."]} />
        <p>
          A question, a collaboration, or just a hello.
          <br />
          I’d love to hear what you have in mind.
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
            Interested in my work? Get in touch about software, data,
            collaborations, or opportunities.
          </p>
          <a className="contact-email" href={contactDetails.emailHref}>
            {contactDetails.email}
          </a>
          <div className="button-row contact-actions">
            <a className="button primary" href={contactDetails.emailHref}>
              Send an email <Arrow />
            </a>
            <a
              className="text-link"
              href={contactDetails.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <Arrow />
            </a>
            <a className="text-link" href={contactDetails.resumeHref}>
              View résumé (PDF) <Arrow />
            </a>
          </div>
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
