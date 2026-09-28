# NasLabs v2 content model

These contracts describe the current content boundary. Works and Notes use author-managed local MDX; Experiments use typed structured data in `src/content/experiments.ts`.

The TypeScript/Zod contracts live in [`src/lib/content/contracts.ts`](../../src/lib/content/contracts.ts) and are used by the content loaders and validation scripts.

## Directory convention

Works are stored as one MDX file per locale:

```text
content/works/
├── en/
│   └── <slug>.mdx
└── id/
    └── <slug>.mdx
```

English and Indonesian files share the same canonical slug. The locale in frontmatter must match the directory that contains the file.

The current loader is [`src/lib/content/works.ts`](../../src/lib/content/works.ts). It uses `gray-matter` to parse frontmatter and preserve the MDX body as source text for the public Works routes and controlled prose renderer.

## Work

Works are substantial, curated projects or case studies. Their body is authored in MDX; the structured fields provide listing, metadata, filtering, and SEO data.

Required fields for newly authored Works:

- `slug`
- `locale`
- `title`
- `description`
- `category`
- `featured`
- `cover`
- `stack`
- `role`
- `status`

`year` is optional at the validated boundary for legacy imports because the current project source does not contain factual project years. New Works should provide it when the year is known.

Optional fields:

- `externalUrl`
- `repositoryUrl`
- `metadata`

`status` is controlled and currently accepts `completed`, `in-progress`, `archived`, or `concept`. `cover` must point to a local public asset path such as `/projects/example.png`; external image URLs are not part of this phase.

The MDX body is deliberately not represented as a field in the frontmatter contract. The MDX loader will associate the body with the validated metadata later.

## Experiment

Experiments are smaller explorations, prototypes, infrastructure projects, self-hosted systems, tools, or curiosity-driven builds. They use structured local TypeScript data initially.

Required fields:

- `slug`
- `title`
- `description`
- `category`
- `year`
- `status`
- `technologies`
- `links`

Optional fields:

- `image`

## NoteSummary and Note

Notes are local MDX documents under `content/notes/{en,id}/*.mdx`. Required fields are `slug`, `locale`, `title`, `description`, and `publishedAt`. Optional fields are `updatedAt`, `category`, `tags`, `cover`, and `draft`.

`NoteSummary` is the minimum shape needed by a listing. `Note` extends it with the optional body used by the detail page. Drafts are validated but excluded from all public routes, homepage previews, sitemap entries, and static params.

The Notes domain layer is implemented in [`src/lib/content/notes.ts`](../../src/lib/content/notes.ts). A future Journal adapter must validate and map external data before it reaches `components/notes`.

## NavigationItem

Navigation is represented as data rather than repeated JSX. The contract supports localized labels, an internal route or external URL, optional visibility, and an optional legacy marker.

## Locale

The supported locale contract is currently `en | id`, matching the existing `next-intl` routing configuration.

## Future additions

The following fields may be added after real content needs are known:

- Work and Experiment tags
- draft or publication state
- content ordering
- translated titles and descriptions
- image alt text and dimensions
- related Works, Experiments, or Notes

## Adding a Work

1. Create the English MDX file under `content/works/en/<slug>.mdx`.
2. Create the Indonesian MDX file under `content/works/id/<slug>.mdx`.
3. Reuse or add a local asset under `public/` and reference it with a root-relative path.
4. Validate frontmatter with the Works loader.
5. Run `node --conditions=react-server --experimental-strip-types scripts/validate-works.ts`, lint, and TypeScript validation.
6. Commit the content and metadata together.
7. Deploy after the content has passed validation.
