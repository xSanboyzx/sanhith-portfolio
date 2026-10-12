"use client";

import { useEffect, useRef, useState } from "react";
import { ExplorationLink } from "./homepage-exploration";
import styles from "./section-tracker.module.css";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "selected", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof sections)[number]["id"];

export function SectionTracker() {
  const trackerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("experience");

  useEffect(() => {
    const tracker = trackerRef.current;

    if (!tracker) return;

    const root = document.documentElement;
    const property = "--homepage-tracker-height";
    const previousHeight = root.style.getPropertyValue(property);
    const previousPriority = root.style.getPropertyPriority(property);
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      const headerHeight = document
        .querySelector(".site-header")
        ?.getBoundingClientRect().height ?? 96;
      const clearance = headerHeight + tracker.getBoundingClientRect().height + 24;
      let nextSection: SectionId = "experience";

      for (const section of sections) {
        const target = document.getElementById(section.id);

        if (target && target.getBoundingClientRect().top <= clearance) {
          nextSection = section.id;
        }
      }

      const contact = document.getElementById("contact");
      const atBottom =
        window.scrollY + window.innerHeight >= root.scrollHeight - 3;

      if (
        atBottom &&
        contact &&
        contact.getBoundingClientRect().top < window.innerHeight
      ) {
        nextSection = "contact";
      }

      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    const measureTracker = () => {
      const height = `${Math.ceil(tracker.getBoundingClientRect().height)}px`;

      if (root.style.getPropertyValue(property) !== height) {
        root.style.setProperty(property, height);
      }

      scheduleUpdate();
    };

    const trackerObserver = new ResizeObserver(measureTracker);
    const contentObserver = new ResizeObserver(scheduleUpdate);
    trackerObserver.observe(tracker);
    contentObserver.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measureTracker);
    measureTracker();

    return () => {
      window.cancelAnimationFrame(frame);
      trackerObserver.disconnect();
      contentObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measureTracker);

      if (previousHeight) {
        root.style.setProperty(property, previousHeight, previousPriority);
      } else {
        root.style.removeProperty(property);
      }
    };
  }, []);

  return (
    <nav
      ref={trackerRef}
      className={styles.tracker}
      aria-label="Homepage sections"
      data-homepage-tracker
    >
      <div className={styles.links}>
        {sections.map((section) => (
          <ExplorationLink
            key={section.id}
            href={`#${section.id}`}
            className={styles.link}
            aria-current={activeSection === section.id ? "location" : undefined}
          >
            {section.label}
          </ExplorationLink>
        ))}
      </div>
    </nav>
  );
}
