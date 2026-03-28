## Context

Client-side scripts live as inline `<script>` blocks inside `.astro` components (Hero, NavigationBar, PhotoGallery). They query the DOM at the module's top level, which makes them impossible to test with Vitest — there's no document at import time, and no way to inject a controlled DOM tree.

The codebase already uses strict TypeScript (`astro/tsconfigs/strictest`) and vanilla CSS with no framework. The goal is to extend that discipline to the JS layer with documented conventions and test infrastructure — without yet extracting any scripts (that's a follow-on change).

## Goals / Non-Goals

**Goals:**
- Document conventions in `CLAUDE.md` so future scripts are written in a testable shape from the start
- Install and configure Vitest so the infrastructure exists when the first extracted script lands
- Pick a Vitest environment (`jsdom`) and confirm it's compatible with the Astro/Vite setup

**Non-Goals:**
- Extracting existing scripts from `.astro` files (follow-on change)
- Writing any tests (nothing testable exists yet)
- ESLint or other linting tooling
- CI integration

## Decisions

### Factory function pattern for all client scripts

All client-side scripts SHALL be exported as a named factory function `initX(root: HTMLElement)` that receives a root element and returns a teardown function.

```ts
// src/scripts/gallery.ts
export function initGallery(root: HTMLElement): () => void {
  const dialog = root.querySelector<HTMLDialogElement>('.photo-dialog')!;
  // ...
  return () => ac.abort();
}
```

**Why**: Parameterizing the root element is the minimum change that enables Vitest + jsdom testing — you pass `document.body` (or a scoped container) in tests rather than relying on `document.querySelector` at module load time. It also naturally enforces Dependency Inversion (DOM dependencies injected, not hardcoded).

**Alternatives considered**:
- Module-level singleton (current pattern) — untestable, rejected
- Class-based controllers — more ceremony than needed for these scripts, rejected
- Custom elements — interesting but a larger architectural shift, out of scope here

### AbortController for event listener cleanup

Teardown functions SHALL use `AbortController` with `{ signal }` on all `addEventListener` calls, so cleanup is a single `ac.abort()`.

**Why**: Modern, explicit, avoids the need to hold references to every handler for `removeEventListener`. Demonstrates idiomatic current JS.

### Vitest with jsdom environment via getViteConfig

Use `vitest` with `environment: 'jsdom'` (not `happy-dom`), configured via `getViteConfig` from `astro/config`. The `/// <reference types="vitest/config" />` triple-slash directive is required to augment Vite's `UserConfig` type with the `test` property — without it, TypeScript reports `test` as an unknown property.

```ts
/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: { environment: 'jsdom', include: ['src/scripts/**/*.test.ts'], passWithNoTests: true }
});
```

**Why `getViteConfig` over standalone**: Preserves Astro's Vite plugins and path alias resolution in tests. This is the approach documented by Astro.

**Why jsdom over happy-dom**: Better parity with real browser APIs including `HTMLDialogElement`, `IntersectionObserver` (via mock), and `KeyboardEvent`.

**Note**: `IntersectionObserver` is not in jsdom — tests for the gallery observer behaviour will need a simple mock in setup. This is documented in CLAUDE.md.

### async/await over .then()/.catch()

Async code SHALL use `async/await`. The one current `.then()` usage (View Transitions `.finished`) becomes `await vt.finished` inside an `async` function.

**Exception noted in CLAUDE.md**: `startViewTransition(callback)` itself takes a synchronous callback — only `.finished` is awaited, not the transition call itself.

### import type for type-only imports

All type-only imports SHALL use `import type`. This is enforced by `verbatimModuleSyntax` which is already on via `astro/tsconfigs/strictest`.

## Risks / Trade-offs

- **Vitest + Astro Vite config** → Using `getViteConfig` from `astro/config` keeps Astro's Vite plugins active in tests. Scripts under `src/scripts/` won't use Astro APIs directly, but this ensures path aliases and any transitive imports resolve correctly.
- **jsdom limitations** → `IntersectionObserver`, `ResizeObserver`, and `dialog.showModal()` require mocks. Tests should document which mocks are needed per module. Risk is low — we know upfront.
- **No tests initially** → Vitest will warn "no test files found". That's acceptable; the infrastructure exists for the first extraction.

## Migration Plan

1. Add `vitest` and `@vitest/ui` dev dependencies
2. Create `vitest.config.ts`
3. Add `test` and `test:ui` scripts to `package.json`
4. Append Conventions section to `CLAUDE.md`
5. Verify `npm run test` runs without error (exits with "no test files" warning, not an error code)

No rollback needed — all changes are dev-only (no runtime impact).
