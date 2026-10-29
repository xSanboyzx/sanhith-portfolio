"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const animationQuery = "(prefers-reduced-motion: no-preference)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(animationQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const canAnimateOnClient = () => window.matchMedia(animationQuery).matches;
const canAnimateOnServer = () => false;

const languages = [
  { name: "Python", icon: "python" },
  { name: "Java", icon: "java" },
  { name: "SQL", icon: "sql" },
  { name: "JavaScript", icon: "javascript" },
  { name: "C++", icon: "cplusplus" },
  { name: "C", icon: "c" },
  { name: "Go", icon: "go" },
  { name: "Dart", icon: "dart" },
  { name: "TypeScript", icon: "typescript" },
];

export function LanguageRibbon() {
  const [paused, setPaused] = useState(false);
  const canAnimate = useSyncExternalStore(
    subscribeToMotion,
    canAnimateOnClient,
    canAnimateOnServer,
  );

  return (
    <section
      className="ticker"
      aria-labelledby="language-ribbon-heading"
      data-animated={canAnimate}
      data-paused={paused}
    >
      <div className="ticker-controls shell">
        <h2 id="language-ribbon-heading">Languages I use</h2>
        <button
          type="button"
          className="ticker-toggle"
          hidden={!canAnimate}
          aria-controls="language-ticker-track"
          aria-label={
            paused
              ? "Play animation for languages"
              : "Pause animation for languages"
          }
          onClick={() => setPaused((previous) => !previous)}
        >
          {paused ? "Play animation" : "Pause animation"}
        </button>
      </div>
      <ul className={`ticker-static${canAnimate ? " sr-only" : " shell"}`}>
        {languages.map(({ name, icon }) => (
          <li key={icon} className="ticker-item">
            <Image
              className="ticker-logo"
              src={`/icons/languages/${icon}.svg`}
              width={36}
              height={36}
              alt=""
              unoptimized
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
      <div
        className="ticker-track"
        id="language-ticker-track"
        aria-hidden="true"
        hidden={!canAnimate}
      >
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {languages.map(({ name, icon }) => (
              <span className="ticker-item" key={icon}>
                <Image
                  className="ticker-logo"
                  src={`/icons/languages/${icon}.svg`}
                  width={36}
                  height={36}
                  alt=""
                  loading="eager"
                  unoptimized
                />
                <span>{name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
