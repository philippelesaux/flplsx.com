## Context

The nav is a single `NavigationBar.astro` component rendered in `BaseLayout.astro`, shared across all pages. Scroll-state logic lives in a `<script>` block in `BaseLayout.astro` — it listens to `scroll` events and checks `window.scrollY > 0`. The nav has two CSS class states: `hero-visible` (white text, large name) and `scrolled` (translucent white background, dark text), defined in `global.css`.

## Goals / Non-Goals

**Goals:**
- Add Photography and About links in the correct order
- Hamburger menu on mobile with clip-path reveal animation
- Nav translucent background triggers on `scrollY > 0` on every page, not just pages with a hero

**Non-Goals:**
- Creating a `/photography` page (Photography links to `/`)
- Changing desktop nav layout or any visual properties beyond what's described

## Decisions

### Scroll trigger: `scrollY > 0` instead of hero visibility

Current logic: `scrolled = heroBottom <= 0`. This only fires when `[data-hero]` exists. On pages without a hero, the nav never gets a background.

New logic: `scrolled = scrollY > 0`, unconditionally. The `hero-visible` class (white text, large name) stays but is now gated on `scrollY === 0 && hero exists`. These two states become mutually exclusive by definition — you can't be at the very top and have scrolled.

This is a behavior change: previously the translucent background appeared only after scrolling past the full 100vh hero. Now it appears after any scroll at all. This is intentional — the dark gradient in the hero is only 12rem tall, so by the time the user has scrolled even slightly, the nav is no longer over the gradient anyway.

### Hamburger: scoped styles in NavigationBar.astro, vanilla JS `<script>` block

Consistent with the project pattern (no framework, interactivity via `<script>` blocks). The hamburger button and dropdown are part of the same component. No global CSS additions needed — all mobile menu styles are scoped within `NavigationBar.astro`.

### Mobile dropdown: panel below nav bar

The dropdown renders as a full-width panel directly below the nav bar, using `position: fixed`. Its `top` is set dynamically in JS via `nav.offsetHeight` — measured on mount and on `resize` — so it always tracks the actual nav height regardless of font rendering or future padding changes. The `open()` function also calls `positionMenu()` before adding the `.open` class to avoid a one-frame misalignment.

The dropdown has the same translucent white background as the scrolled nav state (`rgb(255 255 255 / 0.9)` + `backdrop-filter: blur(8px)`). When the menu opens, the nav is also forced into the `scrolled` state so both surfaces are visually consistent. On close, the nav restores to the correct state based on actual `scrollY`.

### Animation: clip-path reveal

`clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)` with `transition: clip-path 150ms ease`. This creates a sharp wipe-down from the nav's bottom edge. Reversed on close. The fallback option (if clip-path feels too sharp) is `opacity` + `translateY(-6px)`.

### Hamburger icon: currentColor SVG

A simple 3-line SVG icon using `stroke: currentColor`. Since the nav's `color` property already flips between white (hero-visible) and dark (scrolled/default), the icon inherits the correct color automatically.

### Menu closes on link click

A click listener on the dropdown links calls `close()`. The hamburger also toggles on repeated clicks (open/close).

## Risks / Trade-offs

- **clip-path browser support** → All modern browsers support it; not a concern for a portfolio site.
- **Opening the menu forces the nav into the scrolled state** — both surfaces share the translucent white background. This is intentional: a transparent nav next to a white dropdown would look inconsistent. On close, nav state is restored from actual `scrollY`.
- **`scrollY > 0` fires immediately on any scroll** → On index page, the hero-visible large name collapses to normal size as soon as the user scrolls 1px. This is the desired behavior per the proposal.
