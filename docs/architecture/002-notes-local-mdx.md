# ADR 002: Notes use local MDX initially

- Status: accepted
- Date: 2026-09-26
- Supersedes: ADR 001 decision 9

## Decision

Notes are authored locally as MDX under:

```text
content/notes/
├── en/
└── id/
```

The public UI consumes a Notes domain layer from `src/lib/content/notes.ts`. The loader owns filesystem access, frontmatter validation, locale isolation, draft filtering, deterministic ordering, and slug lookup. React pages and components do not access the filesystem directly.

## Why local MDX

The current publishing volume does not justify a Journal API, CMS, authentication, database, or synchronization layer. Local MDX keeps the authoring path small, reviewable in Git, and consistent with the existing Works content workflow.

Notes and Works share parsing, validation, and controlled prose infrastructure where useful, but their presentation remains different: Works are case studies; Notes are long-form writing.

## Note contract

Required frontmatter:

```yaml
slug: example-note
locale: en
title: Example note
description: A short summary.
publishedAt: 2026-09-26
```

Optional frontmatter:

```yaml
updatedAt: 2026-09-27
category: Engineering
tags:
  - Next.js
cover: /notes/example.png
draft: false
```

Dates use `YYYY-MM-DD`. A `draft: true` Note is excluded from public indexes, detail routes, sitemap generation, homepage previews, and static params.

## Localization

English and Indonesian files may share a slug. A missing locale is not silently substituted; that locale returns `notFound()` and its index does not list the unavailable Note.

## Authoring and publishing workflow

1. Create `content/notes/en/my-note.mdx`.
2. Add validated frontmatter.
3. Write Markdown/MDX content.
4. Add `content/notes/id/my-note.mdx` only when an Indonesian version is ready.
5. Run content validation, lint, TypeScript, and the production build.
6. Commit the content and deploy.

No admin panel, database, authentication, or CMS is required.

## Future migration boundary

A Journal API or CMS may become useful if publishing requirements justify it. In that case, replace the local loader with an adapter that maps external data into the same Notes domain model. The Notes routes, UI components, metadata, and reading presentation should not need a redesign.
