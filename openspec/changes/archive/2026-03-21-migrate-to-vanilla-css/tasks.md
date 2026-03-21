## 1. Foundation

- [x] 1.1 Create `src/styles/tokens.css` with `:root` custom properties for all colors (`--color-bg`, `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--color-accent`, `--color-border`), spacing (`--space-1` through `--space-16`), type scale (`--text-sm`, `--text-xl`, `--text-3xl`, `--text-5xl`), and tracking (`--tracking-wide`, `--tracking-wider`)
- [x] 1.2 Create `src/styles/global.css` with minimal CSS reset (box-sizing, margin/padding reset, `img { max-width: 100%; display: block }`), base body styles, and extract nav scroll state rules from `BaseLayout.astro` global style block

## 2. BaseLayout

- [x] 2.1 Import `tokens.css` and `global.css` in `BaseLayout.astro`
- [x] 2.2 Remove Tailwind classes from `<body>` and `<main>` — replace with equivalent CSS in `global.css`
- [x] 2.3 Remove the `<style is:global>` block (contents now live in `global.css`)

## 3. NavigationBar

- [x] 3.1 Add a scoped `<style>` block to `NavigationBar.astro` with nav layout, spacing, typography, and link styles using token variables
- [x] 3.2 Remove all Tailwind classes from the nav markup

## 4. Footer

- [x] 4.1 Add a scoped `<style>` block to `Footer.astro` using token variables
- [x] 4.2 Remove all Tailwind classes from the footer markup

## 5. About Page

- [x] 5.1 Add a `<style>` block to `about.astro` covering layout, heading, body copy, figure, and figcaption styles using token variables
- [x] 5.2 Remove all Tailwind classes from about page markup
- [x] 5.3 Remove inline `style="font-family: ..."` from H1 — move font-family into the scoped CSS rule

## 6. Hero Component

- [x] 6.1 Create `src/components/Hero.module.css` with styles for the hero container, images (full-cover positioning), `.active` opacity state, transition, and gradient overlay
- [x] 6.2 Update `Hero.tsx` to import `Hero.module.css` and apply module classes
- [x] 6.3 Replace `opacity-100`/`opacity-0` class toggling with `.active` semantic class

## 7. Lightbox Component

- [x] 7.1 Create `src/components/Lightbox.module.css` with styles for the grid container (columns + responsive breakpoints via `@media`), thumbnail base state (opacity 0, translateY), `.visible` state, transition, hover border, and hover shadow
- [x] 7.2 Update `Lightbox.tsx` to import `Lightbox.module.css` and apply module classes
- [x] 7.3 Replace `opacity-100`/`translate-y-0`/`opacity-0`/`translate-y-4` class toggling with `.visible` semantic class in IntersectionObserver callback
- [x] 7.4 Replace `STAGGER_DELAYS` array with inline `style={{ transitionDelay: \`${index * 75}ms\` }}`

## 8. Cleanup

- [x] 8.1 Remove inline `style="font-family: ..."` from the nav name link in `NavigationBar.astro` (font-family now in scoped CSS)
- [x] 8.2 Uninstall `tailwindcss` and `@astrojs/tailwind` via npm
- [x] 8.3 Delete `tailwind.config.mjs`
- [x] 8.4 Grep source files for any remaining Tailwind class names and confirm none are load-bearing
- [x] 8.5 Update `CLAUDE.md`: remove "Tailwind CSS" from the Architecture description and rewrite the Styling section to describe the token system (`src/styles/tokens.css`, `src/styles/global.css`), scoped `<style>` blocks in `.astro` files, and CSS Modules for React components

## 9. Verification

- [x] 9.1 Run `npm run build` and confirm no errors
- [x] 9.2 Visually verify index page: hero carousel, grid layout, thumbnail entrance animations, hover borders
- [x] 9.3 Visually verify about page: layout, Fraunces heading in teal, body copy, headshot figure
- [x] 9.4 Verify nav scroll behavior: large white name over hero, shrinks and darkens on scroll
- [x] 9.5 Verify `/about` nav loads with dark text
- [x] 9.6 Verify responsive grid breakpoints (2 → 3 → 4 → 5 columns)
