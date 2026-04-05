## Why

Fonts are currently loaded via `@fontsource-variable` npm imports, which bundle all weights and character sets with no subsetting, no preloading, and no metric-matched fallbacks. Astro 6 ships a built-in Font API that self-hosts fonts at build time, generates optimised fallback stacks to reduce layout shift, and emits preload hints — replacing the manual approach with a zero-config solution that performs better out of the box.

## What Changes

- Declare both fonts in `astro.config.mjs` using the Fontsource provider with semantic CSS variable names (`--font-body`, `--font-display`)
- Add `<Font>` components to `BaseLayout.astro` `<head>`, with `preload` on `--font-body`
- Replace all hardcoded `font-family` string literals with CSS variables (`var(--font-body)`, `var(--font-display)`)
- Remove `@fontsource-variable/plus-jakarta-sans` and `@fontsource-variable/fraunces` npm dependencies

## Capabilities

### New Capabilities

<!-- None — this is a build-system improvement with no new user-facing behaviour -->

### Modified Capabilities

<!-- No spec-level behaviour changes. Font rendering is unchanged; only the loading mechanism and token strategy are affected. -->

## Impact

- `astro.config.mjs` — gains `fonts` declaration (new source of truth for font tokens)
- `src/layouts/BaseLayout.astro` — swap `@fontsource-variable` imports for `<Font>` components
- `src/styles/global.css` — one `font-family` string replaced with `var(--font-body)`
- `src/pages/about.astro` — one `font-family` string replaced with `var(--font-display)`
- `src/components/NavigationBar.astro` — one `font-family` string replaced with `var(--font-display)`
- `package.json` — remove `@fontsource-variable/*` dependencies
