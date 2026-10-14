// Tiny pixel-art renderer: each string is a row, each character a pixel.
// "." = empty, other characters map to colours in the palette.
const PALETTE: Record<string, string> = {
  P: "var(--color-purple)",
  L: "var(--color-lilac)",
  K: "var(--color-pink)",
  Y: "var(--color-yellow)",
  W: "var(--color-offwhite)",
  O: "#e8873a", // bun
  G: "#3fae4a", // lettuce
  B: "#6b3b22", // patty
  R: "var(--color-red)",
};

export const TROPHY = [
  ".YYYYYYYYY.",
  "YYYYYYYYYYY",
  "Y.YYYYYYY.Y",
  "Y.YYYYYYY.Y",
  ".YYYYYYYYY.",
  "..YYYYYYY..",
  "....YYY....",
  ".....Y.....",
  "....YYY....",
  "..YYYYYYY..",
];

export const BURGER = [
  "...OOOOOO...",
  ".OOWOOOOWOO.",
  "OOOOOOWOOOOO",
  "GGGGGGGGGGGG",
  "RRYYRRYYRRYY",
  "BBBBBBBBBBBB",
  "BBBBBBBBBBBB",
  ".OOOOOOOOOO.",
];

export const QUESTION = [
  "..PPPPP..",
  ".PP...PP.",
  ".....PP..",
  "....PP...",
  "....PP...",
  ".........",
  "....PP...",
];

export const CROWN = [
  "Y...Y...Y",
  "YY.YYY.YY",
  "YYYYYYYYY",
  "YKYYKYYKY",
  "YYYYYYYYY",
];

export const GAMEPAD = [
  "..LLLLL.LLLLL..",
  ".LLLLLLLLLLLLL.",
  "LLL.LLLLLLL.LLL",
  "LL...LLLLL.L.LL",
  "LLL.LLLLLLL.LLL",
  "LLLLLLLLLLLLLLL",
  "LLLLL.....LLLLL",
  "LLLL.......LLLL",
  ".LL.........LL.",
];

type Props = {
  rows: string[];
  className?: string;
  glow?: string; // CSS colour for the glow
};

export default function PixelArt({ rows, className = "size-12", glow }: Props) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      aria-hidden="true"
      viewBox={`-0.5 -0.5 ${w + 1} ${h + 1}`}
      shapeRendering="crispEdges"
      className={className}
      style={glow ? { filter: `drop-shadow(0 0 6px ${glow})` } : undefined}
    >
      {/* dark outline layer, then colour layer */}
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c !== "." ? (
            <rect key={`o${x}-${y}`} x={x - 0.18} y={y - 0.18} width={1.36} height={1.36} fill="var(--color-night)" />
          ) : null,
        ),
      )}
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c !== "." ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[c] ?? c} /> : null,
        ),
      )}
    </svg>
  );
}
