# Notes authoring guide

Notes are local MDX writing, separate from Works case studies and Experiments structured data.

## Folder convention

```text
content/notes/
├── en/my-note.mdx
└── id/my-note.mdx
```

Use the same slug for translations. A missing translation is allowed and is not replaced with another locale.

## Frontmatter

```yaml
---
slug: my-note
locale: en
title: A useful note
description: A short summary for the index and metadata.
publishedAt: 2026-09-26
category: Engineering
tags:
  - Architecture
draft: false
---
```

`updatedAt` and `cover` are optional. Dates must use `YYYY-MM-DD`. Drafts are not public.

## Publishing workflow

Create the file, write the Markdown/MDX body, validate it, run lint and TypeScript checks, build, then commit and deploy. The local loader validates frontmatter and the public routes only expose published Notes for the requested locale.

The current source is local MDX. The public UI talks to a Notes domain layer, so a future Journal API or CMS can replace the data source without changing the Notes page composition.
