// GameStreet wordmark with the pixel mark. size: "sm" for phone, "lg" for PC.
export default function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const px = size === "lg" ? "size-2.5" : "size-1.5";
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid grid-cols-3 gap-0.5">
        <span className={px} /> <span className={px} /> <span className={`${px} bg-pink`} />
        <span className={px} /> <span className={`${px} bg-purple`} /> <span className={`${px} bg-pink`} />
        <span className={`${px} bg-purple`} /> <span className={`${px} bg-pink`} /> <span className={`${px} bg-purple`} />
      </span>
      <span className={`font-black tracking-tight text-pink ${size === "lg" ? "text-4xl" : "text-2xl"}`}>
        GameStreet
      </span>
    </span>
  );
}
