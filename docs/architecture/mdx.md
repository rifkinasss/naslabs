# Local MDX implementation

## Selected approach

Phase 02 adds two small packages:

- `gray-matter`: parses YAML frontmatter and separates it from the MDX body.
- `server-only`: marks the filesystem-backed loader as unavailable to Client Components.

Works and Notes now have public MDX routes. The filesystem loaders validate frontmatter server-side and keep the document body separate from the typed metadata. The current controlled prose renderer supports the Markdown/MDX elements used by the content and exposes safe component seams without executing arbitrary client-side filesystem code.

This approach was selected because it supports local files, frontmatter, server-side loading, deterministic static data access, Zod validation, and future component rendering while avoiding a CMS or an abstraction-heavy content framework.

## Loader API

[`src/lib/content/works.ts`](../../src/lib/content/works.ts) exposes:

- `getAllWorks(locale)`: returns validated and deterministically sorted documents.
- `getFeaturedWorks(locale)`: returns the featured subset.
- `getWorkBySlug(locale, slug)`: returns one document or `null`.
- `getWorkSlugs(locale)`: returns sorted canonical slugs.

Each document has:

- `metadata`: the validated `Work` contract.
- `body`: the MDX body without frontmatter.
- `sourcePath`: the source file path for diagnostics.

The loader accepts only `en` and `id`, validates slugs before constructing paths, reads only `content/works/<locale>`, and reports frontmatter issues with the source path and field names.

## Validation

The focused validation script is `scripts/validate-works.ts`. It checks English and Indonesian loading, slug lookup, featured filtering, missing slugs, unsupported locales, path traversal input, and malformed metadata.

## Notes

Notes use the same local parsing and controlled prose foundation but have a separate domain loader and presentation layer. Notes are long-form writing, not case studies. See [`notes.md`](./notes.md) for the frontmatter and authoring workflow.

## Deferred work

- `<ProjectGallery />` and `<MetricGrid />`
- Richer Note-specific components only when real content requires them
- A future Journal/CMS adapter, if publishing volume justifies replacing local MDX
