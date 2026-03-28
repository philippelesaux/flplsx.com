## Why

Client-side scripts are currently inline `<script>` blocks in `.astro` components, making them untestable and unconstrained by any documented conventions. Extracting scripts to `src/scripts/` with a factory-function pattern enables Vitest unit testing, and codifying conventions in `CLAUDE.md` ensures future work follows the same testable shape.

## What Changes

- `CLAUDE.md` gains a **Conventions** section covering: SOLID principles (S + D focus), idiomatic TypeScript rules, async/await preference, and the `initX(root)` factory pattern for client-side scripts
- `vitest.config.ts` is created, configuring Vitest with a `jsdom` environment and `src/scripts/**/*.test.ts` glob
- `vitest` and `@vitest/ui` are added as dev dependencies
- The `package.json` gains a `test` script (`vitest run`) and `test:ui` script
- `CLAUDE.md` documents the file layout convention: `src/scripts/<component>.ts` + `src/scripts/<component>.test.ts`

## Capabilities

### New Capabilities

- `claude-md-conventions`: Documented coding conventions in CLAUDE.md covering SOLID, TypeScript idioms, async/await, and the client-script factory pattern
- `vitest-infrastructure`: Vitest configured with jsdom, ready to run tests against extracted `src/scripts/` modules

### Modified Capabilities

<!-- None — no existing spec-level behavior changes. Scripts are not yet extracted in this change. -->

## Impact

- `CLAUDE.md` — new Conventions section appended
- `package.json` — two new dev dependencies, two new scripts
- `vitest.config.ts` — new file
- No runtime behavior changes; no existing component scripts are modified in this change
