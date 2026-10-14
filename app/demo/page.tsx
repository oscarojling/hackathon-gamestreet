import DemoStart from "@/components/DemoStart";

// Always shows the demo start page (no redirect), on both Vercel sites.
// e.g. gamestreet-mobile.vercel.app/demo → "Start live demo" opens phone + PC on the same site, so they sync live.
export default function DemoPage() {
  return <DemoStart />;
}
