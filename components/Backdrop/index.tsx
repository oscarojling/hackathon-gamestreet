// Code-drawn backgrounds for the PC screen, in the GameStreet neon style.
// If the designers deliver real images, drop them in /public as lounge-bg.jpg / game-bg.jpg
// and they are layered on top automatically.

function Lounge() {
  return (
    <>
      {/* Neon glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,color-mix(in_srgb,var(--color-purple)_45%,transparent),transparent_55%),radial-gradient(ellipse_at_85%_85%,color-mix(in_srgb,var(--color-pink)_35%,transparent),transparent_50%)]" />
      {/* Synthwave floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] [perspective:500px]">
        <div
          className="absolute inset-x-[-50%] bottom-0 h-[200%] origin-bottom [transform:rotateX(65deg)] opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-purple) 2px, transparent 2px), linear-gradient(90deg, var(--color-purple) 2px, transparent 2px)",
            backgroundSize: "70px 70px",
            maskImage: "linear-gradient(to top, black 30%, transparent)",
          }}
        />
      </div>
      {/* Floating pixels */}
      {[
        [8, 70, "pink"],
        [12, 74, "purple"],
        [90, 12, "yellow"],
        [93, 16, "pink"],
        [80, 60, "purple"],
        [4, 30, "yellow"],
      ].map(([x, y, c], i) => (
        <span
          key={i}
          className="absolute size-4"
          style={{ left: `${x}%`, top: `${y}%`, background: `var(--color-${c})`, boxShadow: `0 0 14px var(--color-${c})` }}
        />
      ))}
      <div className="absolute inset-0 bg-[url(/lounge-bg.jpg)] bg-cover bg-center" />
    </>
  );
}

function Game() {
  return (
    <>
      <svg className="absolute inset-0 size-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2350" />
            <stop offset="0.45" stopColor="#6b3a7a" />
            <stop offset="0.75" stopColor="#e07a4f" />
            <stop offset="1" stopColor="#fcb35a" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sky)" />
        <circle cx="1100" cy="560" r="110" fill="#ffd27a" opacity="0.9" />
        {/* far mountains */}
        <path d="M0 620 L180 430 L320 560 L520 360 L700 540 L880 400 L1060 560 L1260 380 L1440 520 L1600 420 V900 H0Z" fill="#4a3566" />
        {/* castle */}
        <g fill="#2b1f3f">
          <rect x="760" y="430" width="40" height="200" />
          <rect x="820" y="470" width="120" height="160" />
          <rect x="960" y="410" width="36" height="220" />
          <path d="M752 430 L780 380 L808 430Z" />
          <path d="M952 410 L978 360 L1004 410Z" />
          <rect x="860" y="430" width="24" height="40" />
        </g>
        {/* near hills */}
        <path d="M0 700 C300 640 500 760 800 700 S1300 640 1600 720 V900 H0Z" fill="#1e1830" />
        <path d="M0 800 C400 740 700 860 1100 790 S1500 780 1600 800 V900 H0Z" fill="#110d1f" />
        {/* hero silhouette */}
        <path d="M300 900 L330 700 L370 650 L410 700 L440 900Z" fill="#0a0814" />
        <circle cx="370" cy="630" r="26" fill="#0a0814" />
      </svg>
      <div className="absolute inset-0 bg-[url(/game-bg.jpg)] bg-cover bg-center" />
    </>
  );
}

const CORNER = ["P....", "PK...", ".PP..", "..PKP", "...PP"];

function PixelCorner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 5 5" shapeRendering="crispEdges" className={`absolute size-14 ${className}`}>
      {CORNER.flatMap((row, y) =>
        [...row].map((c, x) =>
          c !== "." ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={c === "K" ? "var(--color-pink)" : "var(--color-purple)"} />
          ) : null,
        ),
      )}
    </svg>
  );
}

// Calm dark panel with pixel corners (the "Ready to play?" dashboard design)
function Panel() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--color-purple)_22%,transparent),transparent_60%)]" />
      <PixelCorner className="bottom-3 left-3 -scale-y-100" />
      <PixelCorner className="right-3 bottom-3 -scale-100" />
    </>
  );
}

export default function Backdrop({ variant }: { variant: "lounge" | "game" | "panel" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-night">
      {variant === "lounge" ? <Lounge /> : variant === "game" ? <Game /> : <Panel />}
    </div>
  );
}
