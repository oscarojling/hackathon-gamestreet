/* eslint-disable @next/next/no-img-element */
// GameStreet wordmark from the UX asset sheet (public/brand/logo.png)
export default function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <img
      src="/brand/logo.png"
      alt="GameStreet"
      className={`w-auto drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-pink)_40%,transparent)] ${
        size === "lg" ? "h-11" : "h-7"
      }`}
    />
  );
}
