import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import SpeedMarks from "@/components/SpeedMarks";

type Props = {
  icon?: IconName;
  art?: ReactNode; // e.g. pixel gamepad instead of an icon
  title: string;
  sub?: string;
};

// "Message / feedback banner" from the UX component sheet
export default function Banner({ icon = "info", art, title, sub }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-offwhite/10 bg-surface px-4 py-3">
      {art ?? <Icon name={icon} className="size-7 shrink-0 text-purple" />}
      <p className="flex-1 text-sm leading-snug">
        <span className="block">{title}</span>
        {sub && <span className="block opacity-75">{sub}</span>}
      </p>
      {!art && <SpeedMarks className="size-6 shrink-0" direction="right" />}
    </div>
  );
}
