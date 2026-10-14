// Shared contract between the phone flow (/play/[code]) and the PC screen (/station/[code]).
// Store endsAt (a timestamp), not minutesLeft, so both sides compute the countdown live.
// Browser-only: call these from client components (inside event handlers or useEffect).

export type Session = {
  code: string;
  startedAt: number; // ms timestamp
  endsAt: number; // ms timestamp
  totalMinutes: number; // incl. extensions
  totalPaid: number; // kr
};

const CHANNEL = "gamestreet";

// Demo trick: add ?fast to the URL and one "minute" lasts one second,
// so you can show the warning, time-up and receipt screens in a short video.
export const minuteMs = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("fast")
    ? 1000
    : 60_000;
const key = (code: string) => `gs-session-${code}`;

export function getSession(code: string): Session | null {
  try {
    const raw = localStorage.getItem(key(code));
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function broadcast(code: string, session: Session | null) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.postMessage({ code, session });
  ch.close();
}

function save(session: Session) {
  localStorage.setItem(key(session.code), JSON.stringify(session));
  broadcast(session.code, session);
}

export function startSession(code: string, minutes: number, price: number): Session {
  const now = Date.now();
  const session: Session = {
    code,
    startedAt: now,
    endsAt: now + minutes * minuteMs(),
    totalMinutes: minutes,
    totalPaid: price,
  };
  save(session);
  return session;
}

export function extendSession(code: string, minutes: number, price: number): Session | null {
  const current = getSession(code);
  if (!current) return null;
  const session: Session = {
    ...current,
    endsAt: Math.max(current.endsAt, Date.now()) + minutes * minuteMs(),
    totalMinutes: current.totalMinutes + minutes,
    totalPaid: current.totalPaid + price,
  };
  save(session);
  return session;
}

export function endSession(code: string) {
  localStorage.removeItem(key(code));
  broadcast(code, null);
}

// Use in a useEffect on both sides: return subscribe(code, setSession)
export function subscribe(code: string, cb: (s: Session | null) => void) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.onmessage = (e) => {
    if (e.data?.code === code) cb(e.data.session);
  };
  return () => ch.close();
}

// A station is in use while a session exists and hasn't run out
export const isActive = (s: Session | null) => !!s && s.endsAt > Date.now();

export const formatClock = (ms: number) =>
  new Date(ms).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

// Demo helper: wipe every stored session (all stations) and tell open tabs.
export function resetAllSessions() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("gs-session-"))
      .forEach((k) => {
        localStorage.removeItem(k);
        broadcast(k.replace("gs-session-", ""), null);
      });
  } catch {
    // storage unavailable – nothing to clear
  }
}

// If the URL has ?reset, clear everything once and remove the flag from the URL.
// Returns true when a reset happened.
export function resetFromUrl(): boolean {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("reset")) return false;
  resetAllSessions();
  url.searchParams.delete("reset");
  window.history.replaceState(null, "", url.toString());
  return true;
}

// Demo helper: jump the clock so the session has `msLeft` remaining.
// Shifts startedAt too, so progress bars still match the purchased time. Syncs open tabs.
export function setRemaining(code: string, msLeft: number): Session | null {
  const current = getSession(code);
  if (!current) return null;
  const endsAt = Date.now() + msLeft;
  const session: Session = { ...current, endsAt, startedAt: endsAt - current.totalMinutes * minuteMs() };
  save(session);
  return session;
}
