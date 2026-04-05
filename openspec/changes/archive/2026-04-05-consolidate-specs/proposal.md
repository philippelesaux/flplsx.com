## Why

The spec library has grown to 14 entries for a small portfolio site, most of which document internal implementation conventions or script module signatures rather than observable behavior — violating OpenSpec's behavior-contract principle and making specs useless as a basis for TDD. Consolidating now keeps the spec library honest and ensures every spec can drive tests.

## What Changes

- **Delete 7 specs** that describe implementation internals, tooling setup, or coding conventions rather than user-observable behavior:
  - `claude-md-conventions` — documents CLAUDE.md content; CLAUDE.md is already the source of truth
  - `vitest-infrastructure` — describes test tooling setup; not behavior
  - `design-token-system` — describes CSS architecture convention; not behavior; contains stale React/Lightbox references
  - `portfolio-thumbnail-optimization` — prescribes build tool APIs and output paths; not unit-testable behavior; contains stale `Lightbox` references
  - `hero-script` — describes `initHero` factory signature; internal nomenclature
  - `gallery-script` — describes `initGallery` factory signature; behavioral scenarios buried inside are migrated out
  - `navigation-script` — describes `initNavigation`/`initScrollNav` signatures; behavioral scenarios migrated out

- **Migrate behavioral scenarios** from the three script specs into the correct feature specs:
  - `hero-script` → `hero-carousel`: slideshow timing (5000ms interval), wrap behavior, initial active state
  - `gallery-script` → `image-expand-dialog`: dialog open/close, prev/next navigation, keyboard arrow nav, escape handling, View Transitions guard
  - `gallery-script` → `grid-entrance-animations`: thumbnail entrance animation (gains `visible` class, observer disconnects after first intersection)
  - `navigation-script` → `mobile-nav-menu`: hamburger toggle, aria attribute updates, close-on-link-click
  - `navigation-script` → `scroll-aware-nav`: `scrolled` and `hero-visible` class state scenarios

- **Trim implementation language** from `grid-entrance-animations`: remove the sentence prescribing IntersectionObserver + vanilla JS + Astro `<script>` block from the requirement body

- **Add one explicit rule to CLAUDE.md** under Styling: no component may hardcode a color, spacing, or typography value that is represented in `tokens.css` (currently implied but not stated)

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `hero-carousel`: add behavioral requirements for slideshow timing, initial active state, and wrap-around
- `image-expand-dialog`: add behavioral requirements for dialog open/close, prev/next, keyboard navigation, escape interception, and View Transitions concurrency guard
- `mobile-nav-menu`: add behavioral requirements for aria attribute updates and close-on-link-click
- `scroll-aware-nav`: add behavioral requirements for `scrolled` and `hero-visible` class state transitions
- `grid-entrance-animations`: remove implementation prescription; add thumbnail entrance scenario (visible class, observer disconnect)

## Impact

- `openspec/specs/` — 7 directories deleted, 5 spec files updated
- `CLAUDE.md` — one line added under Styling
- No application code changes
- No test changes (existing tests already cover the migrated scenarios)
