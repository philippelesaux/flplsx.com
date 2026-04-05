## Context

The spec library contains 14 specs for a small portfolio site. During an audit against the OpenSpec "behavior contract" principle, 7 specs were identified as describing internal implementation conventions, module signatures, or tooling setup rather than externally observable behavior. Three of those specs (hero-script, gallery-script, navigation-script) additionally contain behavioral scenarios that are valuable for TDD but are filed under the wrong capability.

This change has no application code impact — it is purely a reorganization of the `openspec/specs/` directory and a minor addition to `CLAUDE.md`.

## Goals / Non-Goals

**Goals:**
- Every surviving spec describes only user-observable behavior
- No spec prescribes implementation technology, framework APIs, or internal module names
- Behavioral scenarios are co-located with the feature spec they belong to
- CLAUDE.md explicitly states the "no hardcoded token values" rule

**Non-Goals:**
- Rewriting surviving spec content beyond what's needed for correctness
- Adding new behavioral requirements not already documented somewhere
- Changing any application code or tests

## Decisions

### Migrate behavioral scenarios rather than discard them

**Decision:** Extract behavioral scenarios from the script contract specs and move them into the corresponding feature specs. Do not discard them.

**Rationale:** The script contract specs were written at the wrong level of abstraction, but many of their scenarios are genuinely behavioral and test-driving (e.g., "dialog advances to next image on ArrowRight", "nav gains `scrolled` class when scrollY > 0"). Discarding them would lose TDD value. Moving them to the feature spec where they belong preserves that value without the structural pollution.

**Alternative considered:** Keep the script specs and strip out only the nomenclature requirements, leaving only the behavioral scenarios. Rejected — a spec named `gallery-script` whose purpose is "contract for the initGallery factory" but whose content is dialog navigation behavior is confusing. The content should live where it belongs.

### Drop `portfolio-thumbnail-optimization` without migration

**Decision:** Delete this spec with no content migration to surviving specs.

**Rationale:** Its requirements prescribe Astro APIs (`getImage()`), build output paths (`/_astro/`), and specific pixel dimensions — none of which are user-observable behavior. Its scenarios test build artifacts, not runtime behavior. The one intent worth preserving ("images serve at appropriate resolution per context") is already implied by the `hero-carousel` and `image-expand-dialog` specs. It also contains stale references to a `Lightbox` component that no longer exists.

### Drop `design-token-system` without migration

**Decision:** Delete this spec; add one explicit sentence to CLAUDE.md.

**Rationale:** The spec describes CSS architecture conventions, not behavior. Its most important rule — "no component hardcodes a value represented in tokens.css" — is implied by CLAUDE.md's Styling section but not stated explicitly. A single added sentence in CLAUDE.md is the right home for this rule. The rest of the spec contains stale React/Lightbox references and is no longer accurate.

### One CLAUDE.md addition only

**Decision:** Add exactly one sentence under the Styling section: the explicit "no hardcoded token values" rule. Make no other changes to CLAUDE.md.

**Rationale:** Everything else from the deleted specs is already documented in CLAUDE.md (factory pattern, SOLID, TypeScript idioms, async/await, AbortController, jsdom mocks). Adding more would be redundant and would push CLAUDE.md closer to the 200-line adherence threshold.

## Risks / Trade-offs

- **Surviving specs grow longer** → The feature specs absorbing migrated scenarios will be longer than before. Acceptable — they remain focused on one capability, and the scenarios are all behaviorally coherent.
- **Loss of discoverability for script contracts** → Developers won't find a spec that says "initGallery has this signature." Mitigation: the signature is in the TypeScript file itself; CLAUDE.md documents the factory pattern convention.

## Open Questions

None — all decisions resolved during the exploration session that preceded this change.
