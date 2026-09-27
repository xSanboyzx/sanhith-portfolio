export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span> {children}
    </div>
  );
}
export function Orb() {
  return (
    <div className="orb-scene" aria-hidden="true">
      <div className="orb-halo" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orb">
        <div className="orb-latitudes" />
      </div>
      <div className="satellite satellite-one" />
      <div className="satellite satellite-two" />
      <span className="cross cross-one">+</span>
      <span className="cross cross-two">+</span>
      <span className="orb-caption">
        EXPLORING
        <br />
        <span>THE POSSIBLE</span>
      </span>
    </div>
  );
}
export function ProjectCard({
  variant,
  number,
  title,
  category,
}: {
  variant: "orbit" | "grid";
  number: string;
  title: string;
  category: string;
}) {
  return (
    <article className={`project-card reveal project-visual-${variant}`}>
      <div className="project-art">
        <span className="project-badge">COMING SOON</span>
        <span className="project-number">/{number}</span>
        {variant === "orbit" ? (
          <div className="project-rings" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        ) : (
          <div className="project-blocks" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
        <span className="art-bottom">A NEW IDEA IS TAKING SHAPE</span>
      </div>
      <div className="project-info">
        <div>
          <span className="eyebrow">{category}</span>
          <h3>{title}</h3>
        </div>
      </div>
    </article>
  );
}
