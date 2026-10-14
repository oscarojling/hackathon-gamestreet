import type { ReactNode } from "react";

type Props = {
  kicker?: string; // small label above, e.g. "Payment"
  children: ReactNode;
  sub?: string;
};

// Chunky tilted headline in the GameStreet style, with neon "speed marks"
export default function ScreenTitle({ kicker, children, sub }: Props) {
  return (
    <div className="text-center">
      {kicker && <p className="text-xs font-bold uppercase tracking-widest text-mint">{kicker}</p>}
      <div className="relative mx-auto mt-1 inline-block">
        <h1 className="-rotate-3 text-4xl leading-[0.9] font-black text-yellow uppercase italic [text-shadow:3px_3px_0_var(--color-night),5px_5px_0_var(--color-purple)]">
          {children}
        </h1>
        <span aria-hidden="true" className="absolute -top-1 -right-5 flex flex-col gap-1">
          <span className="h-1 w-4 -rotate-45 rounded-full bg-pink" />
          <span className="h-1 w-5 rounded-full bg-purple" />
          <span className="h-1 w-4 rotate-45 rounded-full bg-pink" />
        </span>
      </div>
      {sub && <p className="mt-3 text-sm opacity-75">{sub}</p>}
    </div>
  );
}
