// Round "GS1" badge from the asset sheet (used in footers)
export default function GsBadge({ className = "size-8" }: { className?: string }) {
  const stars = [0, 45, 90, 135, 180, 225, 270, 315].filter((a) => a !== 90 && a !== 270);
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <circle cx="20" cy="20" r="18" fill="var(--color-night)" stroke="var(--color-pink)" strokeWidth="2" />
      {stars.map((a) => {
        const rad = ((a - 90) * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={20 + Math.cos(rad) * 13}
            cy={20 + Math.sin(rad) * 13}
            r="1.4"
            fill={a > 90 && a < 270 ? "var(--color-lilac)" : "var(--color-yellow)"}
          />
        );
      })}
      <text
        x="20"
        y="24"
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-display)"
        fill="var(--color-pink)"
      >
        GS1
      </text>
    </svg>
  );
}
