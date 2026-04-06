## Why

After the `consolidate-specs` change deleted seven implementation-prescribing specs and migrated their behavioral scenarios into the correct feature specs, the test files were left with stale references to the deleted specs and `describe` blocks that no longer match any requirement in the current spec library. The spec→test traceability promised by `rules.tasks` in `config.yaml` is broken.

## What Changes

- Update the spec reference comment at the top of each test file to point to the current spec(s)
- Remove orphaned `describe` blocks that test internal function contracts (`initX factory is exported from src/scripts/x.ts`) — these trace to deleted script-contract specs and have no corresponding behavioral requirement
- Align `describe` wording to match spec Requirement headings verbatim (per `rules.tasks`)
- Align `it` wording to match spec Scenario headings verbatim where they diverge

## Capabilities

### New Capabilities

None — this change introduces no new user-observable behavior.

### Modified Capabilities

None — no spec requirements are changing. All spec content stays as-is; only test files are updated to reflect the current spec library.

## Impact

- `src/scripts/gallery.test.ts` — stale reference to `gallery-script/spec.md`; orphaned factory describe block; several describe/it headings misaligned with `image-expand-dialog` and `grid-entrance-animations` specs
- `src/scripts/hero.test.ts` — stale reference to `hero-script/spec.md`; orphaned factory describe block; describe heading misaligned with `hero-carousel` spec
- `src/scripts/navigation.test.ts` — stale reference to `navigation-script/spec.md`; orphaned factory describe block; describe headings partially misaligned with `mobile-nav-menu` spec
- `src/scripts/scroll-nav.test.ts` — stale reference to `navigation-script/spec.md`; orphaned factory describe block; covers `scroll-aware-nav` spec only
