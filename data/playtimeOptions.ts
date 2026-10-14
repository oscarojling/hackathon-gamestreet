import type { PlaytimeOption } from "@/types";

export const playtimeOptions: PlaytimeOption[] = [
  { id: "30", label: "A quick game", minutes: 30, price: 50 },
  { id: "60", label: "Our most popular", minutes: 60, price: 100 },
  { id: "90", label: "Settle in", minutes: 90, price: 150 },
  { id: "120", label: "More time, more fun", minutes: 120, price: 200 },
];

// Extending a session offers the shorter set (UX "Add more time" card)
export const extendOptions = playtimeOptions.filter((o) => o.id !== "90");
