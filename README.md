# Hearth & Grain

A tiny shop built with Next.js 15 (App Router): a product list with search, a cart with coupons, and a contact form, backed by simple API routes.

```bash
npm i
npm run dev          # webpack (default)
# npm run dev:turbo  # or Turbopack
```

Open http://localhost:3000.

## Pages

| Page | What's there |
| --- | --- |
| **Shop** `/` | Product list from `GET /api/products`, search, add to cart (`POST /api/cart`) |
| **Cart** `/cart` | Cart items, quantity, coupon codes (`CALM10`, `HEARTH20`) |
| **Contact** `/contact` | Contact form posting to `POST /api/contact` |
| **About** `/about` | Static page |

Optional: copy `.env.example` to `.env` and fill in any keys you need.
