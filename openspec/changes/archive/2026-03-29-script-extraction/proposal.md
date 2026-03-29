## Why

Inline `<script>` blocks in Hero, NavigationBar, BaseLayout, and PhotoGallery components cannot be unit-tested — they query `document` at module load time with no way to inject a controlled DOM. Extracting them to `src/scripts/` as factory functions (per the `claude-md-conventions` spec) puts the logic in the right shape for testing in a follow-on change.

## What Changes

- `src/scripts/hero.ts` — extracted from `Hero.astro`, exported as `initHero(root)`
- `src/scripts/navigation.ts` — extracted from `NavigationBar.astro`, exported as `initNavigation(root, heroEl)`
- `src/scripts/scroll-nav.ts` — extracted from `BaseLayout.astro`, exported as `initScrollNav(navEl, heroEl)`
- `src/scripts/gallery.ts` — extracted from `PhotoGallery.astro`, exported as `initGallery(root)`
- `Hero.astro`, `NavigationBar.astro`, `BaseLayout.astro`, `PhotoGallery.astro` — `<script>` blocks replaced with minimal factory call imports

## Capabilities

### New Capabilities

- `hero-script`: Extracted `initHero` factory module (testable, no tests written yet)
- `navigation-script`: Extracted `initNavigation` and `initScrollNav` factory modules (testable, no tests written yet)
- `gallery-script`: Extracted `initGallery` factory module (testable, no tests written yet)

### Modified Capabilities

<!-- No spec-level requirement changes — hero-carousel, mobile-nav-menu, image-expand-dialog,
     grid-entrance-animations, and scroll-aware-nav all retain identical behaviour.
     Only implementation location changes (inline → src/scripts/). -->

## Impact

- `src/components/Hero.astro` — script block replaced
- `src/components/NavigationBar.astro` — script block replaced
- `src/layouts/BaseLayout.astro` — script block replaced
- `src/components/PhotoGallery.astro` — script block replaced
- `src/scripts/` — four new `.ts` files (directory created)
- No runtime behaviour changes; no CSS, HTML, or data flow changes
- No tests written in this change — test authoring is a follow-on
