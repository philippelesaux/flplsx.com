## 1. Generate Display-Size Images in index.astro

- [x] 1.1 Add a 1400px webp image transform per portfolio entry alongside the existing 400px thumbnail
- [x] 1.2 Update the `LightboxImage` type / props shape to include `display: { src: string }`, `title`, `location`, and `alt`
- [x] 1.3 Pass the new props to the Lightbox component and remove `client:load`

## 2. Create PhotoGallery.astro

- [x] 2.1 Create `src/components/PhotoGallery.astro` with the grid template: one `<button>` per image wrapping the thumbnail `<img>`
- [x] 2.2 Add the single shared `<dialog>` element with inner structure: full-size `<img>`, metadata bar (title, location), prev/next buttons, close button
- [x] 2.3 Add `aria-label` to the dialog and ensure buttons have accessible labels

## 3. Dialog Styles

- [x] 3.1 Add a `<style>` block to `PhotoGallery.astro` with grid layout (columns-based masonry), replacing `PhotoGallery.module.css` grid rules
- [x] 3.2 Style the thumbnail `<button>` wrapper (reset button appearance, full-width block)
- [x] 3.3 Style the `<dialog>` as full-screen on all viewports; apply `display: flex` only via `dialog[open]` selector to avoid overriding the browser's `display: none` on closed dialogs
- [x] 3.4 Style the inner dialog layout: image fills available space with `object-fit: contain`, metadata bar pinned at bottom
- [x] 3.5 Style the `::backdrop` overlay
- [x] 3.6 Add entrance animation styles for thumbnails (opacity/translate, `.visible` class); add zoom hover effect (`scale(1.03)` on `.visible:hover`) with `clip-path: inset(0)` to prevent overflow bleed

## 4. Vanilla JS Interactivity

- [x] 4.1 Add `<script>` block to `PhotoGallery.astro` with IntersectionObserver for entrance animations (port from React `useEffect`); use `requestAnimationFrame` after adding `.visible` to remove inline `transition-delay` so hover has no delay
- [x] 4.2 Implement `open(index)`: set name on button before transition ("before" snapshot), then inside callback remove name from button, showModal(), set name on dialogImg ("after" snapshot); clear dialogImg name on `.finished`
- [x] 4.3 Implement `close()`: set name on dialogImg before transition ("before" snapshot), then inside callback remove name from dialogImg, set name on button, close() ("after" snapshot); clear button name on `.finished`
- [x] 4.4 Implement `navigate(delta)`: update `currentIndex`, repopulate dialog content (no transition needed for navigation)
- [x] 4.5 Add progressive enhancement guard: `if (document.startViewTransition)` — fall back to direct `showModal()` / `close()` for unsupported browsers
- [x] 4.6 Wire up event listeners: thumbnail button clicks, close button, prev/next buttons, `keydown` (ArrowLeft, ArrowRight) while dialog is open, `backdrop` click to close

## 5. Cleanup

- [x] 5.1 Delete `src/components/Lightbox.tsx (now PhotoGallery.astro)`
- [x] 5.2 Delete `src/components/PhotoGallery.module.css`
