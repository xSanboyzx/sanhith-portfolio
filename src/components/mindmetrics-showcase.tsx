import Image from "next/image";
import styles from "./aurora-showcase.module.css";

const screenshots = [
  {
    file: "overview",
    title: "The model, made tangible",
    description:
      "MindMetrics model explorer with fictional profiles and browser inference.",
  },
  {
    file: "comparison",
    title: "Change a scenario",
    description:
      "A fictional profile with adjusted sleep duration and a comparison of model predictions.",
  },
  {
    file: "evaluation",
    title: "Inspect the evidence",
    description:
      "Held-out evaluation showing mean and linear baselines alongside the residual network and its prediction plot.",
  },
] as const;

export function MindMetricsShowcase() {
  return (
    <section className={styles.showcase} aria-labelledby="mindmetrics-demo-heading">
      <div className={styles.introduction}>
        <div>
          <h3 id="mindmetrics-demo-heading">Explore what the model learned.</h3>
          <p>
            Choose a fictional profile, adjust its inputs, and compare predictions
            from the actual trained network. Inference runs in your browser;
            entered values stay in session memory. The evaluation panel shows
            measured performance on synthetic data alongside simple baselines.
          </p>
        </div>
        <a
          className="button primary"
          href="https://mindmetrics-explorer.sanhith-amarathunge.workers.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the model <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className={styles.gallery}>
        {screenshots.map(({ file, title, description }) => (
          <figure key={file}>
            <a
              href={`/projects/mindmetrics/${file}.png`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enlarge: ${description} (opens in a new tab)`}
            >
              <Image
                src={`/projects/mindmetrics/${file}.png`}
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
          poster="/projects/mindmetrics/comparison.png"
          width={1280}
          height={900}
          aria-label="MindMetrics walkthrough: choosing a fictional profile, comparing predictions, and inspecting model evaluation"
        >
          <source src="/projects/mindmetrics/walkthrough.webm" type="video/webm" />
          <track
            kind="captions"
            src="/projects/mindmetrics/walkthrough.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support this video. Try the interactive demo above.
        </video>
        <figcaption>
          A silent walkthrough of real browser inference, scenario comparison,
          and the held-out evaluation.
        </figcaption>
      </figure>
      <p className={styles.credit}>
        Built from a two-person course project. Primary implementation and
        showcase release by Sanhith Amarathunge. Synthetic data illustrates model
        associations; predictions have no clinical or causal interpretation.{" "}
        <a
          href="https://github.com/xSanboyzx/MindMetrics-ML/blob/showcase/model-explorer/docs/MODEL_CARD.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the model card <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </section>
  );
}
