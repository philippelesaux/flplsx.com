## Context

The site currently uses a dark (`zinc-950`) background with white text throughout, teal-400 accent scattered across the nav and about page, and rounded thumbnails. The goal is to shift to a white-background editorial aesthetic suited to food/travel publication editors, with a Fraunces serif nameplate as the identity anchor and teal consolidated to a single element.

## Goals / Non-Goals

**Goals:**
- Invert the background to white and update all text colors for legibility
- Add Fraunces variable serif exclusively for the "Philippe LeSaux" name (nav + about H1)
- Consolidate teal to one element: the about page H1 at `teal-600`
- Update scrolled nav state to white background with dark text
- Remove rounded corners from thumbnails and lighten hover border

**Non-Goals:**
- Changing the layout structure (masonry columns, hero carousel, page routes)
- Modifying any animations or interactive behavior
- Updating the favicon or any other brand assets
- Changing font sizes, weights, or tracking beyond the serif nameplate addition

## Decisions

### Fraunces via `@fontsource-variable/fraunces`
**Decision**: Import Fraunces as a variable font using `@fontsource-variable/fraunces`, added to `BaseLayout.astro` alongside the existing Plus Jakarta Sans import.

**Rationale**: Keeps the font loading pattern consistent with how Plus Jakarta Sans is loaded. Variable format minimizes HTTP requests and supports weight variation if needed in future. Scoped to name elements only via a utility class or inline `font-family` style.

**Alternative considered**: Loading from Google Fonts CDN — rejected to avoid external dependency and for consistency with the existing @fontsource pattern.

### Single teal anchor on the about page
**Decision**: `teal-400` removed from nav hover underlines and replaced with a neutral zinc underline. Teal survives only as `teal-600` on the about page H1.

**Rationale**: Concentrating color to one page and one element makes it feel intentional rather than decorative. Editors landing on the index page see a clean black/white palette; the about page rewards curiosity with the one moment of color. `teal-600` (vs `teal-400`) provides sufficient contrast on white (≥4.5:1 for large text).

### Nav scrolled state: white background + dark text toggle
**Decision**: The existing `.scrolled` global CSS rule (in `BaseLayout.astro`) changes from `bg zinc-900/0.9` to `white/0.9`. A second CSS rule targets `[data-nav].scrolled` to set text to `zinc-900`. The hero-state white text remains via the base `text-white` on the nav element.

**Rationale**: The nav must be white-text while floating over hero images (any background color), then dark-text on white once scrolled. CSS handles this cleanly without JS changes — the scroll detection logic is unchanged.

**Alternative considered**: Always dark text — rejected because white text over hero images is essential for readability across varied photo brightness.

## Risks / Trade-offs

- **Fraunces at small sizes** → Fraunces is a display serif and renders well at heading sizes. Used only for the name in the nav (`text-xl`) and about H1 (`text-5xl`), both large enough for the font to shine.
- **Dark images on white background** → Some moody images may feel less impactful without a dark surround. Mitigated by the editorial intent: white creates a gallery-wall / magazine-page effect that is standard for this audience.
- **Scrolled nav text color** → The CSS-only approach means the name in the nav is always white (including before scroll on non-hero pages like `/about`). On white background `/about` loads without a hero, so the name would be white-on-white before scrolling. **Mitigation**: default the nav to dark text and only use white while `.not-scrolled` over a hero, OR set a default dark text with white override. Simplest fix: apply `text-zinc-900` as the default nav text color, and override to `text-white` via the gradient scrim state. This requires a small JS or CSS adjustment beyond the original scope — worth resolving in tasks.

## Open Questions

- ~~Which serif font?~~ → Fraunces (resolved in exploration)
- ~~Teal placement?~~ → About page H1 only (resolved in exploration)
- **Nav text on `/about` before scroll**: default dark or white? See risk above. Recommendation: default to `text-zinc-900`, add `text-white` only when hero is present. Current JS only runs if `[data-hero]` exists, so this is page-conditional already — can leverage this.
