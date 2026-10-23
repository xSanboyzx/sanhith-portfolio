import Link from "next/link";
import { Arrow, Orb, SectionLabel } from "@/components/design";
import { TerminalHeading } from "@/components/terminal-heading";
import { contactDetails } from "@/lib/contact-details";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "About | Sanhith Amarathunge",
  description:
    "Meet Sanhith Amarathunge, a final-year Computer Science co-op student at Ontario Tech specializing in Data Science, with interests in software and data.",
  path: "/about",
});

export default function About() {
  return (
    <div className="shell inner-page about-page">
      <SectionLabel number="01">A LITTLE CONTEXT</SectionLabel>
      <div className="page-heading">
        <TerminalHeading lines={["Behind the code.", "A curious mind."]} />
        <p>
          Hey, I’m Sanhith, a final-year student at Ontario Tech pursuing a
          Bachelor of Science in Computer Science (Co-op), specializing in Data
          Science. I’m graduating in October 2027, and I’m interested in both
          building software and understanding what we can learn from data.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-art reveal">
          <Orb />
          <span className="art-coordinate">ALWAYS A WORK IN PROGRESS</span>
        </div>
        <div className="about-story reveal">
          <span className="eyebrow">HOW IT STARTED</span>
          <h2>Curiosity started early.</h2>
          <p>
            My dad works in IT, and growing up around that sparked my interest in
            computers. Both the hardware and the software caught my attention. I
            loved learning how computers worked, and that curiosity eventually
            led me to computer science.
          </p>
          <p>
            Since then, I’ve explored that interest through my studies,
            internships, and team projects. At Scotiabank, I worked on data
            workflows and reporting that helped teams make sense of operational
            information. Through application projects, I’ve also enjoyed turning
            an idea into an interface someone can interact with. I’m still
            exploring where those interests will take me.
          </p>
          <Link href="/projects" className="text-link">
            Explore my projects <Arrow />
          </Link>
        </div>
      </div>
      <section className="section" aria-labelledby="about-snapshots-heading">
        <div className="reveal">
          <SectionLabel number="02">A FEW MORE SIDES</SectionLabel>
          <h2 id="about-snapshots-heading">
            More than the code<span className="purple">.</span>
          </h2>
        </div>
        <div className="chapter-grid">
          {[
            [
              "01",
              "Building and understanding",
              "I like work that brings software and data together. Aurora gave me a chance to build wellness tools and mood visualizations in Flutter. MindMetrics let me explore a machine learning pipeline, from preparing synthetic data to training a model and building an interface around it.",
            ],
            [
              "02",
              "Learning with others",
              "As Technical Director for Ontario Tech’s Google Developer Group, I helped run workshops and mentor students working on their own projects. I enjoy sharing what I’ve learned, hearing how someone else approaches a problem, and figuring things out together on a team.",
            ],
            [
              "03",
              "Outside the screen",
              "Music is a big part of my life, and I’d love to become a producer one day. Outside of coding, you’ll also find me at the gym, playing video games, or enjoying basketball.",
            ],
          ].map(([num, title, description]) => (
            <div key={num} className="chapter reveal">
              <span className="chapter-number">{num}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="section about-next reveal"
        aria-labelledby="about-next-heading"
      >
        <SectionLabel number="03">WHAT’S NEXT</SectionLabel>
        <h2 id="about-next-heading">A new chapter ahead.</h2>
        <p>
          After graduating in October 2027, I’m looking to start a full-time role
          in software development or data. I’d like to keep building, learn from
          experienced teammates, and contribute to work people find useful. If
          that sounds like a fit for your team, I’d love to connect.
        </p>
        <div className="button-row">
          <Link href="/contact" className="button primary">
            Let’s connect <Arrow />
          </Link>
          <a href={contactDetails.resumeHref} className="text-link">
            View résumé (PDF) <Arrow />
          </a>
        </div>
      </section>
    </div>
  );
}
