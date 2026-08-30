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

## CI/CD

GitHub Actions runs lint and build on every push or pull request. A successful push to `Version1.1` triggers the production deploy workflow.

Add these GitHub repository secrets before enabling automatic deploy:

- `SSH_HOST` — server IP or hostname
- `SSH_USER` — Linux user used for deployment
- `SSH_PRIVATE_KEY` — private key whose public key is in the server user's `~/.ssh/authorized_keys`
- `DEPLOY_PATH` — project path, for example `/www/wwwroot/naslabs.my.id`
- `PM2_APP_NAME` — PM2 process name used to run the Next.js app

The server must already have Node.js 22, Git, and PM2 installed. The server's `.env.local` remains on the server and is not committed to Git.
