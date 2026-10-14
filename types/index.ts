export type Station = {
  code: string; // used in the URL: /play/07
  name: string; // shown in the UI: "Glitch"
};

export type PlaytimeOption = {
  id: string;
  label: string;
  minutes: number;
  price: number; // kr
};
