# ADR 001: NasLabs v2 architecture contract (historical)

- Status: superseded by the implemented v2 structure
- Date: 2026-09-26
- Scope: architecture contract for the Phase 01 migration

## Context

NasLabs is moving from an agency-oriented portfolio toward a personal digital lab with the idea `Build. Learn. Explore.` The site will present personal work, smaller technical explorations, local Notes, and personal context.

This document records the boundaries agreed during the initial migration. The implementation has since adopted the v2 route, content, component, and styling structure described below.

## Decisions

1. Keep Next.js App Router and TypeScript strict mode.
2. Keep `next-intl` with English as the unprefixed default locale and Indonesian under `/id`.
3. Use these canonical content routes for both locales:
   - `/`
   - `/works`
   - `/works/[slug]`
   - `/experiments`
   - `/notes`
   - `/notes/[slug]`
   - `/about`
   - `/contact`
4. Treat `/work` and `/work/[slug]` as legacy routes. They now permanently redirect to the `/works` equivalents.
5. Treat `/services` as a legacy route. It remains available as a compatibility route while the public information architecture centers on Works, Experiments, Notes, About, and Contact.
6. Keep the existing contact Server Action, Zod validation, Resend integration, and environment contract unchanged.
7. Store Works as locale-specific MDX under `content/works/{en,id}/*.mdx`, with one file per locale and a shared canonical slug.
8. Store Experiments as structured local TypeScript data initially. Experiments do not use MDX in this phase.
9. Keep Notes behind a local MDX content boundary initially. The earlier Journal API direction is superseded by ADR 002; a future API/CMS remains possible without changing the public Notes UI boundary.
10. Keep About as local/static content integrated with `next-intl`.
11. Keep the Notes domain layer in `src/lib/content/notes.ts` and presentation in `src/components/notes/`. A future external source should replace the loader/data-source implementation, not the public UI.
12. Support light, dark, and system themes through the app-owned theme provider.
13. The former chatbot implementation is not part of the current application and is not reintroduced.
14. Reserve future social identity fields for GitHub and LinkedIn without inventing URLs.

## Consequences

- Existing `/work` links remain valid through permanent redirects.
- New content code must not couple directly to the Journal API response shape.
- Works and Experiments intentionally have different content workflows.
- Current visual implementation remains unchanged while the content and route boundaries are established.

## Historical non-goals

- No visual redesign.
- No MDX dependency or loader.
- No Journal API client.
- No route removal or redirect implementation.
- No package changes.
- No external Journal API is required for the current local Notes implementation.
