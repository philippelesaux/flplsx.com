# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Type-check then build to ./dist/
npm run preview   # Preview production build locally
npm run test      # Run Vitest (src/scripts/**/*.test.ts)
npm run test:ui   # Run Vitest with browser UI
```

## Architecture

Personal portfolio site for Philippe LeSaux built with **Astro 6**.

### Component model

- **Astro components** (`.astro`) handle all layout and interactivity — no React or other UI framework is used
- Interactivity logic lives in `src/scripts/<component>.ts` as a named factory function; the `.astro` `<script>` block imports and calls it — nothing else
- See **Conventions → Client-side scripts** for the full pattern

### Data flow for the gallery

Portfolio images are declared in `src/data/portfolio.json` and loaded via Astro Content Collections (`src/content.config.ts`). The `index.astro` page queries the collection and passes image metadata to `Hero.astro` and `PhotoGallery.astro` as props.

### Styling

Vanilla CSS with no framework dependencies. Three layers:

- **`src/styles/tokens.css`** — CSS custom properties defining the full design token set (colors, spacing, type scale, letter-spacing). Single source of truth for all design values.
- **`src/styles/global.css`** — Site-wide base styles: CSS reset, body, nav scroll states (`[data-nav].scrolled`, `[data-nav].hero-visible`), and nav name sizing. Imported in `BaseLayout.astro`.
- **Scoped `<style>` blocks** in each `.astro` component — component-level styles using token variables, placed after the template.

JS only toggles semantic class names (`.active`, `.visible`) — never style values directly.

### TypeScript

`tsconfig.json` extends `astro/tsconfigs/strictest` — strict mode is on throughout.

## OpenSpec

This repo uses **OpenSpec** (`/opsx:*` slash commands) for structured change management. All significant work goes through a proposal → design → specs → tasks → implementation → archive workflow.

### Directory layout

```
openspec/
  specs/
    <capability>/   ← one flat directory per capability
      spec.md
  changes/          ← active changes in progress
    archive/        ← completed and archived changes
```

Specs are **flat** — one level deep only. OpenSpec cannot traverse subdirectories.

Specs fall into two conceptual categories (not directory structure):

- **System specs** — cross-cutting decisions: coding conventions (`claude-md-conventions`), test infrastructure (`vitest-infrastructure`), CSS architecture (`design-token-system`), script module contracts (`hero-script`, `navigation-script`, `gallery-script`). Describe *how the codebase is structured*.
- **Feature specs** — user-facing behaviour: pages, components, animations, interactions (`hero-carousel`, `mobile-nav-menu`, `scroll-aware-nav`, etc.). Describe *what the site does*.

### Key conventions

- **Before starting new work**: run `/opsx:propose` or `/opsx:new` to create a change with artifacts
- **Specs are the source of truth**: `openspec/specs/` holds what the system currently does; changes accumulate delta specs that sync to main on archive
- **Active changes** are in `openspec/changes/<name>/` with `proposal.md`, `design.md`, `specs/`, and `tasks.md`
- **Implementation**: `/opsx:apply` works through `tasks.md` checkboxes; mark each task complete as you go
- **Archive**: run `/opsx:verify` before `/opsx:archive` — verify syncs delta specs to `openspec/specs/`

### When to skip the workflow

Trivial changes (typos, copy edits, single-line fixes) don't need a change. Use judgment — if a change affects architecture, introduces a pattern, or touches multiple files, use OpenSpec.

## Conventions

### Client-side scripts

All client-side script logic lives in `src/scripts/<component>.ts`, not inline in `.astro` files. The `.astro` `<script>` block imports and calls the factory — nothing else.

**Factory pattern** — every script module exports a named `initX` function:

```ts
// src/scripts/gallery.ts
export function initGallery(root: HTMLElement): () => void {
  const ac = new AbortController();
  const { signal } = ac;

  root.addEventListener('click', handler, { signal });

  return () => ac.abort();
}
```

```astro
<!-- PhotoGallery.astro -->
<script>
  import { initGallery } from '../scripts/gallery';
  initGallery(document.querySelector('.gallery-grid')!);
</script>
```

**Why**: Injecting `root` instead of calling `document.querySelector` at module load time makes the script testable with Vitest + jsdom — tests pass in a controlled DOM tree.

**File layout:**

```
src/scripts/
  gallery.ts          ← implementation
  gallery.test.ts     ← Vitest tests
  navigation.ts
  navigation.test.ts
```

### SOLID principles

Apply **Single Responsibility** and **Dependency Inversion** consistently. The other three (Open/Closed, Liskov, Interface Segregation) apply only when abstractions naturally emerge — do not impose them proactively.

- **S**: Each script module handles one concern. If a script does two distinct things, split it into two functions or files.
- **D**: Scripts receive DOM root elements as parameters. Never query `document` directly in module logic — only at the call site in the `.astro` `<script>` block.

### TypeScript idioms

- `import type` for type-only imports
- `const` by default; `let` only when reassignment is required; never `var`
- Explicit return types on all exported functions
- Non-null assertions (`!`) are permitted **only** at DOM query call sites (component init) — never inside logic
- `interface` over `type` alias for object shapes; `type` for unions and primitives

### Async/await

Use `async/await` for all async operations. Never use `.then()/.catch()` chaining.

**View Transitions exception**: `startViewTransition(callback)` takes a synchronous callback — only `.finished` is awaited:

```ts
// correct
await document.startViewTransition(() => {
  // synchronous state update
}).finished;

// incorrect
document.startViewTransition(() => { ... }).finished.then(() => { ... });
```

### AbortController teardown

Use `AbortController` for all event listeners inside factory functions. Pass `{ signal: ac.signal }` to every `addEventListener` call. The returned teardown function calls `ac.abort()`.

This eliminates the need to store handler references for `removeEventListener` and ensures clean teardown in tests.

### Testing — jsdom limitations

The following browser APIs are not available in jsdom and must be mocked in test setup:

**`IntersectionObserver`** — add to your test file or a shared setup:

```ts
vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});
```

**`HTMLDialogElement.showModal()` / `.close()`** — stub on the element instance:

```ts
const dialog = document.createElement('dialog');
dialog.showModal = vi.fn();
dialog.close = vi.fn();
```
