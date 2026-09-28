# NasLabs v2 route contract

## Canonical route matrix

English is the default locale and has no locale prefix. Indonesian uses `/id`.

| Content | English | Indonesian | Status |
| --- | --- | --- | --- |
| Home | `/` | `/id` | Canonical route |
| Works index | `/works` | `/id/works` | Canonical route |
| Work detail | `/works/[slug]` | `/id/works/[slug]` | Canonical route |
| Experiments | `/experiments` | `/id/experiments` | Canonical route |
| Notes index | `/notes` | `/id/notes` | Implemented with local MDX |
| Note detail | `/notes/[slug]` | `/id/notes/[slug]` | Implemented with local MDX |
| About | `/about` | `/id/about` | Canonical route |
| Contact | `/contact` | `/id/contact` | Canonical route |

## Legacy routes

| Legacy route | Current handling | Status |
| --- | --- | --- |
| `/work` | Permanent redirect to `/works` | Compatibility route |
| `/work/[slug]` | Permanent redirect to `/works/[slug]` | Compatibility route |
| `/services` | Redirect to `/` | Compatibility route |
| `/id/work` | Permanent redirect to `/id/works` | Compatibility route |
| `/id/work/[slug]` | Permanent redirect to `/id/works/[slug]` | Compatibility route |
| `/id/services` | Redirect to `/id` | Compatibility route |

## Redirect requirements

- Keep permanent redirects after the canonical pages and metadata are live.
- Preserve the locale.
- Preserve the work slug.
- Update internal links, sitemap URLs, canonical URLs, and hreflang together.
- Verify existing indexed URLs before retiring legacy pages.
