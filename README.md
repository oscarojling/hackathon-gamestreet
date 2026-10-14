# GameStreet – Scan. Pay. Play.

Built for the **Futuregames Customer Growth Hackathon 2026**, case: **GameStreet**.

**▶️ Try it: [gamestreet-mobile.vercel.app/live](https://gamestreet-mobile.vercel.app/live)**

The live demo shows the gaming desktop and the customer's phone side by side, synced in real time. Pay on the phone and watch the desktop unlock.

---

## The idea

Customers walk in, scan a QR code on any free desktop and start playing. No staff, no app, no account.

1. **Scan** – every free desktop shows its own QR code
2. **Choose time** – 30 min / 50 kr, 60 min / 100 kr or 120 min / 200 kr
3. **Pay** – Swish, card or Apple Pay
4. **Play** – the desktop unlocks and a timer starts

While playing, the customer can **add more time** from their phone without leaving the game. They get a reminder 10 minutes before the end. When time runs out, the desktop locks, and the phone shows a summary with an optional email receipt.

## Links

| What | Link |
|---|---|
| Live demo (desktop + phone, synced) | **[gamestreet-mobile.vercel.app/live](https://gamestreet-mobile.vercel.app/live)** |
| Desktop screen only | [gamestreet-desktop.vercel.app/station/07](https://gamestreet-desktop.vercel.app/station/07) |
| Phone screen only | [gamestreet-mobile.vercel.app/play/07](https://gamestreet-mobile.vercel.app/play/07) |

To test with a real phone, open the desktop screen on a laptop and scan its QR code.

## How to demo

1. Open **[/live](https://gamestreet-mobile.vercel.app/live)**. It always starts fresh.
2. Use the buttons at the top, or these keys:

| Key | What it does |
|---|---|
| `P` | Pay (60 min) |
| `G` | Switch between dashboard and game |
| `T` | Add 30 min |
| `F` | Fast-forward: 10 min left → 5 min left → ends in 10 s |
| `E` | End the session |
| `R` | Start over |

**Extra URL options** (add to any page):

- `?reset` – start from the beginning
- `?fast` – one minute lasts one second
- `?fail` – the first payment fails, to show the error message

## Screens

**Phone** (`/play/[code]`): How long will you play? → Choose payment → Your session (countdown) → Add more time → Session ended + receipt

**Desktop** (`/station/[code]`): Game on? (QR code) → Ready to play? (dashboard) → In-game timer → Game over

## What is real and what is simulated

| Real in the prototype | Simulated |
|---|---|
| The full flow on phone and desktop | Payments (no money moves) |
| Live sync between the two screens | The backend (sync runs in the browser) |
| Timer, add time, auto-lock at the end | Sending the email receipt |
| A unique QR code per desktop | Expiring QR codes and server checks |

In a real version, a backend (for example Supabase) and a payment provider (Swish/Stripe) would replace the simulated parts.

## Tech

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4**, colours and fonts in `app/globals.css`
- **qrcode.react** for the QR codes
- `lib/session.ts` stores the session in `localStorage` and syncs browser tabs with `BroadcastChannel`

The live demo runs on the mobile site because browser sync only works when both screens are on the same website.

```
app/
  live/                  desktop + phone side by side (the demo)
  play/[code]/           phone flow
  station/[code]/        desktop screen
  demo/                  start page with links
components/              one folder per component: Name/index.tsx
data/                    stations and playtime options
lib/                     session sync and time helpers
types/                   shared types
```

### Run locally

```bash
npm install
npm run dev
```

Then open [localhost:3000/live](http://localhost:3000/live).

### Deployment (Vercel)

The same code is deployed twice. An environment variable decides which start page each site shows.

| Project | Variable | Value |
|---|---|---|
| gamestreet-desktop | `NEXT_PUBLIC_APP` | `desktop` |
| gamestreet-desktop | `NEXT_PUBLIC_MOBILE_URL` | `https://gamestreet-mobile.vercel.app` |
| gamestreet-mobile | `NEXT_PUBLIC_APP` | `mobile` |

## Team

- **UX design:** Sana Mirza, PA Nguyen
- **Development:** Oscar Öjling, Buddhi De Silva
