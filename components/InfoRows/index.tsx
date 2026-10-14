import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

export type Row = { icon: IconName; label: string; value: string; highlight?: boolean; keepCase?: boolean };

type Props = {
  title?: string;
  rows: Row[];
  children?: ReactNode; // buttons / links at the bottom of the card
  iconTone?: "lilac" | "white"; // session details = white, summary = lilac (UX)
};

// "Session details / summary / updated session" cards from the UX component sheet
export default function InfoRows({ title, rows, children, iconTone = "lilac" }: Props) {
  return (
    <div className="rounded-2xl border border-offwhite/10 bg-surface px-4 py-3">
      {title && <p className="mb-1 font-display text-[11px] tracking-widest text-lilac uppercase">{title}</p>}
      <dl className="divide-y divide-offwhite/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 py-2">
            <Icon name={row.icon} className={`size-5 ${row.highlight ? "text-yellow" : iconTone === "white" ? "text-offwhite" : "text-purple"}`} />
            <dt className={`flex-1 text-sm ${row.highlight ? "font-bold" : "text-offwhite/85"}`}>{row.label}</dt>
            <dd className={`font-display ${row.keepCase ? "" : "uppercase"} ${row.highlight ? "text-2xl text-yellow" : "text-base"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {children && <div className="flex flex-col gap-2.5 border-t border-offwhite/10 pt-3">{children}</div>}
    </div>
  );
}
