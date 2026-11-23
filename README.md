# KAF Academy Website

Next.js site for KAF Academy — kids inline skating lessons in Suwanee, Johns Creek, and Alpharetta, GA.

- `/` — one-page site (programs, schedule, locations, FAQ)
- `/trial` — trial class booking (Supabase)
- `/api/trial-email` — sends booking confirmation emails to the parent and to KAF (SMTP)

## Run locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # fill in Supabase and SMTP values
npm run dev
```

Open http://localhost:3000. Without the Supabase values, the home page works but `/trial` cannot load classes.

## Build for production

```bash
npm run build
npm start
```

## Images

- `public/kaf-logo.png` — 512px logo (replace with an SVG when available)
- `public/Images/hero.jpg` — hero photo, 2000px wide, compressed. Keep new photos under ~500 KB.
