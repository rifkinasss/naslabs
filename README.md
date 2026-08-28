# NasLabs Web

Official website for NasLabs, an independent software development studio.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide React
- Local project content
- Resend for contact email
- Optional Google Analytics 4

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local`, then add the keys yourself:

```bash
cp .env.example .env.local
```

Required for production contact email:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` — sender domain must be verified in Resend

Optional:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — enables GA4 and CTA event tracking

The app remains functional without the optional analytics key. The contact form shows a configuration message until the Resend values are available.

## Routes

```text
/
/services
/work
/work/[slug]
/about
/contact
/sitemap.xml
/robots.txt
```

## Checks

```bash
npm run lint
npx next build --webpack
```
