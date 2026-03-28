## 1. Fix scroll-aware nav logic

- [x] 1.1 Update `BaseLayout.astro` script: replace hero-visibility trigger with `scrollY > 0` for the `scrolled` class
- [x] 1.2 Update `BaseLayout.astro` script: gate `hero-visible` class on `scrollY === 0 && hero exists`
- [x] 1.3 Verify nav on `/about` now gets translucent background on scroll

## 2. Add nav links

- [x] 2.1 Add "photography" link (`href="/"`) to `NavigationBar.astro` list, before "about"

## 3. Hamburger menu

- [x] 3.1 Add hamburger `<button>` to `NavigationBar.astro` (3-line SVG, `stroke: currentColor`, hidden on desktop)
- [x] 3.2 Add mobile dropdown panel element to `NavigationBar.astro` containing the nav links
- [x] 3.3 Add scoped CSS: hide link list on mobile, show hamburger; show link list on desktop, hide hamburger
- [x] 3.4 Add scoped CSS: dropdown panel styles — full width, translucent white background (`rgb(255 255 255 / 0.9)`), `backdrop-filter: blur(8px)`, positioned below nav
- [x] 3.5 Add scoped CSS: clip-path animation — `inset(0 0 100% 0)` → `inset(0 0 0% 0)`, `transition: clip-path 150ms ease`
- [x] 3.6 Add `<script>` block in `NavigationBar.astro`: toggle open/close on hamburger click, close on link click
