// The three neon "action marks" (\ | /) from the asset sheet
type Props = {
  className?: string;
  color?: "purple" | "pink" | "yellow";
  direction?: "right" | "left" | "up";
};

const ROTATE = { up: 0, right: 90, left: -90 };

export default function SpeedMarks({ className = "size-6", color = "purple", direction = "right" }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      style={{ transform: `rotate(${ROTATE[direction]}deg)`, color: `var(--color-${color})` }}
    >
      <g fill="currentColor" stroke="var(--color-night)" strokeWidth={1.2} strokeLinejoin="round">
        <path d="M3 9 7 7.5 10 16 8 17Z" />
        <path d="M10.5 3h3l-.6 11h-1.8Z" />
        <path d="M17 7.5 21 9 16 17 14 16Z" />
      </g>
    </svg>
  );
}
