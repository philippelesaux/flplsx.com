## Why

The four `src/scripts/` modules (`hero`, `scroll-nav`, `navigation`, `gallery`) were extracted specifically to enable Vitest testing — but no tests have been written. The specs define clear behavioral scenarios for each module; without tests those scenarios are unvalidated and regressions are invisible. The testing infrastructure is already in place (`vitest.config.ts`, jsdom environment, `passWithNoTests`); this change fills it with 100% spec scenario coverage.

## What Changes

- `src/scripts/test-setup.ts` is created with a global `IntersectionObserver` stub and a `beforeEach` that resets `window.scrollY` to `0`
- `vitest.config.ts` gains a `setupFiles` entry pointing to `test-setup.ts`
- Four test files are created, one per script module:
  - `src/scripts/hero.test.ts` — 4 scenarios (init, interval advance, wrap, teardown)
  - `src/scripts/scroll-nav.test.ts` — 4 scenarios (init state, scrolled class, hero-visible, no hero)
  - `src/scripts/navigation.test.ts` — 4 scenarios (menu open, ARIA state, menu close, link click)
  - `src/scripts/gallery.test.ts` — 11 scenarios (dialog open, navigation, wrap, keyboard, close, backdrop, cancel/Escape, transitioning guard, VT fallback, IntersectionObserver)

## Capabilities

### Modified Capabilities

- `vitest-infrastructure`: `setupFiles` is added to `vitest.config.ts`; `test-setup.ts` establishes shared mocks

## Impact

- `vitest.config.ts` — one new field (`setupFiles`)
- `src/scripts/test-setup.ts` — new file
- `src/scripts/hero.test.ts` — new file
- `src/scripts/scroll-nav.test.ts` — new file
- `src/scripts/navigation.test.ts` — new file
- `src/scripts/gallery.test.ts` — new file
- No runtime behavior changes; test files are dev-only
