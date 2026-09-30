"use client";

import { useEffect, useState } from "react";

const homeLines = ["Curiosity.", "Code.", "Possibility."];

export function TerminalHeading({
  lines = homeLines,
}: {
  lines?: readonly string[];
}) {
  const [frame, setFrame] = useState({ count: 0, caretOn: true });

  useEffect(() => {
    const characters = lines.flatMap((line, lineIndex) =>
      Array.from(line, (letter, index) => ({
        letter,
        lineIndex,
        duration: index === line.length - 1 ? 220 : 65 + (index % 3) * 20,
      })),
    );
    const revealTimes = characters.reduce<number[]>((times, _, index) => {
      times.push(
        index === 0 ? 640 : times[index - 1] + characters[index - 1].duration,
      );
      return times;
    }, []);
    const typingEnd = revealTimes[revealTimes.length - 1];
    const animationEnd = typingEnd + 2100;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let request = 0;
    let started: number | undefined;

    function tick(now: number) {
      if (cancelled) return;
      started ??= now;
      const elapsed = now - started;
      const count = motion.matches
        ? characters.length
        : revealTimes.filter((time) => elapsed >= time).length;
      const caretOn =
        !motion.matches &&
        elapsed < animationEnd &&
        (elapsed < 640
          ? Math.floor(elapsed / 160) % 2 === 0
          : elapsed < typingEnd ||
            Math.floor((elapsed - typingEnd) / 350) % 2 === 0);
      setFrame((previous) =>
        previous.count === count && previous.caretOn === caretOn
          ? previous
          : { count, caretOn },
      );
      if (!motion.matches && elapsed < animationEnd)
        request = requestAnimationFrame(tick);
    }

    function updateMotion() {
      cancelAnimationFrame(request);
      // Once reduced motion is requested, leave the heading complete.
      if (motion.matches) started = performance.now() - animationEnd;
      request = requestAnimationFrame(tick);
    }

    // Start only after the font metrics have settled.
    void document.fonts.ready.then(() => {
      if (!cancelled) request = requestAnimationFrame(tick);
    });
    motion.addEventListener("change", updateMotion);
    return () => {
      cancelled = true;
      cancelAnimationFrame(request);
      motion.removeEventListener("change", updateMotion);
    };
  }, [lines]);

  return (
    <h1 className="terminal-heading" aria-label={lines.join(" ")}>
      <span className="terminal-visual" aria-hidden="true">
        {lines.map((line, lineIndex) => {
          const offset = lines.slice(0, lineIndex).join("").length;
          return (
            <span className="terminal-line" key={line}>
              {Array.from(line).map((letter, index) => {
                const position = offset + index;
                const hasCaret =
                  frame.caretOn && position === Math.max(0, frame.count - 1);
                return (
                  <span className="terminal-character" key={index}>
                    <span
                      className={`terminal-glyph${lineIndex === lines.length - 1 ? " gradient-text" : ""}`}
                      data-visible={position < frame.count}
                    >
                      {letter}
                    </span>
                    {hasCaret && (
                      <span
                        className={`terminal-caret${frame.count === 0 ? " terminal-caret-start" : ""}`}
                      />
                    )}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
