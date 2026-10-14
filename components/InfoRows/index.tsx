import Icon, { type IconName } from "@/components/Icon";

type Row = { icon: IconName; label: string; value: string };

// "Session details" / "Session summary" list
export default function InfoRows({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-offwhite/10 bg-surface p-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-60">{title}</p>
      <dl className="flex flex-col gap-2 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <Icon name={row.icon} className="size-4 opacity-60" />
            <dt className="flex-1 opacity-75">{row.label}</dt>
            <dd className="font-bold uppercase">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
