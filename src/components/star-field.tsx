const columns = 8;
const rows = 4;
const starsPerCell = 2;

// Each region has a pair, so hiding every other star on mobile preserves coverage.
// Deterministic offsets keep the scatter natural and consistent across renders.
const stars = Array.from(
  { length: columns * rows * starsPerCell },
  (_, index) => {
    const cell = Math.floor(index / starsPerCell);
    const column = cell % columns;
    const row = Math.floor(cell / columns);
    const offsetX = 0.15 + (((index * 47 + 11) % 101) / 101) * 0.7;
    const offsetY = 0.15 + (((index * 61 + 29) % 103) / 103) * 0.7;

    return {
      left: `${(((column + offsetX) / columns) * 100).toFixed(2)}%`,
      top: `${(((row + offsetY) / rows) * 100).toFixed(2)}%`,
      size: index % 7 === 0 ? 12 : 3 + (index % 3),
      duration: `${4 + (index % 7) * 0.7}s`,
      delay: `${-index * 0.83}s`,
      sparkle: index % 7 === 0,
    };
  },
);

export function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className={`star${star.sparkle ? " star-sparkle" : ""}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
