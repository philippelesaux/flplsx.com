## Why

The staggered delay on grid image entrance feels slow — images that are already in the viewport on load wait unnecessarily before appearing. Images should fade in as soon as they are ready, not after an artificial delay.

## What Changes

- Remove the position-based stagger delay from grid entrance animations
- Images in the viewport fade in immediately when ready, with no cascading delay between them

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `grid-entrance-animations`: Remove the stagger-by-position scenario; images fade in immediately on intersection with no delay

## Impact

- `src/styles/global.css` or component `<style>` — remove the CSS stagger delay logic
- `src/scripts/gallery.ts` — remove any JS-side stagger index assignment
