## 1. Create Hero.astro

- [x] 1.1 Create `src/components/Hero.astro` with unexported `HeroImage` and `Props` interfaces defining `heroImages` (array of `{ src: string; alt: string }`)
- [x] 1.2 Add the hero markup in the Astro template: a `<div data-hero>` wrapping all images and the gradient div, mirroring the current JSX structure
- [x] 1.3 Add a `<style>` block with the styles from `Hero.module.css` (`.hero`, `.image`, `.image.active`, `.gradient`), using Astro scoped syntax
- [x] 1.4 Add a `<script>` block that replicates the `setInterval` logic: selects all images inside `[data-hero]`, tracks a `current` index, toggles an `active` class every 5000ms

## 2. Update index.astro

- [x] 2.1 Replace the `import Hero from "../components/Hero"` with `import Hero from "../components/Hero.astro"`
- [x] 2.2 Remove `client:load` from the `<Hero>` usage
- [x] 2.3 Remove the `export type HeroImages` line (type had no consumers; removed entirely)

## 3. Clean up

- [x] 3.1 Delete `src/components/Hero.tsx`
- [x] 3.2 Delete `src/components/Hero.module.css`

## 4. Verify

- [x] 4.1 Run `npm run build` — confirm no TypeScript errors and build succeeds
- [x] 4.2 Run `npm run preview` and confirm: hero fills viewport, images crossfade every 5 seconds, gradient scrim is visible at the top
