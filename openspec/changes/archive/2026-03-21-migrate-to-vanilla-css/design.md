## Context

The site currently has three coexisting style systems: Tailwind utility classes in markup, plain CSS in `BaseLayout.astro`'s `<style is:global>` block (nav scroll states, font sizing), and inline `style=""` attributes (Fraunces font-family). This happened organically as Tailwind proved inadequate for state-driven styles. The goal is to unify everything into a single coherent system.

Current file inventory for styles:
- `tailwind.config.mjs` — font family override
- `BaseLayout.astro` global style block — nav scroll states, `[data-nav-name]` sizing
- Tailwind classes on every `.astro` file and `.tsx` component
- Inline `style=""` on name elements (font-family)

## Goals / Non-Goals

**Goals:**
- Single styling system: CSS custom properties (tokens) + scoped/global CSS + CSS Modules for React components
- JS only toggles semantic class names (`.visible`, `.active`), never style values
- Visual output identical to current state
- Remove `tailwindcss` and `@astrojs/tailwind` as dependencies

**Non-Goals:**
- Changing any visual design
- Adopting a CSS framework or library (no Open Props, no Pico)
- Changing component structure or markup hierarchy

## Decisions

### File structure: tokens.css + global.css + per-component styles
**Decision**: Two shared files (`src/styles/tokens.css` and `src/styles/global.css`) imported in `BaseLayout.astro`, plus scoped `<style>` blocks in each `.astro` component and CSS Modules for React components.

**Rationale**: Tokens are the single source of truth for design values. Global CSS handles truly global concerns (body, base element styles, nav scroll states which must work across all pages). Component styles are colocated with their markup. React components need CSS Modules since Astro scoped styles cannot penetrate islands.

**Alternative considered**: One large global stylesheet — rejected because it loses colocation and scoping benefits.

### Token naming: role-based, not value-based
**Decision**: Tokens are named for their semantic role (`--color-accent`, `--color-text-secondary`) not their value (`--teal-600`, `--zinc-700`).

**Rationale**: Role-based names decouple the token from its current value, making future design changes a single-file edit. Matches the motivation for this refactor: consistency and maintainability.

### React components: CSS Modules + semantic class toggling
**Decision**: `Hero.tsx` and `Lightbox.tsx` get companion `.module.css` files. JS class toggling switches from Tailwind utility strings (`opacity-100`, `translate-y-0`) to a single semantic class (`.active` for Hero, `.visible` for Lightbox).

**Rationale**: CSS Modules provide scoping without a build-time dependency. Semantic class names decouple JS from CSS implementation. Stagger delays remain as inline `transitionDelay` style since they are inherently computed from index — CSS cannot express this without JS.

**Alternative considered**: Inline styles for all dynamic values — rejected as it moves presentation logic into JS unnecessarily for non-computed values.

### Font imports stay in BaseLayout.astro
**Decision**: `@fontsource-variable` imports remain in `BaseLayout.astro` frontmatter, not moved to CSS `@import`.

**Rationale**: The current pattern works and is idiomatic for Astro. Moving font loading to CSS would change the loading order without benefit.

### Tailwind's CSS reset (Preflight)
**Decision**: Tailwind's Preflight reset is currently included automatically. On removal, add a minimal CSS reset in `global.css` to preserve baseline normalization (box-sizing, margin reset, `img { max-width: 100% }`).

**Rationale**: Preflight normalizes cross-browser inconsistencies the site may depend on implicitly. A targeted reset avoids regressions.

## Risks / Trade-offs

- **Responsive columns without Tailwind** → `columns-2 md:columns-3 lg:columns-4 xl:columns-5` becomes four `@media` rules in `Lightbox.module.css`. Straightforward but more verbose.
- **Missing a Tailwind class** → Any class accidentally left in markup after Tailwind is removed will silently have no effect. Mitigation: build and visually verify each component after migration; grep for any remaining class names that map to Tailwind utilities.
- **Tailwind Preflight removal** → Some base element styles (button appearance, list resets, etc.) may shift. Mitigation: include a targeted reset in `global.css`.
