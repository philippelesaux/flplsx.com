## Why

Pressing Escape to close the photo dialog bypasses `closeDialog()` entirely — the native `<dialog>` element closes directly, skipping the View Transitions morph animation and leaving `view-transition-name` potentially set on the dialog image. The `image-expand-dialog` spec requires all close paths to animate.

## What Changes

- `gallery.ts` intercepts the `cancel` event on the dialog and routes it through `closeDialog()` so the View Transitions morph fires on Escape, matching the close button and backdrop click paths
- `image-expand-dialog` spec is updated to explicitly cover the Escape close scenario

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `image-expand-dialog`: add scenario explicitly covering Escape key close path and its animation behaviour
- `gallery-script`: add scenario covering Escape key close path

## Impact

- `src/scripts/gallery.ts`: add `cancel` event listener; add `transitioning` guard
- `openspec/specs/image-expand-dialog/spec.md`: delta spec adding Escape scenario
- `openspec/specs/gallery-script/spec.md`: delta spec adding Escape scenario
