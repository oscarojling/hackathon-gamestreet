import type { PayMethod } from "@/components/Checkout";
import Icon from "@/components/Icon";
import SpeedMarks from "@/components/SpeedMarks";

type Props = {
  method: PayMethod;
  amount: number;
  stationLabel: string; // "Glitch · 07"
  phase: "waiting" | "done";
};

const TITLE: Record<PayMethod, [string, string]> = {
  swish: ["Confirm", "in Swish"],
  card: ["Processing", "payment"],
  applepay: ["Confirm with", "Apple Pay"],
};

// Full-screen processing state: "Confirm in Swish" → "Paid!"
export default function PaymentOverlay({ method, amount, stationLabel, phase }: Props) {
  const [line1, line2] = TITLE[method];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-[radial-gradient(ellipse_at_50%_40%,#1e1450,var(--color-night)_70%)] px-6 text-center"
    >
      <div className="animate-screen-in flex flex-col items-center">
        {phase === "waiting" ? (
          <>
            <span className="size-14 animate-spin rounded-full border-4 border-offwhite/10 border-t-yellow" />
            <div className="relative mt-8">
              <h2 className="-rotate-3 font-display text-[42px] leading-[0.9] text-yellow uppercase text-outline [text-shadow:0_4px_0_var(--color-purple)]">
                {line1}
                <br />
                <span className="text-lilac">{line2}</span>
              </h2>
              <SpeedMarks className="absolute -top-3 -right-8 size-8" direction="right" />
            </div>
            <p className="mt-6 text-sm text-offwhite/80">
              {amount} kr to GameStreet · {stationLabel}
            </p>
          </>
        ) : (
          <>
            <span className="animate-pop grid size-20 place-items-center rounded-full bg-green text-night shadow-[0_0_30px_var(--color-green)]">
              <Icon name="check" className="size-10" />
            </span>
            <p className="mt-6 font-display text-4xl text-offwhite uppercase">Paid!</p>
            <p className="mt-1 text-sm text-lilac">{amount} kr</p>
          </>
        )}
      </div>
    </div>
  );
}
