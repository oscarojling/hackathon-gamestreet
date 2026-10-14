import type { ReactNode } from "react";
import SpeedMarks from "@/components/SpeedMarks";

type Props = {
  kicker?: string; // small label above, e.g. "Payment"
  children: ReactNode;
  sub?: string;
};

// Chunky tilted headline with neon action marks, like the UX screens
export default function ScreenTitle({ kicker, children, sub }: Props) {
  return (
    <div className="text-center">
      {kicker && <p className="font-display text-xs tracking-widest text-lilac uppercase">{kicker}</p>}
      <div className="relative mx-auto mt-1 inline-block">
        <h1 className="-rotate-3 font-display text-[44px] leading-[0.88] text-yellow uppercase text-outline [text-shadow:0_5px_0_var(--color-purple)]">
          {children}
        </h1>
        <SpeedMarks className="absolute -top-2 -right-9 size-9" direction="right" />
      </div>
      {sub && <p className="mt-3 text-sm text-offwhite/80">{sub}</p>}
    </div>
  );
}
