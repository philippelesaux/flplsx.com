## Context

The about page currently lists publication appearances as a plain `<ul>` inside the two-column bio area. This change moves them to a dedicated section with image cards.

The portfolio grid establishes the data pattern used here: Astro Content Collections backed by a JSON file and the `image()` schema helper for build-time optimisation. The card interaction model differs — each publication card has two independent article links (photo and title) plus an optional author link, rather than a single wrapping link.

## Goals / Non-Goals

**Goals:**
- Dedicated `Publications` Astro component owning the section heading, card grid, and all card styles
- "Recent Publications" heading rendered at `--text-lg` — more prominent than the `--text-sm` label style used by Contact and other section markers
- `press` Content Collection backed by `src/data/press.json`, using the same `image()` helper as `portfolio`
- Cards are `<div>` elements containing two independent `<a>` links to the article (photo and title) and an optional author `<a>` link — no nested interactive elements
- Photo hover scale effect via CSS only — no script file needed
- Remove the credentials `<ul>` and its styles from `about.astro`

**Non-Goals:**
- Dialog or lightbox on click (cards link directly to the article)
- Swipe or carousel behaviour
- Filtering or sorting of publications

## Decisions

### Single component: `Publications.astro` owns everything
**Decision**: One component handles the section heading, card grid, and card markup. No sub-component for individual cards.

**Rationale**: The cards have no interactive behaviour requiring a script, and no state. There is no complexity that warrants splitting into `PublicationCard.astro`. A single component is easier to read and maintain at this scale.

**Alternative considered**: `FeaturedIn.astro` as a wrapper with a separate `PressGallery.astro` for the grid — rejected as unnecessary abstraction given the simplicity of the feature.

### `press` Content Collection with `image()` schema
**Decision**: Declare a `press` collection in `content.config.ts` using `file('src/data/press.json')` and the `image()` schema helper.

**Rationale**: Mirrors the existing `portfolio` collection exactly. `image()` gives Astro's `<Image>` component with automatic format conversion, srcset generation, and lazy loading at no extra cost. The JSON file is the single source of truth for publication data.

**Data shape**:
```ts
{
  id: string,
  publication: string,
  articleTitle: string,
  author: string,
  authorUrl?: string, // optional link to the author's profile
  url: string,        // article URL
  image: image(),     // published photo asset
  alt: string,
}
```

`authorUrl` is optional — omitting it renders the author as plain text. When present, the author credit renders as an `<a>` opening in a new tab.

### Card structure: `<div>` with two independent article links
**Decision**: Each card is a `<div>` containing: an `<a>` wrapping the photo (linking to the article), a text block with a separate `<a>` wrapping publication name and article title (also linking to the article), and an optional author `<a>` linking to the author's profile.

**Rationale**: A single `<a>` wrapping the entire card — including the author link — produces invalid HTML (nested interactive elements). Browsers silently restructure the DOM in this case, breaking layout and hover behaviour. Two independent article links avoids nesting entirely. The photo link is given `tabindex="-1" aria-hidden="true"` so keyboard and screen reader users encounter the article link only once (via the title), not twice.

**Hover**: `transform: scale(1.03)` is applied to the photo `<img>` on `.pub-image-link:hover img`, with `clip-path: inset(0)` to contain the scaled image. The text block is unaffected. No JavaScript needed.

### Width constraint: narrower than the 960px bio wrapper
**Decision**: The Publications section is constrained to `max-width: 720px`, centred below the bio area.

**Rationale**: With two columns, 720px gives each card roughly 340px — comfortable for a portrait or square photo. A narrower constraint than the bio wrapper creates intentional visual rhythm and prevents the cards from stretching uncomfortably on wide viewports.

### Publication name rendered in small-caps, matching the existing label style
**Decision**: The publication name (e.g., "TIME OUT") uses the same small-caps, muted, uppercase typographic treatment as the existing "Featured in" and "Contact" section labels.

**Rationale**: Reuses an established visual pattern from the page. Visually differentiates the publication name from the article title and author without introducing new typographic tokens.

### New type scale token: `--text-lg` at `1.125rem`
**Decision**: Add `--text-lg: 1.125rem` (18px) to `tokens.css` and use it for the Publications section heading.

**Rationale**: The existing scale jumps from `--text-base` (1rem / 16px) to `--text-xl` (1.25rem / 20px) with no intermediate stop. A section heading that needs to read above a card grid — but remain subordinate to the page's `h1` — sits naturally at 18px. `--text-lg` fills a genuine gap in the scale and is likely reusable elsewhere.

**Alternative considered**: Using `--text-base` with no new token — rejected as insufficiently prominent. Using `--text-xl` — rejected as too heavy.

### Publications heading treatment: uppercase, weight 400, secondary color
**Decision**: The `.publications-label` heading uses `font-weight: 400`, `text-transform: uppercase`, `letter-spacing: var(--tracking-wider)`, and `color: var(--color-text-secondary)`.

**Rationale**: The goal is visual interest without competing with the card content. Uppercase and wide tracking give structural presence; weight 400 and secondary color keep it restrained. This creates three clear differences from the Contact label (which is bold, muted, and smaller): size, weight, and color. It avoids collapsing into existing treatments — sentence-case at weight 400 would read as an oversized roles line; bold uppercase muted would just be a bigger Contact label.

### Two-column breakpoint: `min-width: 600px`
**Decision**: The card grid switches from one column to two at `min-width: 600px`.

**Rationale**: At 600px viewport width, usable width (minus 32px page padding) is 568px, giving each card ~276px — comfortable for photo content. Below 600px (all common phones in portrait), cards stack in a single column at full usable width. The existing about page bio breakpoint is 768px; 600px is intentionally earlier and independent, appropriate for this narrower 720px-constrained section.

## Risks / Trade-offs

- **Image sourcing is manual**: Each press entry requires a published photo to be cropped and placed in `src/data/press/`. There is no automated pipeline. → No mitigation needed; the set of entries is small and stable.
- **Removing the credentials list breaks the existing `about-page` spec**: The delta spec in this change handles this by explicitly REMOVING the two credentials requirements and MODIFYING the layout requirements. → Verify the delta spec syncs cleanly on archive.
