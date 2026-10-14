// Game library artwork: a tilted grid of colour tiles (UX reference).
// Real cover images can be dropped into /public/games/1.jpg … 6.jpg and show on top.
const TILES = [
  "linear-gradient(135deg, #e9a15a, #8a3b6e)",
  "linear-gradient(135deg, #b14fd6, #4b1fa8)",
  "linear-gradient(135deg, #5ca8ff, #2a3f9e)",
  "linear-gradient(135deg, #2f9e6a, #173d4f)",
  "linear-gradient(135deg, #d6a43a, #6b3a1f)",
  "linear-gradient(135deg, #6a3fd0, #241552)",
];

export default function GameCovers() {
  return (
    <span className="absolute inset-0 overflow-hidden bg-surface">
      <span className="absolute -inset-[12%] grid -rotate-6 grid-cols-3 grid-rows-2 gap-3 transition duration-500 group-hover:scale-105">
        {TILES.map((bg, i) => (
          <span key={i} className="relative overflow-hidden rounded-2xl" style={{ background: bg }}>
            <span
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/games/${i + 1}.jpg)` }}
            />
          </span>
        ))}
      </span>
    </span>
  );
}
