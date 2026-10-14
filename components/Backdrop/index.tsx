// Backgrounds for the PC screen.
// lounge = gaming hall photo (QR screen), game = game screenshot (in-game + game over),
// panel = calm dark panel with pixel corners (dashboard)

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

export default function Backdrop({ variant, dim = false }: { variant: "lounge" | "game" | "panel"; dim?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-night">
      {variant === "lounge" && (
        <>
          <div className="absolute inset-0 bg-[url(/lounge-bg.jpg)] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_srgb,var(--color-purple)_18%,transparent),transparent_65%)]" />
        </>
      )}
      {variant === "game" && <div className="absolute inset-0 bg-[url(/game-bg.jpg)] bg-cover bg-center" />}
      {variant === "panel" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--color-purple)_20%,transparent),transparent_60%)]" />
          <PixelCorner className="bottom-3 left-3 -scale-y-100" />
          <PixelCorner className="right-3 bottom-3 -scale-100" />
        </>
      )}
      {dim && <div className="absolute inset-0 bg-night/55" />}
    </div>
  );
}
