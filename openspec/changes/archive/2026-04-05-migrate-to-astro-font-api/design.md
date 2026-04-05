## Context

The site currently loads two variable fonts — Plus Jakarta Sans (body) and Fraunces (display) — via `@fontsource-variable` npm packages imported directly in `BaseLayout.astro`. These packages embed the full font files (all axes, all character sets) into the Astro build. Font family names are referenced as magic strings (`'Plus Jakarta Sans Variable'`, `'Fraunces Variable'`) in three CSS locations with no token abstraction.

Astro 6 ships a built-in Font API that downloads and self-hosts fonts at build time, generates metric-matched fallback stacks, and emits `<link rel="preload">` hints — all without manual configuration.

## Goals / Non-Goals

**Goals:**
- Replace `@fontsource-variable` imports with the Astro 6 Font API
- Assign semantic CSS variable names (`--font-body`, `--font-display`) as the interface for font values across the codebase
- Eliminate hardcoded font family strings from all CSS files
- Improve performance: subsetting, preloading, and fallback generation handled automatically

**Non-Goals:**
- Changing which fonts are used
- Adding font tokens to `tokens.css` — `astro.config.mjs` becomes the source of truth for font tokens; no indirection layer is needed

## Decisions

### Fontsource provider over Google provider

**Decision:** Use `fontProviders.fontsource()` rather than `fontProviders.google()`.

**Rationale:** The project already depends on Fontsource packages. The Fontsource provider is a direct conceptual replacement — same fonts, same source — and removes the dependency rather than switching to a different external service. Both providers self-host the result identically; the difference is only where Astro fetches the source files from.

### Semantic token names: `--font-body` / `--font-display`

**Decision:** Use role-based CSS variable names, not structural ones (`--font-sans`, `--font-serif`).

**Rationale:** Consistent with the existing token philosophy — `--color-text-secondary` describes role, not value. Semantic names make future font swaps invisible to component code; only `astro.config.mjs` changes.

### `astro.config.mjs` as font token source of truth

**Decision:** Do not re-declare `--font-body` / `--font-display` in `tokens.css`.

**Rationale:** A `tokens.css` entry would be a circular no-op (`--font-body: var(--font-body)`). The Astro Font API injects the variable with the actual font stack; `astro.config.mjs` is where font tokens are declared and changed. A comment in `tokens.css` documenting their existence is sufficient if needed.

### Preload `--font-body` only

**Decision:** Add `preload` to the `<Font>` component for `--font-body`; omit it for `--font-display`.

**Rationale:** Plus Jakarta Sans is used on every page for body text and is render-critical. Fraunces is used for display headings and the nav name — important but not blocking. Preloading both would add unnecessary request overhead.

## Risks / Trade-offs

- **Build-time font fetch** → Astro fetches fonts from Fontsource at build time. First build after migration requires network access; subsequent builds use the cache at `.astro/fonts/`. Mitigation: no action needed; this is standard Astro Font API behaviour.
- **Variable font axis support** → The Fontsource provider should support variable fonts (wght axis) for both families. If axis configuration is needed, the provider accepts a `variants` array. Mitigation: confirm at implementation time; fallback is the local provider pointing to the existing npm package files.
- **CSS variable timing** → The Font API injects variables via a `<style>` tag in `<head>`. Components using `var(--font-body)` will resolve correctly as long as the `<Font>` component appears before any stylesheets that reference the variable. The current `BaseLayout.astro` structure (head imports before body) satisfies this.

## Migration Plan

1. Update `astro.config.mjs` with `fonts` declaration
2. Replace `@fontsource-variable` imports in `BaseLayout.astro` with `<Font>` components
3. Replace hardcoded font strings in `global.css`, `about.astro`, `NavigationBar.astro` with CSS variables
4. Remove `@fontsource-variable/*` from `package.json` and run `npm install`
5. Run `npm run build` to verify fonts download and build completes without errors
6. Run `npm run preview` to visually confirm both fonts render correctly

**Rollback:** Revert all file changes and restore the two `@fontsource-variable` imports. No data migration; rollback is instant.

## Open Questions

- None — decisions are resolved; ready for implementation.
