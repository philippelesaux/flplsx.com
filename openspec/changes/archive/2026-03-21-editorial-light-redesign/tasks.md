## 1. Dependencies

- [x] 1.1 Install `@fontsource-variable/fraunces` via npm

## 2. BaseLayout

- [x] 2.1 Import Fraunces variable font in `BaseLayout.astro`
- [x] 2.2 Change body class from `bg-zinc-950` to `bg-white`
- [x] 2.3 Update global `.scrolled` CSS rule: change background from `rgb(24 24 27 / 0.9)` to `rgb(255 255 255 / 0.9)` and add `color: rgb(24 24 27)` (zinc-900) for dark text when scrolled

## 3. NavigationBar

- [x] 3.1 Apply Fraunces serif to the "Philippe LeSaux" name link (font-family override)
- [x] 3.2 Nav hover underlines use `hover:border-b-current` so color tracks font color in all scroll states
- [x] 3.3 Set default nav text to `text-zinc-900` so pages without a hero (e.g. `/about`) render dark text on load
- [x] 3.4 Add a `.hero-active` or override class so the hero JS can restore white text while the hero is visible — or confirm the existing gradient scrim + white text override still works correctly
- [x] 3.5 Add `data-nav-name` to name link and remove hard-coded `text-xl` (size driven by CSS)
- [x] 3.6 Add CSS: default `font-size: 1.25rem` on `[data-nav-name]`, expand to `1.875rem` when `.hero-visible`, smooth `transition: font-size 300ms ease`

## 4. Lightbox

- [x] 4.1 Remove `rounded` class from thumbnail `<img>` elements
- [x] 4.2 Change hover border from `hover:border-zinc-600` to `hover:border-zinc-200`

## 5. About Page

- [x] 5.1 Apply Fraunces serif to the H1 "Philippe LeSaux"
- [x] 5.2 Change H1 color from `text-teal-400` to `text-teal-600`
- [x] 5.3 Change H2 subtitle color from `text-zinc-400` to `text-zinc-600`
- [x] 5.4 Change body copy color from `text-zinc-300` to `text-zinc-700`
- [x] 5.5 Change figcaption color from `text-zinc-400` to `text-zinc-600`

## 6. Footer

- [x] 6.1 Change footer text from `text-zinc-500` to `text-zinc-400`

## 7. Verification

- [x] 7.1 Run `npm run build` and confirm no type errors
- [x] 7.2 Visually verify index page: white background, sharp thumbnail corners, no teal in nav
- [x] 7.3 Visually verify about page: Fraunces name in teal-600, all text legible on white
- [x] 7.4 Verify nav scroll behavior: white text over hero, dark text + white bg after scroll
- [x] 7.5 Verify `/about` nav loads with dark text (no hero present)
