# NasLabs v2 design direction

This document records the implemented visual foundation and the constraints that should guide future changes.

## Direction

- Editorial
- Restrained
- Content-first
- Strong typography
- Generous whitespace
- Thin borders
- Minimal radius
- Precise grid
- Blue as the brand accent

## Avoid

- Gradients
- Glassmorphism
- Excessively rounded cards
- Glow effects
- Decorative pills
- Large technology-logo walls
- Unnecessary animation
- Generic SaaS landing-page patterns

## Design-system implications

The system defines explicit tokens for color, typography, spacing, borders, radii, focus states, and motion. Light, dark, and system themes are implemented through the theme provider.

The implementation is namespaced under the v2 styles and components while legacy selectors remain isolated where compatibility requires them.

## Implementation boundary

The namespaced v2 foundation lives under `src/styles/` with reusable primitives under `src/components/ui/`. Tokens use the `--v2-*` prefix so the blue palette and dark theme do not silently change remaining legacy selectors.

The shared stylesheet imports the v2 foundation and scoped page styles; legacy selectors are retained only where existing compatibility routes require them.

## Color tokens

Light theme:

| Token | Value | Use |
| --- | --- | --- |
| `--v2-background` | `#f8fafc` | Page background |
| `--v2-foreground` | `#0f172a` | Primary text |
| `--v2-surface` | `#ffffff` | Raised content surface |
| `--v2-surface-subtle` | `#f1f5f9` | Quiet surface and hover |
| `--v2-muted` | `#64748b` | Supporting text |
| `--v2-muted-foreground` | `#475569` | Readable secondary text |
| `--v2-border` | `#e2e8f0` | Default border |
| `--v2-border-strong` | `#cbd5e1` | Stronger control border |
| `--v2-primary` | `#2563eb` | Brand action |
| `--v2-primary-hover` | `#1d4ed8` | Action hover |
| `--v2-primary-soft` | `#eff6ff` | Subtle action background |
| `--v2-focus-ring` | `#1d4ed8` | Keyboard focus |

Semantic state tokens are available for success, warning, and danger. They should be paired with text or an icon and never communicate state through color alone.

Dark mode uses deep navy/slate surfaces, cool slate text, subtle slate borders, and a lighter blue primary. It is defined in `src/styles/tokens.css` under `html.dark` and is not an inversion of the light palette.

## Typography

The selected v2 typeface is IBM Plex Sans, loaded through `next/font/google` in `src/styles/fonts.ts`. It was chosen for readable long-form text, strong UI numerals, and a technical character without turning the interface into a monospace or display-font treatment.

The utility roles are:

- `v2-display`
- `v2-h1`
- `v2-h2`
- `v2-h3`
- `v2-body-lg`
- `v2-body`
- `v2-body-sm`
- `v2-label`
- `v2-caption`
- `v2-mono`

These are classes rather than wrapper components so semantic HTML remains natural.

## Spacing and layout

The v2 scale uses a small spacing register from `--v2-space-1` through `--v2-space-9`, plus semantic values for:

- `--v2-page-gutter`
- `--v2-section-space`
- `--v2-content-gap`
- `--v2-component-gap`
- `--v2-compact-gap`

Page gutters adapt at content-driven ranges for mobile, tablet, desktop, and wide desktop. The shared container max width is `76rem` and is intentionally not the legacy `1180px` shell.

Reusable layout primitives:

- `Container`: responsive max-width and gutters
- `Section`: predictable vertical rhythm
- `SectionHeader`: small API for eyebrow, title, description, and action

## Interaction primitives

- Existing `Button` retains its legacy variants and now exposes opt-in `v2-primary`, `v2-secondary`, and `v2-ghost` variants.
- `ArrowLink` provides a text-first directional link with an arrow only where direction is meaningful.
- `ThemeProvider` supports light, dark, system preference, and persistent preference through the app-owned theme provider.
- `ThemeToggle` is reusable but is not placed in the legacy header yet.
- `SkipLink` is integrated in the shared locale layout and targets `#main-content`.

Buttons and links use modest radii, thin borders, no gradients, and visible keyboard focus. The v2 minimum interactive height is `2.75rem`, which provides a practical touch target.

## Radius, borders, and shadow

- `--v2-radius-sm`: `0.2rem`
- `--v2-radius-md`: `0.4rem`
- `--v2-border`: default thin border
- `--v2-border-strong`: control and emphasis border
- `--v2-shadow-sm`: reserved for slight functional elevation

Hierarchy should come from typography, spacing, border, contrast, and grid before shadow.

## Motion and responsive rules

Motion is limited to short CSS transitions for state changes and directional links. The foundation does not add Framer Motion. A `prefers-reduced-motion` rule disables transitions and animation in v2 scopes.

The responsive foundation uses fluid sizing and deliberate ranges rather than device-specific layouts. Future pages should verify around 375px, 768px, 1024px, and 1440px, while allowing the layout to reflow continuously between them.

## Accessibility rules

- Use semantic headings and landmarks.
- Keep visible `:focus-visible` indicators with the v2 focus token.
- Keep text and control contrast sufficient in both themes.
- Pair status colors with text, icons, or another non-color cue.
- Preserve keyboard operation for menus, dialogs, links, and controls.
- Respect reduced-motion preferences.
- Keep content readable at increased text size and avoid clipping.

## Reuse across future properties

Journal and Drive can use the same v2 tokens, typography roles, borders, focus rules, and layout primitives without sharing identical page compositions. A Journal article may use a narrow reading column and rich text rhythm; a Drive surface may need denser controls and status feedback. The visual language is shared through tokens and interaction rules, not by forcing every product surface into the same card grid.
