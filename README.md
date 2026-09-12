# ServiceNest

SaaS booking management for solo mobile service providers — starting with mobile car detailers, built for vertical expansion.

## Live Demo

🔗 [servicenest.app](https://servicenest.app/login)

Currently in closed beta, targeting 3–5 local mobile detailers. Not yet open for public signup — see [Project Status](#project-status).

## Overview

Solo mobile service providers (detailers, mobile groomers, etc.) juggle bookings manually across texts, calls, and paper schedules. ServiceNest gives them a real booking system without the overhead of enterprise scheduling software.

The platform has two sides:

- **Provider dashboard** — manage packages, pricing, availability, and incoming bookings
- **Client-facing booking flow** — a public page clients use to book a service, no account required upfront

## Screenshots

> _Coming soon: dashboard with seeded data, package builder, client booking flow_

## Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (`sn-`-prefixed custom utility classes)
- React Router v7 (nested routing via `<Outlet>`)
- [`@tabler/icons-react`](https://tabler.io/icons) for icons

**Backend / Infrastructure**

- Supabase — Database, Auth, RLS, Edge Functions (Deno/TypeScript), Storage
- Mapbox — geocoding for provider home base coordinates
- Deployed on Vercel (`vercel.json` rewrite for client-side routing)
- Domain via Namecheap → Vercel DNS

**Deferred / Not Yet Integrated**

- Resend (email notifications)
- PWA support (`vite-plugin-pwa`)

## Features

### Implemented

- Provider onboarding with server-enforced gating (phone, geocoded address, service radius, ≥1 package) via `complete-provider-onboarding` Edge Function
- Role-based auth (`app_metadata` as source of truth, not client-writable `user_metadata`)
- Package CRUD with pricing by vehicle size (`sedan/suv/truck/van/oversized`)
- Provider profile with Mapbox-geocoded home base

### In Progress

- **Schedule tab**
  - Pending/Upcoming view — confirm/decline bookings
  - Availability view — weekly template + per-day slot editor

### Planned

- Client-facing public booking flow (slot-based, first-confirmed-wins, guest checkout with 30-min localStorage persistence)
- Client onboarding (single-page: address, phone, default vehicle)
- Dashboard stat aggregations (confirmed today, pending, completed this month, active packages)
- Landing page refresh (waitlist framing, three-screenshot hero)

### Explicitly Out of Scope (for now)

- Stripe Connect / client-facing payments
- SMS notifications
- Reviews
- Recurring bookings
- Fixed-location business types (tint/wrap shops)

## Architecture Notes

- **Division of responsibility:** Edge Functions handle business logic, RLS handles access control, Postgres constraints/triggers handle data integrity — privileged operations never live client-side.
- **Schema-first:** data model decisions are made deliberately since they're harder to reverse than component-level changes.
- Key tables: `providers`, `clients`, `vehicles`, `working_hours`, `packages`, `package_prices`, `bookings`, `notifications`.
- Billing scaffolding fields (`subscription_status`, `stripe_customer_id`, etc.) exist as inert columns, unused during MVP.

## Getting Started

### Prerequisites

- Node.js (LTS)
- Supabase CLI
- A Supabase project (Database + Auth + Edge Functions enabled)
- A Mapbox access token

### Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_MAPBOX_TOKEN=
```

### Install & Run

```bash
git clone <repo-url>
cd servicenest
npm install
npm run dev
```

### Generate Supabase Types

```bash
npx supabase gen types typescript --linked > src/config/database.types.ts
```

## Project Status

Solo-built and actively in development. Currently working through the Schedule tab; the client-facing booking flow is the next demo-critical milestone before sharing a live link more broadly.

## License

_Not yet licensed for public reuse._

## Contact

Built by Hassan Animashaun. [Portfolio / contact link here]
