/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import SpeedMarks from "@/components/SpeedMarks";

export type TitleImage =
  | "game-on"
  | "ready-to-play"
  | "how-long"
  | "choose-payment"
  | "all-set"
  | "your-session"
  | "add-more-time"
  | "time-added"
  | "session-ended";

type Props = {
  kicker?: string; // small label above, e.g. "Payment"
  image?: TitleImage; // designer's title artwork (public/titles/*.png)
  alt?: string; // text for screen readers when an image is used
  height?: number; // image height in px
  children?: ReactNode; // text fallback
  sub?: string;
  subAlign?: "center" | "left";
};

// Big tilted headline – uses the designer's title artwork when given
export default function ScreenTitle({ kicker, image, alt, height = 112, children, sub, subAlign = "center" }: Props) {
  return (
    <div className="text-center">
      {kicker && <p className="font-display text-xs tracking-widest text-lilac uppercase">{kicker}</p>}
      {image ? (
        <h1 className="mt-1 flex justify-center">
          <img src={`/titles/${image}.png`} alt={alt ?? ""} style={{ height }} className="w-auto max-w-full object-contain" />
        </h1>
      ) : (
        <div className="relative mx-auto mt-1 inline-block">
          <h1 className="-rotate-3 font-display text-[44px] leading-[0.88] text-yellow uppercase text-outline [text-shadow:0_5px_0_var(--color-purple)]">
            {children}
          </h1>
          <SpeedMarks className="absolute -top-2 -right-9 size-9" direction="right" />
        </div>
      )}
      {sub && <p className={`mt-2 text-[15px] text-offwhite/85 ${subAlign === "left" ? "text-left" : ""}`}>{sub}</p>}
    </div>
  );
}
