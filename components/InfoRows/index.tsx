import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

export type Row = { icon: IconName; label: string; value: string; highlight?: boolean };

type Props = {
  title?: string;
  rows: Row[];
  children?: ReactNode; // buttons / links at the bottom of the card
};

// "Session details / summary / updated session" cards from the UX component sheet
export default function InfoRows({ title, rows, children }: Props) {
  return (
    <div className="rounded-2xl border border-offwhite/10 bg-surface p-4">
      {title && <p className="mb-1 font-display text-[11px] tracking-widest text-lilac uppercase">{title}</p>}
      <dl className="divide-y divide-offwhite/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 py-2.5">
            <Icon name={row.icon} className={`size-5 ${row.highlight ? "text-yellow" : "text-purple"}`} />
            <dt className="flex-1 text-sm">{row.label}</dt>
            <dd className={`font-display uppercase ${row.highlight ? "text-2xl text-yellow" : "text-base"}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      {children && <div className="mt-3 flex flex-col gap-2.5">{children}</div>}
    </div>
  );
}
