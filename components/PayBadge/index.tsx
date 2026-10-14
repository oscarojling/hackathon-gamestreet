import type { PayMethod } from "@/components/Checkout";
import Icon from "@/components/Icon";

/* eslint-disable @next/next/no-img-element */
// Payment method logo tile (Swish / card / Apple Pay) – logos from the UX asset sheet
export default function PayBadge({ method, className = "size-11" }: { method: PayMethod; className?: string }) {
  if (method === "swish") {
    return (
      <span className={`${className} grid shrink-0 place-items-center rounded-xl bg-white`}>
        <img src="/brand/swish.png" alt="" className="size-[72%] object-contain" />
      </span>
    );
  }
  if (method === "applepay") {
    return (
      <span className={`${className} grid shrink-0 place-items-center`}>
        <img src="/brand/apple.png" alt="" className="size-[78%] object-contain" />
      </span>
    );
  }
  return (
    <span className={`${className} grid shrink-0 place-items-center text-offwhite`}>
      <Icon name="card" className="size-[86%] text-offwhite" />
    </span>
  );
}
