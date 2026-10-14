# GameStreet – Scan. Pay. Play.

## ▶️ Live demo: **[gamestreet-mobile.vercel.app/demo](https://gamestreet-mobile.vercel.app/demo)**

Click **Start live demo**: the phone opens in a small window and the PC screen in your tab. Pay on the phone and watch the PC unlock.

| | Link |
|---|---|
| ▶️ Live demo (phone + PC, synced) | **[gamestreet-mobile.vercel.app/demo](https://gamestreet-mobile.vercel.app/demo)** |
| 🖥️ PC screen (gaming station) | [gamestreet-desktop.vercel.app](https://gamestreet-desktop.vercel.app/station/07) |
| 📱 Phone (scan & pay) | [gamestreet-mobile.vercel.app](https://gamestreet-mobile.vercel.app/play/07) |

> Real-device test: open the PC screen on a laptop and scan the QR code with your phone.

Built for the **Futuregames Customer Growth Hackathon 2026**, case: **GameStreet**.

---

## The idea

Today, GameStreet customers just walk in and play.
We make every PC sell its own playtime:

1. **Scan** – every free PC shows a QR code
2. **Choose time** – 30 min / 50 kr, 60 min / 100 kr or 120 min / 200 kr
3. **Pay** – Swish, card or Apple Pay (simulated). No app, no account.
4. **Play** – the PC unlocks and a timer starts

While playing, the customer can **add more time** from the phone or by scanning a new QR code on the PC.
A warning appears 10 minutes before the session ends. Afterwards the customer gets a **receipt** by email.

## Screens

**Phone** (`/play/[code]`)
M1 Choose playtime → M2 Payment → M3 You're all set → M4 Your session (live countdown) → M5 Add more time → M6 Session ended + receipt

**PC** (`/station/[code]`)
Game on? (QR) → Ready to play? (dashboard) → In-game timer overlay with add-time QR and 10-min warning → Game over

## How to demo

1. Open **[/demo](https://gamestreet-mobile.vercel.app/demo)** (or `localhost:3000` when running locally).
2. Click **Start live demo**. It clears old sessions, opens the phone (`/play/07`) in a phone-sized pop-up and the PC screen (`/station/07`) in the current tab. Allow pop-ups if nothing opens.
3. Put the windows side by side and share your **entire screen** in the call.
4. Pay on the phone → the PC unlocks. Everything you do on one side updates the other within a second.

Why the mobile site? Phone and PC sync through the browser (`localStorage` + `BroadcastChannel`), which only works when both pages are on the **same site**. The separate desktop and mobile deployments can't talk to each other without a backend.

**Keyboard shortcuts** (click the PC window first):

| Key | Does |
|---|---|
| `P` | Simulate scan & pay (60 min) |
| `F` | Fast-forward: 10 min left → 5 min left → ends in 10 s |
| `T` | Add 30 min |
| `G` | Switch between dashboard and game |
| `E` | End the session |
| `R` | Reset everything to the start |

There is also a small **⏩ Fast-forward** panel in the bottom-left corner of the PC screen while a session is running.

**URL tricks** (both sites):

- `?reset` – clear all sessions and start from the beginning
- `?fast` – one minute lasts one second
- `?fail` – the first payment fails, to show the error state

## Tech

- **Next.js** (App Router, `cacheComponents`) + **TypeScript**
- **Tailwind CSS v4**, design tokens in `app/globals.css`
- **qrcode.react** for the QR codes
- No backend: data lives in `data/`, and payments are simulated with timeouts
- `lib/session.ts` stores the session in `localStorage` and syncs tabs with `BroadcastChannel`.
  In production this would be replaced by a backend (e.g. Supabase Realtime) and a real payment provider.

```
app/
  page.tsx               start page (redirects on Vercel via NEXT_PUBLIC_APP)
  demo/                  demo start page with "Start live demo" (never redirects)
  play/[code]/           phone flow
  station/[code]/        PC screen
components/              one folder per component: Name/index.tsx
data/                    stations + playtime options
lib/                     session contract, time helpers
types/                   shared types
```

### Run locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Environment variables (Vercel)

| Project | Variable | Value |
|---|---|---|
| gamestreet-desktop | `NEXT_PUBLIC_APP` | `desktop` |
| gamestreet-desktop | `NEXT_PUBLIC_MOBILE_URL` | `https://gamestreet-mobile.vercel.app` |
| gamestreet-mobile | `NEXT_PUBLIC_APP` | `mobile` |

## Team

- **UX:** _add names_
- **Development:** Oscar Öjling, _add name_
