// GameStreet wordmark with the pixel mark, styled like the UX asset sheet.
const MARK = ["...P", "..P.", "PP.P", ".P.."]; // pixel staircase

export default function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const px = size === "lg" ? 9 : 6;
  return (
    <span className="flex items-center gap-2.5 drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-pink)_45%,transparent)]">
      <svg
        aria-hidden="true"
        width={px * 4}
        height={px * 4}
        viewBox="0 0 4 4"
        shapeRendering="crispEdges"
        className="shrink-0"
      >
        {MARK.flatMap((row, y) =>
          [...row].map((c, x) =>
            c === "P" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="var(--color-pink)" /> : null,
          ),
        )}
      </svg>
      <span
        className={`font-display leading-none text-pink text-outline ${size === "lg" ? "text-5xl" : "text-[28px]"}`}
      >
        GameStreet
      </span>
    </span>
  );
}
