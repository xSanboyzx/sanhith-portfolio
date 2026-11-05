import Image from "next/image";
import styles from "./aurora-showcase.module.css";

const screenshots = [
  {
    file: "journal",
    title: "A moment to reflect",
    description:
      "Mood prompts and a fictional journal entry in Aurora’s Flutter interface.",
  },
  {
    file: "timeline",
    title: "Patterns over time",
    description:
      "The journal timeline with a mood curve, summary statistics, and a heatmap.",
  },
  {
    file: "focus",
    title: "One small step",
    description:
      "The focus timer running alongside task breakdown and routine tools.",
  },
] as const;

export function AuroraShowcase() {
  return (
    <section className={styles.showcase} aria-labelledby="aurora-demo-heading">
      <div className={styles.introduction}>
        <div>
          <h3 id="aurora-demo-heading">Take Aurora for a spin.</h3>
          <p>
            Write a sample reflection, explore mood trends, or try a focus
            timer. The interactive demo uses fictional data that resets on
            refresh. Chat responses are prerecorded examples. No account needed.
          </p>
        </div>
        <a
          className="button primary"
          href="https://aurora-showcase.sanhith-amarathunge.workers.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try interactive demo <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className={styles.gallery}>
        {screenshots.map(({ file, title, description }) => (
          <figure key={file}>
            <a
              href={`/projects/aurora/${file}.png`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enlarge: ${description} (opens in a new tab)`}
            >
              <Image
                src={`/projects/aurora/${file}.png`}
                width={1280}
                height={900}
                alt={description}
                unoptimized
              />
            </a>
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>
      <figure className={styles.walkthrough}>
        <video
          controls
          preload="none"
          poster="/projects/aurora/journal.png"
          width={1280}
          height={900}
          aria-label="Aurora demo walkthrough: creating a journal entry, viewing mood trends, and starting a focus timer"
        >
          <source src="/projects/aurora/walkthrough.webm" type="video/webm" />
          <track
            kind="captions"
            src="/projects/aurora/walkthrough.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support this video. Try the interactive demo
          above.
        </video>
        <figcaption>
          A short, silent walkthrough of the real app: journal, mood trends, and
          focus tools.
        </figcaption>
      </figure>
      <p className={styles.credit}>
        Originally built by a five-person course team. Demo and release polish
        by Sanhith Amarathunge.{" "}
        <a
          href="https://github.com/xSanboyzx/aurora-showcase"
          target="_blank"
          rel="noopener noreferrer"
        >
          View the showcase release <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
