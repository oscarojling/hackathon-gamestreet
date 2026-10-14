"use client";

import { useEffect, useState, type ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

type Tone = "success" | "info" | "warning" | "error";

const TONES: Record<Tone, { icon: IconName; border: string; text: string }> = {
  success: { icon: "check", border: "border-green/70", text: "text-green" },
  info: { icon: "info", border: "border-purple/70", text: "text-purple" },
  warning: { icon: "clock", border: "border-yellow/70", text: "text-yellow" },
  error: { icon: "warning", border: "border-red/70", text: "text-red" },
};

type Props = {
  tone: Tone;
  title: string;
  sub?: string;
  dismissible?: boolean;
  autoHideMs?: number; // fade away by itself after this long
  children?: ReactNode; // e.g. an action button under the text
};

// "Alerts & messages" from the UX component sheet
export default function Alert({ tone, title, sub, dismissible = true, autoHideMs, children }: Props) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!autoHideMs) return;
    const id = setTimeout(() => setOpen(false), autoHideMs);
    return () => clearTimeout(id);
  }, [autoHideMs]);
  if (!open) return null;
  const t = TONES[tone];

  return (
    <div
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
      className={`animate-screen-in rounded-2xl border-2 bg-night/90 p-3 backdrop-blur ${t.border}`}
    >
      <div className="flex items-start gap-3">
        <span className={`grid size-8 shrink-0 place-items-center rounded-full border-2 ${t.border} ${t.text}`}>
          <Icon name={t.icon} className="size-4" />
        </span>
        <p className="flex-1 pt-1 text-sm leading-snug">
          <span className={`block font-display tracking-wide ${tone === "warning" ? "text-yellow uppercase" : ""}`}>
            {title}
          </span>
          {sub && <span className="block text-offwhite/75">{sub}</span>}
        </p>
        {dismissible && (
          <button onClick={() => setOpen(false)} aria-label="Dismiss" className={`p-1 ${t.text} hover:opacity-80`}>
            <Icon name="close" className="size-5" />
          </button>
        )}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
