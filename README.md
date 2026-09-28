# NasLabs Web

Personal digital lab for Rifki Anashirul — Build. Learn. Explore.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide React
- Local Works and Notes MDX content
- Structured Experiments data
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
/works
/works/[slug]
/experiments
/notes
/notes/[slug]
/about
/contact
/id (localized routes mirror the public routes above)
/work -> /works (permanent redirect)
/work/[slug] -> /works/[slug] (permanent redirect)
/services -> / (permanent redirect)
/sitemap.xml
/robots.txt
```

## Repository structure

```text
content/       Author-managed Works and Notes MDX
docs/          Current architecture and authoring documentation
messages/      English and Indonesian translations
public/        Public assets and documents
scripts/       Content validation and install maintenance scripts
src/app/       Next.js routes and metadata
src/components/ Reusable UI and page compositions
src/config/   Stable application configuration
src/content/  Typed structured Experiments data
src/i18n/     Locale routing and message loading
src/lib/      Content loaders, SEO, and application infrastructure
src/styles/   Design tokens and scoped styles
```

Generated directories such as `.next/` and `node_modules/` are local-only
and are intentionally excluded from this tree.

## Checks

```bash
npm run lint
npm run validate:content
npx next build --webpack
```

Theme initialization is applied by the client provider after hydration, while
the server and first client render keep the same document tree. This avoids
placing an inline theme script inside a hydrated provider subtree.

## Deployment

No CI workflow files are committed in this repository. Run the checks above
in the deployment pipeline before publishing the application.

Add these GitHub repository secrets before enabling automatic deploy:

- `SSH_HOST` — server IP or hostname
- `SSH_USER` — Linux user used for deployment
- `SSH_PRIVATE_KEY` — private key whose public key is in the server user's `~/.ssh/authorized_keys`
- `DEPLOY_PATH` — project path, for example `/www/wwwroot/naslabs.my.id`
- `PM2_APP_NAME` — PM2 process name used to run the Next.js app

The server must already have Node.js 22, Git, and PM2 installed. The server's `.env.local` remains on the server and is not committed to Git.
