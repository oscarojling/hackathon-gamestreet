/* eslint-disable @next/next/no-img-element */
// GameStreet "GS1 – Eat · Drink · Play · Repeat" badge (UX asset)
export default function GsBadge({ className = "size-8" }: { className?: string }) {
  return <img src="/brand/gs1.png" alt="GameStreet GS1" className={className} />;
}
