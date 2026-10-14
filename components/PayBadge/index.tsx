/* eslint-disable @next/next/no-img-element */
import type { PayMethod } from "@/components/Checkout";
import Icon from "@/components/Icon";

// Payment method logo tile (Swish / card / Apple Pay)
export default function PayBadge({ method, className = "size-11" }: { method: PayMethod; className?: string }) {
  if (method === "swish") {
    return <img src="/brand/swish.png" alt="" className={`${className} rounded-xl`} />;
  }
  if (method === "applepay") {
    return (
      <span className={`${className} grid place-items-center rounded-xl bg-black`}>
        <img src="/brand/apple.png" alt="" className="h-3/5 w-auto" />
      </span>
    );
  }
  return (
    <span className={`${className} grid place-items-center rounded-xl border border-offwhite/15 bg-night`}>
      <Icon name="card" className="size-6" />
    </span>
  );
}
