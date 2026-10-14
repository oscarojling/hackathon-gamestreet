"use client";

import { useRef, useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import PhoneScreen from "@/components/PhoneScreen";
import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Banner from "@/components/Banner";
import PayBadge from "@/components/PayBadge";
import PaymentOverlay from "@/components/PaymentOverlay";

export type PayMethod = "swish" | "card" | "applepay";
type Status = "idle" | "processing" | "paid" | "failed";

export const METHODS: { id: PayMethod; label: string; sub: string }[] = [
  { id: "swish", label: "Swish", sub: "Pay with Swish" },
  { id: "card", label: "Card payment", sub: "Visa, Mastercard" },
  { id: "applepay", label: "Apple Pay", sub: "Pay with Apple Pay" },
];

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
          <Icon name="clock" className="size-6 text-purple" />
          <div>
            <dt className="text-[10px] tracking-wider text-lilac uppercase">Playtime</dt>
            <dd className="font-display text-lg">{option.minutes} MIN</dd>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-4">
          <Icon name="coins" className="size-6 text-purple" />
          <div>
            <dt className="text-[10px] tracking-wider text-lilac uppercase">Total</dt>
            <dd className="font-display text-lg">{option.price} KR</dd>
          </div>
        </div>
      </dl>

      <fieldset className="flex flex-col gap-2" disabled={processing}>
        <legend className="sr-only">Payment method</legend>
        {METHODS.map((m) => {
          const selected = m.id === method;
          return (
            <label
              key={m.id}
              className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-yellow ${
                selected
                  ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                  : "border-offwhite/10 bg-surface hover:border-offwhite/30"
              }`}
            >
              <PayBadge method={m.id} />
              <span className="flex-1">
                <span className="block font-display text-lg leading-tight">{m.label}</span>
                <span className="block text-xs opacity-75">{m.sub}</span>
              </span>
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={selected}
                onChange={() => setMethod(m.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-7 place-items-center rounded-full border-2 ${
                  selected ? "border-offwhite bg-offwhite text-purple" : "border-offwhite/40"
                }`}
              >
                {selected && <Icon name="check" className="size-4" />}
              </span>
            </label>
          );
        })}
      </fieldset>

      {status === "failed" && <Banner icon="warning" title="Payment failed." sub="Try again or pick another method." />}

      {processing && (
        <PaymentOverlay method={method} amount={option.price} phase={status === "paid" ? "done" : "waiting"} />
      )}

      <div className="mt-auto flex flex-col gap-3">
        <Button onClick={pay} loading={processing} loadingText="Paying…">
          {status === "failed" ? "Try again" : `Pay ${option.price} kr`}
        </Button>
        <Banner icon="lock" title="Secure payment via Stripe." sub="Your data is protected." />
      </div>
    </PhoneScreen>
  );
}
