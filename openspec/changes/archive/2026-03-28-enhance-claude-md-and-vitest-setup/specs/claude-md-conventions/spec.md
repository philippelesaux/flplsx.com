## ADDED Requirements

### Requirement: CLAUDE.md documents client-script factory pattern
CLAUDE.md SHALL document that all client-side scripts are extracted to `src/scripts/<component>.ts` and exported as a named factory function `initX(root: HTMLElement): () => void`. The `.astro` component SHALL import and call the factory from a minimal `<script>` block. Tests SHALL live at `src/scripts/<component>.test.ts`.

#### Scenario: New interactive script follows factory pattern
- **WHEN** a new client-side interactive feature is added to an `.astro` component
- **THEN** the script logic is placed in `src/scripts/<component>.ts` as `export function initX(root: HTMLElement): () => void`
- **THEN** the `.astro` `<script>` block imports and calls the factory with a root element query
- **THEN** a corresponding `src/scripts/<component>.test.ts` file exists or is created

#### Scenario: Inline script block is minimal
- **WHEN** a script block appears in an `.astro` file
- **THEN** it contains only the import and a single factory call — no logic

### Requirement: CLAUDE.md documents SOLID application scope
CLAUDE.md SHALL document that Single Responsibility and Dependency Inversion are the primary SOLID principles enforced. Open/Closed, Liskov, and Interface Segregation SHALL be noted as applicable only when abstractions naturally emerge (not proactively imposed).

#### Scenario: Single responsibility in scripts
- **WHEN** a script module handles more than one distinct concern (e.g., dialog state AND scroll animation)
- **THEN** each concern is separated into its own function or module

#### Scenario: Dependency inversion via root parameter
- **WHEN** a script needs to query DOM elements
- **THEN** queries are performed relative to the injected `root` parameter, not `document` directly

### Requirement: CLAUDE.md documents TypeScript idioms
CLAUDE.md SHALL document the following TypeScript conventions:
- `import type` for type-only imports
- `const` by default; `let` only when reassignment is required; never `var`
- Explicit return types on all exported functions
- Non-null assertions (`!`) permitted only at DOM query sites (component init), not in logic
- `interface` preferred over `type` alias for object shapes; `type` for unions and primitives

#### Scenario: Type-only import uses import type
- **WHEN** an import is used only as a type annotation
- **THEN** it is written as `import type { Foo } from './foo'`

#### Scenario: Exported function has explicit return type
- **WHEN** a function is exported from a `src/scripts/` module
- **THEN** its return type is explicitly annotated

### Requirement: CLAUDE.md documents async/await preference
CLAUDE.md SHALL document that async operations use `async/await` syntax. `.then()/.catch()` chaining SHALL NOT be used. The View Transitions `.finished` property is explicitly noted as an exception context: `startViewTransition(cb)` takes a synchronous callback, but `.finished` SHALL be awaited.

#### Scenario: Fetch or Promise-based call uses async/await
- **WHEN** any async operation is written (fetch, timer resolution, etc.)
- **THEN** the calling function is marked `async` and uses `await`

#### Scenario: View Transitions finished is awaited
- **WHEN** a view transition's completion must be detected
- **THEN** the code is `await doc.startViewTransition(() => { ... }).finished`
- **THEN** it is NOT written as `.startViewTransition(...).finished.then(...)`

### Requirement: CLAUDE.md documents AbortController teardown pattern
CLAUDE.md SHALL document that event listeners added inside factory functions SHALL use `{ signal: ac.signal }` where `ac` is an `AbortController`. The factory's returned teardown function SHALL call `ac.abort()`.

#### Scenario: Factory function returns working teardown
- **WHEN** `initX(root)` is called
- **THEN** it returns a function that, when called, removes all event listeners registered during init
- **THEN** cleanup is achieved via `AbortController.abort()`, not manual `removeEventListener` calls
