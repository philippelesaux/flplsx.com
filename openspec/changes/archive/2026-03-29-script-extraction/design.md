## Context

Four `.astro` files contain inline `<script>` blocks — three identified in the proposal plus one discovered during design:

| Component | Script concerns | Lines |
|---|---|---|
| `Hero.astro` | Image slideshow with setInterval | ~15 |
| `NavigationBar.astro` | Mobile menu open/close, menu positioning | ~50 |
| `BaseLayout.astro` | Scroll-aware nav state (scroll listener) | ~15 |
| `PhotoGallery.astro` | Dialog, navigation, keyboard, View Transitions, IntersectionObserver | ~120 |

The proposal scoped to 3 components. `BaseLayout.astro`'s script is a fourth extraction target — it manages the `scrolled`/`hero-visible` class state on the nav element in response to scroll events, and references both `[data-nav]` and `[data-hero]`.

## Goals / Non-Goals

**Goals:**
- Extract all four scripts to `src/scripts/` following the `initX(root)` factory pattern
- Preserve identical runtime behaviour
- Each `.astro` `<script>` block becomes a minimal import + call

**Non-Goals:**
- Writing tests (follow-on change)
- Refactoring the logic within scripts (extract as-is, then improve separately)
- Merging related scripts (e.g. nav scroll state + nav menu into one module)
- CSS or HTML changes

## Decisions

### Four modules, not three

`BaseLayout.astro`'s scroll script must be extracted. It is not a layout configuration concern — it is runtime behaviour that benefits from testing (scroll state transitions). It becomes `src/scripts/scroll-nav.ts` with `initScrollNav(navEl, heroEl)`.

### Cross-component dependency — hero element reference

Both `NavigationBar.astro` (in `close()`) and `BaseLayout.astro` query `document.querySelector('[data-hero]')` to determine whether the hero is present on the current page. Under the DI rule, this query must not happen inside the module.

**Decision**: both factory functions accept an optional `heroEl` parameter:

```ts
export function initNavigation(root: HTMLElement, heroEl: Element | null): () => void
export function initScrollNav(navEl: HTMLElement, heroEl: Element | null): () => void
```

The `.astro` `<script>` block queries both elements and passes them in:

```ts
// NavigationBar.astro
import { initNavigation } from '../scripts/navigation';
const nav = document.querySelector<HTMLElement>('[data-nav]')!;
const hero = document.querySelector('[data-hero]');
initNavigation(nav, hero);
```

**Why not query inside the module**: violates DI, makes tests require `document.body` to contain a `[data-hero]` element as a side-effect setup — fragile.

### Gallery — one module, internal functions

`PhotoGallery.astro`'s script has multiple concerns (dialog, navigation, keyboard, VT, observer). Per SOLID S these could be separate modules, but for this codebase size the right call is one `gallery.ts` file with the concerns expressed as internal named functions (`openDialog`, `closeDialog`, `navigate`, `initObserver`) composed by the exported `initGallery(root)`.

Splitting into separate files would add indirection without enough payoff — there's no reuse between gallery sub-concerns.

### View Transitions — keep existing type extension

The current code extends `Document` with a local `VTDocument` type to handle the non-standard `startViewTransition` API. This pattern is correct and moves into `gallery.ts` as-is.

### setInterval in Hero — use fake timers in tests

jsdom supports `setInterval`, but tests should use `vi.useFakeTimers()` to control slideshow advancement without waiting real time. This is documented in the test file, not CLAUDE.md (it's module-specific).

### Test coverage — deferred

Tests are out of scope for this change. The factory pattern makes all four modules testable; test authoring is a follow-on. Key test notes are preserved in `CLAUDE.md` (jsdom mock patterns for `IntersectionObserver`, `dialog.showModal()`, `requestAnimationFrame`, and View Transitions).

## Risks / Trade-offs

- **BaseLayout scope** → Proposal didn't include `BaseLayout.astro`. Update proposal or note in tasks. Low risk — it's a small addition.
- **setInterval in Hero** → jsdom allows it; future tests should use `vi.useFakeTimers()`. Not a concern for this change.
- **NavigationBar `open()` uses `requestAnimationFrame`** → jsdom doesn't run rAF callbacks automatically. Not a concern for this change; noted for future test authoring.

## Migration Plan

Extract one module at a time, verify `npm run build` passes after each, then run tests. Order: Hero → ScrollNav → Navigation → Gallery (simplest to most complex).
