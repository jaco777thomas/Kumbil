# Kumbil Website

Next.js + Tailwind e‑commerce site scaffold for **Kumbil** (`kumbil.in`).

## Requirements

- Install **Node.js LTS** (so `node` / `npm` are available on your PATH).

## Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## What’s implemented

- Marketing pages: Home, About, Gallery, Blog, Contact
- Shop pages: Products, Product detail, Cart, Checkout (mock order confirmation)
- Blog posts sourced from `content/blog/*.md`
- Contact form posts to `/api/contact` (SMTP configurable; logs in dev if SMTP is missing)
- Order-to-Origin tracking demo at `/track` (try order ID `ORD-SAMPLE`)
- Payment provider abstraction + stub endpoint `/api/payments/create`
- i18n scaffolding via `messages/*.json` (English integrated; ready for more locales)

## Environment variables (optional)

For contact email (SMTP):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `KUMBIL_CONTACT_TO` (default: `Info.kumbil@gmail.com`)
- `KUMBIL_CONTACT_FROM` (default: `no-reply@kumbil.in`)

Payments (stub for now):

- `KUMBIL_PAYMENT_PROVIDER` (default: `mock`)

