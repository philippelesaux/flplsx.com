## Why

The photo dialog has a dated "media player" aesthetic — a bottom bar mixing metadata and navigation controls with equal visual weight. Replacing it with a minimal, typographic treatment brings the viewer in line with contemporary photography portfolio conventions and creates a clean foundation for future article linking.

## What Changes

- Remove prev/next navigation buttons and arrow key navigation from the dialog
- Replace the bottom control bar with a typographic metadata strip (title + location only)
- Move the close button to a floating position (top-right, over the image)
- Replace the solid black dialog background with a blurred, color-matched version of the displayed image
- Blur background transitions in/out in sync with the View Transition morph animation
- Add keyboard arrow navigation (ArrowLeft/ArrowRight) without visible buttons
- Add horizontal swipe gesture navigation for touch devices
- Add visually hidden prev/next buttons for screen reader accessibility
- Add live region announcement so screen readers announce the new photo title and location on navigation

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `image-expand-dialog`: Remove prev/next navigation requirement; update layout from control bar to typographic strip with floating close; add blurred background requirement with synchronized transition; add keyboard, swipe, and screen reader navigation requirements

## Impact

- `src/components/PhotoGallery.astro` — HTML structure and styles
- `src/scripts/gallery.ts` — remove navigate() and prev/next event listeners; restore navigate() with keyboard, swipe, and hidden button wiring
- `src/scripts/gallery.test.ts` — update tests for all navigation input methods
- `openspec/specs/image-expand-dialog/spec.md` — several requirements change
