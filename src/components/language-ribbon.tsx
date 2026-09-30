import Image from "next/image";

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
  return (
    <section className="ticker" aria-label="Languages I use">
      <ul className="sr-only">
        {languages.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
      <div className="ticker-track" aria-hidden="true">
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
