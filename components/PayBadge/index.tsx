import type { PayMethod } from "@/components/Checkout";
import Icon from "@/components/Icon";

// Apple logo: Simple Icons (CC0), https://simpleicons.org
const APPLE_PATH =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

// Swish-style mark: two gradient swooshes forming a ring
function SwishMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="swish-a" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1fb6ff" />
          <stop offset="0.55" stopColor="#22c3a6" />
          <stop offset="1" stopColor="#7ad84b" />
        </linearGradient>
        <linearGradient id="swish-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#c03ee0" />
          <stop offset="0.45" stopColor="#f0436e" />
          <stop offset="1" stopColor="#ffb52e" />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="4.2" strokeLinecap="round">
        <path d="M29.5 9.2A14 14 0 0 0 8.6 28.4" stroke="url(#swish-a)" />
        <path d="M10.5 30.8A14 14 0 0 0 31.4 11.6" stroke="url(#swish-b)" />
      </g>
    </svg>
  );
}

// Payment method logo tile (Swish / card / Apple Pay)
export default function PayBadge({ method, className = "size-11" }: { method: PayMethod; className?: string }) {
  if (method === "swish") {
    return (
      <span className={`${className} grid shrink-0 place-items-center rounded-xl bg-white shadow-sm`}>
        <SwishMark className="size-[70%]" />
      </span>
    );
  }
  if (method === "applepay") {
    return (
      <span className={`${className} grid shrink-0 place-items-center rounded-xl border border-offwhite/15 bg-black`}>
        <svg viewBox="0 0 24 24" className="size-[55%] fill-white" aria-hidden="true">
          <path d={APPLE_PATH} />
        </svg>
      </span>
    );
  }
  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-xl border border-offwhite/15 bg-night`}>
      <Icon name="card" className="size-[55%]" />
    </span>
  );
}
