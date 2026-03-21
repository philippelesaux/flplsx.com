## Why

The site has organically developed a hybrid styling system — Tailwind utility classes in markup, plain CSS in `BaseLayout.astro`'s global `<style>` block, and inline `style=""` attributes — because Tailwind cannot elegantly express state-driven or dynamic styles. Consolidating to vanilla CSS with a hand-rolled design token file eliminates this inconsistency, removes the Tailwind build dependency, and establishes a single coherent approach: tokens define values, scoped/global CSS defines rules, and JS toggles only semantic class names.

## What Changes

- **BREAKING** Remove `@astrojs/tailwind` integration and `tailwindcss` dependency
- Add `src/styles/tokens.css` — a `:root` custom property file defining the full design token set (colors, spacing, type scale, tracking)
- Add `src/styles/global.css` — site-wide base styles (body, links, font imports, existing nav scroll state rules extracted from `BaseLayout.astro`)
- Rewrite `BaseLayout.astro` styles: remove Tailwind body classes, import global stylesheet
- Rewrite `NavigationBar.astro`: replace all Tailwind classes with scoped CSS using token variables
- Rewrite `Footer.astro`: replace Tailwind classes with scoped CSS
- Rewrite `about.astro`: replace all Tailwind classes with scoped CSS
- Rewrite `Hero.tsx`: replace Tailwind class toggling with semantic `.active` class; move styles to `Hero.module.css`
- Rewrite `Lightbox.tsx`: replace Tailwind class toggling with semantic `.visible` class; replace stagger delay array with inline `transitionDelay` style; move styles to `Lightbox.module.css`
- Remove `tailwind.config.mjs`

## Capabilities

### New Capabilities

- `design-token-system`: CSS custom property token file as the single source of truth for colors, spacing, and typography values across the site

### Modified Capabilities

*(none — no spec-level behavior changes; this is a pure implementation refactor)*

## Impact

- All files in `src/` — every component and page has Tailwind classes replaced
- `src/styles/tokens.css` and `src/styles/global.css` — new files
- `src/components/Hero.module.css` and `src/components/Lightbox.module.css` — new files
- `astro.config.mjs` — remove Tailwind integration
- `tailwind.config.mjs` — deleted
- `package.json` — remove `tailwindcss`, `@astrojs/tailwind` dependencies
- No behavior changes — visual output is identical
