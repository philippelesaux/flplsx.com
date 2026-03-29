## 1. Hero

- [x] 1.1 Create `src/scripts/hero.ts` — export `initHero(root: HTMLElement): () => void` with slideshow logic and AbortController teardown
- [x] 1.2 Replace `Hero.astro` `<script>` block with import and `initHero(document.querySelector('[data-hero]')!)` call
- [x] 1.3 Verify `npm run build` passes

## 2. Scroll Nav

- [x] 2.1 Create `src/scripts/scroll-nav.ts` — export `initScrollNav(navEl: HTMLElement, heroEl: Element | null): () => void` with passive scroll listener and initial `update()` call
- [x] 2.2 Replace `BaseLayout.astro` `<script>` block with import and `initScrollNav(nav, hero)` call (querying both elements at call site)
- [x] 2.3 Verify `npm run build` passes

## 3. Navigation

- [x] 3.1 Create `src/scripts/navigation.ts` — export `initNavigation(root: HTMLElement, heroEl: Element | null): () => void` with menu open/close, aria updates, and `positionMenu` logic
- [x] 3.2 Replace `NavigationBar.astro` `<script>` block with import and `initNavigation(nav, hero)` call (querying both elements at call site)
- [x] 3.3 Verify `npm run build` passes

## 4. Gallery

- [x] 4.1 Create `src/scripts/gallery.ts` — export `initGallery(root: HTMLElement): () => void` with dialog, navigation, keyboard, View Transitions, and IntersectionObserver logic
- [x] 4.2 Replace `PhotoGallery.astro` `<script>` block with import and `initGallery(document.querySelector('.gallery-grid')!)` call
- [x] 4.3 Verify `npm run build` passes

## 5. Final Verification

- [x] 5.1 Run `npm run build` clean across all components
- [x] 5.2 Smoke-test in browser: hero slideshow cycles, nav scroll state changes, mobile menu opens/closes, gallery dialog opens and navigates
