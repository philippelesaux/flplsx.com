## Why

When a user opens the photo dialog a second time (selecting a different image), the dialog briefly flashes the previously viewed image before displaying the correct one. This is a regression in the open animation — the wrong image is visible during the View Transition's new-state, producing a jarring stale-image flash.

## What Changes

- Opening the photo dialog always displays the selected image immediately, with no flash of any previously viewed image — including during the View Transitions morph animation.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `image-expand-dialog`: Add an explicit requirement that the dialog displays the correct image immediately on open, with no flash of the previous image. The existing spec covers the correct behavior implicitly; this adds a concrete scenario to prevent regression.

## Impact

- `src/scripts/gallery.ts` — `openDialog` function
- `src/scripts/gallery.test.ts` — test coverage for the corrected open sequence
