## Why

The current portfolio site is visually static — a flat masonry grid on a slate gradient that competes with the photography rather than serving it. The redesign makes the photographs the unambiguous focus: a cinematic full-viewport hero carousel as the entry point, a dark background that lets food and travel images breathe, and entrance animations that give the page a sense of discovery rather than a dump of content.

## What Changes

- **New**: `Hero.tsx` React component — full-viewport crossfade carousel, 5 slides, auto-advance, no user controls
- **New**: Gradient scrim on the hero (black/60 → transparent) ensuring nav is always readable regardless of image brightness
- **Modified**: `BaseLayout.astro` — background changes from slate gradient to zinc-950; adds vanilla JS Intersection Observer script for scroll-aware nav
- **Modified**: `NavigationBar.astro` — transparent with white text over hero, transitions to zinc-900/90 + backdrop-blur when hero scrolls out of view; nav structure extended to accommodate future links (photography, code, about)
- **Modified**: `index.astro` — shuffles portfolio at build time, picks first 5 as hero candidates, generates hero images at 1400px via `getImage()` separately from 400px thumbnails
- **Modified**: `Lightbox.tsx` — adds staggered fade-in entrance animations via Intersection Observer as images scroll into view

## Capabilities

### New Capabilities

- `hero-carousel`: Full-viewport crossfade hero carousel with build-time random image selection and gradient scrim
- `scroll-aware-nav`: Navigation bar that transitions from transparent to solid as user scrolls past the hero
- `grid-entrance-animations`: Portfolio grid images that stagger-fade in as they enter the viewport

### Modified Capabilities

- `portfolio-thumbnail-optimization`: Hero images now require a second `getImage()` pass at 1400px width in addition to the existing 400px thumbnails

## Impact

- `src/pages/index.astro`: hero image generation + build-time shuffle
- `src/layouts/BaseLayout.astro`: background color, Intersection Observer script
- `src/components/NavigationBar.astro`: scroll-aware class toggling
- `src/components/Lightbox.tsx`: entrance animation logic
- `src/components/Hero.tsx`: new file
- No new dependencies required
