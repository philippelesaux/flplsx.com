## 1. gallery.test.ts

- [x] 1.1 Update spec reference comment to `// Specs: openspec/specs/image-expand-dialog/spec.md, openspec/specs/grid-entrance-animations/spec.md`
- [x] 1.2 Remove `describe('Requirement: initGallery factory is exported from src/scripts/gallery.ts', ...)` block entirely
- [x] 1.3 Rename `describe('Requirement: Dialog opens with correct image on thumbnail click')` → `describe('Requirement: Thumbnail opens full-size image in a dialog')`
- [x] 1.4 Rename `describe('Requirement: Dialog closes via close button or backdrop click')` → `describe('Requirement: Dialog is dismissible')`
- [x] 1.5 Rename `describe('Requirement: Escape key routes through animated close')` → `describe('Requirement: View Transitions morph animation on open and close')`
- [x] 1.6 Rename `describe('Requirement: Thumbnail entrance animations trigger on scroll into view')` → `describe('Requirement: Portfolio grid images fade in on scroll')`
- [x] 1.7 Run `npm test` and confirm all tests pass

## 2. hero.test.ts

- [x] 2.1 Update spec reference comment to `// Spec: openspec/specs/hero-carousel/spec.md`
- [x] 2.2 Remove `describe('Requirement: initHero factory is exported from src/scripts/hero.ts', ...)` block entirely (includes "Module exports initHero" and "Teardown stops the interval" scenarios)
- [x] 2.3 Rename `describe('Requirement: First image is active on initialisation')` → `describe('Requirement: Carousel initialises with the first image active')`
- [x] 2.4 Rename `describe('Requirement: Slideshow advances on interval')` → `describe('Requirement: Carousel auto-advances via crossfade')`
- [x] 2.5 Run `npm test` and confirm all tests pass

## 3. navigation.test.ts

- [x] 3.1 Update spec reference comment to `// Spec: openspec/specs/mobile-nav-menu/spec.md`
- [x] 3.2 Remove `describe('Requirement: initNavigation factory is exported from src/scripts/navigation.ts', ...)` block entirely (includes "Module exports initNavigation" and "menuEl.style.top is set on initialisation" scenarios)
- [x] 3.3 Rename `describe('Requirement: Mobile menu opens and closes')` → `describe('Requirement: Hamburger toggles a dropdown menu')`
- [x] 3.4 Run `npm test` and confirm all tests pass

## 4. scroll-nav.test.ts

- [x] 4.1 Update spec reference comment to `// Spec: openspec/specs/scroll-aware-nav/spec.md`
- [x] 4.2 Remove `describe('Requirement: initScrollNav factory is exported from src/scripts/scroll-nav.ts', ...)` block entirely
- [x] 4.3 Rename `describe('Requirement: Scroll state updates nav classes')` → `describe('Requirement: Nav scroll state is reflected via CSS classes')`
- [x] 4.4 Run `npm test` and confirm all tests pass
