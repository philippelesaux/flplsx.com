## Why

`Hero.tsx` uses React solely for a `setInterval` timer to cycle carousel images — a task that doesn't require a framework. Replacing it with an Astro component and a plain `<script>` tag eliminates an unnecessary client-side JS bundle and aligns the codebase with its own principle: React only where true interactivity is needed.

## What Changes

- Remove `src/components/Hero.tsx` and `src/components/Hero.module.css`
- Add `src/components/Hero.astro` with scoped `<style>` and a `<script>` tag for the interval timer
- Update `src/pages/index.astro` to import `Hero.astro` instead of `Hero.tsx`, removing `client:load`
- Move the `HeroImages` type from `index.astro` into `Hero.astro` as part of its `Props` definition; `index.astro` imports the type from `Hero.astro` if needed, rather than the reverse

## Capabilities

### New Capabilities

_None — this is a pure implementation refactor. No new user-facing capabilities are introduced._

### Modified Capabilities

_None — all existing `hero-carousel` requirements are preserved as-is. The spec does not constrain implementation technology._

## Impact

- `src/components/Hero.tsx` — deleted
- `src/components/Hero.module.css` — deleted
- `src/components/Hero.astro` — new file
- `src/pages/index.astro` — updated import, removal of `client:load`, type ownership moves to `Hero.astro`
- No changes to `src/data/portfolio.json`, `src/content.config.ts`, or any spec files
