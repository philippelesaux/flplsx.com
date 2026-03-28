## 1. Install Vitest

- [x] 1.1 Add `vitest`, `@vitest/ui`, and `jsdom` as dev dependencies in `package.json`
- [x] 1.2 Add `"test": "vitest run"` and `"test:ui": "vitest --ui"` scripts to `package.json`

## 2. Configure Vitest

- [x] 2.1 Create `vitest.config.ts` at project root with `environment: 'jsdom'` and `include: ['src/scripts/**/*.test.ts']`
- [x] 2.2 Verify `npm run test` runs without error (expects "no test files found", not a failure)

## 3. Update CLAUDE.md

- [x] 3.1 Add `npm run test` and `npm run test:ui` to the Commands section
- [x] 3.2 Add a Conventions section documenting the `initX(root: HTMLElement): () => void` factory pattern with a minimal example
- [x] 3.3 Document SOLID scope: Single Responsibility and Dependency Inversion are enforced; O/L/I only when abstractions naturally emerge
- [x] 3.4 Document TypeScript idioms: `import type`, `const`/`let`/no-`var`, explicit return types on exports, `!` only at DOM query sites, `interface` over `type` for object shapes
- [x] 3.5 Document async/await rule and the View Transitions `.finished` await pattern
- [x] 3.6 Document AbortController teardown pattern for event listeners
- [x] 3.7 Document jsdom limitations and standard mocks: `IntersectionObserver` global stub, `dialog.showModal()`/`dialog.close()` instance stubs
- [x] 3.8 Document file layout: `src/scripts/<component>.ts` + `src/scripts/<component>.test.ts`
