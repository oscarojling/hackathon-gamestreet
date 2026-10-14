// Game library artwork: a tilted grid of colour tiles (UX reference).
// Real cover images can be dropped into /public/games/1.jpg … 6.jpg and show on top.
const TILES = [
  "linear-gradient(160deg, #e7a46a, #a8536e)",
  "linear-gradient(160deg, #9b4fe0, #c24fa8)",
  "linear-gradient(160deg, #6aa8f0, #3c56b8)",
  "linear-gradient(160deg, #3f8a5c, #1f3b45)",
  "linear-gradient(160deg, #c99a3a, #6b3f2a)",
  "linear-gradient(160deg, #5a3bb0, #2a1a5e)",
];

export default function GameCovers() {
  return (
    <span className="absolute inset-0 overflow-hidden bg-surface">
      <span className="absolute -top-[8%] -left-[6%] grid h-[96%] w-[112%] -rotate-[5deg] grid-cols-3 grid-rows-2 gap-3 transition duration-500 group-hover:scale-105">
        {TILES.map((bg, i) => (
          <span key={i} className="relative overflow-hidden rounded-[18px]" style={{ background: bg }}>
            <span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/games/${i + 1}.jpg)` }} />
          </span>
        ))}
      </span>
    </span>
  );
}
