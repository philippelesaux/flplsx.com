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

Personal portfolio site for Philippe LeSaux built with **Astro 6** and **React 19**.

### Component model

- **Astro components** (`.astro`) handle all static layout: `BaseLayout`, `NavigationBar`, `Footer`, pages
- **React components** (`.tsx`) are used only where interactivity is needed — currently just `Lightbox.tsx` (image gallery), hydrated with `client:load`
- New interactive features should follow this same pattern: Astro by default, React only when necessary

### Data flow for the gallery

Portfolio images are declared in `src/data/portfolio.json` and loaded via Astro Content Collections (`src/content.config.ts`). The `index.astro` page queries the collection and passes image metadata to `Lightbox.tsx` as props.

### Styling

Vanilla CSS with no framework dependencies. Three layers:

- **`src/styles/tokens.css`** — CSS custom properties defining the full design token set (colors, spacing, type scale, letter-spacing). Single source of truth for all design values.
- **`src/styles/global.css`** — Site-wide base styles: CSS reset, body, nav scroll states (`[data-nav].scrolled`, `[data-nav].hero-visible`), and nav name sizing. Imported in `BaseLayout.astro`.
- **Scoped `<style>` blocks** in each `.astro` component — component-level styles using token variables.
- **CSS Modules** (`.module.css`) for React components (`Hero.module.css`, `Lightbox.module.css`) — scoped styles since Astro scoped CSS cannot penetrate React islands.

JS only toggles semantic class names (`.active`, `.visible`) — never style values directly.

### TypeScript

`tsconfig.json` extends `astro/tsconfigs/strictest` — strict mode is on throughout.
