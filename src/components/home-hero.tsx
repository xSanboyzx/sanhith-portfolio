"use client";

import { useCallback, useState, type ReactNode } from "react";
import { contactDetails } from "@/lib/contact-details";
import { Arrow } from "./design";
import { ExplorationLink } from "./homepage-exploration";
import { TerminalHeading } from "./terminal-heading";
import styles from "./home-hero.module.css";

export function HomeHero({ artwork }: { artwork: ReactNode }) {
  const [characterReady, setCharacterReady] = useState(false);
  const finishTyping = useCallback(() => setCharacterReady(true), []);

  return (
    <section className="hero shell">
      <div className="hero-copy">
        <div className="eyebrow hero-enter">
          <span className="status-dot" /> SANHITH AMARATHUNGE / COMPUTER SCIENCE
        </div>
        <TerminalHeading onTypingComplete={finishTyping} />
        <p className="hero-description hero-enter delay-2">
          Hey, I’m Sanhith. I turn data into useful insights
          <br className="desktop-break" /> and ideas into thoughtful software.
          <br /> From enterprise analytics to apps built around people.
        </p>
        <div className="button-row hero-actions hero-enter delay-3">
          <ExplorationLink className="button primary" href="#selected">
            Explore my work <Arrow />
          </ExplorationLink>
          <ExplorationLink className="text-link" href="#experience">
            My experience <Arrow />
          </ExplorationLink>
          <a className="text-link" href={contactDetails.resumeHref}>
            View résumé (PDF) <Arrow />
          </a>
        </div>
      </div>
      <div className={`hero-art ${styles.artwork}`} data-ready={characterReady}>
        {artwork}
        <div className="art-coordinate">FIG. 001 — MIDNIGHT CODER</div>
      </div>
      <ExplorationLink href="#selected" className="scroll-cue">
        <span className="scroll-line" /> SCROLL TO EXPLORE
      </ExplorationLink>
      <span className="hero-index">
        INDEPENDENT MIND. ENDLESS POSSIBILITIES.
      </span>
    </section>
  );
}
