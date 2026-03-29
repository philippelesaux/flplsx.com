## Why

Seven specs in `openspec/specs/` are missing a `## Purpose` section, causing `openspec validate --specs` to report errors. The validator requires both `## Purpose` and `## Requirements` headers to be present.

## What Changes

- A `## Purpose` section is added to each of the 7 failing specs
- All specs pass `openspec validate --specs` after the fix

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `design-token-system`: add Purpose section
- `editorial-visual-identity`: add Purpose section
- `grid-entrance-animations`: add Purpose section
- `hero-carousel`: add Purpose section
- `image-expand-dialog`: add Purpose section
- `portfolio-thumbnail-optimization`: add Purpose section
- `scroll-aware-nav`: add Purpose section

## Impact

- `openspec/specs/design-token-system/spec.md`
- `openspec/specs/editorial-visual-identity/spec.md`
- `openspec/specs/grid-entrance-animations/spec.md`
- `openspec/specs/hero-carousel/spec.md`
- `openspec/specs/image-expand-dialog/spec.md`
- `openspec/specs/portfolio-thumbnail-optimization/spec.md`
- `openspec/specs/scroll-aware-nav/spec.md`
