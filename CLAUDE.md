# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Type-check then build to ./dist/
npm run preview   # Preview production build locally
```

There are no lint or test commands configured.

## Architecture

Personal portfolio site for Philippe LeSaux built with **Astro 6**.

### Component model

- **Astro components** (`.astro`) handle all layout and interactivity — no React or other UI framework is used
- Interactivity is implemented via `<script>` blocks in `.astro` files using vanilla JS
- New interactive features should follow this same pattern: Astro component with a `<script>` block

### Data flow for the gallery

Portfolio images are declared in `src/data/portfolio.json` and loaded via Astro Content Collections (`src/content.config.ts`). The `index.astro` page queries the collection and passes image metadata to `Hero.astro` and `PhotoGallery.astro` as props.

### Styling

Vanilla CSS with no framework dependencies. Three layers:

- **`src/styles/tokens.css`** — CSS custom properties defining the full design token set (colors, spacing, type scale, letter-spacing). Single source of truth for all design values.
- **`src/styles/global.css`** — Site-wide base styles: CSS reset, body, nav scroll states (`[data-nav].scrolled`, `[data-nav].hero-visible`), and nav name sizing. Imported in `BaseLayout.astro`.
- **Scoped `<style>` blocks** in each `.astro` component — component-level styles using token variables, placed after the template.

JS only toggles semantic class names (`.active`, `.visible`) — never style values directly.

### TypeScript

`tsconfig.json` extends `astro/tsconfigs/strictest` — strict mode is on throughout.
