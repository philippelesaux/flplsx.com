## Context

The about page is a single Astro component (`src/pages/about.astro`) with no external data dependencies — all content is hardcoded in markup. The current structure is a centered vertical stack: `h1` name → `h2` roles → `<figure>` headshot → `<p>` bio. The page uses the existing design token set and the Fraunces variable font already loaded globally.

The primary audience is food/travel editors evaluating Philippe as a photographer. The redesign has been explored collaboratively — decisions on layout, role hierarchy, credentials treatment, and bio voice are already resolved.

## Goals / Non-Goals

**Goals:**
- Remove redundant `h1` name; let roles lead the content
- Apply visual hierarchy to roles: Photographer in `--color-accent`, Engineer and Musician in `--color-text-secondary`
- Restructure layout to mobile-first vertical stack with two-column treatment on wider screens
- Headshot leads content on mobile; sits in the left column on desktop
- Convert bio to first-person (minimal copy change)
- Add a "Featured in" credentials section: Time Out, Edible, Philly Mag as styled text
- Design the credentials section to accept logo assets in a future change without structural rework

**Non-Goals:**
- Publication logo assets — deferred to a follow-on change
- Bio rewrite beyond first-person conversion
- Changes to any other page, component, or layout

## Decisions

### Roles rendered as a styled list, not a heading

**Decision**: Replace the `h2` roles element with a `<ul>` or a set of `<span>` / `<p>` elements styled independently.

**Rationale**: A single `h2` cannot express two different colors for sibling items without extra markup. Individual elements allow Photographer to receive `--color-accent` and the other two to receive `--color-text-secondary` cleanly, using Astro scoped styles.

**Alternative considered**: Wrapping parts of the `h2` in `<span>` tags with inline styles — rejected as it mixes presentation into markup and is harder to maintain.

### Two-column desktop layout via CSS Grid

**Decision**: Use a two-column CSS Grid on the outer wrapper, switching from a single-column mobile stack at a breakpoint (768px).

**Rationale**: Grid gives precise control over column sizing and alignment without extra wrapper divs. The headshot column can be fixed-width (e.g. `300px` or `33%`) with the content column taking the remainder. On mobile, `grid-template-columns: 1fr` collapses naturally.

**Alternative considered**: Flexbox — viable but Grid's explicit column sizing is cleaner for a fixed-asset layout where the photo width matters.

### Credentials section as styled text with slot-ready structure

**Decision**: Render publications as text items inside a `<ul>` with a "Featured in" label. Each `<li>` contains only a publication name for now, but is structured as a flex row with an icon slot (`<span class="pub-icon">`) so logos can be dropped in later without changing the list structure.

**Rationale**: Avoids a two-pass structural rework when assets arrive. The icon slot is visually inert until populated.

### Spacing: clear the fixed nav and constrain max-width

**Decision**: The page wrapper gets `padding-top` sufficient to clear the fixed nav (~56px) plus breathing room — `--space-16` (4rem) is the closest token and works as a minimum. Horizontal padding uses `--space-8` (2rem) on mobile. On desktop the grid sits inside a `max-width` of `960px` centered with `margin: 0 auto`, preventing the two-column layout from over-stretching on wide viewports.

**Rationale**: The current page uses `margin: 0 var(--space-8)` on the wrapper with no top offset, which places the `h1` partially behind the fixed nav (nav is ~56px, margin-top is ~32px). The new layout needs explicit top clearance. The `max-width` constraint solves the "lots of empty space on the sides" problem — content fills a comfortable reading width without sprawling across the full viewport.

**Vertical rhythm between sections**: use `--space-8` (2rem) as the default gap between the headshot, roles, bio, and credentials sections on mobile. On desktop, the grid column gap is also `--space-8`, and vertical spacing within the content column follows the same rhythm.

**Alternative considered**: Using `padding-top: 56px` (hardcoded nav height) — rejected in favour of `--space-16` as the closest token, which provides slightly more breathing room and avoids a magic number.

### No changes to BaseLayout or global styles

**Decision**: All changes are scoped to `about.astro`. No new tokens, no global CSS changes.

**Rationale**: The existing token set (`--color-accent`, `--color-text-secondary`, `--text-5xl`, `--space-*`, Fraunces) is sufficient for all the visual changes needed.

## Risks / Trade-offs

- **Headshot aspect ratio on desktop** — the image is a portrait headshot; constraining it to a fixed column width may clip or awkwardly crop it depending on column ratio chosen. → Use `object-fit: cover` with a defined height, or let it scale naturally with `width: 100%` and no height constraint.
- **Column ratio** — not yet decided (40/60? 33/67?). A wider content column is more appropriate since the text content (roles + bio + credentials) is the editorial pitch. → Start at 40/60, adjust in preview.
