## Why

The portfolio grid currently displays thumbnails with no way to view a larger version or read the associated metadata (title, location). Adding an image expansion interaction — using a native `<dialog>` with View Transitions morphing — gives editors the context they need to evaluate images while providing a modern, polished experience. The change also converts the React island to a plain Astro component, eliminating unnecessary JavaScript overhead.

## What Changes

- **BREAKING** `Lightbox.tsx` replaced by `PhotoGallery.astro` — React island removed, component renamed to better reflect its purpose, no `client:load` hydration
- `Lightbox.module.css` replaced by a `<style>` block inside `PhotoGallery.astro`
- `index.astro` generates a display-size image (1400px webp) per entry alongside the existing 400px thumbnail, and passes both to `PhotoGallery`
- Each thumbnail is wrapped in a `<button>` for keyboard accessibility
- A single shared `<dialog>` element handles image expansion for the entire grid
- Clicking a thumbnail opens the dialog with the display-size image, title, and location
- View Transitions API morphs the thumbnail to the full-size image on open and back on close (progressive enhancement — graceful fallback for unsupported browsers)
- Prev/next navigation in the dialog via arrow buttons and keyboard arrow keys
- `Escape` key and a close button dismiss the dialog

## Capabilities

### New Capabilities

- `image-expand-dialog`: Full-size image viewing via native dialog with metadata display, prev/next navigation, and View Transitions morph animation

### Modified Capabilities

- `grid-entrance-animations`: IntersectionObserver logic moves from React/JS to vanilla JS in an Astro `<script>` block — same behavior, different implementation host

## Impact

- `src/components/Lightbox.tsx` — deleted
- `src/components/Lightbox.module.css` — deleted
- `src/components/PhotoGallery.astro` — new file (replaces both above)
- `src/pages/index.astro` — add display-size image generation, update import to PhotoGallery, remove `client:load`
- No new npm dependencies
