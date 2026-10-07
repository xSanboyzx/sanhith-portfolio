"use client";

import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { Arrow } from "./design";
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
        <div className="button-row hero-enter delay-3">
          <Link className="button primary" href="#selected">
            Explore my work <Arrow />
          </Link>
          <Link className="text-link" href="#experience">
            My experience <Arrow />
          </Link>
        </div>
      </div>
      <div className={`hero-art ${styles.artwork}`} data-ready={characterReady}>
        {artwork}
        <div className="art-coordinate">FIG. 001 — MIDNIGHT CODER</div>
      </div>
      <a href="#selected" className="scroll-cue">
        <span className="scroll-line" /> SCROLL TO EXPLORE
      </a>
      <span className="hero-index">
        INDEPENDENT MIND. ENDLESS POSSIBILITIES.
      </span>
    </section>
  );
}
