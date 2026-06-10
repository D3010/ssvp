# SSVP

Marketing site for **SSVP** — a founder-led, engineering-first AI automation firm.
Dark, instrument-grade, signal-rich: a site that looks like the dashboards SSVP
builds. The strategic wedge is **SSVP Pulse™ — the Proof Ledger**: every system
streams verified metrics to a live dashboard. _"We don't sell automation. We sell
receipts."_

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (`@theme` design tokens in `app/globals.css`)
- **Motion** (`motion/react`) for the orchestrated hero, odometers, and reveals
- **Resend** for the contact form (graceful `mailto:` fallback when unconfigured)
- **next/og** for OG images in the Pulse aesthetic
- Deploy target: **Vercel**

## Design system

- **Display:** Clash Display (self-hosted, `public/fonts`) · **Body:** Inter ·
  **Numbers:** JetBrains Mono — _every number is mono; telemetry, not marketing._
- **Signal green** (`--color-pulse`, `#3DFFA2`) is **reserved** for proof: live
  data, metrics, the primary CTA, and the LIVE dot. Nowhere else.
- The **Pulse line** (an ECG/signal SVG) recurs as the signature element.
- Every animation respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (Turbopack)
npm run lint
```

## Environment

Copy `.env.example` → `.env.local`:

| Variable         | Purpose                                                       |
| ---------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY` | Transactional email for the contact form. Unset → `mailto:`. |
| `CONTACT_TO`     | Inbox for submissions. Defaults to `deep@deepshah.tech`.     |

## Project structure

```
app/                 routes (home, /pulse, /services/[slug], /work/[slug], …)
  api/pulse/         the documented Pulse contract (GET → PulseMetric[])
  actions/contact.ts contact server action (zod + honeypot + Resend)
  opengraph-image.tsx + per-route OG images
components/
  ui/                primitives (Button, Metric, PulseLine, FAQ, …)
  pulse/             PulseTicker, PulseDashboard, LedgerRow, usePulseFeed
  sections/          homepage + shared page sections
  templates/         ServicePageTemplate, CaseStudyTemplate, SystemDiagram
  layout/            Nav, Footer
content/             typed catalog data (services, caseStudies, nav) — Sanity-ready
lib/                 pulse data layer, jsonld builders, og renderer, utils
```

## Pulse — built to be replaced by real telemetry

The public ticker runs on seeded, deterministic data today (`lib/pulse.ts`) on the
same `PulseMetric` contract served by `GET /api/pulse`. When real telemetry comes
online, `usePulseFeed` and the route swap their source — no component changes.

© 2026 SSVP HOLDING LLC
