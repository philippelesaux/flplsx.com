## Context

All four script modules follow the factory pattern established in the `vitest-infrastructure` change: each exports an `initX(root, ...)` function that receives DOM elements as parameters and returns a teardown function. This makes each module testable in jsdom without a real browser — tests construct a minimal DOM tree, call the factory, then assert DOM state changes.

The existing `vitest.config.ts` sets `environment: 'jsdom'` and scans `src/scripts/**/*.test.ts` automatically. The only missing piece is a shared setup file for global mocks.

## Goals / Non-Goals

**Goals:**
- 100% coverage of the behavioral scenarios defined in the `gallery-script`, `hero-script`, and `navigation-script` specs
- A shared `test-setup.ts` for global mocks that would otherwise be repeated in every test file
- Test both View Transitions paths in gallery (with VT and fallback)

**Non-Goals:**
- Visual / CSS assertions (class names are the interface; computed styles are not tested)
- Integration tests with Astro components
- Coverage of `requestAnimationFrame` timing inside `navigation.ts`'s `track` animation loop

## Decisions

### Shared `test-setup.ts` for global mocks

A `src/scripts/test-setup.ts` file provides two shared behaviors applied before every test:

1. **`IntersectionObserver` global stub** — the gallery module creates an `IntersectionObserver` on init; jsdom doesn't implement it. The stub is a no-op class (`observe`, `unobserve`, `disconnect`) registered via `vi.stubGlobal`.

2. **`window.scrollY` reset** — `scroll-nav` reads `window.scrollY`; jsdom returns `0` by default but tests that stub it to a non-zero value would bleed into subsequent tests without a reset. A `beforeEach` sets `Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })`.

`vitest.config.ts` gains `setupFiles: ['src/scripts/test-setup.ts']`.

### `dialog.showModal()` / `dialog.close()` — per-test instance stubs

These are stubbed on the element instance (not globally) because they're specific to the dialog element constructed in each test:

```ts
const dialog = document.createElement('dialog');
dialog.showModal = vi.fn();
dialog.close = vi.fn();
```

This matches the pattern documented in `CLAUDE.md` and keeps the global setup lean.

### View Transitions — two mock strategies

**Standard (synchronous) VT mock** — used for open/close happy-path tests:
```ts
document.startViewTransition = vi.fn((cb: () => void) => {
  cb();
  return { finished: Promise.resolve() };
});
```
After dispatching a click, a single `await Promise.resolve()` drains the microtask queue and settles the `async` handler.

**Deferred VT mock** — used exclusively for the `transitioning` guard test:
```ts
let resolveVT!: () => void;
document.startViewTransition = vi.fn((cb: () => void) => {
  cb();
  return { finished: new Promise(resolve => { resolveVT = resolve; }) };
});
```
The deferred promise keeps `transitioning = true` until `resolveVT()` is called, allowing the test to verify that a concurrent close attempt is ignored.

**No-VT fallback** — tested by not attaching `startViewTransition` to `document` (it's `undefined` by default in jsdom). The gallery's guard `if (doc.startViewTransition)` evaluates to false, taking the synchronous path.

### `window.scrollY` stubbing in scroll-nav tests

jsdom makes `window.scrollY` read-only by default. The workaround:
```ts
Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
```
Setting `configurable: true` allows re-definition in subsequent tests. The shared `beforeEach` in `test-setup.ts` resets it to `0` between tests.

After stubbing, a synthetic `scroll` event is dispatched to trigger `initScrollNav`'s listener:
```ts
window.dispatchEvent(new Event('scroll'));
```

### Fake timers for hero interval

`hero.ts` uses `setInterval` with a 5000ms delay. Tests use `vi.useFakeTimers()` / `vi.advanceTimersByTime(5000)` to advance the clock without wall-clock waiting. Timers are restored in `afterEach` via `vi.useRealTimers()`.

### Async event handler flushing

`gallery.ts` event handlers call `async` functions (`openDialog`, `closeDialog`) without awaiting them — correct in browser code. Tests flush the resulting microtasks with `await Promise.resolve()` after dispatching events. A single flush is sufficient when the VT mock resolves immediately.

### IntersectionObserver callback invocation

jsdom can't trigger real intersection events. Tests call the observer callback directly with a synthetic `IntersectionObserverEntry`:
```ts
const [observerCb] = (IntersectionObserver as vi.Mock).mock.calls[0];
observerCb([{ isIntersecting: true, target: thumbImg }]);
```
This is white-box testing of the callback contract — acceptable given the alternative is no coverage at all.

### Spec traceability via test naming

Each test file SHALL open with a comment naming the spec it validates:

```ts
// Spec: openspec/specs/gallery-script/spec.md
```

`describe` blocks SHALL match the requirement name verbatim (e.g., `"Dialog opens with correct image on thumbnail click"`). `it` blocks SHALL match the scenario description verbatim (e.g., `"Dialog opens with correct image"`). This makes every failing test traceable to an exact spec requirement and scenario without any external tool.

```
describe("Dialog opens with correct image on thumbnail click") {   ← requirement name
  it("Dialog opens with correct image") { ... }                   ← scenario name
}
```

## Risks / Trade-offs

- **`navigation.ts` `positionMenu`** — `navEl.offsetHeight` is always `0` in jsdom. Tests can assert that `menuEl.style.top` is set to `"0px"`, not the actual visual height. This is acceptable; the mechanism is tested, not the pixel value.
- **`requestAnimationFrame` in `navigation.ts`** — the 300ms animation tracking loop in `open()` uses `rAF`. jsdom stubs `rAF` as a no-op, so the loop body never runs in tests. This is scoped out of coverage intentionally (see Non-Goals).
- **Deferred VT mock complexity** — the `transitioning` guard test is the most intricate. The deferred promise approach is the only way to observe the guard in action.
