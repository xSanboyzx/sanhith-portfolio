const stars = Array.from({ length: 64 }, (_, index) => ({
  left: `${1 + ((index * 73) % 97)}%`,
  top: `${1 + ((index * 41) % 97)}%`,
  size: index % 7 === 0 ? 12 : 3 + (index % 3),
  duration: `${4 + (index % 7) * 0.7}s`,
  delay: `${-index * 0.83}s`,
  sparkle: index % 7 === 0,
}));

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
