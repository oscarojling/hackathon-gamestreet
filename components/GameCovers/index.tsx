// Four code-drawn "game covers" for the Game library card.
// Swap for real artwork by putting images in /public/games/1.jpg … 4.jpg.

function Fantasy() {
  return (
    <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <linearGradient id="gc-f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0d24" />
          <stop offset="0.6" stopColor="#6b1f2e" />
          <stop offset="1" stopColor="#e0662e" />
        </linearGradient>
      </defs>
      <rect width="100" height="160" fill="url(#gc-f)" />
      <circle cx="70" cy="40" r="14" fill="#ffb15a" opacity="0.5" />
      <path d="M0 120 L25 95 L40 110 L60 85 L80 105 L100 90 V160 H0Z" fill="#2a0f1c" />
      {/* knight with sword */}
      <path d="M38 160 L42 118 L50 108 L58 118 L62 160Z" fill="#0d0710" />
      <circle cx="50" cy="102" r="7" fill="#0d0710" />
      <path d="M64 70 L67 70 L67 122 L64 122Z" fill="#cfd6e6" />
      <path d="M59 118 L72 118 L72 121 L59 121Z" fill="#8a6a3a" />
    </svg>
  );
}

function Space() {
  const stars = Array.from({ length: 22 }, (_, i) => [(i * 37) % 100, (i * 53) % 160, (i % 3) * 0.4 + 0.5]);
  return (
    <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <radialGradient id="gc-s" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#7632fa" />
          <stop offset="0.5" stopColor="#2a1660" />
          <stop offset="1" stopColor="#080e26" />
        </radialGradient>
        <radialGradient id="gc-p" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fc42b7" />
          <stop offset="1" stopColor="#5a1a6e" />
        </radialGradient>
      </defs>
      <rect width="100" height="160" fill="url(#gc-s)" />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#f6f6fb" opacity="0.8" />
      ))}
      <circle cx="58" cy="95" r="30" fill="url(#gc-p)" />
      <ellipse cx="58" cy="95" rx="46" ry="8" fill="none" stroke="#c08bfc" strokeWidth="2" opacity="0.8" />
      {/* ship */}
      <path d="M22 45 L34 52 L22 59 L25 52Z" fill="#01f39a" />
    </svg>
  );
}

function Racing() {
  return (
    <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <linearGradient id="gc-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1030" />
          <stop offset="0.55" stopColor="#3a1450" />
          <stop offset="0.56" stopColor="#120a1e" />
          <stop offset="1" stopColor="#120a1e" />
        </linearGradient>
      </defs>
      <rect width="100" height="160" fill="url(#gc-r)" />
      {/* city skyline */}
      {[[5, 60], [18, 48], [30, 66], [44, 40], [60, 58], [74, 45], [88, 62]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="10" height={88 - y} fill="#1d1238" />
      ))}
      {/* neon road */}
      <path d="M50 88 L10 160 H90Z" fill="#1a1028" />
      <path d="M50 88 L10 160" stroke="#fc42b7" strokeWidth="1.5" />
      <path d="M50 88 L90 160" stroke="#fc42b7" strokeWidth="1.5" />
      {[100, 115, 135].map((y) => (
        <rect key={y} x="49" y={y} width="2" height={(y - 88) / 4} fill="#fccd24" />
      ))}
      {/* car */}
      <rect x="36" y="128" width="28" height="12" rx="3" fill="#7632fa" />
      <rect x="40" y="122" width="20" height="8" rx="3" fill="#5422c0" />
      <circle cx="40" cy="134" r="2" fill="#ff4276" />
      <circle cx="60" cy="134" r="2" fill="#ff4276" />
    </svg>
  );
}

function Blocks() {
  const rows = [
    "..........",
    "..........",
    "....GG....",
    "...GGGG...",
    "....TT....",
    "....TT....",
    "GGGGGGGGGG",
    "DDDDDDDDDD",
    "DDSDDDDSDD",
    "DDDDDSDDDD",
  ];
  const fill: Record<string, string> = { G: "#3fae4a", D: "#7a4e2d", S: "#8b8b9a", T: "#5a3a1e" };
  return (
    <svg viewBox="0 0 10 16" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges" className="size-full">
      <rect width="10" height="16" fill="#5cc8ff" />
      <rect x="1" y="1.5" width="2" height="2" fill="#fff6c0" />
      <rect x="6" y="2" width="3" height="1" fill="#ffffff" opacity="0.8" />
      {rows.flatMap((r, y) =>
        [...r].map((c, x) =>
          c !== "." ? <rect key={`${x}-${y}`} x={x} y={y + 6} width={1} height={1} fill={fill[c]} /> : null,
        ),
      )}
    </svg>
  );
}

const COVERS = [Fantasy, Space, Racing, Blocks];

export default function GameCovers() {
  return (
    <span className="absolute inset-0 grid grid-cols-4 gap-1 bg-night">
      {COVERS.map((Cover, i) => (
        <span key={i} className="relative overflow-hidden transition duration-500 group-hover:scale-105">
          <Cover />
          <span
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/games/${i + 1}.jpg)` }}
          />
        </span>
      ))}
    </span>
  );
}
