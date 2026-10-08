import { TerminalHeading } from "@/components/terminal-heading";
import { createPageMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import { Arrow, Orb, SectionLabel } from "@/components/design";

export const metadata = createPageMetadata({
  title: "About | Sanhith Amarathunge",
  description:
    "Meet Sanhith Amarathunge, a computer science student exploring software, data, and the ideas behind his work.",
  path: "/about",
});

export default function About() {
  return (
    <div className="shell inner-page">
      <SectionLabel number="01">A LITTLE CONTEXT</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["Behind the code.", "A curious mind."]} />
        <p>Hey, I’m Sanhith. This is where my story will unfold.</p>
      </div>
      <div className="about-grid">
        <div className="about-art reveal">
          <Orb />
          <span className="art-coordinate">ALWAYS A WORK IN PROGRESS</span>
        </div>
        <div className="about-story reveal">
          <span className="eyebrow">HELLO, INTERNET.</span>
          <h2>
            A space to build.
            <br />
            And to become.
          </h2>
          <p>
            I’m putting together a home for my projects, interests, and the
            things I learn along the way. This portfolio is the first piece of
            that story.
          </p>
          <p>
            More about my background, experience, and what I’m working toward
            will be added here soon.
          </p>
          <Link href="/projects" className="text-link">
            See what’s taking shape <Arrow />
          </Link>
        </div>
      </div>
      <section className="section">
        <div className="reveal">
          <SectionLabel number="02">THE NEXT CHAPTERS</SectionLabel>
          <h2>
            There’s more to the story<span className="purple">.</span>
          </h2>
        </div>
        <div className="chapter-grid">
          {[
            [
              "01",
              "The journey",
              "Education, experience, and the moments that shaped my path.",
            ],
            [
              "02",
              "The toolkit",
              "The technologies and tools I reach for when an idea takes hold.",
            ],
            [
              "03",
              "Outside the screen",
              "Interests, inspirations, and everything in between.",
            ],
          ].map(([num, title, description]) => (
            <div key={num} className="chapter reveal">
              <span className="chapter-number">{num}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="eyebrow">STORY COMING SOON</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
