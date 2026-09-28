# NasLabs v2 SEO contract

This is the current SEO contract. Route metadata and sitemap generation are implemented in `src/lib/seo.ts` and the App Router metadata files.

- Redirect `/work` to `/works` permanently through the legacy route handlers.
- Preserve locale-aware canonical URLs.
- Preserve `hreflang` and `x-default` behavior.
- Generate localized metadata for Works, Experiments, and Notes.
- Support per-content OpenGraph images where useful.
- Include Works, Experiments, and Notes in the sitemap.
- Use structured data appropriate for a personal digital lab, not only `ProfessionalService`.
- Keep About and Contact metadata localized.
- Validate generated canonical URLs after route migration.
