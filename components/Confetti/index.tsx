const COLORS = ["bg-pink", "bg-purple", "bg-yellow", "bg-green", "bg-lilac"];

// Pixel confetti that falls once. Positions are derived from the index,
// so server and client render the same thing.
export default function Confetti({ count = 36 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden motion-reduce:hidden">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100;
        const delay = ((i * 13) % 10) / 10;
        const size = 6 + ((i * 7) % 3) * 3;
        return (
          <span
            key={i}
            className={`animate-confetti absolute top-0 ${COLORS[i % COLORS.length]}`}
            style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s` }}
          />
        );
      })}
    </div>
  );
}
