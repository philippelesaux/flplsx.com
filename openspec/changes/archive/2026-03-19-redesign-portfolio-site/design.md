## Context

The site is a static Astro 6 site with React 19 for interactive components and Tailwind CSS for styling. The current home page renders a masonry grid via `Lightbox.tsx` on a slate gradient background with a plain sticky white nav. The redesign replaces the background with zinc-950, adds a full-viewport hero carousel above the grid, makes the nav scroll-aware, and animates the grid on scroll. No new dependencies are needed — everything uses existing Astro image APIs, React state, CSS transitions, and native browser APIs.

## Goals / Non-Goals

**Goals:**
- Dark zinc-950 background site-wide
- Full-viewport hero carousel (5 slides, crossfade, auto-advance, random build-time selection)
- Nav has dark gradient scrim over hero → zinc-900/90 + backdrop-blur past hero
- Grid images stagger-fade in as they scroll into view
- Nav structure ready for future photography/code/about links

**Non-Goals:**
- User-controlled carousel (dots, arrows, pause)
- Click-to-expand lightbox (separate future change)
- Per-image portrait/landscape crop art direction (single image, browser crops via object-fit)
- Any server-side or runtime data fetching

## Decisions

**Hero image selection: build-time shuffle of the full portfolio array, take first 5**
`Array.sort(() => Math.random() - 0.5)` in `index.astro` frontmatter. Runs once per build. All visitors in a deploy see the same 5 images; the set changes on the next deploy. Alternative considered: runtime random (JS on page load) — rejected because it would cause a flash of content on first render and complicate SSG.

**Hero image size: 1400px wide WebP via `getImage()`**
A separate `getImage()` pass from the 400px thumbnails. 1400px covers retina displays at full viewport width on most screens without excessive file size. Alternative considered: serving original JPEGs — rejected due to 15–58MB file sizes.

**Carousel implementation: React state + CSS opacity transition**
`Hero.tsx` manages current slide index with `useState` and advances with `setInterval` in a `useEffect`. Crossfade is a CSS `transition: opacity` on absolute-positioned `<img>` elements — no animation library. Alternative considered: CSS-only animation — rejected because coordinating a 5-image cycle without JS requires complex keyframe math that breaks when timing changes.

**Gradient scrim: two-layer approach — hero container + nav itself**
A `bg-gradient-to-b from-black/60 to-transparent` overlay `<div>` inside `Hero.tsx` covers the top of the hero for general image darkening. Additionally, the nav itself carries a `bg-gradient-to-b from-black/50 to-transparent` base style. The second layer is necessary because the nav is `position: fixed` (out of document flow), so the hero starts at the top of the page behind the nav rather than below it — the hero's own scrim and the nav occupy the same vertical space, and both gradients together ensure text is readable against any image brightness.

**Scroll-aware nav: scroll event + `getBoundingClientRect` in BaseLayout**
A `<script>` tag in `BaseLayout.astro` listens to the `scroll` event and toggles a `scrolled` class on the `<nav>` when `hero.getBoundingClientRect().bottom <= 0` — i.e., the hero has fully scrolled out of view. CSS (global, not scoped) handles the transition to `bg-zinc-900/90 backdrop-blur`. The nav is `position: fixed` so it does not take space in the flow; the `.scrolled` styles use `background-image: none` to clear the base gradient. Alternative considered: Intersection Observer — rejected after implementation revealed a timing bug where the observer fired before client hydration, incorrectly adding `scrolled` on initial load. The scroll event approach is deterministic and has no race condition.

**Grid entrance animations: Intersection Observer inside `Lightbox.tsx`**
Each `<img>` starts `opacity-0 translate-y-4` and transitions to `opacity-100 translate-y-0` when it enters the viewport. Stagger applied via CSS `transition-delay` indexed by position. Pure CSS transitions, no JS animation loop. Alternative considered: a CSS animation triggered by a class — same approach, chosen implementation uses `IntersectionObserver` for the class toggle.

## Risks / Trade-offs

- **`setInterval` drift in carousel** — intervals can drift slightly if the tab is backgrounded. → Acceptable: the carousel is decorative, not time-critical. If the tab is backgrounded, the browser throttles timers anyway.
- **Build time increases** — 5 additional `getImage()` calls at 1400px on top of existing 26 at 400px. → Minimal: sharp processes these in ~1s each, Astro caches across builds.
- **Tailwind purge** — dynamically constructed class names (e.g., `delay-${index * 100}`) won't be purged correctly. → Use a fixed lookup array of Tailwind delay classes (`['delay-0', 'delay-100', ...]`) to ensure they appear as literal strings in source.
- **zinc-950 on the about page** — BaseLayout change affects all pages. Text and image contrast on `/about` must be verified after the background change.
