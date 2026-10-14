import type { PayMethod } from "@/components/Checkout";
import Icon from "@/components/Icon";

type Props = {
  method: PayMethod;
  amount: number;
  phase: "waiting" | "done";
};

const COPY: Record<PayMethod, { title: string; sub: string }> = {
  swish: { title: "Open Swish", sub: "Confirm the payment in the Swish app" },
  card: { title: "Processing card", sub: "Talking to your bank…" },
  applepay: { title: "Apple Pay", sub: "Double-click the side button to pay" },
};

// Fake payment sheet: method-specific "waiting" state, then a big check
export default function PaymentOverlay({ method, amount, phase }: Props) {
  const copy = COPY[method];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-end justify-center bg-night/70 backdrop-blur-sm"
    >
      <div className="animate-screen-in w-full max-w-md rounded-t-3xl border-t border-offwhite/10 bg-surface px-6 pt-8 pb-12 text-center">
        {phase === "waiting" ? (
          <>
            <span className="relative mx-auto grid size-20 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-purple/40" />
              <span className="relative grid size-20 place-items-center rounded-full bg-purple text-2xl font-black">
                {method === "swish" ? "S" : method === "card" ? <Icon name="card" className="size-9" /> : "Pay"}
              </span>
            </span>
            <p className="mt-6 text-2xl font-black uppercase">{copy.title}</p>
            <p className="mt-1 text-sm text-lilac">{copy.sub}</p>
            <p className="mt-6 text-4xl font-black">{amount} kr</p>
            <span className="mx-auto mt-6 block size-6 animate-spin rounded-full border-2 border-offwhite/20 border-t-yellow" />
          </>
        ) : (
          <>
            <span className="animate-pop mx-auto grid size-20 place-items-center rounded-full bg-green text-night shadow-[0_0_30px_var(--color-green)]">
              <Icon name="check" className="size-10" />
            </span>
            <p className="mt-6 text-2xl font-black uppercase">Paid!</p>
            <p className="mt-1 text-sm text-lilac">{amount} kr</p>
          </>
        )}
      </div>
    </div>
  );
}
