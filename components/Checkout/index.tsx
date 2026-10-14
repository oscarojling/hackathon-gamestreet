"use client";

import { useRef, useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import PaymentOverlay from "@/components/PaymentOverlay";

export type PayMethod = "swish" | "card" | "applepay";
type Status = "idle" | "processing" | "paid" | "failed";

export const METHODS: { id: PayMethod; label: string; sub: string }[] = [
  { id: "swish", label: "Swish", sub: "Pay with Swish" },
  { id: "card", label: "Card payment", sub: "Visa, Mastercard" },
  { id: "applepay", label: "Apple Pay", sub: "Pay with Apple Pay" },
];

function MethodBadge({ id }: { id: PayMethod }) {
  if (id === "card") return <Icon name="card" className="size-6" />;
  return (
    <span
      className={`grid size-7 place-items-center rounded-lg text-[10px] font-black ${
        id === "swish" ? "bg-offwhite text-purple" : "bg-offwhite text-night"
      }`}
    >
      {id === "swish" ? "S" : "Pay"}
    </span>
  );
}

type Props = {
  station: Station;
  option: PlaytimeOption;
  onBack: () => void;
  onPaid: (method: PayMethod) => void;
};

// M2: choose payment method + fake payment
export default function Checkout({ station, option, onBack, onPaid }: Props) {
  const [method, setMethod] = useState<PayMethod>("swish");
  const [status, setStatus] = useState<Status>("idle");
  const attempts = useRef(0);

  function pay() {
    setStatus("processing");
    setTimeout(() => {
      // Demo trick: add ?fail to the URL to make the FIRST attempt fail
      const shouldFail =
        new URLSearchParams(window.location.search).has("fail") && attempts.current === 0;
      attempts.current += 1;
      if (shouldFail) {
        setStatus("failed");
        return;
      }
      setStatus("paid");
      navigator.vibrate?.(60); // little buzz on real phones
      setTimeout(() => onPaid(method), 900);
    }, 2200);
  }

  const processing = status === "processing" || status === "paid";

  return (
    <PhoneScreen station={station} status="available" onBack={processing ? undefined : onBack}>
      <ScreenTitle kicker="Payment" sub="How would you like to pay?">
        Choose
        <br />
        payment
        <br />
        method
      </ScreenTitle>

      <dl className="grid grid-cols-2 divide-x divide-offwhite/10 rounded-2xl border border-offwhite/10 bg-surface p-4">
        <div className="flex items-center gap-3 pr-3">
          <Icon name="clock" className="size-5 opacity-70" />
          <div>
            <dt className="text-[10px] uppercase opacity-60">Playtime</dt>
            <dd className="font-black">{option.minutes} MIN</dd>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-4">
          <Icon name="card" className="size-5 opacity-70" />
          <div>
            <dt className="text-[10px] uppercase opacity-60">Total</dt>
            <dd className="font-black">{option.price} KR</dd>
          </div>
        </div>
      </dl>

      <fieldset className="flex flex-col gap-2.5" disabled={processing}>
        <legend className="sr-only">Payment method</legend>
        {METHODS.map((m) => {
          const selected = m.id === method;
          return (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition ${
                selected
                  ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                  : "border-offwhite/10 bg-surface hover:border-offwhite/30"
              }`}
            >
              <MethodBadge id={m.id} />
              <span className="flex-1">
                <span className="block font-bold">{m.label}</span>
                <span className="block text-xs opacity-70">{m.sub}</span>
              </span>
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={selected}
                onChange={() => setMethod(m.id)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-5 place-items-center rounded-full border-2 ${
                  selected ? "border-offwhite bg-offwhite text-purple" : "border-offwhite/40"
                } peer-focus-visible:ring-2 peer-focus-visible:ring-yellow`}
              >
                {selected && <Icon name="check" className="size-3" />}
              </span>
            </label>
          );
        })}
      </fieldset>

      {status === "failed" && (
        <p role="alert" className="rounded-2xl border-2 border-red p-4 text-sm text-red">
          Payment failed. Try again or pick another method.
        </p>
      )}

      {processing && (
        <PaymentOverlay method={method} amount={option.price} phase={status === "paid" ? "done" : "waiting"} />
      )}

      <div className="mt-auto flex flex-col gap-2">
        <Button onClick={pay} disabled={processing} arrow={!processing}>
          {processing
            ? method === "swish"
              ? "Waiting for Swish…"
              : "Processing…"
            : status === "failed"
              ? "Try again"
              : `Pay ${option.price} kr`}
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs opacity-60">
          <Icon name="lock" className="size-3" /> Secure payment via Stripe.
        </p>
      </div>
    </PhoneScreen>
  );
}
