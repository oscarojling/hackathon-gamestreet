"use client";

import { useRef, useState } from "react";
import type { PlaytimeOption, Station } from "@/types";
import PhoneHeader from "@/components/PhoneHeader";

export type PayMethod = "swish" | "card" | "applepay";
type Status = "idle" | "processing" | "failed";

const METHODS: { id: PayMethod; label: string; sub: string }[] = [
  { id: "swish", label: "Swish", sub: "Pay with Swish" },
  { id: "card", label: "Card payment", sub: "Visa, Mastercard" },
  { id: "applepay", label: "Apple Pay", sub: "Pay with Apple Pay" },
];

type Props = {
  station: Station;
  option: PlaytimeOption;
  mode: "start" | "extend"; // M2 vs M5
  newEndsAt?: string; // "19:00", only for extend
  onBack: () => void;
  onPaid: (method: PayMethod) => void;
};

// M2 (start) and M5 (extend): fake payment
export default function Checkout({ station, option, mode, newEndsAt, onBack, onPaid }: Props) {
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
      if (shouldFail) setStatus("failed");
      else onPaid(method);
    }, 1800);
  }

  const processing = status === "processing";

  return (
    <section className="flex min-h-dvh flex-col gap-6 p-5">
      <PhoneHeader station={station} onBack={processing ? undefined : onBack} />

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-mint">
          {mode === "start" ? "Payment" : "Extra time"}
        </p>
        <h1 className="mt-1 text-4xl font-black uppercase leading-none text-pink">
          Choose payment method
        </h1>
      </div>

      <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-surface p-4">
        <div>
          <dt className="text-xs uppercase opacity-60">{mode === "start" ? "Playtime" : "Added"}</dt>
          <dd className="text-lg font-bold">
            {mode === "extend" && "+"}
            {option.minutes} min
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase opacity-60">
            {mode === "start" ? "Total" : "New end time"}
          </dt>
          <dd className="text-lg font-bold">
            {mode === "start" ? `${option.price} kr` : newEndsAt}
          </dd>
        </div>
      </dl>

      <fieldset className="flex flex-col gap-3" disabled={processing}>
        <legend className="sr-only">Payment method</legend>
        {METHODS.map((m) => {
          const selected = m.id === method;
          return (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition ${
                selected
                  ? "border-purple bg-purple shadow-[0_0_20px_var(--color-purple)]"
                  : "border-surface bg-surface"
              }`}
            >
              <span>
                <span className="block font-bold">{m.label}</span>
                <span className="block text-xs opacity-70">{m.sub}</span>
              </span>
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={selected}
                onChange={() => setMethod(m.id)}
                className="size-5 accent-offwhite"
              />
            </label>
          );
        })}
      </fieldset>

      {status === "failed" && (
        <p role="alert" className="rounded-2xl border-2 border-pink p-4 text-sm text-pink">
          Payment failed. Try again or pick another method.
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={pay}
          disabled={processing}
          className="rounded-full bg-yellow py-4 font-black uppercase text-night shadow-[0_0_24px_var(--color-yellow)] disabled:opacity-60"
        >
          {processing
            ? method === "swish"
              ? "Waiting for Swish…"
              : "Processing…"
            : status === "failed"
              ? "Try again"
              : `Pay ${option.price} kr →`}
        </button>
        <p className="text-center text-xs opacity-60">🔒 Secure payment</p>
      </div>
    </section>
  );
}
