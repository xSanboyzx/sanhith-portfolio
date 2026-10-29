"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import type { SkillCategory } from "@/lib/portfolio-content";
import {
  ExplorationLink,
  useHomepageExploration,
} from "@/components/homepage-exploration";
import styles from "./skill-explorer.module.css";

const subscribeToHydration = () => () => {};
const hydratedSnapshot = () => true;
const serverSnapshot = () => false;

export function SkillExplorer({
  categories,
}: {
  categories: readonly SkillCategory[];
}) {
  const { selectedSkill, selectSkill } = useHomepageExploration();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    hydratedSnapshot,
    serverSnapshot,
  );
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === selectedSkill),
  );

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % categories.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + categories.length) % categories.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = categories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectSkill(categories[nextIndex].id);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <div className={styles.explorer}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Skill categories"
        hidden={!hydrated}
      >
        {categories.map((category, index) => (
          <button
            className={styles.tab}
            key={category.id}
            id={`skill-tab-${category.id}`}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-controls={`skill-panel-${category.id}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => selectSkill(category.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {categories.map((category, index) => (
        <section
          className={styles.panel}
          key={category.id}
          id={`skill-panel-${category.id}`}
          role={hydrated ? "tabpanel" : undefined}
          aria-labelledby={
            hydrated ? `skill-tab-${category.id}` : `skill-title-${category.id}`
          }
          tabIndex={hydrated ? 0 : undefined}
          hidden={hydrated && index !== selectedIndex}
        >
          <p className={styles.fileLabel}>TOOLS / IN PRACTICE</p>
          <h3 id={`skill-title-${category.id}`}>{category.label}</h3>
          <ul className={styles.tools} aria-label={`${category.label} tools`}>
            {category.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <p className={styles.exampleLabel}>See these skills in practice</p>
          <div className={styles.examples}>
            {category.examples.map((example) => (
              <ExplorationLink
                key={example.id}
                href={`#${example.id}`}
                className={styles.example}
              >
                <span>{example.label}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↑
                </span>
              </ExplorationLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
